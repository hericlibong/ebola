import type { AppData, Event } from './types';
import { escapeHtml } from './html';

const formatMetric = (label: string, value: number | null): string => {
  if (value === null) return '';
  return `<span><strong>${value}</strong>${escapeHtml(label)}</span>`;
};

const timelineGroupLabels: Record<string, string> = {
  silent_spread: 'Circulation silencieuse',
  detection_confirmation: 'Detection et confirmation',
  regional_spread: 'Extension regionale',
  response_breakdown: 'Riposte sous pression',
  cross_border_control: 'Controle transfrontalier',
};

export function renderStoryPanel(container: HTMLElement, data: AppData, event: Event): void {
  const period = event.date_end ? `${event.date} au ${event.date_end}` : event.date;
  const place = data.places.find((item) => item.place_id === event.place_id);
  const source = data.sources.find((item) => item.source_id === event.source_id);
  const metrics = [
    formatMetric(' cas confirmes', event.confirmed_cases),
    formatMetric(' cas suspects', event.suspected_cases),
    formatMetric(' deces confirmes', event.confirmed_deaths),
    formatMetric(' deces suspects', event.suspected_deaths),
    formatMetric(' contacts listes', event.contacts),
  ].filter(Boolean);

  container.innerHTML = `
    <p class="eyebrow">${escapeHtml(timelineGroupLabels[event.timeline_group] ?? event.timeline_group)} - ${escapeHtml(period)}</p>
    <h1>${escapeHtml(event.headline)}</h1>
    <p class="kicker">${escapeHtml(place ? `${place.name}, ${place.country}` : 'Bilan ou contexte non cartographique')}</p>
    <p class="story-description">${escapeHtml(event.fact_text)}</p>
    ${event.quote ? `<blockquote>${escapeHtml(event.quote)}</blockquote>` : ''}
    ${metrics.length > 0 ? `<div class="metric-strip">${metrics.join('')}</div>` : ''}
    <p class="source-line">Source : ${escapeHtml(source ? `${source.publisher} - ${source.title}` : event.source_id)}</p>
  `;
}
