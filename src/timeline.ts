import type { Event } from './types';

interface TimelineOptions {
  container: HTMLElement;
  events: Event[];
  activeEventId: string;
  onSelect: (event: Event) => void;
}

export function renderTimeline({
  container,
  events,
  activeEventId,
  onSelect,
}: TimelineOptions): void {
  const previousScrollLeft = container.querySelector<HTMLElement>('.timeline-list')?.scrollLeft ?? 0;

  container.innerHTML = '';

  const list = document.createElement('ol');
  list.className = 'timeline-list';

  events.forEach((event) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const isActive = event.event_id === activeEventId;

    button.className = `timeline-step is-${event.display_tier} ${isActive ? 'is-active' : ''}`;
    button.type = 'button';
    button.innerHTML = `
      <span class="step-index is-${event.data_status}"></span>
      <span>
        <span class="step-date">${event.date_end ? `${event.date} - ${event.date_end}` : event.date}</span>
        <span class="step-title">${event.headline}</span>
        <span class="step-kicker">${event.timeline_group.replaceAll('_', ' ')}</span>
      </span>
    `;

    button.addEventListener('click', () => onSelect(event));
    item.appendChild(button);
    list.appendChild(item);
  });

  container.appendChild(list);
  list.scrollLeft = previousScrollLeft;
}
