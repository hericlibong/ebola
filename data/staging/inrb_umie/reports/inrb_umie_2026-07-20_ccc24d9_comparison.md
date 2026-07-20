# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : `data/staging/inrb_umie/snapshots/inrb_umie_2026-07-20_ccc24d9_national_counts.csv`
- Reference locale : `public/data/reference/counts.csv`
- Entite comparee : `drc_total`
- Commit upstream INRB-UMIE : `ccc24d9`
- Build manifest : `b00847b`, `2026-07-17T10:03:12+00:00`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : 209
- Dates staging : 2026-05-14 -> 2026-07-15 (56 dates distinctes)
- Dates `counts.csv` pour `drc_total` : 2026-05-14 -> 2026-06-18 (33 dates distinctes)
- Correspondances exactes champ par champ : 115
- Ecarts ou absences dans `counts.csv` : 91
- Valeurs manquantes / `ND` / lignes staging absentes : 18
- Baisses detectees dans les series staging : 34

## Couverture par metrique staging

| Champ cible | Lignes |
| --- | --- |
| `confirmed_cases` | 56 |
| `suspected_cases` | 55 |
| `confirmed_deaths` | 56 |
| `suspected_deaths` | 42 |

## Dates nouvelles dans le staging

- 2026-06-19
- 2026-06-20
- 2026-06-21
- 2026-06-22
- 2026-06-23
- 2026-06-24
- 2026-06-25
- 2026-06-27
- 2026-06-29
- 2026-06-30
- 2026-07-01
- 2026-07-02
- 2026-07-03
- 2026-07-04
- 2026-07-05
- 2026-07-06
- 2026-07-07
- 2026-07-08
- 2026-07-09
- 2026-07-10
- 2026-07-11
- 2026-07-13
- 2026-07-15

## Dates presentes dans counts.csv mais absentes du staging

_Aucune._

## Ecarts et valeurs absentes dans counts.csv

| Date | Champ | INRB-UMIE staging | counts.csv | Type |
| --- | --- | --- | --- | --- |
| 2026-05-30 | `confirmed_cases` | 282 | 238 | different value |
| 2026-06-19 | `confirmed_cases` | 956 | missing | value absent from counts.csv |
| 2026-06-19 | `suspected_cases` | 162 | missing | value absent from counts.csv |
| 2026-06-19 | `confirmed_deaths` | 247 | missing | value absent from counts.csv |
| 2026-06-19 | `suspected_deaths` | 47 | missing | value absent from counts.csv |
| 2026-06-20 | `confirmed_cases` | 1003 | missing | value absent from counts.csv |
| 2026-06-20 | `suspected_cases` | 201 | missing | value absent from counts.csv |
| 2026-06-20 | `confirmed_deaths` | 254 | missing | value absent from counts.csv |
| 2026-06-20 | `suspected_deaths` | 30 | missing | value absent from counts.csv |
| 2026-06-21 | `confirmed_cases` | 1048 | missing | value absent from counts.csv |
| 2026-06-21 | `suspected_cases` | 202 | missing | value absent from counts.csv |
| 2026-06-21 | `confirmed_deaths` | 267 | missing | value absent from counts.csv |
| 2026-06-21 | `suspected_deaths` | 60 | missing | value absent from counts.csv |
| 2026-06-22 | `confirmed_cases` | 1094 | missing | value absent from counts.csv |
| 2026-06-22 | `suspected_cases` | 131 | missing | value absent from counts.csv |
| 2026-06-22 | `confirmed_deaths` | 277 | missing | value absent from counts.csv |
| 2026-06-22 | `suspected_deaths` | 44 | missing | value absent from counts.csv |
| 2026-06-23 | `confirmed_cases` | 1118 | missing | value absent from counts.csv |
| 2026-06-23 | `suspected_cases` | 138 | missing | value absent from counts.csv |
| 2026-06-23 | `confirmed_deaths` | 291 | missing | value absent from counts.csv |
| 2026-06-23 | `suspected_deaths` | 45 | missing | value absent from counts.csv |
| 2026-06-24 | `confirmed_cases` | 1155 | missing | value absent from counts.csv |
| 2026-06-24 | `suspected_cases` | 154 | missing | value absent from counts.csv |
| 2026-06-24 | `confirmed_deaths` | 304 | missing | value absent from counts.csv |
| 2026-06-24 | `suspected_deaths` | 40 | missing | value absent from counts.csv |
| 2026-06-25 | `confirmed_cases` | 1203 | missing | value absent from counts.csv |
| 2026-06-25 | `suspected_cases` | 265 | missing | value absent from counts.csv |
| 2026-06-25 | `confirmed_deaths` | 321 | missing | value absent from counts.csv |
| 2026-06-25 | `suspected_deaths` | 77 | missing | value absent from counts.csv |
| 2026-06-27 | `confirmed_cases` | 1274 | missing | value absent from counts.csv |
| 2026-06-27 | `suspected_cases` | 239 | missing | value absent from counts.csv |
| 2026-06-27 | `confirmed_deaths` | 360 | missing | value absent from counts.csv |
| 2026-06-27 | `suspected_deaths` | 70 | missing | value absent from counts.csv |
| 2026-06-29 | `confirmed_cases` | 1333 | missing | value absent from counts.csv |
| 2026-06-29 | `suspected_cases` | 309 | missing | value absent from counts.csv |
| 2026-06-29 | `confirmed_deaths` | 399 | missing | value absent from counts.csv |
| 2026-06-29 | `suspected_deaths` | 90 | missing | value absent from counts.csv |
| 2026-06-30 | `confirmed_cases` | 1406 | missing | value absent from counts.csv |
| 2026-06-30 | `suspected_cases` | 301 | missing | value absent from counts.csv |
| 2026-06-30 | `confirmed_deaths` | 438 | missing | value absent from counts.csv |
| 2026-06-30 | `suspected_deaths` | 90 | missing | value absent from counts.csv |
| 2026-07-01 | `confirmed_cases` | 1460 | missing | value absent from counts.csv |
| 2026-07-01 | `suspected_cases` | 150 | missing | value absent from counts.csv |
| 2026-07-01 | `confirmed_deaths` | 452 | missing | value absent from counts.csv |
| 2026-07-01 | `suspected_deaths` | 41 | missing | value absent from counts.csv |
| 2026-07-02 | `confirmed_cases` | 1502 | missing | value absent from counts.csv |
| 2026-07-02 | `suspected_cases` | 213 | missing | value absent from counts.csv |
| 2026-07-02 | `confirmed_deaths` | 473 | missing | value absent from counts.csv |
| 2026-07-02 | `suspected_deaths` | 63 | missing | value absent from counts.csv |
| 2026-07-03 | `confirmed_cases` | 1528 | missing | value absent from counts.csv |
| 2026-07-03 | `suspected_cases` | 185 | missing | value absent from counts.csv |
| 2026-07-03 | `confirmed_deaths` | 492 | missing | value absent from counts.csv |
| 2026-07-03 | `suspected_deaths` | 67 | missing | value absent from counts.csv |
| 2026-07-04 | `confirmed_cases` | 1561 | missing | value absent from counts.csv |
| 2026-07-04 | `suspected_cases` | 354 | missing | value absent from counts.csv |
| 2026-07-04 | `confirmed_deaths` | 506 | missing | value absent from counts.csv |
| 2026-07-04 | `suspected_deaths` | 110 | missing | value absent from counts.csv |
| 2026-07-05 | `confirmed_cases` | 1624 | missing | value absent from counts.csv |
| 2026-07-05 | `suspected_cases` | 135 | missing | value absent from counts.csv |
| 2026-07-05 | `confirmed_deaths` | 521 | missing | value absent from counts.csv |
| 2026-07-05 | `suspected_deaths` | 23 | missing | value absent from counts.csv |
| 2026-07-06 | `confirmed_cases` | 1708 | missing | value absent from counts.csv |
| 2026-07-06 | `suspected_cases` | 237 | missing | value absent from counts.csv |
| 2026-07-06 | `confirmed_deaths` | 580 | missing | value absent from counts.csv |
| 2026-07-06 | `suspected_deaths` | 70 | missing | value absent from counts.csv |
| 2026-07-07 | `confirmed_cases` | 1759 | missing | value absent from counts.csv |
| 2026-07-07 | `suspected_cases` | 304 | missing | value absent from counts.csv |
| 2026-07-07 | `confirmed_deaths` | 600 | missing | value absent from counts.csv |
| 2026-07-07 | `suspected_deaths` | 92 | missing | value absent from counts.csv |
| 2026-07-08 | `confirmed_cases` | 1792 | missing | value absent from counts.csv |
| 2026-07-08 | `suspected_cases` | 227 | missing | value absent from counts.csv |
| 2026-07-08 | `confirmed_deaths` | 625 | missing | value absent from counts.csv |
| 2026-07-08 | `suspected_deaths` | 60 | missing | value absent from counts.csv |
| 2026-07-09 | `confirmed_cases` | 1830 | missing | value absent from counts.csv |
| 2026-07-09 | `suspected_cases` | 284 | missing | value absent from counts.csv |
| 2026-07-09 | `confirmed_deaths` | 648 | missing | value absent from counts.csv |
| 2026-07-09 | `suspected_deaths` | 81 | missing | value absent from counts.csv |
| 2026-07-10 | `confirmed_cases` | 1873 | missing | value absent from counts.csv |
| 2026-07-10 | `suspected_cases` | 299 | missing | value absent from counts.csv |
| 2026-07-10 | `confirmed_deaths` | 672 | missing | value absent from counts.csv |
| 2026-07-10 | `suspected_deaths` | 91 | missing | value absent from counts.csv |
| 2026-07-11 | `confirmed_cases` | 1926 | missing | value absent from counts.csv |
| 2026-07-11 | `suspected_cases` | 299 | missing | value absent from counts.csv |
| 2026-07-11 | `confirmed_deaths` | 702 | missing | value absent from counts.csv |
| 2026-07-11 | `suspected_deaths` | 91 | missing | value absent from counts.csv |
| 2026-07-13 | `confirmed_cases` | 2011 | missing | value absent from counts.csv |
| 2026-07-13 | `suspected_cases` | 268 | missing | value absent from counts.csv |
| 2026-07-13 | `confirmed_deaths` | 754 | missing | value absent from counts.csv |
| 2026-07-15 | `confirmed_cases` | 2124 | missing | value absent from counts.csv |
| 2026-07-15 | `suspected_cases` | 389 | missing | value absent from counts.csv |
| 2026-07-15 | `confirmed_deaths` | 828 | missing | value absent from counts.csv |

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
