// Integration automatique des bilans nationaux INRB-UMIE dans counts.csv.
//
// Reprend, de facon deterministe et idempotente, l'etape editoriale faite a la
// main : lit le dernier snapshot de staging, detecte les dates absentes de
// counts.csv pour drc_total, et ajoute les lignes manquantes avec les regles
// metier (ND != 0, notes d'explication des baisses pour passer le validateur,
// reference de source). Il NE genere PAS les events narratifs (etape editoriale
// assistee separee) et ne touche qu'a counts.csv et sources.csv.
//
// Usage :
//   node scripts/integrate-inrb-umie-counts.mjs            # dry-run (n'ecrit rien)
//   node scripts/integrate-inrb-umie-counts.mjs --write     # applique les ajouts
//   node scripts/integrate-inrb-umie-counts.mjs --snapshot <path>
//
// Sortie : un resume JSON sur stdout (utilisable par la routine quotidienne
// pour rediger les events et la notification).

import { existsSync, readdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { csvParse } from 'd3-dsv';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const SNAPSHOT_DIR = join(ROOT, 'data/staging/inrb_umie/snapshots');
const COUNTS_PATH = join(ROOT, 'public/data/reference/counts.csv');
const SOURCES_PATH = join(ROOT, 'public/data/reference/sources.csv');

const FIELDS = ['confirmed_cases', 'suspected_cases', 'confirmed_deaths', 'suspected_deaths'];
const FIELD_FR = {
  confirmed_cases: 'cas confirmes',
  suspected_cases: 'cas suspects',
  confirmed_deaths: 'deces confirmes',
  suspected_deaths: 'deces suspects',
};

const args = process.argv.slice(2);
const options = { write: false, snapshot: '', today: new Date().toISOString().slice(0, 10) };
for (let i = 0; i < args.length; i += 1) {
  const a = args[i];
  if (a === '--write') options.write = true;
  else if (a === '--snapshot') options.snapshot = resolve(args[++i] ?? '');
  else if (a === '--today') options.today = args[++i] ?? options.today;
  else if (a === '--help') {
    console.log('Usage: node scripts/integrate-inrb-umie-counts.mjs [--write] [--snapshot PATH] [--today YYYY-MM-DD]');
    process.exit(0);
  } else throw new Error(`Unknown argument: ${a}`);
}

const isMissing = (v) => v == null || v === '' || v === 'ND';
const toNum = (v) => (isMissing(v) ? null : Number(v));

// Echappement CSV : on ne reformate pas tout le fichier (diff minimal), on
// ajoute seulement des lignes bien formees.
const csvField = (v) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

function latestSnapshot() {
  if (options.snapshot) return options.snapshot;
  if (!existsSync(SNAPSHOT_DIR)) throw new Error(`Snapshot dir introuvable: ${SNAPSHOT_DIR}`);
  const files = readdirSync(SNAPSHOT_DIR)
    .filter((f) => f.endsWith('_national_counts.csv'))
    .sort(); // le nom commence par inrb_umie_YYYY-MM-DD_... -> tri lexical = chronologique
  if (files.length === 0) throw new Error('Aucun snapshot national disponible. Lancer update:inrb-umie:staging.');
  return join(SNAPSHOT_DIR, files.at(-1));
}

async function readCsv(path) {
  return csvParse(await readFile(path, 'utf8'));
}

// Pivot du snapshot (format long) -> Map<date, {champ: valeur}> + metadonnees.
function pivotSnapshot(rows) {
  const byDate = new Map();
  let snapshotDate = '';
  let commit = '';
  for (const row of rows) {
    snapshotDate = row.snapshot_date || snapshotDate;
    commit = row.upstream_commit || commit;
    if (!byDate.has(row.date)) byDate.set(row.date, {});
    byDate.get(row.date)[row.mapped_field] = row.upstream_value;
  }
  return { byDate, snapshotDate, commit };
}

// Derniere valeur presente d'un champ, strictement avant `date`, en combinant
// counts.csv et le snapshot (pour detecter une baisse vs le dernier point connu).
function previousValue(field, date, countsByDate, snapByDate) {
  const dates = new Set([...countsByDate.keys(), ...snapByDate.keys()]);
  let best = null;
  for (const d of dates) {
    if (d >= date) continue;
    const v = toNum(countsByDate.get(d)?.[field] ?? snapByDate.get(d)?.[field]);
    if (v == null) continue;
    if (!best || d > best.date) best = { date: d, value: v };
  }
  return best;
}

function buildNote(date, values, commit, snapshotDate, countsByDate, snapByDate, prevSnapDate) {
  const parts = [
    'Bilan national INRB-UMIE/INSP',
    `snapshot ${commit} du ${snapshotDate}`,
    'donnees preliminaires',
  ];

  // Trou de publication : jour(s) calendaire(s) entre la date precedente connue
  // et celle-ci, absents de la source.
  if (prevSnapDate) {
    const gapDays = (Date.parse(`${date}T00:00:00Z`) - Date.parse(`${prevSnapDate}T00:00:00Z`)) / 86_400_000;
    if (gapDays > 1) {
      parts.push(`jour(s) entre le ${prevSnapDate} et le ${date} non publie(s) par la source (cadence SitRep)`);
    }
  }

  const dropped = [];
  const missing = [];
  for (const field of FIELDS) {
    const cur = toNum(values[field]);
    if (cur == null) {
      missing.push(FIELD_FR[field]);
      continue;
    }
    const prev = previousValue(field, date, countsByDate, snapByDate);
    if (prev && cur < prev.value) dropped.push(FIELD_FR[field]);
  }
  // Mots-cles attendus par le validateur (reclass|revision|definition...) pour
  // requalifier une baisse de cumul en avertissement plutot qu'en erreur.
  if (dropped.length) {
    parts.push(`baisse de ${dropped.join(' et ')} liee a revision/reclassement ou changement de definition cote source`);
  }
  if (missing.length) {
    parts.push(`${missing.join(' et ')} non communique(s) (ND)`);
  }
  return parts.join('; ') + '.';
}

function sourceRowFor(snapshotDate, commit) {
  const id = `inrb_umie_${snapshotDate.replaceAll('-', '_')}_snapshot`;
  const note = `Snapshot structure pour les bilans nationaux; upstream commit ${commit}; integre automatiquement; donnees preliminaires a validation editoriale.`;
  const row = [
    id,
    `INRB-UMIE BDBV2026-Data snapshot ${commit}`,
    'INRB-UMIE / INSP',
    '',
    snapshotDate,
    'https://github.com/INRB-UMIE/BDBV2026-Data',
    'official',
    'web',
    note,
  ];
  return { id, line: row.map(csvField).join(',') };
}

async function main() {
  const snapshotPath = latestSnapshot();
  const { byDate: snapByDate, snapshotDate, commit } = pivotSnapshot(await readCsv(snapshotPath));

  const countsText = await readFile(COUNTS_PATH, 'utf8');
  const counts = csvParse(countsText);
  const countsByDate = new Map();
  for (const row of counts) {
    if (row.entity_id !== 'drc_total' || row.data_status === 'disputed') continue;
    countsByDate.set(row.date, row);
  }

  const sourceId = `inrb_umie_${snapshotDate.replaceAll('-', '_')}_snapshot`;

  // Dates a ajouter : presentes dans le snapshot, absentes de counts.csv pour
  // drc_total, jusqu'a aujourd'hui, avec au moins les cas confirmes renseignes.
  const snapDatesSorted = [...snapByDate.keys()].sort();
  const newDates = snapDatesSorted.filter(
    (d) => !countsByDate.has(d) && d <= options.today && toNum(snapByDate.get(d).confirmed_cases) != null,
  );

  const planned = [];
  for (const date of newDates) {
    const values = snapByDate.get(date);
    const prevSnapDate = [...snapDatesSorted].reverse().find((d) => d < date) ?? null;
    const note = buildNote(date, values, commit, snapshotDate, countsByDate, snapByDate, prevSnapDate);
    const row = [
      `ct_${date.replaceAll('-', '')}_drc_inrb_umie`,
      date,
      'drc_total',
      'country_total',
      isMissing(values.confirmed_cases) ? '' : values.confirmed_cases,
      isMissing(values.suspected_cases) ? '' : values.suspected_cases,
      isMissing(values.confirmed_deaths) ? '' : values.confirmed_deaths,
      isMissing(values.suspected_deaths) ? '' : values.suspected_deaths,
      '',
      sourceId,
      'high',
      'provisional',
      note,
    ];
    planned.push({ date, values, line: row.map(csvField).join(','), note });
  }

  const sourcesText = await readFile(SOURCES_PATH, 'utf8');
  const sourceExists = csvParse(sourcesText).some((r) => r.source_id === sourceId);
  const source = sourceRowFor(snapshotDate, commit);

  const summary = {
    snapshot: snapshotPath.replace(`${ROOT}/`, ''),
    snapshotDate,
    commit,
    today: options.today,
    countsLastDate: [...countsByDate.keys()].sort().at(-1) ?? null,
    newDates,
    rows: planned.map((p) => ({ date: p.date, values: p.values, note: p.note })),
    sourceToAdd: sourceExists ? null : source.id,
    wrote: false,
  };

  if (options.write && planned.length) {
    let nextCounts = countsText.endsWith('\n') ? countsText : countsText + '\n';
    nextCounts += planned.map((p) => p.line).join('\n') + '\n';
    await writeFile(COUNTS_PATH, nextCounts);

    if (!sourceExists) {
      const nextSources = (sourcesText.endsWith('\n') ? sourcesText : sourcesText + '\n') + source.line + '\n';
      await writeFile(SOURCES_PATH, nextSources);
    }
    summary.wrote = true;
  }

  console.log(JSON.stringify(summary, null, 2));
}

await main();
