# Protocole d'enrichissement éditorial des textes

> **Statut : spécification.** À exécuter une fois toutes les phases de la roadmap V3 (0–5) terminées.
> Correspond à la Phase 6 de `docs/roadmap-v3.md`.

## Principe

Les textes affichés (intro, `headline`, `fact_text`, `quote` des événements) ne sont **jamais inventés**.
Ils sont enrichis à partir de **recherches sourcées**, alignées sur les dates du jeu de données.

Séparation stricte :
- **Chiffres** → source de vérité unique INRB-UMIE (`BDBV2026-Data`).
- **Récit** → sources éditoriales (Africa CDC, presse, humanitaire…), citées dans `sources.csv`.

Décision actée : les textes affichés au lecteur passent en **français correctement accentué**
(les identifiants techniques — `place_id`, `source_id`, `key`, `timeline_group` — restent sans accents).
Cette décision met à jour la convention « sans accents » documentée dans `CLAUDE.md` pour la
**couche d'affichage uniquement**.

## Phase A — Enrichissement rétroactif (backfill)

- **Périmètre** : toutes les dates déjà présentes dans le jeu de données et sur la carte,
  du **24 avril au 11 juin 2026**.
- **Méthode** : avancer **jour par jour**. Pour chaque date, rechercher les faits/événements
  correspondants, puis enrichir et accentuer le texte de l'événement de cette date.
- **Sorties** :
  - `events.csv` : textes enrichis et accentués.
  - `sources.csv` : sources ajoutées.
  - `data-changelog.md` : traçabilité de l'enrichissement.

## Phase B — Enrichissement en continu (synchronisé avec la réactualisation)

- **Déclencheur** : à chaque réactualisation des données (Phase 3 / rituel quotidien Phase 5),
  pour chaque nouvelle date intégrée.
- **Méthode** : au moment de l'actualisation, lancer une recherche d'événements pour la date
  concernée, **sélectionner l'histoire qui correspond le mieux** à cette date, puis **générer**
  le texte (et non seulement le retoucher).
- **Outillage** : probablement un **agent de recherche dédié** chargé de la collecte et de la
  proposition de récits sourcés.
- **Garde-fous** :
  - Rester calé sur des sources ; ne jamais inventer.
  - Distinguer chiffres (INRB-UMIE) et récit (sources éditoriales).
  - Une date = une histoire principale sélectionnée, traçable jusqu'à sa source.

## Ordonnancement

À entamer **après** la clôture de toutes les phases V3. La Phase B prolonge naturellement le
rituel de suivi quotidien (Phase 5) en y branchant la génération de récit.
