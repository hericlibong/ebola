# Roadmap generale

## Objectif du projet

Construire une dataviz interactive de storytelling cartographique sur l'epidemie d'Ebola Bundibugyo apparue en RDC entre le 24 avril et le 20 mai 2026.

L'objectif n'est pas de produire un dashboard sanitaire exhaustif, mais une narration visuelle permettant de comprendre comment l'epidemie a pu circuler silencieusement avant sa detection officielle, sa confirmation virologique, puis sa reconnaissance comme urgence sanitaire internationale.

Angle narratif central :

> Pendant environ trois semaines, Ebola circule silencieusement dans l'est de la RDC, puis la detection officielle revele une propagation deja regionale.

Titre de travail :

> Ebola Bundibugyo : les 21 jours ou l'epidemie a avance plus vite que l'alerte

## Principes editoriaux

- Ne jamais inventer de donnees.
- Distinguer clairement les faits confirmes, les donnees provisoires, les hypotheses probables et les reconstructions narratives.
- Ne pas representer une fleche comme une preuve de transmission si la source documente seulement un deplacement, un rapatriement de corps, un corridor de risque ou une extension administrative.
- Separer les cas confirmes, les cas suspects, les deces confirmes, les deces suspects et les contacts listes.
- Signaler les divergences entre sources, notamment entre l'INSP/COUSP-RDC et l'OMS au 20 mai 2026.
- Indiquer le niveau de certitude de chaque evenement, flux ou chiffre.

## Stack recommandee

- Vite pour initialiser une application frontend simple.
- TypeScript pour typer les donnees editoriales et limiter les confusions.
- MapLibre GL JS pour la carte interactive.
- D3.js pour la timeline, les transitions, les arcs, les echelles et certains elements narratifs.
- Donnees locales en CSV pour la premiere version.
- Pas de backend dans la maquette initiale.

## Architecture cible

```text
public/
  data/
    places.csv
    events.csv
    flows.csv
    zone_counts.csv

src/
  main.ts
  styles.css
  types.ts
  data.ts
  map.ts
  timeline.ts
  story.ts

docs/
  roadmap.md
  data-dictionary.md
  editorial-method.md
  sources.md
```

Cette architecture pourra etre decoupee plus finement lorsque les interactions principales seront stabilisees.

## Todo liste

### Phase 1 - Socle projet

- [x] Initialiser le projet Vite TypeScript.
- [x] Installer MapLibre GL JS.
- [x] Installer D3.js.
- [x] Creer la structure `public/data/`.
- [x] Creer `places.csv`.
- [x] Creer `events.csv`.
- [x] Creer `flows.csv`.
- [x] Creer `zone_counts.csv`.
- [x] Ajouter un premier jeu de donnees prudent et source.
- [x] Afficher une carte de base centree sur l'est de la RDC et l'Ouganda.
- [x] Afficher les lieux principaux sur la carte.
- [x] Ajouter une timeline minimale en 6 sequences.
- [x] Mettre a jour le panneau narratif au clic sur une sequence.
- [x] Afficher un premier arc prudent entre deux lieux.
- [x] Ajouter une legende minimale pour `confirmed`, `provisional` et `reconstructed`.

### Phase 2 - Donnees et methode editoriale

- [x] Rediger `docs/data-dictionary.md`.
- [x] Rediger `docs/editorial-method.md`.
- [x] Rediger `docs/sources.md`.
- [x] Definir les valeurs autorisees pour `confidence`.
- [x] Definir les valeurs autorisees pour `source_type`.
- [x] Definir les valeurs autorisees pour `data_status`.
- [x] Verifier les coordonnees des lieux principaux.
- [x] Qualifier la precision geographique de chaque lieu.
- [x] Distinguer villes, zones de sante, provinces et corridors.
- [x] Verifier les chiffres du 20 mai et documenter les divergences INSP/OMS.

### Phase 3 - Storytelling interactif

- [x] Structurer les 6 sequences narratives dans les donnees.
- [x] Associer chaque sequence a un cadrage cartographique.
- [x] Associer chaque sequence a un texte narratif court.
- [x] Associer chaque sequence a une ou plusieurs sources.
- [x] Ajouter les transitions de carte par sequence.
- [x] Ajouter les changements de style selon l'etape active.
- [x] Ajouter les chiffres cles uniquement lorsque leur statut est clair.
- [x] Ajouter les notes d'incertitude dans le panneau narratif.

### Phase 4 - Grammaire cartographique

- [x] Definir le style des points selon `data_status`.
- [x] Definir le style des points selon `confidence`.
- [x] Definir le style des arcs selon `flow_type`.
- [x] Definir le style des arcs selon `confidence`.
- [x] Ajouter les cercles proportionnels pour les chiffres exploitables.
- [x] Ajouter les tooltips des lieux.
- [x] Ajouter les tooltips des arcs.
- [x] Ajouter les avertissements editoriaux sur les flux reconstruits.
- [x] Verifier que les fleches ne suggerent pas une transmission prouvee sans source.

### Phase 5 - Verification et consolidation

- [x] Relire les documents sources principaux.
- [x] Controler la coherence entre `events.csv`, `flows.csv` et `zone_counts.csv`.
- [x] Tester le chargement des donnees locales.
- [x] Tester les interactions principales sur desktop.
- [x] Tester les interactions principales sur mobile.
- [x] Corriger les problemes de lisibilite de la carte.
- [x] Corriger les problemes de lisibilite de la timeline.
- [x] Documenter les limites connues de la v1.
- [x] Preparer une courte note de presentation de la maquette.

## Phase 1 - Socle projet

Objectif : obtenir une maquette locale minimale, lisible et maintenable.

Livrables :

- Projet Vite TypeScript initialise.
- Installation de MapLibre GL JS et D3.js.
- Structure `public/data/` creee.
- Fichiers de donnees initiaux ajoutes :
  - `places.csv`
  - `events.csv`
  - `flows.csv`
  - `zone_counts.csv`
- Carte de base centree sur l'est de la RDC et l'Ouganda.
- Lieux principaux affiches sur la carte.
- Timeline minimale en 6 sequences.
- Panneau narratif mis a jour au clic sur une sequence.
- Un premier arc prudent, par exemple Ituri vers Kampala, type comme `patient_travel`.

Critere de validation :

La maquette permet deja de comprendre le decalage entre le premier cas documente du 24 avril et la confirmation officielle du 15 mai.

## Phase 2 - Donnees et dictionnaire editorial

Objectif : rendre les donnees robustes avant d'enrichir la visualisation.

Livrables :

- `data-dictionary.md` decrivant tous les champs.
- Normalisation des valeurs autorisees :
  - `confidence`: `high`, `medium`, `low`
  - `source_type`: `official`, `media`, `analysis`, `humanitarian`, `scientific`
  - `data_status`: `confirmed`, `suspected`, `provisional`, `reconstructed`, `disputed`
- Verification des lieux et de leur precision geographique.
- Distinction explicite entre villes, zones de sante, provinces et corridors.
- Premiere passe de controle sur les chiffres du 20 mai.

Critere de validation :

Chaque point, evenement, flux et chiffre affiche sur la carte peut etre relie a une source et a un statut editorial.

## Phase 3 - Storytelling interactif

Objectif : transformer la carte en recit progressif.

Sequences narratives prevues :

1. 24 avril : premier cas humain documente a Bunia.
2. Fin avril : transmission silencieuse et signaux locaux non stabilises.
3. 5 au 8 mai : alerte a Mongbwalu et notification officielle.
4. 11 au 15 mai : investigations, prelevements, confirmation Bundibugyo et declaration nationale.
5. 15 au 17 mai : cas importes a Kampala et internationalisation.
6. 18 au 20 mai : extension documentee, donnees provisoires et pression regionale.

Livrables :

- Timeline navigable.
- Transitions de carte par sequence.
- Panneau narratif complet :
  - date
  - lieu
  - titre
  - texte court
  - chiffre cle si disponible
  - niveau de certitude
  - source
- Legende visuelle pour distinguer confirme, provisoire, reconstruit et dispute.

Critere de validation :

L'utilisateur peut parcourir l'histoire sans confondre apparition des symptomes, alerte, confirmation et reconnaissance internationale.

## Phase 4 - Grammaire cartographique

Objectif : rendre la carte expressive sans exagerer la certitude des donnees.

Livrables :

- Cercles proportionnels pour les chiffres disponibles.
- Styles distincts selon `data_status`.
- Styles distincts selon `confidence`.
- Arcs ou fleches typologies :
  - deplacement patient
  - rapatriement de corps
  - transport d'echantillons
  - corridor de risque
  - extension officielle documentee
- Tooltips contextualises.
- Notes d'incertitude visibles au bon moment.

Critere de validation :

La carte aide a lire le recit, mais ne transforme pas une hypothese ou un recit journalistique en preuve visuelle.

## Phase 5 - Verification et consolidation

Objectif : stabiliser la premiere version avant enrichissement.

Livrables :

- Relecture des sources principales.
- Controle de coherence entre `events.csv`, `flows.csv` et `zone_counts.csv`.
- Verification des interactions sur desktop et mobile.
- Tests simples de chargement des donnees.
- Documentation des limites connues.

Critere de validation :

La v1 est presentable comme une maquette fiable : incomplete, mais editorialement propre.

## Risques a surveiller

- Precision geographique excessive pour des zones approximatives.
- Confusion entre ville, zone de sante et province.
- Melange entre cas confirmes et suspects.
- Melange entre deces confirmes et deces suspects.
- Fleches interpretees comme chaines de transmission prouvees.
- Divergences INSP/OMS masquees ou lissees.
- Surcharge visuelle de la carte en fin de timeline.
- Dependances externes aux tuiles cartographiques pour une demo hors ligne.
- Recits journalistiques affiches avec le meme statut que des sources officielles.

## Definition d'une v1 reussie

La premiere version est reussie si elle permet de :

- afficher une carte centree sur l'est de la RDC et l'Ouganda ;
- afficher Bunia, Mongbwalu, Rwampara, Nyankunde, Goma, Katwa, Butembo et Kampala ;
- naviguer dans une timeline du 24 avril au 20 mai 2026 ;
- mettre a jour le panneau narratif selon la sequence choisie ;
- afficher au moins un arc entre deux lieux ;
- distinguer visuellement les evenements confirmes, provisoires et reconstruits ;
- conserver des donnees propres, documentees et facilement enrichissables.

## Prochaine etape recommandee

Initialiser le projet Vite TypeScript, creer les dossiers de base, ajouter les fichiers CSV initiaux avec un jeu de donnees prudent, puis afficher une premiere carte MapLibre avec une timeline minimale.
