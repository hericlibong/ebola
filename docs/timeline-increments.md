# Journal des increments timeline (post-V1)

Ameliorations de la timeline apportees un point a la fois apres la V1. Voir la
strategie d'ensemble dans `docs/ameliorations-nyt-2026-05.md` et la
specification de fond dans `docs/timeline-interaction-v2.md`.

Fichiers concernes : `src/timeline.ts`, `src/styles.css`.

---

## Increment 1 - Reperes de phase

### Objectif

Donner une structure de lecture au carrousel de cartes en marquant les phases
narratives (`timeline_group`).

### Constat prealable

Les phases s'entrelacent dans le temps (exemple : `regional_spread` du 11 mai
tombe au milieu de `detection_confirmation`). Inserer un repere a chaque
changement de groupe produisait environ 14 bandeaux repetes, l'inverse d'une
lecture sobre.

### Decision

Grouper la timeline en 5 sections de phase (ordre `phase1` -> `phase5` de
`labels.csv`), chronologiques a l'interieur de chaque phase. Cela donne 5
reperes nets, conformes a la structure narrative voulue par l'auteur des
donnees. Contrepartie assumee : l'ordre n'est pas strictement global aux
frontieres de phases.

### Realisation

- Chaque phase ouvre sur un bandeau vertical : libelle FR + plage de dates,
  filet colore a gauche (`--phase-color` inline).
- Couleurs sobres et distinctes (gris, bleu acier, ambre, rouge brule, violet
  sourd), choisies pour ne pas entrer en conflit avec les couleurs de
  `data_status` de la legende carte.
- Libelles sans accent, conformes au socle (`labels.csv` et code existant).
- Suppression du `.step-kicker` (le nom de phase etait repete sur chaque carte,
  desormais porte par le bandeau) ; hauteur de carte reduite en consequence.

### Correction connexe (bug preexistant)

`min-width: 0` ajoute sur `.timeline-rail`. Le rail (`grid-column: 1 / -1`)
avait un `min-width: auto` par defaut : son contenu d'environ 6000 px etirait
toute la grille au lieu de declencher le scroll horizontal interne du
`.timeline-list`. Sans ce correctif, les bandeaux de phase n'etaient pas
navigables. Une ligne, dans le perimetre.

---

## Increment 2 - T1 : axe temporel proportionnel

### Objectif

Ajouter une vue d'ensemble qui rend visible le rythme de l'epidemie, question
laissee ouverte depuis la V1 : les jours quasi vides de fin avril
(circulation silencieuse) et la rafale du 27-28 mai occupaient jusqu'ici la
meme place dans le carrousel a largeur fixe.

### Decision

Un ruban-apercu place au-dessus du carrousel, dans le `.timeline-rail` :

- toute la periode 24 avr -> 28 mai a l'echelle reelle ;
- **non scrollable** : vue d'ensemble, par opposition aux cartes scrollables qui
  restent le detail lisible ;
- un point par evenement, positionne a sa vraie date (echelle lineaire en jours,
  calcul en UTC pour eviter les pieges de fuseau) ;
- **empilement vertical des evenements du meme jour** (variable CSS `--row`),
  pour rendre la densite physiquement visible ;
- graduations hebdomadaires discretes + extremites, libelles FR ;
- points neutres a ce stade (la couleur semantique par `map_layer` est l'objet
  de T3 et n'est pas pre-emptee ici) ; `primary` legerement plus gros, evenement
  actif accentue en vert ;
- clic sur un point = `onSelect`, donc selection synchronisee carte + recit,
  exactement comme un clic sur une carte.

Perimetre volontairement minimal : pas de bulles d'ampleur (T2), pas de courbe
epidemique (T4), pas de tooltip riche ni de tete de lecture (T5).

### Realisation

- `src/timeline.ts` : fonctions `toDay`, `appendTimeAxis`, appel ajoute en tete
  de `renderTimeline` avant la liste.
- `src/styles.css` : `.timeline-axis`, `.axis-track` (ligne de base en
  `::after`), `.axis-tick` / `.axis-tick-label`, `.axis-dot` avec position
  verticale `calc(44px - var(--row) * 11px)`.

### Verification

- `npm run build` vert (validation socle OK, 37 events).
- Apercu navigateur : 33 points, graduations 24 avr / 1 / 8 / 15 / 22 / 28 mai,
  empilement jusqu'a 4 le meme jour (27 et 28 mai). Clic sur un point : point
  actif deplace et titre du recit mis a jour (selection synchronisee confirmee).

### Questions ouvertes / suites possibles

- T2 (bulles d'ampleur) reutilisera l'echelle x de l'axe.
- T4 (courbe epidemique) se posera sous le meme axe.

---

## Increment 3 - Axe enrichi, suppression du carrousel

### Decision

Le ruban (increment 2) et le carrousel de cartes (increment 1) etaient deux
representations de la meme timeline empilees : redondant et lourd, exactement ce
que `docs/post-v1-critique.md` reprochait a la V1. Decision de **supprimer le
carrousel** et de replier ce qui etait utile dans le ruban, sans appauvrir la
lecture.

L'increment 1 (reperes de phase dans le carrousel) est donc **absorbe** : ses
informations (couleur et libelle de phase) vivent desormais sur l'axe. Le
correctif `min-width: 0` sur `.timeline-rail` devient sans objet mais reste en
place (inoffensif).

### Realisation

L'axe porte maintenant, de haut en bas :

- **Annotations des jalons** facon NYT : selection automatique des evenements
  `primary` espaces d'au moins `ANNOT_MIN_GAP_DAYS` (5 jours) pour ne pas
  surcharger la zone dense de fin mai. Data-driven, aucun `event_id` code en
  dur. Disposees sur 2 niveaux alternes (tier 0/1) pour eviter tout
  chevauchement quelle que soit la largeur. A la largeur reelle (~1078 px) :
  6 jalons annotes (24 avr, 5 / 11 / 16 / 21 / 27 mai), zero chevauchement
  mesure.
- **Points** colores par phase, empiles par jour, `primary` plus gros, actif
  cercle vert. Clic = selection synchronisee (carte + recit).
- **Graduations** hebdomadaires + libelles FR.
- **Reperes de chapitre de phase** sous l'axe, au premier jour de chaque phase,
  sur 2 niveaux alternes (les cinq libelles ne se chevauchent pas).
- **Infobulle de survol** enrichie : phase + date + titre.

Le panneau recit reste la source du detail de l'evenement actif (le titre n'est
donc pas duplique en permanence sur l'axe).

Ancrage horizontal des libelles (`is-start` / `is-end`) pour ne pas deborder aux
extremites.

### Code

- `src/timeline.ts` : `appendTimeAxis` reecrite (annotations, dots colores,
  chapitres de phase, tooltip) ; `renderTimeline` reduite a l'appel de l'axe ;
  suppression de `appendEventStep`, `appendPhaseMarker`, `phaseRange` et de la
  liste `ol.timeline-list`.
- `src/styles.css` : bloc axe enrichi ; suppression du CSS mort du carrousel
  (`.timeline-list`, `.timeline-step`, `.step-*`, `.timeline-phase`,
  `.phase-*`) et de la regle mobile associee.

### Verification

- `npm run build` vert.
- Apercu navigateur a ~1078 px : carrousel absent, 33 points, 6 annotations sans
  chevauchement, 5 chapitres de phase sans chevauchement, rien ne deborde sous
  la ligne de base. Clic sur un point : selection synchronisee. Survol : info
  bulle phase + date + titre, masquee a la sortie.

### Limite connue

Les annotations permanentes sont calibrees pour une largeur d'article
(~1000 px et plus). En viewport tres etroit, les libelles de 144 px se
rapprochent ; un repli mobile (annotations masquees, survol/clic seuls) reste a
prevoir si le module doit vivre en pleine largeur mobile.

---

## Increment 4 - Desencombrement + legende-filtre

### Retour editeur

L'axe enrichi surchargeait l'information : le nom de phase apparaissait trois
fois pour un meme evenement (infobulle de survol, libelle de chapitre sous
l'axe, bandeau du panneau recit). Principe rappele : **chaque element (carte,
timeline, panneau) doit avoir une fonction distincte**, sinon les informations
se dedoublent et le lecteur s'y perd.

### Decision

Timeline reduite a l'essentiel : **dates, points, couleurs, et annotations des
jalons importants**. Tout le reste sort.

- Suppression de l'infobulle de survol (`.axis-tooltip`).
- Suppression des libelles de chapitre de phase sous l'axe (`.axis-phase`).
- Le nom de phase ne vit plus que dans **une legende unique**, sous la timeline.

La legende n'est pas decorative : ses cinq entrees sont des **boutons de
filtre**. Cliquer une phase concentre la lecture sur cette phase :

- timeline : les points des autres phases sont attenues ;
- carte : elle affiche les lieux concernes par la phase (un marqueur par lieu,
  couleur de la phase), au lieu du seul evenement actif.

Re-cliquer la phase active rend la vue complete (toggle).

### Realisation

- `src/phases.ts` (nouveau) : source unique de verite des phases (ordre,
  libelles, couleurs), partagee par `timeline.ts` et `map.ts` pour eviter toute
  divergence de couleurs.
- `src/timeline.ts` : axe depouille (track ramene de 150 a 96 px), ajout de
  `appendPhaseLegend` (boutons), attenuation `is-dimmed` des points/annotations
  hors phase active. `renderTimeline` recoit `activePhase` et `onPhaseToggle`.
- `src/main.ts` : etat `activePhase`, `togglePhase`. La selection d'evenement
  recentre la carte (`fly: true`) ; le changement de phase ne deplace pas la
  carte (`fly: false`).
- `src/map.ts` : `renderPhaseMarkers` (un marqueur discret par lieu de la phase,
  dedoublonne par `place_id`, representant = plus haute `display_priority`) ;
  `updateMap` prend desormais `{ activePhase, fly }`.

### Fonctions par element (apres cet increment)

- Timeline : vue d'ensemble + navigation (quand, dans quel ordre, a quel
  rythme, quels jalons).
- Legende : cle des couleurs + filtre de phase (sur quoi se concentrer).
- Carte : ou (geographie de l'evenement actif ou de la phase filtree).
- Panneau recit : le detail (quoi, chiffres, source, statut).

### Verification

- `npm run build` vert.
- Apercu navigateur : infobulle et chapitres absents ; 33 points, 6
  annotations, 5 boutons de legende. Clic sur "Detection et confirmation" :
  25 points attenues, 1 bouton actif, 3 marqueurs de phase sur la carte.
  Re-clic : vue complete restauree (0 attenue, 0 marqueur).

### Reste a trancher

- Le bandeau de phase dans le panneau recit (`story.ts`, eyebrow
  "PHASE - date") est **conserve** (decision editeur) : il situe l'evenement
  dans l'histoire au moment ou on lit le detail. C'est la seule occurrence
  restante du nom de phase hors legende, et elle est assumee.
- Filtre de phase + carte : pas de recadrage automatique sur l'emprise de la
  phase (volontaire, pour ne pas bousculer la vue) ; un `fitBounds` optionnel
  reste possible.
