import { geoPath, geoTransform } from 'd3-geo';
import { json } from 'd3-fetch';
import { assetPath } from './assetPath';
import { escapeHtml } from './html';
import { phaseColor } from './phases';
import type { AppData, Event, Place } from './types';

// --- Cadre geographique (bbox de la vue : Soudan du Sud -> nord Tanzanie) ---
const BBOX = { minLon: 27.0, minLat: -3.0, maxLon: 34.4, maxLat: 3.9 };
const SCALE = 135; // px par degre, identique sur les deux axes -> pas de distorsion
const W = (BBOX.maxLon - BBOX.minLon) * SCALE;
const H = (BBOX.maxLat - BBOX.minLat) * SCALE;

// Projection plate-carree manuelle : lineaire en lon/lat, calee sur la bbox.
// S'aligne exactement avec l'image hillshade exportee en EPSG:4326.
const project = (lon: number, lat: number): [number, number] => [
  ((lon - BBOX.minLon) / (BBOX.maxLon - BBOX.minLon)) * W,
  ((BBOX.maxLat - lat) / (BBOX.maxLat - BBOX.minLat)) * H,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projection: any = geoTransform({
  point(lon: number, lat: number) {
    const [x, y] = project(lon, lat);
    this.stream.point(x, y);
  },
});
const path = geoPath(projection);

// Libelles des pays : positions manuelles (les centroides de grands pays
// partiellement hors cadre tomberaient mal). Style spacie facon NYT.
const COUNTRY_LABELS: { lon: number; lat: number; lines: string[] }[] = [
  { lon: 28.2, lat: -0.7, lines: ['Republique', 'democratique', 'du Congo'] },
  { lon: 32.4, lat: 1.7, lines: ['Ouganda'] },
  { lon: 30.0, lat: 3.5, lines: ['Soudan du Sud'] },
  { lon: 29.7, lat: -2.5, lines: ['Rwanda'] },
  { lon: 30.7, lat: -2.75, lines: ['Tanzanie'] },
];

// Placement fin des libelles de lieux (cluster Ituri dense). dx/dy en unites
// viewBox ; `lon`/`lat` re-situent un point (Rwampara n'a qu'une coord proxy
// confondue avec Bunia : on l'ecarte legerement pour la rendre lisible).
type LabelCfg = { anchor: 'start' | 'middle' | 'end'; dx: number; dy: number; lon?: number; lat?: number };
const PLACE_LABEL: Record<string, LabelCfg> = {
  bunia: { anchor: 'start', dx: 13, dy: 5 },
  mongbwalu: { anchor: 'end', dx: -13, dy: 1 },
  nyankunde: { anchor: 'end', dx: -13, dy: 6 },
  rwampara: { anchor: 'start', dx: 13, dy: 6, lon: 30.46, lat: 1.4 },
  goma: { anchor: 'start', dx: 13, dy: 5 },
  kampala: { anchor: 'start', dx: 13, dy: 5 },
};
const DEFAULT_LABEL: LabelCfg = { anchor: 'start', dx: 13, dy: 5 };

const NSVG = 'http://www.w3.org/2000/svg';
const el = (name: string, attrs: Record<string, string | number> = {}): SVGElement => {
  const node = document.createElementNS(NSVG, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
};

type FeatureCollection = { type: 'FeatureCollection'; features: unknown[] };
let geo: Record<string, FeatureCollection> | null = null;
let overlay: SVGGElement | null = null;

async function loadGeo(): Promise<Record<string, FeatureCollection>> {
  if (geo) return geo;
  const names = ['countries', 'provinces', 'lakes', 'rivers', 'roads', 'africa'];
  const loaded = await Promise.all(names.map((n) => json<FeatureCollection>(assetPath(`/geo/${n}.json`))));
  geo = Object.fromEntries(names.map((n, i) => [n, loaded[i]!])) as Record<string, FeatureCollection>;
  return geo;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const d = (obj: any): string => path(obj) ?? '';

function buildInset(): string {
  if (!geo) return '';
  const iw = 132;
  const ih = 138;
  const aMinLon = -18;
  const aMaxLon = 52;
  const aMinLat = -35;
  const aMaxLat = 38;
  const p = (lon: number, lat: number): [number, number] => [
    ((lon - aMinLon) / (aMaxLon - aMinLon)) * iw,
    ((aMaxLat - lat) / (aMaxLat - aMinLat)) * ih,
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ap: any = geoTransform({
    point(lon: number, lat: number) {
      const [x, y] = p(lon, lat);
      this.stream.point(x, y);
    },
  });
  const apath = geoPath(ap);
  const africaD = apath(geo.africa as never) ?? '';
  const [rx, ry] = p(BBOX.minLon, BBOX.maxLat);
  const [rx2, ry2] = p(BBOX.maxLon, BBOX.minLat);
  const [kx, ky] = p(15.3, -4.3); // Kinshasa
  return `
    <svg class="map-inset" viewBox="0 0 ${iw} ${ih + 16}" aria-hidden="true">
      <path d="${africaD}" class="inset-land" />
      <rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${(rx2 - rx).toFixed(1)}" height="${(ry2 - ry).toFixed(1)}" class="inset-frame" />
      <circle cx="${kx.toFixed(1)}" cy="${ky.toFixed(1)}" r="2" class="inset-dot" />
      <text x="${(kx + 4).toFixed(1)}" y="${(ky + 3).toFixed(1)}" class="inset-city">Kinshasa</text>
      <text x="4" y="${ih + 12}" class="inset-caption">Zone de detail</text>
    </svg>`;
}

function buildScaleBar(): string {
  // 100 km ~ 0.9 deg de longitude a l'equateur -> en unites viewBox.
  const kmPerDeg = 111;
  const pxPerDeg = W / (BBOX.maxLon - BBOX.minLon);
  const len = (100 / kmPerDeg) * pxPerDeg;
  const x = W - len - 30;
  const y = H - 34;
  return `
    <g class="map-scale">
      <line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" />
      <text x="${x + len / 2}" y="${y - 6}">100 km</text>
    </g>`;
}

function buildBasemap(): string {
  if (!geo) return '';
  const ituri = (geo.provinces.features as { properties?: { shapeName?: string } }[]).find(
    (f) => f.properties?.shapeName === 'Ituri',
  );
  const ituriD = ituri ? d(ituri) : '';

  const countryLabels = COUNTRY_LABELS.map((c) => {
    const [x, y] = project(c.lon, c.lat);
    const tspans = c.lines
      .map((line, i) => `<tspan x="${x.toFixed(1)}" dy="${i === 0 ? 0 : 20}">${escapeHtml(line)}</tspan>`)
      .join('');
    return `<text class="country-label" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${tspans}</text>`;
  }).join('');

  const ituriLabel = ituri
    ? (() => {
        const [cx, cy] = path.centroid(ituri as never);
        return `<text class="province-label" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}">Province d'Ituri</text>`;
      })()
    : '';

  return `
    <rect x="0" y="0" width="${W}" height="${H}" class="map-base" />
    <image href="${assetPath('/geo/hillshade.png')}" x="0" y="0" width="${W}" height="${H}" class="map-relief" />
    <path d="${ituriD}" class="province-focus" />
    <path d="${d(geo.roads)}" class="map-roads" />
    <path d="${d(geo.rivers)}" class="map-rivers" />
    <path d="${d(geo.lakes)}" class="map-lakes" />
    <path d="${d(geo.provinces)}" class="province-border" />
    <path d="${d(geo.countries)}" class="country-border" />
    ${countryLabels}
    ${ituriLabel}
    ${buildScaleBar()}`;
}

// Lieux cites dans la timeline (references par un evenement + coordonnees).
function citedPlaces(data: AppData): Place[] {
  const referenced = new Set(data.events.map((e) => e.place_id));
  return data.places.filter(
    (p) => referenced.has(p.place_id) && p.latitude !== null && p.longitude !== null,
  );
}

// Evenement representatif d'un lieu (priorite la plus forte).
function leadEvent(data: AppData, placeId: string): Event | undefined {
  return data.events
    .filter((e) => e.place_id === placeId)
    .sort((a, b) => a.display_priority - b.display_priority)[0];
}

// C2 — cas confirmes par zone de sante. La ventilation par zone n'existe et
// n'est fiable qu'au 20 mai (point INSP). On l'affiche donc UNIQUEMENT a la date
// exacte du 20 mai (photographie qui ponctue la timeline), pas apres : les
// chiffres nationaux evoluent ensuite, mais pas la repartition par ville.
function zoneCases(data: AppData, placeId: string, date: string): number | null {
  const row = data.zoneCounts.find(
    (c) =>
      c.entity_id === placeId &&
      c.entity_type === 'health_zone' &&
      c.confirmed_cases != null &&
      c.date === date,
  );
  return row?.confirmed_cases ?? null;
}

// Rayon proportionnel a la SURFACE (aire ∝ cas), pas au rayon.
const bubbleRadius = (cases: number): number => 4 + 4.2 * Math.sqrt(cases);

function caseLegendMarkup(): string {
  return `
    <rect class="case-legend-bg" x="8" y="10" width="150" height="92" rx="2" />
    <text class="case-legend-title" x="18" y="30">Cas confirmes</text>
    <text class="case-legend-sub" x="18" y="45">par zone, au 20 mai</text>
    <circle class="case-bubble" cx="42" cy="75" r="${bubbleRadius(25).toFixed(1)}" />
    <text class="case-legend-num" x="42" y="75">25</text>
    <circle class="case-bubble" cx="112" cy="75" r="${bubbleRadius(5).toFixed(1)}" />
    <text class="case-legend-num" x="112" y="75">5</text>`;
}

export async function initStaticMap(container: HTMLElement): Promise<void> {
  await loadGeo();
  container.innerHTML = `
    <svg class="static-map" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte de l'est de la RDC et de l'Ouganda">
      <g class="map-basemap">${buildBasemap()}</g>
      <g class="map-overlay"></g>
    </svg>
    ${buildInset()}`;
  overlay = container.querySelector<SVGGElement>('.map-overlay');
}

export function renderStaticMap(
  data: AppData,
  activeEvent: Event,
  activePhase: string | null,
  onSelect: (event: Event) => void,
): void {
  if (!overlay) return;
  overlay.replaceChildren();

  const places = citedPlaces(data);

  // C2 — bulles proportionnelles aux cas par zone (instantane du 20 mai),
  // dessinees AVANT les points pour rester en arriere-plan.
  let bubbles = 0;
  places.forEach((place) => {
    const cases = zoneCases(data, place.place_id, activeEvent.date);
    if (cases == null) return;
    const cfg = PLACE_LABEL[place.place_id] ?? DEFAULT_LABEL;
    const [x, y] = project(cfg.lon ?? (place.longitude as number), cfg.lat ?? (place.latitude as number));
    const placePhases = new Set(
      data.events.filter((e) => e.place_id === place.place_id).map((e) => e.timeline_group),
    );
    const dimmed = activePhase !== null && !placePhases.has(activePhase);
    overlay!.appendChild(
      el('circle', {
        class: `case-bubble ${dimmed ? 'is-dimmed' : ''}`,
        cx: x.toFixed(1),
        cy: y.toFixed(1),
        r: bubbleRadius(cases).toFixed(1),
      }),
    );
    bubbles += 1;
  });
  if (bubbles > 0) {
    const legend = el('g', { class: 'case-legend' });
    legend.innerHTML = caseLegendMarkup();
    overlay.appendChild(legend);
  }

  places.forEach((place) => {
    const lead = leadEvent(data, place.place_id);
    if (!lead) return;
    const cfg = PLACE_LABEL[place.place_id] ?? DEFAULT_LABEL;
    const lon = cfg.lon ?? (place.longitude as number);
    const lat = cfg.lat ?? (place.latitude as number);
    const [x, y] = project(lon, lat);
    const isActive = activeEvent.place_id === place.place_id;
    const placePhases = new Set(
      data.events.filter((e) => e.place_id === place.place_id).map((e) => e.timeline_group),
    );
    const dimmed = activePhase !== null && !placePhases.has(activePhase);

    const group = el('g', {
      class: `map-place ${isActive ? 'is-active' : ''} ${dimmed ? 'is-dimmed' : ''}`,
      transform: `translate(${x.toFixed(1)},${y.toFixed(1)})`,
      role: 'button',
      tabindex: '0',
    });
    if (activePhase !== null && placePhases.has(activePhase)) {
      group.style.setProperty('--phase-color', phaseColor(activePhase));
    }
    group.appendChild(el('circle', { class: 'place-pin', r: isActive ? 9 : 6 }));
    const label = el('text', { class: 'place-name', x: cfg.dx, y: cfg.dy, 'text-anchor': cfg.anchor });
    label.textContent = place.name;
    group.appendChild(label);
    group.addEventListener('click', () => onSelect(lead));
    group.addEventListener('keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Enter') onSelect(lead);
    });
    overlay!.appendChild(group);
  });
}
