import { readFile } from 'node:fs/promises';
import { csvParse } from 'd3-dsv';

const DATA_DIR = new URL('../public/data/reference/', import.meta.url);

const errors = [];
const warnings = [];

const readCsv = async (name) => csvParse(await readFile(new URL(name, DATA_DIR), 'utf8'));
const split = (value) => (value ? value.split('|').filter(Boolean) : []);
const isoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);
const numberOk = (value) => value === '' || value === undefined || Number.isFinite(Number(value));

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

if (events.some((row) => row.date > '2026-05-28')) {
  warnings.push('events contain dates after 2026-05-28');
}

if (errors.length > 0) {
  console.error('Reference data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Reference data validation passed: ${labels.length} labels, ${places.length} places, ${sources.length} sources, ${events.length} events, ${flows.length} flows, ${counts.length} counts.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
