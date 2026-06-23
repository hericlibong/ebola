# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : `data/staging/inrb_umie/snapshots/inrb_umie_2026-06-23_57806b0_national_counts.csv`
- Reference locale : `public/data/reference/counts.csv`
- Entite comparee : `drc_total`
- Commit upstream INRB-UMIE : `57806b0`
- Build manifest : `93c7a1d`, `2026-06-23T09:29:28+00:00`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : 127
- Dates staging : 2026-05-14 -> 2026-06-20 (35 dates distinctes)
- Dates `counts.csv` pour `drc_total` : 2026-05-14 -> 2026-06-14 (29 dates distinctes)
- Correspondances exactes champ par champ : 101
- Ecarts ou absences dans `counts.csv` : 23
- Valeurs manquantes / `ND` / lignes staging absentes : 16
- Baisses detectees dans les series staging : 20

## Couverture par metrique staging

| Champ cible | Lignes |
| --- | --- |
| `confirmed_cases` | 35 |
| `suspected_cases` | 34 |
| `confirmed_deaths` | 35 |
| `suspected_deaths` | 23 |

## Dates nouvelles dans le staging

- 2026-06-15
- 2026-06-16
- 2026-06-17
- 2026-06-18
- 2026-06-19
- 2026-06-20

## Dates presentes dans counts.csv mais absentes du staging

_Aucune._

## Ecarts et valeurs absentes dans counts.csv

| Date | Champ | INRB-UMIE staging | counts.csv | Type |
| --- | --- | --- | --- | --- |
| 2026-05-30 | `confirmed_cases` | 282 | 238 | different value |
| 2026-06-15 | `confirmed_cases` | 837 | missing | value absent from counts.csv |
| 2026-06-15 | `suspected_cases` | 235 | missing | value absent from counts.csv |
| 2026-06-15 | `confirmed_deaths` | 196 | missing | value absent from counts.csv |
| 2026-06-16 | `confirmed_cases` | 875 | missing | value absent from counts.csv |
| 2026-06-16 | `suspected_cases` | 192 | missing | value absent from counts.csv |
| 2026-06-16 | `confirmed_deaths` | 202 | missing | value absent from counts.csv |
| 2026-06-17 | `confirmed_cases` | 896 | missing | value absent from counts.csv |
| 2026-06-17 | `suspected_cases` | 151 | missing | value absent from counts.csv |
| 2026-06-17 | `confirmed_deaths` | 232 | missing | value absent from counts.csv |
| 2026-06-17 | `suspected_deaths` | 35 | missing | value absent from counts.csv |
| 2026-06-18 | `confirmed_cases` | 933 | missing | value absent from counts.csv |
| 2026-06-18 | `suspected_cases` | 238 | missing | value absent from counts.csv |
| 2026-06-18 | `confirmed_deaths` | 245 | missing | value absent from counts.csv |
| 2026-06-18 | `suspected_deaths` | 54 | missing | value absent from counts.csv |
| 2026-06-19 | `confirmed_cases` | 956 | missing | value absent from counts.csv |
| 2026-06-19 | `suspected_cases` | 162 | missing | value absent from counts.csv |
| 2026-06-19 | `confirmed_deaths` | 247 | missing | value absent from counts.csv |
| 2026-06-19 | `suspected_deaths` | 47 | missing | value absent from counts.csv |
| 2026-06-20 | `confirmed_cases` | 1003 | missing | value absent from counts.csv |
| 2026-06-20 | `suspected_cases` | 201 | missing | value absent from counts.csv |
| 2026-06-20 | `confirmed_deaths` | 254 | missing | value absent from counts.csv |
| 2026-06-20 | `suspected_deaths` | 30 | missing | value absent from counts.csv |

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
| 2026-06-15 | `suspected_deaths` | staging missing/ND | missing |
| 2026-06-16 | `suspected_deaths` | staging missing/ND | missing |

## Baisses de cumul detectees dans le staging

| Champ | Date precedente | Valeur precedente | Date suivante | Valeur suivante | Baisse |
| --- | --- | --- | --- | --- | --- |
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
| `suspected_cases` | 2026-06-11 | 168 | 2026-06-13 | 136 | 32 |
| `suspected_cases` | 2026-06-15 | 235 | 2026-06-16 | 192 | 43 |
| `suspected_cases` | 2026-06-16 | 192 | 2026-06-17 | 151 | 41 |
| `suspected_cases` | 2026-06-18 | 238 | 2026-06-19 | 162 | 76 |
| `suspected_deaths` | 2026-05-26 | 246 | 2026-05-27 | 223 | 23 |
| `suspected_deaths` | 2026-06-01 | 242 | 2026-06-11 | 64 | 178 |
| `suspected_deaths` | 2026-06-11 | 64 | 2026-06-13 | 49 | 15 |
| `suspected_deaths` | 2026-06-14 | 54 | 2026-06-17 | 35 | 19 |
| `suspected_deaths` | 2026-06-18 | 54 | 2026-06-19 | 47 | 7 |
| `suspected_deaths` | 2026-06-19 | 47 | 2026-06-20 | 30 | 17 |

## Points de vigilance editoriale

- Les deces confirmes et les deces suspects restent deux series separees. Aucune ligne de ce rapport ne doit etre transformee en champ generique `deaths`.
- Les valeurs `ND` signifient non rapporte, pas zero.
- Les baisses des series suspectes peuvent correspondre a des reclassements, revisions ou changements de definition ; elles demandent une note avant integration.
- Les baisses des series confirmees doivent etre arbitrees avant toute reprise, sauf correction retroactive explicite.
- Les ecarts avec les donnees actuellement validees ne doivent pas etre resolus automatiquement. Ils doivent passer par validation humaine.

## Decision pour la suite

Ce rapport ne valide aucune ligne pour `counts.csv`. Si les ecarts sont acceptes, l'integration editoriale doit etre faite dans une etape separee.
