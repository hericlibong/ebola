# Consolidation phase 5

## Verifications effectuees

- Validation structurelle des CSV avec `npm run validate:data`.
- Build TypeScript/Vite avec `npm run build`.
- Verification HTTP du serveur local sur `http://127.0.0.1:5173`.
- Relecture de coherence entre :
  - `places.csv`
  - `events.csv`
  - `flows.csv`
  - `zone_counts.csv`
- Documentation des limites connues dans `docs/known-limits.md`.
- Preparation d'une note courte de presentation dans `docs/v1-presentation.md`.

## Correction realisee

La validation a detecte une erreur dans `zone_counts.csv` sur la ligne `mongbwalu` : une virgule de trop decalait les colonnes `source_label`, `confidence` et `data_status`.

Correction :

- `source_label` redevient `INSP SitRep 20 mai`.
- `confidence` redevient `medium`.
- `data_status` redevient `provisional`.

## Resultat

La v1 est techniquement coherentisee :

- 11 lieux valides ;
- 6 evenements valides ;
- 3 flux valides ;
- 7 lignes de comptage valides.

Le build passe. Le seul avertissement restant concerne la taille du bundle MapLibre, acceptable pour cette v1.

## Reserve

Les tests desktop/mobile restent des verifications fonctionnelles de premier niveau. Il faudra ajouter plus tard de vrais tests navigateur automatises et une revue visuelle approfondie.
