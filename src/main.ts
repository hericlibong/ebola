import './styles.css';
import { loadData } from './data';
import { initStaticMap, renderStaticMap } from './map';
import { renderStoryPanel } from './story';
import { renderTimeline } from './timeline';
import type { Event } from './types';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Element #app introuvable.');
}

app.innerHTML = `
  <main class="article-shell">
    <header class="article-intro">
      <p class="eyebrow">Maquette interactive v2</p>
      <h1>Ebola Bundibugyo : les jours ou l'alerte rattrape l'epidemie</h1>
      <p>
        Une lecture cartographique et chronologique, construite a partir du fichier de reference
        <code>events.csv</code>, du 24 avril au 7 juin 2026.
      </p>
    </header>
    <section class="story-module" aria-label="Storymap Ebola Bundibugyo">
      <section class="map-panel">
        <div id="map" aria-label="Carte de l'est de la RDC et de l'Ouganda"></div>
      </section>
      <aside class="story-panel">
        <div class="sheet-grip" aria-hidden="true"></div>
        <div class="sheet-controls">
          <button type="button" id="sheet-prev" class="sheet-nav" aria-label="Recit precedent">◀</button>
          <button type="button" id="sheet-next" class="sheet-nav" aria-label="Recit suivant">▶</button>
          <button type="button" id="sheet-close" class="sheet-close" aria-label="Fermer le recit">Fermer ✕</button>
        </div>
        <div id="story"></div>
      </aside>
      <nav id="timeline" class="timeline-rail" aria-label="Timeline narrative"></nav>
    </section>
  </main>
`;

const data = await loadData();
const timelineEvents = data.events.filter(
  (event) => event.display_tier === 'primary' || event.display_tier === 'secondary',
);
let activeEvent: Event = timelineEvents[0] ?? data.events[0];

const moduleEl = document.querySelector<HTMLElement>('.story-module');
const mapElement = document.querySelector<HTMLElement>('#map');
const storyElement = document.querySelector<HTMLElement>('#story');
const timelineElement = document.querySelector<HTMLElement>('#timeline');
const sheetPrev = document.querySelector<HTMLButtonElement>('#sheet-prev');
const sheetNext = document.querySelector<HTMLButtonElement>('#sheet-next');
const sheetClose = document.querySelector<HTMLButtonElement>('#sheet-close');

if (
  !moduleEl ||
  !mapElement ||
  !storyElement ||
  !timelineElement ||
  !activeEvent ||
  !sheetPrev ||
  !sheetNext ||
  !sheetClose
) {
  throw new Error('Initialisation impossible: elements ou donnees manquants.');
}

let activePhase: string | null = null;

// Le panneau recit devient un bottom-sheet sur telephone (<= 700px) : la carte
// reste epinglee et visible pendant qu'on lit, et le recit n'eloigne plus la
// timeline de la carte. Sur desktop, le panneau reste une colonne classique.
const isMobile = (): boolean => window.matchMedia('(max-width: 700px)').matches;
const openSheet = (): void => moduleEl.classList.add('is-sheet-open');
const closeSheet = (): void => moduleEl.classList.remove('is-sheet-open');

const activeIndex = (): number =>
  timelineEvents.findIndex((event) => event.event_id === activeEvent.event_id);

// Active/desactive les fleches du sheet selon la position dans la serie.
const updateSheetNav = (): void => {
  const i = activeIndex();
  sheetPrev.disabled = i <= 0;
  sheetNext.disabled = i < 0 || i >= timelineEvents.length - 1;
};

const drawTimeline = (): void => {
  renderTimeline({
    container: timelineElement,
    events: timelineEvents,
    activeEventId: activeEvent.event_id,
    activePhase,
    onSelect: selectEvent,
    onPhaseToggle: togglePhase,
  });
};

const selectEvent = (event: Event): void => {
  activeEvent = event;
  renderStoryPanel(storyElement, data, activeEvent);
  updateSheetNav();
  drawTimeline();
  renderStaticMap(data, activeEvent, activePhase, selectEvent);
  // Selectionner un jalon fait apparaitre le recit (sheet) sur mobile.
  if (isMobile()) openSheet();
};

const togglePhase = (phase: string): void => {
  activePhase = activePhase === phase ? null : phase;
  drawTimeline();
  renderStaticMap(data, activeEvent, activePhase, selectEvent);
};

sheetClose.addEventListener('click', closeSheet);
sheetPrev.addEventListener('click', () => {
  const i = activeIndex();
  if (i > 0) selectEvent(timelineEvents[i - 1]!);
});
sheetNext.addEventListener('click', () => {
  const i = activeIndex();
  if (i >= 0 && i < timelineEvents.length - 1) selectEvent(timelineEvents[i + 1]!);
});
// Taper la legende de la timeline (jalon actif) ouvre le recit sans changer
// d'evenement. Delegation : la legende est recreee a chaque rendu.
timelineElement.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.closest('.tl-caption') && isMobile()) openSheet();
});

await initStaticMap(mapElement);
renderStaticMap(data, activeEvent, activePhase, selectEvent);
renderStoryPanel(storyElement, data, activeEvent);
updateSheetNav();
drawTimeline();
