import type { AppData, Event, ZoneCount } from './types';
import { escapeHtml } from './html';
import { phaseLabel } from './phases';

const MONTHS_FR = [
  'janv.', 'fevr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.',
];
const shortDateFr = (iso: string): string => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS_FR[Number(m[2]) - 1] ?? ''}` : iso;
};
const toDay = (iso: string): number => Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);

// Dernier bilan national RDC connu a la date de l'evenement (ou avant).
// On ecarte les bilans "disputed". Avant le 15 mai, aucun bilan n'existe.
const latestDrcTally = (counts: ZoneCount[], date: string): ZoneCount | undefined => {
  const candidates = counts.filter(
    (count) =>
      count.entity_id === 'drc_total' && count.data_status !== 'disputed' && count.date <= date,
  );
  if (candidates.length === 0) return undefined;
  const maxDate = candidates.reduce((max, count) => (count.date > max ? count.date : max), '');
  const sameDate = candidates.filter((count) => count.date === maxDate);
  return (
    sameDate.find((count) => count.suspected_cases !== null || count.confirmed_cases !== null) ??
    sameDate[0]
  );
};

// Photographie des cas confirmes par zone de sante. Fiable uniquement au 20 mai
// (point INSP) : affichee SEULEMENT a cette date exacte, comme une photographie
// ponctuelle qui rythme la timeline. Pas de persistance ensuite (les chiffres
// par ville n'evoluent pas dans nos sources, contrairement au total national).
function zoneBreakdown(
  data: AppData,
  date: string,
): { date: string; items: { name: string; cases: number }[] } | null {
  const rows = data.zoneCounts.filter(
    (c) => c.entity_type === 'health_zone' && c.confirmed_cases != null && c.date === date,
  );
  if (rows.length === 0) return null;
  const items = rows
    .map((c) => ({
      name: data.places.find((p) => p.place_id === c.entity_id)?.name ?? c.entity_id,
      cases: c.confirmed_cases as number,
    }))
    .sort((a, b) => b.cases - a.cases);
  return { date, items };
}

// --- Courbe d'evolution nationale (total RDC dans le temps) ---
// Distincte de la photo par ville : ici c'est la PROGRESSION du total national.
type DrcField = 'confirmed_cases' | 'suspected_cases' | 'confirmed_deaths' | 'suspected_deaths';

function drcSeries(data: AppData, field: DrcField): { day: number; value: number }[] {
  const byDate = new Map<string, number>();
  let lastValue: number | null = null;
  data.zoneCounts
    .filter((c) => c.entity_id === 'drc_total' && c.data_status !== 'disputed')
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((c) => {
      if (c[field] != null) {
        lastValue = c[field];
      }
      if (lastValue != null) {
        byDate.set(c.date, lastValue);
      }
    });
  return [...byDate.entries()]
    .map(([date, value]) => ({ day: toDay(date), value }))
    .sort((a, b) => a.day - b.day);
}

function evolutionCurveSvg(data: AppData, selectedDate: string): string {
  const confirmedCases = drcSeries(data, 'confirmed_cases');
  const suspectedCases = drcSeries(data, 'suspected_cases');
  const confirmedDeaths = drcSeries(data, 'confirmed_deaths');
  const suspectedDeaths = drcSeries(data, 'suspected_deaths');
  const all = [...confirmedCases, ...suspectedCases, ...confirmedDeaths, ...suspectedDeaths];
  if (all.length === 0) return '';

  const minDay = Math.min(...all.map((p) => p.day));
  const maxDay = Math.max(...all.map((p) => p.day));
  const selDay = toDay(selectedDate);
  if (selDay < minDay) return '';
  const yMax = Math.ceil(Math.max(...all.map((p) => p.value)) / 200) * 200;

  const W = 300, H = 118, padL = 8, padR = 8, padT = 10, padB = 22;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const baseY = padT + plotH;
  const x = (d: number): number => padL + (maxDay === minDay ? 0 : (d - minDay) / (maxDay - minDay)) * plotW;
  const y = (v: number): number => padT + (1 - v / yMax) * plotH;

  const line = (pts: { day: number; value: number }[], cls: string): string => {
    const clipped = pts.filter((p) => p.day <= selDay);
    if (clipped.length === 0) return '';
    const d = clipped.map((p) => `${x(p.day).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
    const last = clipped[clipped.length - 1]!;
    return (
      `<polyline class="evo-line ${cls}" points="${d}" />` +
      `<circle class="evo-dot ${cls}" cx="${x(last.day).toFixed(1)}" cy="${y(last.value).toFixed(1)}" r="2.6" />`
    );
  };

  const selX = x(Math.min(selDay, maxDay)).toFixed(1);
  const minIso = new Date(minDay * 86_400_000).toISOString().slice(0, 10);
  const maxIso = new Date(maxDay * 86_400_000).toISOString().slice(0, 10);

  return `
    <svg class="evo-curve" viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolution des cas et deces confirmes et suspects en RDC">
      <line class="evo-axis" x1="${padL}" y1="${baseY}" x2="${W - padR}" y2="${baseY}" />
      <line class="evo-now" x1="${selX}" y1="${padT}" x2="${selX}" y2="${baseY}" />
      ${line(suspectedCases, 'evo-suspected')}
      ${line(confirmedCases, 'evo-confirmed')}
      ${line(suspectedDeaths, 'evo-suspected-deaths')}
      ${line(confirmedDeaths, 'evo-deaths')}
      <text class="evo-axis-label" x="${padL}" y="${padT + 7}">${yMax}</text>
      <text class="evo-axis-label" x="${padL}" y="${H - 7}">${escapeHtml(shortDateFr(minIso))}</text>
      <text class="evo-axis-label" x="${W - padR}" y="${H - 7}" text-anchor="end">${escapeHtml(shortDateFr(maxIso))}</text>
    </svg>
    <div class="evo-legend">
      <span class="evo-key evo-confirmed">cas confirmes</span>
      <span class="evo-key evo-suspected">cas suspects</span>
      <span class="evo-key evo-deaths">deces confirmes</span>
      <span class="evo-key evo-suspected-deaths">deces suspects</span>
    </div>`;
}

export function renderStoryPanel(container: HTMLElement, data: AppData, event: Event): void {
  const period = event.date_end ? `${event.date} au ${event.date_end}` : event.date;
  const place = data.places.find((item) => item.place_id === event.place_id);
  const source = data.sources.find((item) => item.source_id === event.source_id);

  const tally = latestDrcTally(data.zoneCounts, event.date);
  // Toujours distinguer les types : confirmes / suspects pour les cas, et
  // deces confirmes / deces suspects separement. Ne jamais fondre les deces en
  // un seul chiffre (sinon on lit de fausses baisses quand le type change).
  const figure = tally
    ? [
        tally.confirmed_cases != null ? `<strong>${tally.confirmed_cases}</strong> cas confirmes` : '',
        tally.suspected_cases != null ? `<strong>${tally.suspected_cases}</strong> suspects` : '',
        tally.confirmed_deaths != null ? `<strong>${tally.confirmed_deaths}</strong> deces confirmes` : '',
        tally.suspected_deaths != null ? `<strong>${tally.suspected_deaths}</strong> deces suspects` : '',
      ]
        .filter(Boolean)
        .join(' &middot; ')
    : '';

  // Photo ponctuelle par ville (uniquement au 20 mai).
  const breakdown = zoneBreakdown(data, event.date);
  const breakdownHtml =
    breakdown && breakdown.items.length > 0
      ? `<p class="tally-zones"><span class="tally-zones-label">Cas confirmes par zone, au ${escapeHtml(breakdown.date)} :</span> ${breakdown.items
          .map((z) => `${escapeHtml(z.name)} <strong>${z.cases}</strong>`)
          .join(', ')}.</p>`
      : '';

  const tallyHtml = tally
    ? `
        <div class="tally">
          <p class="tally-label">Evolution nationale RDC</p>
          ${evolutionCurveSvg(data, event.date)}
          <p class="tally-figure">Au ${escapeHtml(tally.date)} : ${figure}</p>
          ${breakdownHtml}
          <p class="tally-note">Si un chiffre n'est pas publie a une date, la courbe conserve la derniere mesure connue. Les revisions et changements de perimetre restent notes dans les donnees.</p>
        </div>`
    : '';

  container.innerHTML = `
    <p class="eyebrow">${escapeHtml(phaseLabel(event.timeline_group))} - ${escapeHtml(period)}</p>
    <h1>${escapeHtml(event.headline)}</h1>
    <p class="kicker">${escapeHtml(place ? `${place.name}, ${place.country}` : 'Bilan ou contexte non cartographique')}</p>
    <p class="story-description">${escapeHtml(event.fact_text)}</p>
    ${event.quote ? `<blockquote>${escapeHtml(event.quote)}</blockquote>` : ''}
    ${tallyHtml}
    <p class="source-line">Source : ${escapeHtml(source ? `${source.publisher} - ${source.title}` : event.source_id)}</p>
  `;
}
