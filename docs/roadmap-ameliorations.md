# Roadmap des ameliorations dataviz (direction NYT)

Suivi des taches issues du menu de propositions (voir
`docs/ameliorations-nyt-2026-05.md` pour le detail et les donnees ; journal
d'implementation dans `docs/timeline-increments.md`).

Principe directeur : un point a la fois, sobrement, sans refonte. Chaque element
(timeline, carte, panneau recit, legende) doit avoir une fonction distincte ;
on evite les dedoublements d'information.

## Legende des statuts

- `[x]` fait
- `[~]` partiel ou fait autrement (voir note)
- `[ ]` a faire
- ~~barre~~ + (annule) : abandonne, avec la raison

## Etat d'avancement (synthese)

- **Timeline : close.** T1 fait (+ clic-sync conserve) ; T2, T3, T4, T5
  annules. Plus rien de prevu cote timeline.
- **Recit : R2 fait.** Restent R1, R3, R4, R5.
- **Carte : amorce faite** (marqueurs de phase via la legende). C1 en
  **stand-by** (a faire seulement une fois la carte au point). Restent C3, C4,
  C5 ; C2 reserve ; aplat de zone annule.
- **Priorite : mettre la carte au point (fond, cadrage, lisibilite, polish
  C3)** avant tout ajout de couches (arcs C1, symboles C2).

---

## 1. Timeline — format, style, fonction

- [x] **T1 — Ruban-axe proportionnel.** 24 avr -> 28 mai a l'echelle reelle,
  un point par evenement a sa vraie date, empilement des memes jours. Rend
  visible le rythme (rafale du 27-28 mai).
- [x] ~~**T2 — Bulles d'ampleur** (taille = nombre de cas).~~ (annule)
  Raisons : conflit de sens (la taille encode deja l'importance editoriale
  primary/secondary) ; donnees trouees (la plupart des evenements n'ont aucun
  chiffre) ; l'escalade 8 -> 1000 est portee par R2 (bilan dans le panneau).
- [x] ~~**T3 — Couleur des points par `map_layer`**.~~ (annule)
  La couleur des points est deja prise par la **phase**, soudee a la
  legende-filtre. Recolorer par `map_layer` casserait ce lien ; et `map_layer`
  fait largement doublon avec la phase (detection~=alerte, riposte~=contrainte).
  Reserve : si besoin d'une lecture « par nature » d'evenement, sa place serait
  la **carte** (son homonyme), pas la timeline.
- [x] ~~**T4 — Courbe epidemique discrete** sous l'axe.~~ (annule)
  Raison (decision editeur) : empiler une courbe sous l'axe alourdit et brouille
  la timeline. L'evolution chiffree est portee autrement, dans le panneau recit
  (voir R2), au moment de la selection. Pas de courbe.
- [x] ~~**T5 — Fonction de controleur** (lecture animee + tete de lecture).~~
  (annule, decision editeur, juge non necessaire). Le clic sur un point ->
  selection synchronisee carte + recit existe deja (depuis la V1 / l'axe) et
  est conserve, mais ce n'etait pas du travail T5. Survol -> infobulle : fait
  puis retire au desencombrement.

### Increments timeline realises hors liste d'origine

- [x] Reperes de phase (bandeaux dans un carrousel) — fait, puis **absorbe**
  par la suite (legende + couleur des points).
- [x] Suppression du carrousel de cartes (redondant avec le ruban).
- [x] **Legende de phases cliquable = filtre.** Sous la timeline ; un clic
  concentre timeline (attenuation des autres phases) et carte (lieux de la
  phase). Nouvelle fonction, non prevue au menu initial.

---

## 2. Recit — densite, hierarchie, confiance

- [ ] **R1 — Badge de statut/confiance** (Provisoire / Divergent / Reconstruit),
  libelles `labels.csv`. Transforme l'instabilite des donnees en signal de
  rigueur.
- [x] **R2 — Chiffre-cle contextualise** a la date. Le panneau recit affiche le
  dernier bilan national RDC connu a la date selectionnee (`counts.csv`,
  `drc_total`) : confirmes / cas suspects / deces suspects. A remplace T4 (la
  courbe). Choix appliques : rien avant le 15 mai (aucun bilan dans les
  donnees) ; les bilans "disputed" (25 mai) sont ecartes, avec repli sur le
  dernier bilan fiable (le label affiche sa vraie date). Note de prudence
  « provisoires, majoritairement suspectes ». Implementation : `src/story.ts`
  (helper `latestDrcTally`, bloc `.tally`).
- [ ] **R3 — Source cliquable + type** (badge Officielle / Media / Analyse),
  depuis `sources.csv`.
- [ ] **R4 — Allegement** : `fact_text` resserre en une phrase + contexte
  repliable.
- [ ] **R5 — Repere de progression** (phase x/5, evenement y/33, fil
  prec/suivant).

Note : le bandeau de phase dans l'eyebrow du panneau recit est **conserve**
(decision editeur) comme contexte du detail lu.

---

## 3. Carte — encodage, mobilite, polish editorial

- [ ] **(STAND-BY) C1 — Arcs de mobilite** (`flows.csv`, inutilise) : corps
  Bunia -> Mongbwalu, cas importe -> Kampala, extension -> Nord/Sud-Kivu. Style
  par type de flux. Raconte le mecanisme de propagation.
  **En attente** (decision editeur) : a ne faire qu'une fois la carte au point ;
  des essais anterieurs parasitaient la carte. Reprendre apres le polish de
  fond de la carte.
- [ ] **C2 — Symboles proportionnels** (taille des points carte = ampleur, via
  `counts.csv` par zone de sante).
- [ ] **C3 — Polish editorial** : encart Afrique « Zone de detail », echelle,
  note de source/incertitude persistante.
- [ ] **C4 — Annotation active sur la carte** (callout + ligne de rappel) pour
  l'evenement selectionne.
- [ ] **C5 — Compteurs hors-carte** pour `drc_total` / `uganda_total` (agregats
  non cartographiables) : cartouches RDC / Ouganda avec bilan courant.
- [x] ~~**Aplat de zone affectee** (orange, facon NYT image 3).~~ (annule)
  Raison : pas de polygones dans le socle (les zones sont des points proxy) ;
  le faire mentirait sur la precision geographique.

### Increment carte realise hors liste d'origine

- [x] **Marqueurs de phase** : quand une phase est filtree depuis la legende, la
  carte affiche les lieux concernes (un marqueur par lieu). Amorce de C2/C4.

---

## Recommandation de sequence (a partir d'ici)

1. **Mettre la carte au point** : fond, cadrage, lisibilite, puis polish C3
   (encart / echelle / note de source). Prealable avant toute couche (C1, C2).
2. **R1 + R3.** Polish recit peu couteux qui assume l'incertitude.

Ensuite seulement : C1 (arcs), puis le reste (R4, R5, C2, C4, C5), un point a
la fois.
