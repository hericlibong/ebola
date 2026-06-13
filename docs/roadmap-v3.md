# Roadmap V3 — Réorganisation, réactualisation, suivi quotidien

> Roadmap active de suivi. Chaque tâche réalisée est cochée au fil de l'avancement.
> Statut : **en attente du go** avant exécution.
> Créée le 2026-06-13.

## Principes directeurs (rappel)

- **Objectif de l'app** : suivre **au jour le jour** l'évolution de l'épidémie d'Ebola Bundibugyo, en racontant en parallèle les histoires qui correspondent à cette évolution.
- **Source de vérité chiffrée** : `INRB-UMIE/BDBV2026-Data` (GitHub). Rien n'est copié automatiquement dans `counts.csv` — validation humaine obligatoire.
- **Règles métier intangibles** : 4 séries distinctes (cas/décès × confirmés/suspects), `ND` ≠ `0`, exclusion des lignes `disputed`, ventilation par zone fiable au 20 mai uniquement.

---

## Phase 0 — Mise en place git

- [ ] Merger `feature/inrb-umie-data-source` dans `main` (établir une base propre : CLAUDE.md, audit, roadmap)
- [ ] Créer une branche de travail dédiée pour les nouveaux développements (ex. `feature/v3-reorg`)

## Phase 1 — Nettoyage (sans risque fonctionnel)

- [ ] 1a. Supprimer `src/map.ts` (fichier mort, MapLibre non utilisé)
- [ ] 1b. Désinstaller `maplibre-gl` (`npm uninstall maplibre-gl`)
- [ ] 1c. Renommer `src/staticMap.ts` → `src/map.ts` (c'est *la* carte de l'app) + ajuster l'import dans `main.ts`
- [ ] 1d. Reclasser `d3-dsv` en `devDependencies`
- [ ] 1e. Corriger `public/data/reference/README.md` : « jusqu'au 28 mai » → date réelle
- [ ] 1f. Documenter la borne `2026-06-07` dans `validate-reference-data.mjs` (commentaire + nom de constante)
- [ ] 1g. Supprimer les dossiers vides `.agents/` et `.codex/`
- [ ] 1h. Exclure les PDFs et `deep-research-report-ebola.md` du tracking git (`.gitignore` + `git rm --cached`)
- [ ] 1i. Vérifier que `npm run build` passe toujours

## Phase 2 — Renforcement du validateur

- [ ] 2a. Ajouter `checkNonDecreasing(counts, 'suspected_deaths')` (monotonie de la 4e série)
- [ ] 2b. Exclure les lignes `data_status = disputed` de tous les checks de monotonie
- [ ] 2c. Ajouter un groupe `entity_type` dans `labels.csv` + valider `counts.entity_type` contre ce vocabulaire
- [ ] 2d. Avertir si une ligne `health_zone` existe hors du 20 mai
- [ ] 2e. Vérifier que la validation passe (warnings attendus documentés)

## Phase 3 — Réactualisation des données (8 juin → aujourd'hui)

> Source : `INRB-UMIE/BDBV2026-Data`. Dernier point intégré : 2026-06-07.
> Flux obligatoire : staging → rapport de comparaison → validation humaine → `counts.csv`.

- [ ] 3a. Lancer `npm run update:inrb-umie:staging` (récupère le commit upstream le plus récent)
- [ ] 3b. Lire le rapport de comparaison généré (`data/staging/inrb_umie/reports/`)
- [ ] 3c. Intégrer éditorialement les nouvelles dates dans `counts.csv` (drc_total, en respectant les 4 séries et `ND` ≠ `0`)
- [ ] 3d. Ajouter les sources correspondantes dans `sources.csv`
- [ ] 3e. Ajouter les événements narratifs du 8 juin à aujourd'hui dans `events.csv` (« histoire à raconter » alignée sur les chiffres)
- [ ] 3f. Mettre à jour `data-changelog.md`
- [ ] 3g. Valider (`npm run validate:reference`)

## Phase 4 — Évolution fonctionnelle (Option D)

### 4.1 Textes (priorité)
- [ ] 4a. Revoir et enrichir les textes existants de l'app (headlines, `fact_text`, citations) — actuellement basiques et désordonnés. Textes réels, à approfondir, pas fictifs.
- [ ] 4b. Clarifier l'organisation/hiérarchie éditoriale des événements (tiers, priorités, regroupement)

### 4.2 Responsivité
- [ ] 4c. Diagnostiquer le problème de responsivité actuel
- [ ] 4d. Corriger l'affichage sur petits écrans (carte + timeline + panneau récit)

### 4.3 Design / présentation
- [ ] 4e. Revoir la présentation générale (mise en page, lisibilité)
- [ ] 4f. (Optionnel) Ajouter un linter (Biome ou ESLint+Prettier) pour cadrer le style

### 4.4 Carte — **à revoir en fonction des résultats**
- [ ] 4g. *(à arbitrer après 4.1–4.3)* Retravailler la carte : zooms, événements progressifs, données additionnelles sur la carte si nécessaire

## Phase 5 — Rituel de suivi quotidien

- [ ] 5a. Définir la procédure quotidienne : interroger la source → repérer la nouvelle histoire → mettre à jour chiffres + récit → ajouter données carto si pertinent
- [ ] 5b. Documenter ce rituel (procédure courte réutilisable)

---

## Journal d'avancement

_(rempli au fil de l'exécution)_
