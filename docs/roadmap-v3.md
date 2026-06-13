# Roadmap V3 — Réorganisation, réactualisation, suivi quotidien

> Roadmap active de suivi. Chaque tâche réalisée est cochée au fil de l'avancement.
> Statut : **en attente du go** avant exécution.
> Créée le 2026-06-13.

## Principes directeurs (rappel)

- **Objectif de l'app** : suivre **au jour le jour** l'évolution de l'épidémie d'Ebola Bundibugyo, en racontant en parallèle les histoires qui correspondent à cette évolution.
- **Source de vérité chiffrée** : `INRB-UMIE/BDBV2026-Data` (GitHub). Rien n'est copié automatiquement dans `counts.csv` — validation humaine obligatoire.
- **Règles métier intangibles** : 4 séries distinctes (cas/décès × confirmés/suspects), `ND` ≠ `0`, exclusion des lignes `disputed`, ventilation par zone fiable au 20 mai uniquement.

---

## Phase 0 — Mise en place git ✅

- [x] Merger `feature/inrb-umie-data-source` dans `main` (établir une base propre : CLAUDE.md, audit, roadmap)
- [x] Créer une branche de travail dédiée pour les nouveaux développements (`feature/v3-reorg`)

## Phase 1 — Nettoyage (sans risque fonctionnel) ✅

- [x] 1a. Supprimer `src/map.ts` (fichier mort, MapLibre non utilisé)
- [x] 1b. Désinstaller `maplibre-gl` (`npm uninstall maplibre-gl`)
- [x] 1c. Renommer `src/staticMap.ts` → `src/map.ts` (c'est *la* carte de l'app) + ajuster l'import dans `main.ts`
- [x] 1d. Reclasser `d3-dsv` en `devDependencies`
- [x] 1e. Corriger `public/data/reference/README.md` : « jusqu'au 28 mai » → date réelle
- [x] 1f. Documenter la borne `2026-06-07` dans `validate-reference-data.mjs` (commentaire + nom de constante)
- [x] 1g. Supprimer les dossiers vides `.agents/` et `.codex/`
- [~] 1h. ~~Exclure les PDFs du tracking git~~ — **abandonné** : non bloquant, fichiers conservés tels quels (décision utilisateur)
- [x] 1i. Vérifier que `npm run build` passe toujours (bundle identique, 27.47 kB)

## Phase 2 — Renforcement du validateur ✅

- [x] 2a. Ajouter `checkNonDecreasing(counts, 'suspected_deaths')` (monotonie de la 4e série) — capte la baisse du 27 mai
- [x] 2b. Exclure les lignes `data_status = disputed` de tous les checks de monotonie (`seriesCounts`)
- [x] 2c. Ajouter un groupe `entity_type` dans `labels.csv` + valider `counts.entity_type` contre ce vocabulaire
- [x] 2d. Avertir si une ligne `health_zone` existe hors du 20 mai (`HEALTH_ZONE_REFERENCE_DATE`)
- [x] 2e. Vérifier que la validation passe (warnings attendus documentés)

## Phase 3 — Réactualisation des données (8 → 11 juin) ✅

> Source : `INRB-UMIE/BDBV2026-Data`. Snapshot `6f156b6` (build du 12 juin). L'amont s'arrête au 11 juin.
> Flux respecté : staging → rapport de comparaison → validation humaine → `counts.csv`.

- [x] 3a. Lancer `npm run update:inrb-umie:staging` (snapshot `6f156b6`)
- [x] 3b. Lire le rapport de comparaison généré (`data/staging/inrb_umie/reports/`)
- [x] 3c. Intégrer dans `counts.csv` les bilans `drc_total` du 8 au 11 juin (4 séries, `ND` → champ vide)
- [x] 3d. Ajouter la source `inrb_umie_2026_06_13_snapshot` dans `sources.csv`
- [x] 3e. Un point de situation par date (8, 9, 10, 11 juin) pour une évolution quotidienne sur la timeline, calé sur les chiffres INRB-UMIE ; **récit de terrain des jours 8-11 reste à sourcer** (la source ne fournit que les chiffres)
- [x] 3f. Mettre à jour `data-changelog.md`
- [x] 3g. Valider (`npm run validate:reference`) + build OK

## Phase 4 — Évolution fonctionnelle (Option D)

### 4.1 Textes — **déplacé vers le protocole d'enrichissement (Phase 6, post-V3)**
- [→] 4a/4b. L'enrichissement éditorial des textes ne se fait **pas** ici : il fait l'objet d'un protocole dédié en 2 phases, à exécuter **une fois toute la roadmap V3 terminée**. Voir Phase 6 et `docs/enrichment-protocol.md`. Décision actée : **affichage en français accentué**.

### 4.2 Responsivité ✅
- [x] 4c. Diagnostic : un seul breakpoint (900px) ; en dessous, annotations timeline (144px) qui débordent et encart carte (138px) trop grand
- [x] 4d. Ajout d'un palier téléphone (600px) : annotations resserrées (104px + police réduite), encart carte à 96px, paddings intro/récit/timeline réduits *(à confirmer visuellement sur petit écran)*

### 4.3 Design / présentation ✅
- [x] 4e. Assainir le CSS : 319 lignes de CSS mort supprimées (héritage MapLibre) + export `statusColor` mort retiré ; bundle CSS 12.5 kB → 8.2 kB
- [ ] 4f. (Optionnel, reporté) Ajouter un linter (Biome ou ESLint+Prettier) pour cadrer le style

### 4.4 Carte — **à revoir en fonction des résultats**
- [x] 4g. **Événements progressifs** : la carte évolue avec la timeline — les lieux pas encore atteints à la date active restent en filigrane (sans étiquette) puis se révèlent à mesure que le récit avance
- [ ] 4h. *(optionnel, à arbitrer après visualisation)* Zoom / recentrage de la carte sur le lieu actif
- [ ] 4i. *(optionnel, si besoin)* Données additionnelles sur la carte

## Phase 5 — Rituel de suivi quotidien ✅

- [x] 5a. Procédure quotidienne définie : staging chiffres → rapport → intégration `counts.csv` → point d'évolution par date → récit (Phase 6) → carto si pertinent → validation + changelog
- [x] 5b. Documentée dans `docs/daily-ritual.md` (courte, orchestre les outils/docs existants)

## Phase 6 — Protocole d'enrichissement éditorial (post-V3)

> À entamer **une fois toutes les phases V3 (0–5) terminées**. Spécifié dans `docs/enrichment-protocol.md`.
> Décision actée : textes affichés en **français accentué**. Aucun fait inventé : enrichissement sourcé.

### 6.1 — Phase A : enrichissement rétroactif (backfill)
- [ ] 6a. Pour chaque date du jeu de données (24 avril → 11 juin), jour par jour : rechercher les faits sourcés et enrichir le texte de l'événement
- [ ] 6b. Accentuer les textes affichés ; ajouter les sources ; tracer dans `data-changelog.md`

### 6.2 — Phase B : enrichissement en continu (synchronisé avec la réactualisation)
- [ ] 6c. À chaque réactualisation, pour la nouvelle date : lancer une recherche d'événements et sélectionner l'histoire la plus pertinente
- [ ] 6d. Générer/enrichir le texte au moment de l'actualisation (probablement via un **agent de recherche dédié**)
- [ ] 6e. Garde-fous : chiffres = INRB-UMIE ; récit = sources éditoriales ; jamais d'invention

---

## Journal d'avancement

_(rempli au fil de l'exécution)_
