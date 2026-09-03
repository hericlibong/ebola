# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : `data/staging/inrb_umie/snapshots/inrb_umie_2026-09-03_23ab727_national_counts.csv`
- Reference locale : `public/data/reference/counts.csv`
- Entite comparee : `drc_total`
- Commit upstream INRB-UMIE : `23ab727`
- Build manifest : `eccd59a`, `2026-09-02T12:47:36+00:00`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : 286
- Dates staging : 2026-05-14 -> 2026-09-01 (87 dates distinctes)
- Dates `counts.csv` pour `drc_total` : 2026-05-14 -> 2026-08-28 (84 dates distinctes)
- Correspondances exactes champ par champ : 276
- Ecarts ou absences dans `counts.csv` : 7
- Valeurs manquantes / `ND` / lignes staging absentes : 65
- Baisses detectees dans les series staging : 43

## Couverture par metrique staging

| Champ cible | Lignes |
| --- | --- |
| `confirmed_cases` | 87 |
| `suspected_cases` | 70 |
| `confirmed_deaths` | 87 |
| `suspected_deaths` | 42 |

## Dates nouvelles dans le staging

- 2026-08-30
- 2026-08-31
- 2026-09-01

## Dates presentes dans counts.csv mais absentes du staging

_Aucune._

## Ecarts et valeurs absentes dans counts.csv

| Date | Champ | INRB-UMIE staging | counts.csv | Type |
| --- | --- | --- | --- | --- |
| 2026-05-30 | `confirmed_cases` | 282 | 238 | different value |
| 2026-08-30 | `confirmed_cases` | 6100 | missing | value absent from counts.csv |
| 2026-08-30 | `confirmed_deaths` | 2950 | missing | value absent from counts.csv |
| 2026-08-31 | `confirmed_cases` | 6186 | missing | value absent from counts.csv |
| 2026-08-31 | `confirmed_deaths` | 3007 | missing | value absent from counts.csv |
| 2026-09-01 | `confirmed_cases` | 6250 | missing | value absent from counts.csv |
| 2026-09-01 | `confirmed_deaths` | 3039 | missing | value absent from counts.csv |

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
| 2026-07-13 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-15 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-17 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-18 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-19 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-20 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-22 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-23 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-25 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-26 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-27 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-30 | `suspected_deaths` | staging missing/ND | missing |
| 2026-07-31 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-01 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-02 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-03 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-04 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-08 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-08 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-09 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-09 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-10 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-10 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-11 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-11 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-15 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-15 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-17 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-17 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-19 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-19 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-20 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-20 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-22 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-22 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-24 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-24 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-25 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-25 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-26 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-26 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-28 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-28 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-30 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-30 | `suspected_deaths` | staging missing/ND | missing |
| 2026-08-31 | `suspected_cases` | staging missing/ND | missing |
| 2026-08-31 | `suspected_deaths` | staging missing/ND | missing |
| 2026-09-01 | `suspected_cases` | staging missing/ND | missing |
| 2026-09-01 | `suspected_deaths` | staging missing/ND | missing |

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
| `suspected_cases` | 2026-06-21 | 202 | 2026-06-22 | 131 | 71 |
| `suspected_cases` | 2026-06-25 | 265 | 2026-06-27 | 239 | 26 |
| `suspected_cases` | 2026-06-29 | 309 | 2026-06-30 | 301 | 8 |
| `suspected_cases` | 2026-06-30 | 301 | 2026-07-01 | 150 | 151 |
| `suspected_cases` | 2026-07-02 | 213 | 2026-07-03 | 185 | 28 |
| `suspected_cases` | 2026-07-04 | 354 | 2026-07-05 | 135 | 219 |
| `suspected_cases` | 2026-07-07 | 304 | 2026-07-08 | 227 | 77 |
| `suspected_cases` | 2026-07-11 | 299 | 2026-07-13 | 268 | 31 |
| `suspected_cases` | 2026-07-15 | 389 | 2026-07-17 | 236 | 153 |
| `suspected_cases` | 2026-07-17 | 236 | 2026-07-18 | 192 | 44 |
| `suspected_cases` | 2026-07-20 | 322 | 2026-07-22 | 318 | 4 |
| `suspected_cases` | 2026-07-22 | 318 | 2026-07-23 | 315 | 3 |
| `suspected_cases` | 2026-07-25 | 340 | 2026-07-26 | 326 | 14 |
| `suspected_cases` | 2026-07-26 | 326 | 2026-07-27 | 321 | 5 |
| `suspected_cases` | 2026-07-30 | 374 | 2026-07-31 | 321 | 53 |
| `suspected_cases` | 2026-07-31 | 321 | 2026-08-01 | 227 | 94 |
| `suspected_cases` | 2026-08-03 | 301 | 2026-08-04 | 270 | 31 |
| `suspected_deaths` | 2026-05-26 | 246 | 2026-05-27 | 223 | 23 |
| `suspected_deaths` | 2026-06-01 | 242 | 2026-06-11 | 64 | 178 |
| `suspected_deaths` | 2026-06-11 | 64 | 2026-06-13 | 49 | 15 |
| `suspected_deaths` | 2026-06-14 | 54 | 2026-06-17 | 35 | 19 |
| `suspected_deaths` | 2026-06-18 | 54 | 2026-06-19 | 47 | 7 |
| `suspected_deaths` | 2026-06-19 | 47 | 2026-06-20 | 30 | 17 |
| `suspected_deaths` | 2026-06-21 | 60 | 2026-06-22 | 44 | 16 |
| `suspected_deaths` | 2026-06-23 | 45 | 2026-06-24 | 40 | 5 |
| `suspected_deaths` | 2026-06-25 | 77 | 2026-06-27 | 70 | 7 |
| `suspected_deaths` | 2026-06-30 | 90 | 2026-07-01 | 41 | 49 |
| `suspected_deaths` | 2026-07-04 | 110 | 2026-07-05 | 23 | 87 |
| `suspected_deaths` | 2026-07-07 | 92 | 2026-07-08 | 60 | 32 |

## Points de vigilance editoriale

- Les deces confirmes et les deces suspects restent deux series separees. Aucune ligne de ce rapport ne doit etre transformee en champ generique `deaths`.
- Les valeurs `ND` signifient non rapporte, pas zero.
- Les baisses des series suspectes peuvent correspondre a des reclassements, revisions ou changements de definition ; elles demandent une note avant integration.
- Les baisses des series confirmees doivent etre arbitrees avant toute reprise, sauf correction retroactive explicite.
- Les ecarts avec les donnees actuellement validees ne doivent pas etre resolus automatiquement. Ils doivent passer par validation humaine.

## Decision pour la suite

Ce rapport ne valide aucune ligne pour `counts.csv`. Si les ecarts sont acceptes, l'integration editoriale doit etre faite dans une etape separee.
