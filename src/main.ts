import './styles.css';
import { loadData } from './data';
import { getMapNote, initMap, updateMap } from './map';
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
        <code>events.csv</code>, du 24 avril au 28 mai 2026.
      </p>
    </header>
    <section class="story-module" aria-label="Storymap Ebola Bundibugyo">
      <section class="map-panel">
        <div id="map" aria-label="Carte de l'est de la RDC et de l'Ouganda"></div>
        <div class="legend" aria-label="Legende">
          <span><i class="confirmed"></i>Confirme</span>
          <span><i class="provisional"></i>Provisoire</span>
          <span><i class="reconstructed"></i>Reconstruit</span>
          <span><i class="case-size"></i>Cas ou jalons</span>
        </div>
        <p id="map-note" class="map-note"></p>
      </section>
      <aside class="story-panel">
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

const mapElement = document.querySelector<HTMLElement>('#map');
const storyElement = document.querySelector<HTMLElement>('#story');
const timelineElement = document.querySelector<HTMLElement>('#timeline');
const mapNoteElement = document.querySelector<HTMLElement>('#map-note');

if (!mapElement || !storyElement || !timelineElement || !mapNoteElement || !activeEvent) {
  throw new Error('Initialisation impossible: elements ou donnees manquants.');
}

let map: ReturnType<typeof initMap>;
const selectEvent = (event: Event): void => {
  activeEvent = event;
  renderStoryPanel(storyElement, data, activeEvent);
  renderTimeline({
    container: timelineElement,
    events: timelineEvents,
    activeEventId: activeEvent.event_id,
    onSelect: selectEvent,
  });
  updateMap(map, data, activeEvent, selectEvent);
  mapNoteElement.textContent = getMapNote();
};

map = initMap(mapElement, data, activeEvent, selectEvent);
renderStoryPanel(storyElement, data, activeEvent);
renderTimeline({
  container: timelineElement,
  events: timelineEvents,
  activeEventId: activeEvent.event_id,
  onSelect: selectEvent,
});
mapNoteElement.textContent = getMapNote();
