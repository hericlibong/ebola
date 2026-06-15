# Rapport de comparaison INRB-UMIE

## Snapshot compare

- Snapshot staging : `data/staging/inrb_umie/snapshots/inrb_umie_2026-06-08_fd27d5c_national_counts.csv`
- Reference locale : `public/data/reference/counts.csv`
- Entite comparee : `drc_total`
- Commit upstream INRB-UMIE : `fd27d5c`
- Build manifest : `979a344`, `2026-06-08T11:55:28+00:00`
- Statut : comparaison de travail, aucune validation editoriale automatique

## Resume

- Lignes staging : 81
- Dates staging : 2026-05-14 -> 2026-06-06 (22 dates distinctes)
- Dates `counts.csv` pour `drc_total` : 2026-05-15 -> 2026-06-05 (15 dates distinctes)
- Correspondances exactes champ par champ : 1
- Ecarts ou absences dans `counts.csv` : 78
- Valeurs manquantes / `ND` / lignes staging absentes : 10
- Baisses detectees dans les series staging : 10

## Couverture par metrique staging

| Champ cible | Lignes |
|---|---:|
| `confirmed_cases` | 22 |
| `suspected_cases` | 21 |
| `confirmed_deaths` | 22 |
| `suspected_deaths` | 16 |

## Dates nouvelles dans le staging

- 2026-05-14
- 2026-05-17
- 2026-05-18
- 2026-05-19
- 2026-05-21
- 2026-05-23
- 2026-05-24
- 2026-06-06

## Dates presentes dans counts.csv mais absentes du staging

- 2026-05-15

## Ecarts et valeurs absentes dans counts.csv

| Date | Champ | INRB-UMIE staging | counts.csv | Type |
|---|---|---:|---:|---|
| 2026-05-14 | `confirmed_cases` | 8 | missing | value absent from counts.csv |
| 2026-05-14 | `suspected_cases` | 246 | missing | value absent from counts.csv |
| 2026-05-14 | `confirmed_deaths` | 4 | missing | value absent from counts.csv |
| 2026-05-17 | `confirmed_cases` | 13 | missing | value absent from counts.csv |
| 2026-05-17 | `suspected_cases` | 246 | missing | value absent from counts.csv |
| 2026-05-17 | `confirmed_deaths` | 4 | missing | value absent from counts.csv |
| 2026-05-18 | `confirmed_cases` | 33 | missing | value absent from counts.csv |
| 2026-05-18 | `suspected_cases` | 516 | missing | value absent from counts.csv |
| 2026-05-18 | `confirmed_deaths` | 4 | missing | value absent from counts.csv |
| 2026-05-18 | `suspected_deaths` | 131 | missing | value absent from counts.csv |
| 2026-05-19 | `confirmed_cases` | 51 | missing | value absent from counts.csv |
| 2026-05-19 | `suspected_cases` | 575 | missing | value absent from counts.csv |
| 2026-05-19 | `confirmed_deaths` | 4 | missing | value absent from counts.csv |
| 2026-05-19 | `suspected_deaths` | 148 | missing | value absent from counts.csv |
| 2026-05-20 | `confirmed_cases` | 64 | 51 | different value |
| 2026-05-20 | `suspected_cases` | 671 | 575 | different value |
| 2026-05-20 | `confirmed_deaths` | 6 | missing | value absent from counts.csv |
| 2026-05-20 | `suspected_deaths` | 160 | 148 | different value |
| 2026-05-21 | `confirmed_cases` | 83 | missing | value absent from counts.csv |
| 2026-05-21 | `suspected_cases` | 746 | missing | value absent from counts.csv |
| 2026-05-21 | `confirmed_deaths` | 9 | missing | value absent from counts.csv |
| 2026-05-21 | `suspected_deaths` | 176 | missing | value absent from counts.csv |
| 2026-05-22 | `confirmed_cases` | 91 | 82 | different value |
| 2026-05-22 | `suspected_cases` | 867 | 750 | different value |
| 2026-05-22 | `confirmed_deaths` | 10 | missing | value absent from counts.csv |
| 2026-05-22 | `suspected_deaths` | ND | 177 | different value |
| 2026-05-23 | `confirmed_cases` | 101 | missing | value absent from counts.csv |
| 2026-05-23 | `suspected_cases` | 904 | missing | value absent from counts.csv |
| 2026-05-23 | `confirmed_deaths` | 10 | missing | value absent from counts.csv |
| 2026-05-23 | `suspected_deaths` | 220 | missing | value absent from counts.csv |
| 2026-05-24 | `confirmed_cases` | 105 | missing | value absent from counts.csv |
| 2026-05-24 | `suspected_cases` | 906 | missing | value absent from counts.csv |
| 2026-05-24 | `confirmed_deaths` | 10 | missing | value absent from counts.csv |
| 2026-05-24 | `suspected_deaths` | 223 | missing | value absent from counts.csv |
| 2026-05-25 | `confirmed_cases` | 106 | missing | value absent from counts.csv |
| 2026-05-25 | `suspected_cases` | 998 | 904 | different value |
| 2026-05-25 | `confirmed_deaths` | 12 | missing | value absent from counts.csv |
| 2026-05-25 | `suspected_deaths` | 238 | 119 | different value |
| 2026-05-26 | `confirmed_cases` | 121 | missing | value absent from counts.csv |
| 2026-05-26 | `suspected_cases` | 1077 | 900 | different value |
| 2026-05-26 | `confirmed_deaths` | 17 | missing | value absent from counts.csv |
| 2026-05-26 | `suspected_deaths` | 246 | 223 | different value |
| 2026-05-27 | `confirmed_cases` | 125 | 100 | different value |
| 2026-05-27 | `suspected_cases` | 906 | 1000 | different value |
| 2026-05-27 | `confirmed_deaths` | 17 | missing | value absent from counts.csv |
| 2026-05-27 | `suspected_deaths` | 223 | 220 | different value |
| 2026-05-28 | `confirmed_cases` | 210 | missing | value absent from counts.csv |
| 2026-05-28 | `suspected_cases` | 349 | 1000 | different value |
| 2026-05-28 | `confirmed_deaths` | 17 | missing | value absent from counts.csv |
| 2026-05-28 | `suspected_deaths` | 236 | 223 / 238 | different value |
| 2026-05-29 | `confirmed_cases` | 263 | 203 | different value |
| 2026-05-29 | `suspected_cases` | 349 | 1139 | different value |
| 2026-05-29 | `confirmed_deaths` | 42 | 17 | different value |
| 2026-05-29 | `suspected_deaths` | 236 | 246 | different value |
| 2026-05-30 | `confirmed_cases` | 238 | 254 | different value |
| 2026-05-30 | `suspected_cases` | 321 | 1199 | different value |
| 2026-05-30 | `suspected_deaths` | 236 | 259 | different value |
| 2026-05-31 | `confirmed_cases` | 321 | 282 | different value |
| 2026-05-31 | `suspected_cases` | 220 | 321 | different value |
| 2026-05-31 | `confirmed_deaths` | 48 | 42 | different value |
| 2026-06-01 | `confirmed_cases` | 344 | 321 | different value |
| 2026-06-01 | `suspected_cases` | 289 | 321 | different value |
| 2026-06-01 | `confirmed_deaths` | 60 | 48 | different value |
| 2026-06-01 | `suspected_deaths` | 242 | missing | value absent from counts.csv |
| 2026-06-02 | `confirmed_cases` | 363 | 344 | different value |
| 2026-06-02 | `suspected_cases` | 206 | 225 | different value |
| 2026-06-02 | `confirmed_deaths` | 62 | 60 | different value |
| 2026-06-03 | `confirmed_cases` | 381 | 363 | different value |
| 2026-06-03 | `confirmed_deaths` | 64 | 62 | different value |
| 2026-06-04 | `confirmed_cases` | 452 | 381 | different value |
| 2026-06-04 | `suspected_cases` | 153 | 308 | different value |
| 2026-06-04 | `confirmed_deaths` | 82 | 62 | different value |
| 2026-06-05 | `confirmed_cases` | 488 | 486 | different value |
| 2026-06-05 | `suspected_cases` | 119 | 308 | different value |
| 2026-06-05 | `confirmed_deaths` | 86 | 78 | different value |
| 2026-06-06 | `confirmed_cases` | 515 | missing | value absent from counts.csv |
| 2026-06-06 | `suspected_cases` | 117 | missing | value absent from counts.csv |
| 2026-06-06 | `confirmed_deaths` | 91 | missing | value absent from counts.csv |

## Valeurs manquantes ou ND cote staging

| Date | Champ | Staging | counts.csv |
|---|---|---|---|
| 2026-05-14 | `suspected_deaths` | staging ND | missing |
| 2026-05-17 | `suspected_deaths` | staging ND | missing |
| 2026-05-22 | `suspected_deaths` | staging ND | 177 |
| 2026-05-31 | `suspected_deaths` | no staging row | missing |
| 2026-06-02 | `suspected_deaths` | no staging row | 259 |
| 2026-06-03 | `suspected_cases` | no staging row | 308 |
| 2026-06-03 | `suspected_deaths` | no staging row | 259 |
| 2026-06-04 | `suspected_deaths` | no staging row | 259 |
| 2026-06-05 | `suspected_deaths` | no staging row | 259 |
| 2026-06-06 | `suspected_deaths` | no staging row | missing |

## Baisses de cumul detectees dans le staging

| Champ | Date precedente | Valeur precedente | Date suivante | Valeur suivante | Baisse |
|---|---|---:|---|---:|---:|
| `confirmed_cases` | 2026-05-29 | 263 | 2026-05-30 | 238 | 25 |
| `suspected_cases` | 2026-05-26 | 1077 | 2026-05-27 | 906 | 171 |
| `suspected_cases` | 2026-05-27 | 906 | 2026-05-28 | 349 | 557 |
| `suspected_cases` | 2026-05-29 | 349 | 2026-05-30 | 321 | 28 |
| `suspected_cases` | 2026-05-30 | 321 | 2026-05-31 | 220 | 101 |
| `suspected_cases` | 2026-06-01 | 289 | 2026-06-02 | 206 | 83 |
| `suspected_cases` | 2026-06-02 | 206 | 2026-06-04 | 153 | 53 |
| `suspected_cases` | 2026-06-04 | 153 | 2026-06-05 | 119 | 34 |
| `suspected_cases` | 2026-06-05 | 119 | 2026-06-06 | 117 | 2 |
| `suspected_deaths` | 2026-05-26 | 246 | 2026-05-27 | 223 | 23 |

## Points de vigilance editoriale

- Les deces confirmes et les deces suspects restent deux series separees. Aucune ligne de ce rapport ne doit etre transformee en champ generique `deaths`.
- Les valeurs `ND` de `suspected_deaths` signifient non rapporte, pas zero.
- Les fortes baisses des series suspectes peuvent correspondre a des reclassements, revisions ou changements de definition ; elles demandent une note avant integration.
- La baisse `confirmed_cases` detectee dans le staging entre le 29 et le 30 mai doit etre arbitree avant toute reprise, car un cumul confirme devrait normalement etre monotone sauf correction retroactive explicite.
- Les ecarts avec Africa CDC, OMS ou les documents locaux ne doivent pas etre resolus automatiquement. Ils doivent passer par validation humaine.

## Decision pour la suite

Ce rapport complete la phase 3 comme document de comparaison. Il ne valide aucune ligne pour `counts.csv`. La prochaine etape est la phase 4 : renforcer les controles automatiques pour empecher le melange des deces confirmes et suspects, et signaler les incoherences de series.
