import { csv } from 'd3-fetch';
import { assetPath } from './assetPath';
import type { AppData, DataStatus, Event, Flow, Place, Source, ZoneCount } from './types';

const numberOrNull = (value: string | undefined): number | null => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const asDataStatus = (value: string): DataStatus => {
  if (
    value === 'confirmed' ||
    value === 'suspected' ||
    value === 'provisional' ||
    value === 'reconstructed' ||
    value === 'disputed'
  ) {
    return value;
  }

  return 'provisional';
};

export const statusColor: Record<DataStatus, string> = {
  confirmed: '#1f8a70',
  suspected: '#d08b28',
  provisional: '#5767c9',
  reconstructed: '#8a5a9e',
  disputed: '#b83b3b',
};

export async function loadData(): Promise<AppData> {
  const [placesRows, eventsRows, flowsRows, countRows, sourceRows] = await Promise.all([
    csv(assetPath('/data/reference/places.csv')),
    csv(assetPath('/data/reference/events.csv')),
    csv(assetPath('/data/reference/flows.csv')),
    csv(assetPath('/data/reference/counts.csv')),
    csv(assetPath('/data/reference/sources.csv')),
  ]);

  const places: Place[] = placesRows.map((row) => ({
    place_id: row.place_id ?? '',
    name: row.name ?? '',
    country: row.country ?? '',
    admin1: row.admin1 ?? '',
    health_zone: row.health_zone ?? '',
    place_type: row.place_type ?? '',
    latitude: numberOrNull(row.latitude),
    longitude: numberOrNull(row.longitude),
    geo_precision: row.geo_precision ?? '',
    source_id: row.source_id ?? '',
    notes: row.notes ?? '',
  }));

  const events: Event[] = eventsRows
    .map((row) => ({
      event_id: row.event_id ?? '',
      date: row.date ?? '',
      date_end: row.date_end ?? '',
      place_id: row.place_id ?? '',
      event_type: row.event_type ?? '',
      headline: row.headline ?? '',
      fact_text: row.fact_text ?? '',
      quote: row.quote ?? '',
      confirmed_cases: numberOrNull(row.confirmed_cases),
      suspected_cases: numberOrNull(row.suspected_cases),
      confirmed_deaths: numberOrNull(row.confirmed_deaths),
      suspected_deaths: numberOrNull(row.suspected_deaths),
      contacts: numberOrNull(row.contacts),
      source_id: row.source_id ?? '',
      source_type: (row.source_type ?? 'analysis') as Event['source_type'],
      confidence: (row.confidence ?? 'medium') as Event['confidence'],
      data_status: asDataStatus(row.data_status ?? 'provisional'),
      display_priority: Number(row.display_priority || 99),
      display_tier: row.display_tier ?? 'secondary',
      map_layer: row.map_layer ?? 'clinical',
      timeline_group: row.timeline_group ?? 'silent_spread',
      update_status: row.update_status ?? 'active',
      notes: row.notes ?? '',
    }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.display_priority - b.display_priority);

  const flows: Flow[] = flowsRows.map((row) => ({
    flow_id: row.flow_id ?? '',
    date: row.date ?? '',
    date_end: row.date_end ?? '',
    from_place_id: row.from_place_id ?? '',
    to_place_id: row.to_place_id ?? '',
    flow_type: row.flow_type ?? '',
    status: row.status ?? '',
    weight: Number(row.weight || 1),
    source_id: row.source_id ?? '',
    confidence: (row.confidence ?? 'medium') as Flow['confidence'],
    data_status: asDataStatus(row.data_status ?? 'provisional'),
    notes: row.notes ?? '',
  }));

  const zoneCounts: ZoneCount[] = countRows.map((row) => ({
    count_id: row.count_id ?? '',
    date: row.date ?? '',
    entity_id: row.entity_id ?? '',
    entity_type: row.entity_type ?? '',
    confirmed_cases: numberOrNull(row.confirmed_cases),
    suspected_cases: numberOrNull(row.suspected_cases),
    confirmed_deaths: numberOrNull(row.confirmed_deaths),
    suspected_deaths: numberOrNull(row.suspected_deaths),
    contacts: numberOrNull(row.contacts),
    source_id: row.source_id ?? '',
    confidence: (row.confidence ?? 'medium') as ZoneCount['confidence'],
    data_status: asDataStatus(row.data_status ?? 'provisional'),
    notes: row.notes ?? '',
  }));

  const sources: Source[] = sourceRows.map((row) => ({
    source_id: row.source_id ?? '',
    title: row.title ?? '',
    publisher: row.publisher ?? '',
    author: row.author ?? '',
    published_at: row.published_at ?? '',
    url: row.url ?? '',
    source_type: (row.source_type ?? 'analysis') as Source['source_type'],
    access_status: row.access_status ?? '',
    notes: row.notes ?? '',
  }));

  return { places, events, flows, zoneCounts, sources };
}
