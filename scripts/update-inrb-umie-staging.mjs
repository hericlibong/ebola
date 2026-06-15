import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { csvFormat, csvParse } from 'd3-dsv';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const STAGING_DIR = join(ROOT, 'data/staging/inrb_umie');
const SNAPSHOT_DIR = join(STAGING_DIR, 'snapshots');
const REPORT_DIR = join(STAGING_DIR, 'reports');
const DEFAULT_CACHE_DIR = join(STAGING_DIR, '.cache/BDBV2026-Data');
const DEFAULT_REPO = 'https://github.com/INRB-UMIE/BDBV2026-Data.git';
const COUNTS_PATH = join(ROOT, 'public/data/reference/counts.csv');

const NATIONAL_SERIES = [
  {
    upstreamMetric: 'national_cumulative_confirmed_cases',
    mappedField: 'confirmed_cases',
    file: 'data/insp_sitrep/processed/insp_sitrep__national_cumulative_confirmed_cases__daily.csv',
  },
  {
    upstreamMetric: 'national_cumulative_suspected_cases',
    mappedField: 'suspected_cases',
    file: 'data/insp_sitrep/processed/insp_sitrep__national_cumulative_suspected_cases__daily.csv',
  },
  {
    upstreamMetric: 'national_cumulative_confirmed_deaths',
    mappedField: 'confirmed_deaths',
    file: 'data/insp_sitrep/processed/insp_sitrep__national_cumulative_confirmed_deaths__daily.csv',
  },
  {
    upstreamMetric: 'national_cumulative_suspected_deaths',
    mappedField: 'suspected_deaths',
    file: 'data/insp_sitrep/processed/insp_sitrep__national_cumulative_suspected_deaths__daily.csv',
  },
];

const args = process.argv.slice(2);
const options = {
  repo: DEFAULT_REPO,
  cacheDir: DEFAULT_CACHE_DIR,
  sourceDir: '',
  snapshotDate: new Date().toISOString().slice(0, 10),
  noFetch: false,
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--repo') options.repo = args[++i] ?? options.repo;
  else if (arg === '--cache-dir') options.cacheDir = resolve(args[++i] ?? options.cacheDir);
  else if (arg === '--source-dir') options.sourceDir = resolve(args[++i] ?? '');
  else if (arg === '--snapshot-date') options.snapshotDate = args[++i] ?? options.snapshotDate;
  else if (arg === '--no-fetch') options.noFetch = true;
  else if (arg === '--help') {
    console.log(`Usage:
  npm run update:inrb-umie:staging
  node scripts/update-inrb-umie-staging.mjs --source-dir /path/to/BDBV2026-Data --no-fetch

Options:
  --repo URL             Git repo to clone/fetch. Default: ${DEFAULT_REPO}
  --cache-dir PATH       Local cache for the external repo. Default: data/staging/inrb_umie/.cache/BDBV2026-Data
  --source-dir PATH      Use an existing checkout instead of the cache.
  --snapshot-date DATE   Date written in output filenames and rows. Default: today.
  --no-fetch             Do not clone, fetch or pull.
`);
    process.exit(0);
  } else {
    throw new Error(`Unknown argument: ${arg}`);
  }
}

const run = (command, commandArgs, cwd = ROOT, allowFailure = false) => {
  const result = spawnSync(command, commandArgs, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (!allowFailure && result.status !== 0) {
    throw new Error(
      `Command failed: ${command} ${commandArgs.join(' ')}\n${result.stderr || result.stdout}`,
    );
  }
  return result.stdout.trim();
};

const readCsv = async (path) => csvParse(await readFile(path, 'utf8'));
const isMissing = (value) => value == null || value === '' || value === 'ND';
const toComparable = (value) => (isMissing(value) ? null : Number(value));
const fmt = (value) => (value == null || value === '' ? 'missing' : String(value));
const short = (value) => (value ? value.slice(0, 7) : 'unknown');

async function ensureSourceDir() {
  if (options.sourceDir) {
    if (!existsSync(options.sourceDir)) throw new Error(`Source dir not found: ${options.sourceDir}`);
    return options.sourceDir;
  }

  if (!existsSync(options.cacheDir)) {
    if (options.noFetch) {
      throw new Error(`Cache dir not found and --no-fetch is set: ${options.cacheDir}`);
    }
    await mkdir(dirname(options.cacheDir), { recursive: true });
    run('git', ['clone', options.repo, options.cacheDir]);
  } else if (!options.noFetch) {
    run('git', ['fetch', '--all', '--prune'], options.cacheDir);
    const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options.cacheDir);
    run('git', ['pull', '--ff-only', 'origin', branch], options.cacheDir);
  }

  return options.cacheDir;
}

function gitValue(sourceDir, commandArgs) {
  const result = spawnSync('git', commandArgs, {
    cwd: sourceDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  return result.status === 0 ? result.stdout.trim() : '';
}

async function readManifest(sourceDir) {
  const manifestPath = join(sourceDir, 'build/manifest.json');
  if (!existsSync(manifestPath)) return {};
  return JSON.parse(await readFile(manifestPath, 'utf8'));
}

async function buildSnapshot(sourceDir, upstreamCommit, manifest) {
  const rows = [];
  const noteParts = [
    manifest.commit ? `build_manifest_commit=${manifest.commit}` : '',
    manifest.built_at ? `built_at=${manifest.built_at}` : '',
    'value_not_validated_for_counts',
  ].filter(Boolean);

  for (const series of NATIONAL_SERIES) {
    const sourcePath = join(sourceDir, series.file);
    if (!existsSync(sourcePath)) {
      throw new Error(`Required INRB-UMIE file not found: ${series.file}`);
    }

    const parsed = await readCsv(sourcePath);
    for (const row of parsed) {
      if (row.nom !== 'DRC') continue;
      rows.push({
        date: row.date,
        upstream_nom: row.nom,
        upstream_metric: series.upstreamMetric,
        upstream_value: row[series.upstreamMetric] ?? '',
        mapped_entity_id: 'drc_total',
        mapped_field: series.mappedField,
        upstream_file: series.file,
        upstream_commit: upstreamCommit,
        snapshot_date: options.snapshotDate,
        sitrep_id: '',
        import_status: 'staged',
        notes: noteParts.join('; '),
      });
    }
  }

  const fieldOrder = new Map(NATIONAL_SERIES.map((series, index) => [series.mappedField, index]));
  rows.sort((a, b) => (
    (fieldOrder.get(a.mapped_field) ?? 99) - (fieldOrder.get(b.mapped_field) ?? 99) ||
    a.date.localeCompare(b.date)
  ));

  return rows;
}

function pivotStaging(rows) {
  const byDate = new Map();
  for (const row of rows) {
    if (!byDate.has(row.date)) byDate.set(row.date, {});
    byDate.get(row.date)[row.mapped_field] = row.upstream_value;
  }
  return byDate;
}

function pivotCounts(rows) {
  const byDate = new Map();
  for (const row of rows) {
    if (row.entity_id !== 'drc_total' || row.data_status === 'disputed') continue;
    if (!byDate.has(row.date)) byDate.set(row.date, {});
    for (const field of NATIONAL_SERIES.map((series) => series.mappedField)) {
      byDate.get(row.date)[field] = row[field] ?? '';
    }
  }
  return byDate;
}

function detectDrops(stagingByDate) {
  const drops = [];
  const dates = [...stagingByDate.keys()].sort();
  for (const field of NATIONAL_SERIES.map((series) => series.mappedField)) {
    let previous = null;
    for (const date of dates) {
      const value = toComparable(stagingByDate.get(date)?.[field]);
      if (value == null) continue;
      if (previous && value < previous.value) {
        drops.push({ field, previousDate: previous.date, previousValue: previous.value, date, value, drop: previous.value - value });
      }
      previous = { date, value };
    }
  }
  return drops;
}

function markdownTable(headers, rows) {
  if (rows.length === 0) return '_Aucun._\n';
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.join(' | ')} |`),
    '',
  ].join('\n');
}

async function buildReport(snapshotPath, rows, upstreamCommit, manifest) {
  const counts = await readCsv(COUNTS_PATH);
  const stagingByDate = pivotStaging(rows);
  const countsByDate = pivotCounts(counts);
  const stagingDates = [...stagingByDate.keys()].sort();
  const countDates = [...countsByDate.keys()].sort();
  const allDates = [...new Set([...stagingDates, ...countDates])].sort();
  const fields = NATIONAL_SERIES.map((series) => series.mappedField);

  const differences = [];
  const missing = [];
  let exactMatches = 0;

  for (const date of allDates) {
    for (const field of fields) {
      const stagedRaw = stagingByDate.get(date)?.[field];
      const countRaw = countsByDate.get(date)?.[field];
      const staged = toComparable(stagedRaw);
      const current = toComparable(countRaw);
      if (staged == null) {
        if (stagingByDate.has(date) || countsByDate.has(date)) {
          missing.push([date, `\`${field}\``, stagingByDate.has(date) ? 'staging missing/ND' : 'no staging row', fmt(countRaw)]);
        }
        continue;
      }
      if (current == null) {
        differences.push([date, `\`${field}\``, String(stagedRaw), 'missing', 'value absent from counts.csv']);
      } else if (staged === current) {
        exactMatches += 1;
      } else {
        differences.push([date, `\`${field}\``, String(stagedRaw), String(countRaw), 'different value']);
      }
    }
  }

  const drops = detectDrops(stagingByDate);
  const coverage = fields.map((field) => [
    `\`${field}\``,
    String(rows.filter((row) => row.mapped_field === field).length),
  ]);

  const newDates = stagingDates.filter((date) => !countsByDate.has(date));
  const missingStagingDates = countDates.filter((date) => !stagingByDate.has(date));
  const relativeSnapshot = snapshotPath.replace(`${ROOT}/`, '');

  return `# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : \`${relativeSnapshot}\`
- Reference locale : \`public/data/reference/counts.csv\`
- Entite comparee : \`drc_total\`
- Commit upstream INRB-UMIE : \`${upstreamCommit}\`
- Build manifest : \`${manifest.commit ?? 'unknown'}\`, \`${manifest.built_at ?? 'unknown'}\`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : ${rows.length}
- Dates staging : ${stagingDates[0] ?? 'aucune'} -> ${stagingDates.at(-1) ?? 'aucune'} (${stagingDates.length} dates distinctes)
- Dates \`counts.csv\` pour \`drc_total\` : ${countDates[0] ?? 'aucune'} -> ${countDates.at(-1) ?? 'aucune'} (${countDates.length} dates distinctes)
- Correspondances exactes champ par champ : ${exactMatches}
- Ecarts ou absences dans \`counts.csv\` : ${differences.length}
- Valeurs manquantes / \`ND\` / lignes staging absentes : ${missing.length}
- Baisses detectees dans les series staging : ${drops.length}

## Couverture par metrique staging

${markdownTable(['Champ cible', 'Lignes'], coverage)}
## Dates nouvelles dans le staging

${newDates.length ? newDates.map((date) => `- ${date}`).join('\n') : '_Aucune._'}

## Dates presentes dans counts.csv mais absentes du staging

${missingStagingDates.length ? missingStagingDates.map((date) => `- ${date}`).join('\n') : '_Aucune._'}

## Ecarts et valeurs absentes dans counts.csv

${markdownTable(['Date', 'Champ', 'INRB-UMIE staging', 'counts.csv', 'Type'], differences)}
## Valeurs manquantes ou ND cote staging

${markdownTable(['Date', 'Champ', 'Staging', 'counts.csv'], missing)}
## Baisses de cumul detectees dans le staging

${markdownTable(
  ['Champ', 'Date precedente', 'Valeur precedente', 'Date suivante', 'Valeur suivante', 'Baisse'],
  drops.map((drop) => [
    `\`${drop.field}\``,
    drop.previousDate,
    String(drop.previousValue),
    drop.date,
    String(drop.value),
    String(drop.drop),
  ]),
)}
## Points de vigilance editoriale

- Les deces confirmes et les deces suspects restent deux series separees. Aucune ligne de ce rapport ne doit etre transformee en champ generique \`deaths\`.
- Les valeurs \`ND\` signifient non rapporte, pas zero.
- Les baisses des series suspectes peuvent correspondre a des reclassements, revisions ou changements de definition ; elles demandent une note avant integration.
- Les baisses des series confirmees doivent etre arbitrees avant toute reprise, sauf correction retroactive explicite.
- Les ecarts avec les donnees actuellement validees ne doivent pas etre resolus automatiquement. Ils doivent passer par validation humaine.

## Decision pour la suite

Ce rapport ne valide aucune ligne pour \`counts.csv\`. Si les ecarts sont acceptes, l'integration editoriale doit etre faite dans une etape separee.
`;
}

await mkdir(SNAPSHOT_DIR, { recursive: true });
await mkdir(REPORT_DIR, { recursive: true });

const sourceDir = await ensureSourceDir();
const upstreamCommit = short(gitValue(sourceDir, ['rev-parse', 'HEAD']));
const manifest = await readManifest(sourceDir);
const rows = await buildSnapshot(sourceDir, upstreamCommit, manifest);
const outputBase = `inrb_umie_${options.snapshotDate}_${upstreamCommit}`;
const snapshotPath = join(SNAPSHOT_DIR, `${outputBase}_national_counts.csv`);
const reportPath = join(REPORT_DIR, `${outputBase}_comparison.md`);

await writeFile(snapshotPath, `${csvFormat(rows)}\n`);
const report = await buildReport(snapshotPath, rows, upstreamCommit, manifest);
await writeFile(reportPath, report);

console.log(`INRB-UMIE staging snapshot written: ${snapshotPath.replace(`${ROOT}/`, '')}`);
console.log(`INRB-UMIE comparison report written: ${reportPath.replace(`${ROOT}/`, '')}`);
console.log('No changes were made to public/data/reference/counts.csv.');
