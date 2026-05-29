import maplibregl, { type Map, type Marker, type Popup, type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { statusColor } from './data';
import { escapeHtml } from './html';
import type { AppData, DataStatus, Event, Place, ZoneCount } from './types';

const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
  ],
};

let activeMarker: Marker | null = null;
let activePopup: Popup | null = null;

const hasCoordinates = (place: Place | undefined): place is Place & { latitude: number; longitude: number } =>
  Boolean(place && place.latitude !== null && place.longitude !== null);

const statusLabels: Record<DataStatus, string> = {
  confirmed: 'Confirme',
  suspected: 'Suspect',
  provisional: 'Provisoire',
  reconstructed: 'Reconstruit',
  disputed: 'Divergent',
};

const confidenceLabels: Record<Event['confidence'], string> = {
  high: 'certitude elevee',
  medium: 'certitude moyenne',
  low: 'certitude faible',
};

const latestCountForPlace = (counts: ZoneCount[], placeId: string, date: string): ZoneCount | undefined =>
  [...counts]
    .filter((count) => count.entity_id === placeId && count.date <= date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

const markerSize = (count: ZoneCount | undefined): number => {
  if (count?.confirmed_cases) return Math.max(24, Math.min(64, 18 + Math.sqrt(count.confirmed_cases) * 8));
  return 28;
};

const sourceLabel = (data: AppData, event: Event): string => {
  const source = data.sources.find((item) => item.source_id === event.source_id);
  return source ? source.publisher : event.source_id;
};

const tooltipHtml = (data: AppData, event: Event, place: Place): string => `
  <article class="event-tooltip">
    <p class="tooltip-date">${escapeHtml(event.date_end ? `${event.date} - ${event.date_end}` : event.date)}</p>
    <h2>${escapeHtml(place.name)}</h2>
    <p class="tooltip-status is-${event.data_status}">${statusLabels[event.data_status]} - ${confidenceLabels[event.confidence]}</p>
    <p>${escapeHtml(event.fact_text)}</p>
    <footer>${escapeHtml(sourceLabel(data, event))}</footer>
  </article>
`;

const renderActiveMarker = (map: Map, data: AppData, activeEvent: Event, onSelect: (event: Event) => void): void => {
  activeMarker?.remove();
  activePopup?.remove();
  activeMarker = null;
  activePopup = null;

  const place = data.places.find((item) => item.place_id === activeEvent.place_id);
  if (!hasCoordinates(place)) return;

  const count = latestCountForPlace(data.zoneCounts, place.place_id, activeEvent.date);
  const size = markerSize(count);
  const markerElement = document.createElement('button');
  markerElement.className = `place-marker is-${activeEvent.data_status} is-active`;
  markerElement.type = 'button';
  markerElement.style.setProperty('--marker-color', statusColor[activeEvent.data_status]);
  markerElement.style.setProperty('--bubble-size', `${size}px`);
  markerElement.innerHTML = `
    <span class="case-bubble">${count?.confirmed_cases ?? ''}</span>
    <span class="place-dot"></span>
    <span class="place-label">${escapeHtml(place.name)}</span>
  `;
  markerElement.addEventListener('click', () => onSelect(activeEvent));

  activePopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 18,
    maxWidth: '300px',
  }).setHTML(tooltipHtml(data, activeEvent, place));

  markerElement.addEventListener('mouseenter', () => {
    if (!activePopup) return;
    activePopup.setLngLat([place.longitude, place.latitude]).addTo(map);
  });
  markerElement.addEventListener('mouseleave', () => activePopup?.remove());

  activeMarker = new maplibregl.Marker({ element: markerElement, anchor: 'left' })
    .setLngLat([place.longitude, place.latitude])
    .addTo(map);
};

export function initMap(
  container: HTMLElement,
  data: AppData,
  activeEvent: Event,
  onSelect: (event: Event) => void,
): Map {
  const map = new maplibregl.Map({
    container,
    style: mapStyle,
    center: [30.8, 0.7],
    zoom: 5.45,
    attributionControl: false,
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

  map.on('load', () => {
    renderActiveMarker(map, data, activeEvent, onSelect);
  });

  return map;
}

export function updateMap(map: Map, data: AppData, activeEvent: Event, onSelect: (event: Event) => void): void {
  renderActiveMarker(map, data, activeEvent, onSelect);

  const place = data.places.find((item) => item.place_id === activeEvent.place_id);
  if (!hasCoordinates(place)) return;

  map.flyTo({
    center: [place.longitude, place.latitude],
    zoom: activeEvent.timeline_group === 'cross_border_control' ? 5.8 : 7,
    duration: 850,
    essential: true,
  });
}
