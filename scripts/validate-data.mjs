import { readFile } from 'node:fs/promises';
import { csvParse } from 'd3-dsv';

const DATA_DIR = new URL('../public/data/', import.meta.url);

const confidenceValues = new Set(['high', 'medium', 'low']);
const sourceTypeValues = new Set(['official', 'media', 'analysis', 'humanitarian', 'scientific']);
const dataStatusValues = new Set(['confirmed', 'suspected', 'provisional', 'reconstructed', 'disputed']);
const flowTypeValues = new Set([
  'patient_travel',
  'body_repatriation',
  'suspected_spread',
  'sample_transport',
  'risk_corridor',
  'official_extension',
]);

const errors = [];
const warnings = [];

const readCsv = async (name) => {
  const content = await readFile(new URL(name, DATA_DIR), 'utf8');
  return csvParse(content);
};

const requireField = (row, field, context) => {
  if (!row[field]) errors.push(`${context}: missing ${field}`);
};

const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const validateNumber = (value, context, field, { allowEmpty = true } = {}) => {
  if (!value && allowEmpty) return;
  if (!value && !allowEmpty) {
    errors.push(`${context}: missing ${field}`);
    return;
  }
  if (!Number.isFinite(Number(value))) errors.push(`${context}: invalid number in ${field}`);
};

const splitList = (value) => (value ? value.split('|').filter(Boolean) : []);

const [places, events, flows, zoneCounts] = await Promise.all([
  readCsv('places.csv'),
  readCsv('events.csv'),
  readCsv('flows.csv'),
  readCsv('zone_counts.csv'),
]);

const placeIds = new Set(places.map((row) => row.place_id));
const flowIds = new Set(flows.map((row) => row.flow_id));

places.forEach((place) => {
  const context = `places.csv:${place.place_id || 'unknown'}`;
  requireField(place, 'place_id', context);
  requireField(place, 'name', context);
  requireField(place, 'country', context);
  requireField(place, 'place_type', context);
  validateNumber(place.latitude, context, 'latitude', { allowEmpty: false });
  validateNumber(place.longitude, context, 'longitude', { allowEmpty: false });

  if (place.geo_precision !== 'approximate') {
    warnings.push(`${context}: geo_precision is '${place.geo_precision}', expected 'approximate' for v1`);
  }
});

events.forEach((event) => {
  const context = `events.csv:${event.event_id || 'unknown'}`;
  requireField(event, 'event_id', context);
  requireField(event, 'date', context);
  requireField(event, 'place_id', context);
  requireField(event, 'title', context);
  requireField(event, 'kicker', context);
  requireField(event, 'description', context);
  requireField(event, 'uncertainty_note', context);
  requireField(event, 'source_label', context);
  requireField(event, 'story_step', context);

  if (event.date && !isIsoDate(event.date)) errors.push(`${context}: invalid date`);
  if (event.date_end && !isIsoDate(event.date_end)) errors.push(`${context}: invalid date_end`);
  if (!placeIds.has(event.place_id)) errors.push(`${context}: unknown place_id '${event.place_id}'`);
  if (!sourceTypeValues.has(event.source_type)) errors.push(`${context}: invalid source_type '${event.source_type}'`);
  if (!confidenceValues.has(event.confidence)) errors.push(`${context}: invalid confidence '${event.confidence}'`);
  if (!dataStatusValues.has(event.data_status)) errors.push(`${context}: invalid data_status '${event.data_status}'`);

  validateNumber(event.map_center_lng, context, 'map_center_lng', { allowEmpty: false });
  validateNumber(event.map_center_lat, context, 'map_center_lat', { allowEmpty: false });
  validateNumber(event.map_zoom, context, 'map_zoom', { allowEmpty: false });
  validateNumber(event.story_step, context, 'story_step', { allowEmpty: false });

  splitList(event.visible_places).forEach((placeId) => {
    if (!placeIds.has(placeId)) errors.push(`${context}: visible_places references unknown place_id '${placeId}'`);
  });

  splitList(event.active_flows).forEach((flowId) => {
    if (!flowIds.has(flowId)) errors.push(`${context}: active_flows references unknown flow_id '${flowId}'`);
  });
});

flows.forEach((flow) => {
  const context = `flows.csv:${flow.flow_id || 'unknown'}`;
  requireField(flow, 'flow_id', context);
  requireField(flow, 'date', context);
  requireField(flow, 'from_place_id', context);
  requireField(flow, 'to_place_id', context);
  requireField(flow, 'flow_type', context);
  requireField(flow, 'description', context);
  requireField(flow, 'source_label', context);

  if (flow.date && !isIsoDate(flow.date)) errors.push(`${context}: invalid date`);
  if (!placeIds.has(flow.from_place_id)) errors.push(`${context}: unknown from_place_id '${flow.from_place_id}'`);
  if (!placeIds.has(flow.to_place_id)) errors.push(`${context}: unknown to_place_id '${flow.to_place_id}'`);
  if (!flowTypeValues.has(flow.flow_type)) errors.push(`${context}: invalid flow_type '${flow.flow_type}'`);
  if (!confidenceValues.has(flow.confidence)) errors.push(`${context}: invalid confidence '${flow.confidence}'`);
  if (!dataStatusValues.has(flow.data_status)) errors.push(`${context}: invalid data_status '${flow.data_status}'`);
});

zoneCounts.forEach((count) => {
  const context = `zone_counts.csv:${count.date || 'unknown'}:${count.place_id || 'unknown'}`;
  requireField(count, 'date', context);
  requireField(count, 'place_id', context);
  requireField(count, 'source_label', context);

  if (count.date && !isIsoDate(count.date)) errors.push(`${context}: invalid date`);
  if (!placeIds.has(count.place_id)) errors.push(`${context}: unknown place_id '${count.place_id}'`);
  if (!confidenceValues.has(count.confidence)) errors.push(`${context}: invalid confidence '${count.confidence}'`);
  if (!dataStatusValues.has(count.data_status)) errors.push(`${context}: invalid data_status '${count.data_status}'`);

  ['confirmed_cases', 'suspected_cases', 'confirmed_deaths', 'suspected_deaths', 'contacts'].forEach((field) => {
    validateNumber(count[field], context, field);
  });
});

if (errors.length > 0) {
  console.error('Data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Data validation passed: ${places.length} places, ${events.length} events, ${flows.length} flows, ${zoneCounts.length} count rows.`);

if (warnings.length > 0) {
  console.warn('Warnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
