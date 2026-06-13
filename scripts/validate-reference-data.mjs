import { readFile } from 'node:fs/promises';
import { csvParse } from 'd3-dsv';

const DATA_DIR = new URL('../public/data/reference/', import.meta.url);

const errors = [];
const warnings = [];

const readCsv = async (name) => csvParse(await readFile(new URL(name, DATA_DIR), 'utf8'));
const split = (value) => (value ? value.split('|').filter(Boolean) : []);
const isoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);
const numberOk = (value) => value === '' || value === undefined || Number.isFinite(Number(value));
const isPresent = (value) => value !== '' && value !== undefined;
const toNumber = (value) => (isPresent(value) ? Number(value) : null);

const [labels, places, sources, events, flows, counts] = await Promise.all([
  readCsv('labels.csv'),
  readCsv('places.csv'),
  readCsv('sources.csv'),
  readCsv('events.csv'),
  readCsv('flows.csv'),
  readCsv('counts.csv'),
]);

const labelValues = new Map();
for (const row of labels) {
  if (!labelValues.has(row.label_group)) labelValues.set(row.label_group, new Set());
  labelValues.get(row.label_group).add(row.key);
}

const hasLabel = (group, key) => labelValues.get(group)?.has(key);
const placeIds = new Set(places.map((row) => row.place_id));
const sourceIds = new Set(sources.map((row) => row.source_id));

const required = (row, field, context) => {
  if (!row[field]) errors.push(`${context}: missing ${field}`);
};

const genericDeathColumns = (columns) =>
  columns.filter((column) => /^(deaths?|deces)$/i.test(column));

const hasExplanation = (row) =>
  /reclass|revision|corrig|ajust|definition|diverg|contradic|ordre de grandeur|non communique/i.test(row.notes || '');

const rowsByEntity = (rows) => {
  const byEntity = new Map();
  for (const row of rows) {
    if (!byEntity.has(row.entity_id)) byEntity.set(row.entity_id, []);
    byEntity.get(row.entity_id).push(row);
  }
  for (const entityRows of byEntity.values()) {
    entityRows.sort((a, b) => a.date.localeCompare(b.date));
  }
  return byEntity;
};

const checkNonDecreasing = (rows, field) => {
  const byEntity = rowsByEntity(rows);
  for (const [entityId, entityRows] of byEntity) {
    let previous = null;
    for (const row of entityRows) {
      const current = toNumber(row[field]);
      if (current === null) continue;
      if (previous && current < previous.value) {
        const message =
          `counts:${row.count_id}: ${field} decreases for ${entityId} from ${previous.value} on ${previous.date} to ${current} on ${row.date}`
        if (hasExplanation(row)) {
          warnings.push(`${message} with an explanatory note`);
        } else {
          errors.push(message);
        }
      }
      previous = { date: row.date, value: current };
    }
  }
};

const warnSuspectedDeathsGaps = (rows) => {
  const byEntity = rowsByEntity(rows);
  for (const [entityId, entityRows] of byEntity) {
    for (let i = 1; i < entityRows.length - 1; i += 1) {
      const row = entityRows[i];
      if (isPresent(row.suspected_deaths)) continue;
      const hadBefore = entityRows.slice(0, i).some((previous) => isPresent(previous.suspected_deaths));
      const hasAfter = entityRows.slice(i + 1).some((next) => isPresent(next.suspected_deaths));
      if (hadBefore && hasAfter) {
        warnings.push(`counts:${row.count_id}: suspected_deaths missing for ${entityId} on ${row.date}, but present before and after`);
      }
    }
  }
};

const warnStrongSuspectedCaseDrops = (rows) => {
  const byEntity = rowsByEntity(rows);
  for (const [entityId, entityRows] of byEntity) {
    let previous = null;
    for (const row of entityRows) {
      const current = toNumber(row.suspected_cases);
      if (current === null) continue;
      if (previous) {
        const drop = previous.value - current;
        const strongDrop = drop >= 50 || (previous.value > 0 && drop / previous.value >= 0.2);
        if (strongDrop && !hasExplanation(row)) {
          warnings.push(
            `counts:${row.count_id}: suspected_cases drops for ${entityId} from ${previous.value} on ${previous.date} to ${current} on ${row.date} without an explanatory note`
          );
        }
      }
      previous = { date: row.date, value: current };
    }
  }
};

const warnNationalZoneMismatches = (rows) => {
  const fields = ['confirmed_cases', 'suspected_cases', 'confirmed_deaths', 'suspected_deaths'];
  const byDate = new Map();
  for (const row of rows) {
    if (!byDate.has(row.date)) byDate.set(row.date, []);
    byDate.get(row.date).push(row);
  }
  for (const [date, dateRows] of byDate) {
    const nationalRows = dateRows.filter((row) => row.entity_type === 'country_total');
    const zoneRows = dateRows.filter((row) => row.entity_type === 'health_zone');
    if (nationalRows.length === 0 || zoneRows.length === 0) continue;
    for (const nationalRow of nationalRows) {
      for (const field of fields) {
        const nationalValue = toNumber(nationalRow[field]);
        if (nationalValue === null) continue;
        const zoneValues = zoneRows.map((row) => toNumber(row[field])).filter((value) => value !== null);
        if (zoneValues.length === 0) continue;
        const zoneSum = zoneValues.reduce((sum, value) => sum + value, 0);
        if (zoneSum !== nationalValue) {
          warnings.push(
            `counts:${nationalRow.count_id}: ${field} national value ${nationalValue} differs from health-zone sum ${zoneSum} on ${date}`
          );
        }
      }
    }
  }
};

for (const row of places) {
  const context = `places:${row.place_id || 'unknown'}`;
  required(row, 'place_id', context);
  required(row, 'name', context);
  if (row.latitude && !numberOk(row.latitude)) errors.push(`${context}: invalid latitude`);
  if (row.longitude && !numberOk(row.longitude)) errors.push(`${context}: invalid longitude`);
  if (row.source_id && !sourceIds.has(row.source_id)) errors.push(`${context}: unknown source_id ${row.source_id}`);
}

for (const row of sources) {
  const context = `sources:${row.source_id || 'unknown'}`;
  required(row, 'source_id', context);
  required(row, 'title', context);
  required(row, 'publisher', context);
  if (row.published_at && !isoDate(row.published_at)) errors.push(`${context}: invalid published_at`);
  if (!hasLabel('source_type', row.source_type)) errors.push(`${context}: invalid source_type ${row.source_type}`);
}

for (const row of events) {
  const context = `events:${row.event_id || 'unknown'}`;
  required(row, 'event_id', context);
  required(row, 'date', context);
  required(row, 'place_id', context);
  required(row, 'event_type', context);
  required(row, 'headline', context);
  required(row, 'fact_text', context);
  required(row, 'source_id', context);
  if (!isoDate(row.date)) errors.push(`${context}: invalid date`);
  if (row.date_end && !isoDate(row.date_end)) errors.push(`${context}: invalid date_end`);
  if (!placeIds.has(row.place_id)) errors.push(`${context}: unknown place_id ${row.place_id}`);
  if (!sourceIds.has(row.source_id)) errors.push(`${context}: unknown source_id ${row.source_id}`);
  if (!hasLabel('event_type', row.event_type)) errors.push(`${context}: invalid event_type ${row.event_type}`);
  if (!hasLabel('source_type', row.source_type)) errors.push(`${context}: invalid source_type ${row.source_type}`);
  if (!hasLabel('confidence', row.confidence)) errors.push(`${context}: invalid confidence ${row.confidence}`);
  if (!hasLabel('data_status', row.data_status)) errors.push(`${context}: invalid data_status ${row.data_status}`);
  if (row.display_tier && !hasLabel('display_tier', row.display_tier)) errors.push(`${context}: invalid display_tier ${row.display_tier}`);
  if (!hasLabel('map_layer', row.map_layer)) errors.push(`${context}: invalid map_layer ${row.map_layer}`);
  if (!hasLabel('timeline_group', row.timeline_group)) errors.push(`${context}: invalid timeline_group ${row.timeline_group}`);
  ['confirmed_cases', 'suspected_cases', 'confirmed_deaths', 'suspected_deaths', 'contacts', 'display_priority'].forEach((field) => {
    if (!numberOk(row[field])) errors.push(`${context}: invalid number ${field}`);
  });
}

for (const row of flows) {
  const context = `flows:${row.flow_id || 'unknown'}`;
  required(row, 'flow_id', context);
  required(row, 'date', context);
  required(row, 'from_place_id', context);
  required(row, 'to_place_id', context);
  required(row, 'flow_type', context);
  required(row, 'source_id', context);
  if (!isoDate(row.date)) errors.push(`${context}: invalid date`);
  if (row.date_end && !isoDate(row.date_end)) errors.push(`${context}: invalid date_end`);
  if (!placeIds.has(row.from_place_id)) errors.push(`${context}: unknown from_place_id ${row.from_place_id}`);
  if (!placeIds.has(row.to_place_id)) errors.push(`${context}: unknown to_place_id ${row.to_place_id}`);
  if (!sourceIds.has(row.source_id)) errors.push(`${context}: unknown source_id ${row.source_id}`);
  if (!hasLabel('flow_type', row.flow_type)) errors.push(`${context}: invalid flow_type ${row.flow_type}`);
  if (!hasLabel('confidence', row.confidence)) errors.push(`${context}: invalid confidence ${row.confidence}`);
  if (!hasLabel('data_status', row.data_status)) errors.push(`${context}: invalid data_status ${row.data_status}`);
  if (!numberOk(row.weight)) errors.push(`${context}: invalid weight`);
}

for (const row of counts) {
  const context = `counts:${row.count_id || 'unknown'}`;
  required(row, 'count_id', context);
  required(row, 'date', context);
  required(row, 'entity_id', context);
  required(row, 'source_id', context);
  if (!isoDate(row.date)) errors.push(`${context}: invalid date`);
  if (!placeIds.has(row.entity_id)) errors.push(`${context}: unknown entity_id ${row.entity_id}`);
  if (!sourceIds.has(row.source_id)) errors.push(`${context}: unknown source_id ${row.source_id}`);
  if (!hasLabel('confidence', row.confidence)) errors.push(`${context}: invalid confidence ${row.confidence}`);
  if (!hasLabel('data_status', row.data_status)) errors.push(`${context}: invalid data_status ${row.data_status}`);
  ['confirmed_cases', 'suspected_cases', 'confirmed_deaths', 'suspected_deaths', 'contacts'].forEach((field) => {
    if (!numberOk(row[field])) errors.push(`${context}: invalid number ${field}`);
  });
}

for (const column of genericDeathColumns(counts.columns || [])) {
  errors.push(`counts.csv: generic death column "${column}" is not allowed; use confirmed_deaths and suspected_deaths`);
}

const countKeys = new Set();
for (const row of counts) {
  const key = `${row.date}|${row.entity_id}|${row.source_id}`;
  if (countKeys.has(key)) errors.push(`counts:${row.count_id}: duplicate date/entity_id/source_id ${key}`);
  countKeys.add(key);
}

checkNonDecreasing(counts, 'confirmed_cases');
checkNonDecreasing(counts, 'confirmed_deaths');
warnSuspectedDeathsGaps(counts);
warnStrongSuspectedCaseDrops(counts);
warnNationalZoneMismatches(counts);

// Date de gel editorial de la couverture actuelle. Au-dela, un evenement
// signale simplement que la couverture a ete etendue et merite une relecture
// de coherence (chiffres, sources, recit). A relever quand la couverture avance.
const EDITORIAL_COVERAGE_END = '2026-06-07';
if (events.some((row) => row.date > EDITORIAL_COVERAGE_END)) {
  warnings.push(`events contain dates after ${EDITORIAL_COVERAGE_END}`);
}

if (errors.length > 0) {
  console.error('Reference data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Reference data validation passed: ${labels.length} labels, ${places.length} places, ${sources.length} sources, ${events.length} events, ${flows.length} flows, ${counts.length} counts.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
