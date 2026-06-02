import type { AppData, Event, ZoneCount } from './types';
import { escapeHtml } from './html';
import { phaseLabel } from './phases';

const formatMetric = (label: string, value: number | null): string => {
  if (value === null) return '';
  return `<span><strong>${value}</strong>${escapeHtml(label)}</span>`;
};

// Dernier bilan national RDC connu a la date de l'evenement (ou avant).
// On ecarte les bilans marques "disputed" pour ne pas afficher de chiffres
// contradictoires. Avant le 15 mai, aucun bilan n'existe : renvoie undefined.
const latestDrcTally = (counts: ZoneCount[], date: string): ZoneCount | undefined => {
  const candidates = counts.filter(
    (count) =>
      count.entity_id === 'drc_total' &&
      count.data_status !== 'disputed' &&
      count.date <= date,
  );
  if (candidates.length === 0) return undefined;

  const maxDate = candidates.reduce((max, count) => (count.date > max ? count.date : max), '');
  const sameDate = candidates.filter((count) => count.date === maxDate);
  // A date egale, privilegier la ligne qui porte des cas (et non que des deces).
  return (
    sameDate.find((count) => count.suspected_cases !== null || count.confirmed_cases !== null) ??
    sameDate[0]
  );
};

// Repartition des cas confirmes par zone de sante au dernier instantane connu
// (<= date). Cette ventilation n'existe qu'au 20 mai (point INSP).
function zoneBreakdown(
  data: AppData,
  date: string,
): { date: string; items: { name: string; cases: number }[] } | null {
  const rows = data.zoneCounts.filter(
    (c) => c.entity_type === 'health_zone' && c.confirmed_cases != null && c.date <= date,
  );
  if (rows.length === 0) return null;
  const maxDate = rows.reduce((max, c) => (c.date > max ? c.date : max), '');
  const items = rows
    .filter((c) => c.date === maxDate)
    .map((c) => ({
      name: data.places.find((p) => p.place_id === c.entity_id)?.name ?? c.entity_id,
      cases: c.confirmed_cases as number,
    }))
    .sort((a, b) => b.cases - a.cases);
  return { date: maxDate, items };
}

export function renderStoryPanel(container: HTMLElement, data: AppData, event: Event): void {
  const period = event.date_end ? `${event.date} au ${event.date_end}` : event.date;
  const place = data.places.find((item) => item.place_id === event.place_id);
  const source = data.sources.find((item) => item.source_id === event.source_id);

  // Bilan national courant a cette date (rien avant le 15 mai).
  const tally = latestDrcTally(data.zoneCounts, event.date);
  const tallyMetrics = tally
    ? [
        formatMetric(' confirmes', tally.confirmed_cases),
        formatMetric(' cas suspects', tally.suspected_cases),
        formatMetric(' deces suspects', tally.suspected_deaths),
      ].filter(Boolean)
    : [];
  const breakdown = zoneBreakdown(data, event.date);
  const breakdownHtml =
    breakdown && breakdown.items.length > 0
      ? `
          <p class="tally-label tally-sub">Cas confirmes par zone, au ${escapeHtml(breakdown.date)}</p>
          <ul class="zone-list">
            ${breakdown.items
              .map((z) => `<li><span>${escapeHtml(z.name)}</span><strong>${z.cases}</strong></li>`)
              .join('')}
          </ul>`
      : '';

  const tallyHtml =
    tallyMetrics.length > 0
      ? `
        <div class="tally">
          <p class="tally-label">Bilan RDC au ${escapeHtml(tally!.date)}</p>
          <div class="metric-strip">${tallyMetrics.join('')}</div>
          ${breakdownHtml}
          <p class="tally-note">Donnees provisoires, majoritairement suspectes et non confirmees.</p>
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
