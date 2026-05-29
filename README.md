# Ebola Bundibugyo Storymap

Maquette de dataviz interactive pour raconter l'epidemie d'Ebola Bundibugyo documentee en RDC et en Ouganda entre avril et mai 2026.

Le projet combine :

- une carte interactive ;
- une timeline narrative ;
- un panneau editorial ;
- un jeu de donnees de reference actualisable.

## Stack

- Vite
- TypeScript
- MapLibre GL JS
- D3

## Donnees

Le fichier maitre est :

```text
public/data/reference/events.csv
```

Les tables de support sont :

- `public/data/reference/places.csv`
- `public/data/reference/sources.csv`
- `public/data/reference/counts.csv`
- `public/data/reference/flows.csv`
- `public/data/reference/labels.csv`

## Commandes

Installer les dependances :

```bash
npm install
```

Lancer le serveur local :

```bash
npm run dev
```

Valider le jeu de donnees de reference :

```bash
npm run validate:reference
```

Construire l'application :

```bash
npm run build
```

Le build lance aussi la validation du jeu de donnees de reference.

## Documentation

La documentation de travail est dans `docs/`.

Documents importants :

- `docs/roadmap-v2.md`
- `docs/bilan-v2.md`
- `docs/reference-data-model.md`
- `docs/data-update-procedure.md`
- `docs/map-interaction-v2.md`
- `docs/timeline-interaction-v2.md`

Les anciens fichiers de donnees de la V1 sont archives dans :

```text
docs/archive/v1-data/
```

## Statut

Prototype narratif en cours.

La V2 est une base de travail exploitable, pas une version publiable.
