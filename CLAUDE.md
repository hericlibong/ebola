# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Storymap éditoriale (data-journalism) sur l'épidémie d'Ebola Bundibugyo en RDC et Ouganda, avril–juin 2026. Maquette interactive : carte + timeline narrative + panneau récit, entièrement pilotée par un jeu de données CSV de référence. Le contenu (textes, libellés, couleurs de phases) est en français **sans accents** dans le socle de données, par cohérence éditoriale — respecter cette convention dans les CSV et les libellés générés.

## Commandes

```bash
npm install
npm run dev                    # serveur Vite local (127.0.0.1:5173)
npm run validate:reference     # valide public/data/reference/*.csv (bloquant)
npm run build                  # validate:reference + tsc + vite build
npm run update:inrb-umie:staging   # génère un snapshot+rapport INRB-UMIE (ne touche pas counts.csv)
npm run build:geodata          # régénère public/geo/*.json depuis Natural Earth (à lancer rarement)
```

- `npm run build` lance d'abord `validate:reference` puis `tsc` (typecheck, `noEmit`) puis `vite build`. Toute donnée invalide casse le build.
- Pas de framework de tests : la « suite de tests » est le validateur de données `scripts/validate-reference-data.mjs`. Le lancer après toute modif des CSV.
- TypeScript est en mode `strict` avec `noUnusedLocals`/`noUnusedParameters` — pas d'imports ni de variables non utilisés.

## Architecture

### Flux de données (le cœur du projet)
Le socle est `public/data/reference/*.csv`, et non du code. `src/data.ts#loadData()` charge en parallèle les 5 CSV (`places`, `events`, `flows`, `counts`, `sources`) via d3-fetch, les mappe vers les interfaces de `src/types.ts` (`AppData`), et trie les events par `date` puis `display_priority`. `labels.csv` n'est lu que par le validateur (énumérations autorisées), pas par l'app.

`src/main.ts` est le seul état applicatif : deux variables, `activeEvent` et `activePhase`. Tout rendu est une fonction pure de ces deux valeurs + `AppData`. Sélectionner un event ou basculer une phase re-rend les trois panneaux (story, timeline, carte). Pas de framework réactif — re-render impératif explicite.

### Les trois vues
- `src/staticMap.ts` — **la carte réellement utilisée**. Carte SVG statique en projection plate-carrée manuelle calée sur une bbox fixe + image hillshade EPSG:4326. Dessine les fonds `public/geo/*.json`, les lieux cités, et des bulles proportionnelles aux cas par zone.
- `src/map.ts` — version MapLibre GL **non utilisée** : `map.ts` n'est importé nulle part (`main.ts` n'utilise que `staticMap.ts`). La dépendance `maplibre-gl` ne sert donc pas au rendu actif. Ne pas supposer que modifier `map.ts` change l'app.
- `src/story.ts` — panneau récit + courbe d'évolution nationale SVG. `src/timeline.ts` — axe temporel + légende de phases cliquable.

`src/phases.ts` est la **source unique de vérité** pour l'ordre, les libellés FR et les couleurs des phases narratives (`timeline_group`). Toute nouvelle phase doit y être ajoutée ET dans `labels.csv` (groupe `timeline_group`).

`src/assetPath.ts` préfixe tous les chemins d'assets par `import.meta.env.BASE_URL`. Le `base` Vite est `/projects/ebola-bundibugyo/dataviz/` (déploiement en sous-chemin) — toujours charger les assets via `assetPath()`, jamais en absolu.

### Règles métier non évidentes (encodées dans le code, à préserver)
- **Cas/décès confirmés et suspects sont quatre séries distinctes.** Ne jamais les fondre en un champ générique `deaths`/`cases` : le validateur rejette explicitement toute colonne `deaths`/`deces` générique dans `counts.csv`, et le code lit les fausses baisses quand le type change.
- **`ND` / champ vide ≠ `0`.** `ND` = non rapporté. Ne jamais convertir en zéro.
- La ventilation des cas par **zone de santé** n'est fiable qu'au **20 mai** (point INSP) : `staticMap.ts` et `story.ts` n'affichent les bulles/répartition par ville qu'à cette date exacte, alors que le total national `drc_total` évolue dans le temps.
- Les lignes `data_status = disputed` sont écartées des bilans nationaux affichés.

## Pipeline INRB-UMIE (source externe → staging → validation humaine)

`scripts/update-inrb-umie-staging.mjs` clone/met à jour `INRB-UMIE/BDBV2026-Data`, lit les 4 séries nationales, et écrit un snapshot (`data/staging/inrb_umie/snapshots/`) + un rapport de comparaison Markdown (`reports/`). **Il ne modifie jamais `public/data/reference/counts.csv`.** L'intégration dans `counts.csv` est une étape éditoriale humaine séparée. Voir `data/staging/inrb_umie/README.md` et `docs/inrb-umie-integration/`.

## Documentation

`docs/` contient la doc de travail. Références utiles avant de toucher aux données ou aux vues :
- `docs/reference-data-model.md`, `docs/data-dictionary.md` — schéma et sémantique des CSV.
- `docs/data-update-procedure.md`, `docs/data-changelog.md` — comment et quand mettre à jour les données.
- `docs/cartographic-grammar.md`, `docs/map-interaction-v2.md`, `docs/timeline-interaction-v2.md` — choix de design des vues.
- `docs/editorial-method.md`, `docs/sources.md`, `docs/known-limits.md` — méthode éditoriale et limites assumées.
- `docs/archive/v1-data/` — données et validateur de la V1, archivés (ne pas réutiliser).
