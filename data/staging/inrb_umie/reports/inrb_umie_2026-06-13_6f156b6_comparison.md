# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : `data/staging/inrb_umie/snapshots/inrb_umie_2026-06-13_6f156b6_national_counts.csv`
- Reference locale : `public/data/reference/counts.csv`
- Entite comparee : `drc_total`
- Commit upstream INRB-UMIE : `6f156b6`
- Build manifest : `1dfdf1e`, `2026-06-12T20:45:16+00:00`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : 97
- Dates staging : 2026-05-14 -> 2026-06-11 (27 dates distinctes)
- Dates `counts.csv` pour `drc_total` : 2026-05-14 -> 2026-06-07 (23 dates distinctes)
- Correspondances exactes champ par champ : 81
- Ecarts ou absences dans `counts.csv` : 13
- Valeurs manquantes / `ND` / lignes staging absentes : 14
- Baisses detectees dans les series staging : 13

## Couverture par metrique staging

| Champ cible | Lignes |
| --- | --- |
| `confirmed_cases` | 27 |
| `suspected_cases` | 26 |
| `confirmed_deaths` | 27 |
| `suspected_deaths` | 17 |

## Dates nouvelles dans le staging

- 2026-06-08
- 2026-06-09
- 2026-06-10
- 2026-06-11

## Dates presentes dans counts.csv mais absentes du staging

_Aucune._

## Ecarts et valeurs absentes dans counts.csv

| Date | Champ | INRB-UMIE staging | counts.csv | Type |
| --- | --- | --- | --- | --- |
| 2026-06-08 | `confirmed_cases` | 598 | missing | value absent from counts.csv |
| 2026-06-08 | `suspected_cases` | 138 | missing | value absent from counts.csv |
| 2026-06-08 | `confirmed_deaths` | 115 | missing | value absent from counts.csv |
| 2026-06-09 | `confirmed_cases` | 635 | missing | value absent from counts.csv |
| 2026-06-09 | `suspected_cases` | 119 | missing | value absent from counts.csv |
| 2026-06-09 | `confirmed_deaths` | 127 | missing | value absent from counts.csv |
| 2026-06-10 | `confirmed_cases` | 676 | missing | value absent from counts.csv |
| 2026-06-10 | `suspected_cases` | 119 | missing | value absent from counts.csv |
| 2026-06-10 | `confirmed_deaths` | 136 | missing | value absent from counts.csv |
| 2026-06-11 | `confirmed_cases` | 689 | missing | value absent from counts.csv |
| 2026-06-11 | `suspected_cases` | 168 | missing | value absent from counts.csv |
| 2026-06-11 | `confirmed_deaths` | 139 | missing | value absent from counts.csv |
| 2026-06-11 | `suspected_deaths` | 64 | missing | value absent from counts.csv |

## Valeurs manquantes ou ND cote staging

| Date | Champ | Staging | counts.csv |
| --- | --- | --- | --- |
| 2026-05-14 | `suspected_deaths` | staging missing/ND | missing |
| 2026-05-17 | `suspected_deaths` | staging missing/ND | missing |
| 2026-05-22 | `suspected_deaths` | staging missing/ND | missing |
| 2026-05-31 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-02 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-03 | `suspected_cases` | staging missing/ND | missing |
| 2026-06-03 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-04 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-05 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-06 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-07 | `suspected_deaths` | staging missing/ND | 242 |
| 2026-06-08 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-09 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-10 | `suspected_deaths` | staging missing/ND | missing |

## Baisses de cumul detectees dans le staging

| Champ | Date precedente | Valeur precedente | Date suivante | Valeur suivante | Baisse |
| --- | --- | --- | --- | --- | --- |
| `confirmed_cases` | 2026-05-29 | 263 | 2026-05-30 | 238 | 25 |
| `suspected_cases` | 2026-05-26 | 1077 | 2026-05-27 | 906 | 171 |
| `suspected_cases` | 2026-05-27 | 906 | 2026-05-28 | 349 | 557 |
| `suspected_cases` | 2026-05-29 | 349 | 2026-05-30 | 321 | 28 |
| `suspected_cases` | 2026-05-30 | 321 | 2026-05-31 | 220 | 101 |
| `suspected_cases` | 2026-06-01 | 289 | 2026-06-02 | 206 | 83 |
| `suspected_cases` | 2026-06-02 | 206 | 2026-06-04 | 153 | 53 |
| `suspected_cases` | 2026-06-04 | 153 | 2026-06-05 | 119 | 34 |
| `suspected_cases` | 2026-06-05 | 119 | 2026-06-06 | 117 | 2 |
| `suspected_cases` | 2026-06-06 | 117 | 2026-06-07 | 94 | 23 |
| `suspected_cases` | 2026-06-08 | 138 | 2026-06-09 | 119 | 19 |
| `suspected_deaths` | 2026-05-26 | 246 | 2026-05-27 | 223 | 23 |
| `suspected_deaths` | 2026-06-01 | 242 | 2026-06-11 | 64 | 178 |

## Points de vigilance editoriale

- Les deces confirmes et les deces suspects restent deux series separees. Aucune ligne de ce rapport ne doit etre transformee en champ generique `deaths`.
- Les valeurs `ND` signifient non rapporte, pas zero.
- Les baisses des series suspectes peuvent correspondre a des reclassements, revisions ou changements de definition ; elles demandent une note avant integration.
- Les baisses des series confirmees doivent etre arbitrees avant toute reprise, sauf correction retroactive explicite.
- Les ecarts avec les donnees actuellement validees ne doivent pas etre resolus automatiquement. Ils doivent passer par validation humaine.

## Decision pour la suite

Ce rapport ne valide aucune ligne pour `counts.csv`. Si les ecarts sont acceptes, l'integration editoriale doit etre faite dans une etape separee.
