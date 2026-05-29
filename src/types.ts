export type Confidence = 'high' | 'medium' | 'low';

export type SourceType =
  | 'official'
  | 'media'
  | 'analysis'
  | 'humanitarian'
  | 'scientific';

export type DataStatus =
  | 'confirmed'
  | 'suspected'
  | 'provisional'
  | 'reconstructed'
  | 'disputed';

export interface Place {
  place_id: string;
  name: string;
  country: string;
  admin1: string;
  health_zone: string;
  place_type: string;
  latitude: number | null;
  longitude: number | null;
  geo_precision: string;
  source_id: string;
  notes: string;
}

export interface Event {
  event_id: string;
  date: string;
  date_end: string;
  place_id: string;
  event_type: string;
  headline: string;
  fact_text: string;
  quote: string;
  confirmed_cases: number | null;
  suspected_cases: number | null;
  confirmed_deaths: number | null;
  suspected_deaths: number | null;
  contacts: number | null;
  source_id: string;
  source_type: SourceType;
  confidence: Confidence;
  data_status: DataStatus;
  display_priority: number;
  display_tier: string;
  map_layer: string;
  timeline_group: string;
  update_status: string;
  notes: string;
}

export interface Flow {
  flow_id: string;
  date: string;
  date_end: string;
  from_place_id: string;
  to_place_id: string;
  flow_type: string;
  status: string;
  weight: number;
  source_id: string;
  confidence: Confidence;
  data_status: DataStatus;
  notes: string;
}

export interface ZoneCount {
  count_id: string;
  date: string;
  entity_id: string;
  entity_type: string;
  confirmed_cases: number | null;
  suspected_cases: number | null;
  confirmed_deaths: number | null;
  suspected_deaths: number | null;
  contacts: number | null;
  source_id: string;
  confidence: Confidence;
  data_status: DataStatus;
  notes: string;
}

export interface Source {
  source_id: string;
  title: string;
  publisher: string;
  author: string;
  published_at: string;
  url: string;
  source_type: SourceType;
  access_status: string;
  notes: string;
}

export interface AppData {
  places: Place[];
  events: Event[];
  flows: Flow[];
  zoneCounts: ZoneCount[];
  sources: Source[];
}
