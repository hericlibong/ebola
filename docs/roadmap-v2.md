# Roadmap v2

## Point de depart

La v1 est un brouillon technique utile, mais pas une version publiable.

Le nouveau point de depart est le jeu de donnees de reference :

`public/data/reference/events.csv`

Ce fichier devient le fichier maitre du projet. Il contient la chronologie des faits documentes depuis le debut connu de l'epidemie jusqu'au 28 mai 2026.

Les autres fichiers du dossier `public/data/reference/` sont des tables de support :

- `places.csv` : coordonnees et metadonnees des lieux ;
- `sources.csv` : sources citees ;
- `labels.csv` : vocabulaire controle ;
- `flows.csv` : flux, corridors et relations spatiales ;
- `counts.csv` : bilans chiffres separes.

## Objectif v2

Construire une dataviz journalistique plus claire, basee sur un jeu de donnees solide, combinant :

- une timeline lisible ;
- une carte narrative ;
- des faits sources ;
- des lieux geolocalises ;
- des statuts de confiance ;
- une capacite d'actualisation.

L'objectif immediat n'est pas encore de produire la version finale, mais de reconstruire le projet autour d'une base de donnees propre et d'une maquette v2 plus coherente que la v1.

## Principes

- Le fichier maitre est `public/data/reference/events.csv`.
- La carte ne lit pas directement des textes manuels : elle lit les donnees.
- Les coordonnees restent dans `places.csv`, jointes par `place_id`.
- Les sources restent dans `sources.csv`, jointes par `source_id`.
- Les labels autorises restent dans `labels.csv`.
- Chaque evenement doit avoir une date, un lieu, un fait, une source, une confiance et un statut.
- Les flux ne prouvent pas une transmission.
- Les chiffres confirmes, suspects, deces et contacts restent separes.

## Todo liste

### Phase A - Stabiliser le dataset de reference

- [x] Creer `public/data/reference/`.
- [x] Creer le fichier maitre `events.csv`.
- [x] Creer `places.csv` avec les coordonnees des lieux.
- [x] Creer `sources.csv`.
- [x] Creer `labels.csv`.
- [x] Creer `flows.csv`.
- [x] Creer `counts.csv`.
- [x] Ajouter les evenements du 24 avril au 28 mai 2026.
- [x] Integrer l'article Jeune Afrique du 28 mai.
- [x] Ajouter une validation structurelle du dataset.
- [x] Ajouter le script `npm run validate:reference`.
- [x] Corriger les problemes CSV detectes par la validation.

### Phase B - Clarifier le modele de donnees

- [x] Documenter clairement le role de `events.csv`.
- [x] Documenter la jointure `events.place_id` -> `places.place_id`.
- [x] Documenter la jointure `events.source_id` -> `sources.source_id`.
- [x] Documenter les champs obligatoires de `events.csv`.
- [x] Documenter les champs optionnels.
- [x] Ajouter un exemple de ligne bien formee.
- [x] Ajouter une note expliquant pourquoi les coordonnees ne sont pas dans `events.csv`.
- [x] Ajouter une note expliquant quand creer un nouveau `place_id`.

### Phase C - Nettoyer et renforcer `events.csv`

- [x] Relire chaque ligne de `events.csv`.
- [x] Verifier que chaque `headline` est clair et court.
- [x] Verifier que chaque `fact_text` est factuel et non surinterprete.
- [x] Verifier que les citations sont courtes et attribuables.
- [x] Verifier que chaque `confidence` est justifie.
- [x] Verifier que chaque `data_status` est coherent.
- [x] Verifier que les evenements incertains sont bien marques `provisional`, `reconstructed` ou `disputed`.
- [x] Identifier les evenements trop faibles pour l'affichage principal.
- [x] Ajouter un champ ou une logique de filtrage pour distinguer evenement principal et evenement secondaire si necessaire.

### Phase D - Preparer la carte v2

- [x] Definir quels types d'evenements s'affichent sur la carte.
- [x] Definir quels types d'evenements restent seulement dans la timeline.
- [x] Definir les styles par `map_layer`.
- [x] Definir les styles par `data_status`.
- [x] Definir les styles par `confidence`.
- [x] Verifier les coordonnees de chaque `place_id`.
- [x] Decider comment representer les entites non cartographiques `drc_total` et `uganda_total`.
- [x] Decider comment representer les zones de sante approximatives.
- [x] Decider comment representer les corridors frontaliers.

### Phase E - Preparer la timeline v2

- [x] Definir l'echelle temporelle du 24 avril au 28 mai.
- [x] Decider si la timeline est horizontale, compacte ou integree a la carte.
- [x] Regrouper les evenements par `timeline_group`.
- [x] Definir les evenements majeurs a annoter.
- [x] Definir les evenements secondaires affiches en points discrets.
- [x] Prevoir une interaction date -> carte -> texte.
- [x] Prevoir une interaction carte -> evenement -> source.

### Phase F - Maquette visuelle v2

- [x] Abandonner le format pleine page de la v1.
- [x] Prototyper un module integrable dans une page d'article.
- [x] Tester une carte moins grande et plus editoriale.
- [x] Tester une timeline compacte inspiree du graphique de reference.
- [x] Ajouter des annotations directement sur la carte.
- [x] Ajouter une fiche evenement lisible sans scroll inutile.
- [x] Tester les interactions principales.

### Phase G - Actualisation

- [x] Definir une procedure d'ajout d'une nouvelle source.
- [x] Definir une procedure d'ajout d'un nouvel evenement.
- [x] Definir une procedure d'ajout d'un nouveau bilan chiffre.
- [x] Definir une procedure de verification avant publication.
- [x] Prevoir un champ ou fichier pour les evenements a verifier.
- [x] Prevoir une section de changelog des donnees.

Document de reference :

`docs/data-update-procedure.md`

## Definition de reussite de la prochaine etape

La prochaine etape sera reussie si :

- `events.csv` est clairement reconnu comme fichier maitre ;
- chaque evenement peut etre joint a un lieu et a une source ;
- le modele de donnees est documente ;
- les labels sont stabilises ;
- on peut reconstruire une carte + timeline sans repartir de zero ;
- le projet devient actualisable sans bricolage.

## Prochaine action recommandee

Documenter le modele de donnees de reference dans un fichier dedie, puis relire `events.csv` ligne par ligne pour distinguer :

- les evenements principaux ;
- les evenements secondaires ;
- les evenements a verifier ;
- les evenements utiles seulement comme contexte.
