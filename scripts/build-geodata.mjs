// Prepare lightweight regional GeoJSON for the static editorial map.
// Source: Natural Earth (public domain). Run once: `node scripts/build-geodata.mjs`.
// Fetches NE layers, keeps only features that touch our region (and, for
// provinces/roads, a property filter), and writes small files to public/geo/.

import { writeFile, mkdir } from 'node:fs/promises';

const BASE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson';
const OUT = new URL('../public/geo/', import.meta.url);

// [minLon, minLat, maxLon, maxLat] — marge autour du cadre vue resserre
// (vue : [27.1, -2.2, 33.7, 2.8]) pour que les features atteignent les bords.
const REGION = [26.3, -3.8, 35.0, 4.6];

const walk = (coords, fn) => {
  if (typeof coords[0] === 'number') {
    fn(coords);
    return;
  }
  for (const c of coords) walk(c, fn);
};

const geomBbox = (geom) => {
  if (!geom || !geom.coordinates) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  walk(geom.coordinates, ([x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  return [minX, minY, maxX, maxY];
};

const overlaps = (a, b) => !(a[2] < b[0] || a[0] > b[2] || a[3] < b[1] || a[1] > b[3]);

const fetchJson = async (name) => {
  const res = await fetch(`${BASE}/${name}.geojson`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json();
};

const inRegion = (feature) => {
  const bb = geomBbox(feature.geometry);
  return bb && overlaps(bb, REGION);
};

// Arrondi des coordonnees (~100 m a 3 decimales, sous-pixel a notre echelle)
// + suppression des points consecutifs identiques. Reduit fortement le poids.
const DP = 3;
const factor = 10 ** DP;
const roundCoords = (coords) => {
  if (typeof coords[0] === 'number') {
    return [Math.round(coords[0] * factor) / factor, Math.round(coords[1] * factor) / factor];
  }
  const mapped = coords.map(roundCoords);
  if (typeof mapped[0]?.[0] === 'number') {
    return mapped.filter((p, i) => i === 0 || p[0] !== mapped[i - 1][0] || p[1] !== mapped[i - 1][1]);
  }
  return mapped;
};
const roundGeometry = (geom) =>
  geom && geom.coordinates ? { ...geom, coordinates: roundCoords(geom.coordinates) } : geom;

// Keep only selected properties + round geometry to shrink output.
const slim = (feature, keys) => ({
  type: 'Feature',
  properties: Object.fromEntries(keys.map((k) => [k, feature.properties?.[k]]).filter(([, v]) => v != null)),
  geometry: roundGeometry(feature.geometry),
});

const collection = (features) => ({ type: 'FeatureCollection', features });

const save = async (name, fc) => {
  const json = JSON.stringify(fc);
  await writeFile(new URL(`${name}.json`, OUT), json);
  console.log(`  ${name}.json — ${fc.features.length} features, ${(json.length / 1024).toFixed(0)} KB`);
};

await mkdir(OUT, { recursive: true });
console.log('Telechargement et filtrage Natural Earth...');

// 1. Pays voisins (frontieres + libelles), 50m.
const countries = await fetchJson('ne_50m_admin_0_countries');
await save(
  'countries',
  collection(countries.features.filter(inRegion).map((f) => slim(f, ['NAME', 'NAME_FR', 'NAME_LONG']))),
);

// 2. Provinces RDC (admin1) actuelles via geoBoundaries (Natural Earth 10m
// utilise encore les anciennes provinces et n'a pas l'Ituri). Filtrees a la
// region. Servi via l'URL media LFS de GitHub.
const provincesUrl =
  'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/COD/ADM1/geoBoundaries-COD-ADM1.geojson';
const provincesRes = await fetch(provincesUrl);
if (!provincesRes.ok) throw new Error(`provinces: HTTP ${provincesRes.status}`);
const provinces = await provincesRes.json();
await save(
  'provinces',
  collection(provinces.features.filter(inRegion).map((f) => slim(f, ['shapeName']))),
);

// 3. Lacs, 10m.
const lakes = await fetchJson('ne_10m_lakes');
await save('lakes', collection(lakes.features.filter(inRegion).map((f) => slim(f, ['name', 'name_fr']))));

// 4. Fleuves, 10m.
const rivers = await fetchJson('ne_10m_rivers_lake_centerlines');
await save('rivers', collection(rivers.features.filter(inRegion).map((f) => slim(f, ['name']))));

// 5. Grands axes routiers, 10m. Dans cette region NE ne fournit que des types
// "Road"/"Unknown" sans libelles ; on selectionne les grands axes via le
// scalerank (<= 4 = les plus structurants), pour rester sobre.
const roads = await fetchJson('ne_10m_roads');
await save(
  'roads',
  collection(
    roads.features
      .filter((f) => inRegion(f) && Number(f.properties?.scalerank) <= 4)
      .map((f) => slim(f, ['scalerank'])),
  ),
);

// 6. Encart Afrique : silhouette du continent, 110m (basse def).
const world = await fetchJson('ne_110m_admin_0_countries');
await save(
  'africa',
  collection(
    world.features
      .filter((f) => f.properties?.CONTINENT === 'Africa')
      .map((f) => slim(f, ['NAME'])),
  ),
);

console.log('Termine. Fichiers dans public/geo/.');
