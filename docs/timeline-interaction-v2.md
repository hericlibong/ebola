# Timeline interactive v2

## Objectif

La timeline v2 n'est pas une frise decorative.

Elle est le controle principal permettant de parcourir le jeu de donnees de reference :

`public/data/reference/events.csv`

Elle doit permettre au lecteur de comprendre :

- quand l'epidemie devient visible ;
- quand la confirmation officielle arrive ;
- quand l'extension regionale se documente ;
- quand la riposte commence a etre debordee ;
- quand la crise devient transfrontaliere.

## Echelle temporelle

Periode couverte :

```text
2026-04-24 -> 2026-05-28
```

La timeline doit etre capable d'accueillir des mises a jour apres le 28 mai, mais la v2 initiale se limite a cette date.

Regle :

```text
minDate = min(events.date)
maxDate = max(events.date)
```

Pour la v2 actuelle :

```text
minDate = 2026-04-24
maxDate = 2026-05-28
```

## Format recommande

Le format recommande est une timeline horizontale compacte.

Elle peut etre :

- placee au-dessus ou au-dessous de la carte ;
- sticky dans le module interactif ;
- suffisamment compacte pour ne pas voler la place du texte ;
- lisible dans un format article.

Elle ne doit pas reprendre la timeline laterale de la v1.

## Donnees utilisees

Champs principaux lus depuis `events.csv` :

- `event_id`
- `date`
- `date_end`
- `event_type`
- `headline`
- `place_id`
- `confidence`
- `data_status`
- `display_priority`
- `display_tier`
- `map_layer`
- `timeline_group`

Tables jointes :

- `places.csv` pour le nom du lieu ;
- `sources.csv` pour la source ;
- `labels.csv` pour les libelles ;
- `counts.csv` pour les chiffres par date si besoin.

## Groupes narratifs

La timeline doit utiliser `timeline_group`.

Groupes actuels :

| Groupe | Libelle | Role narratif |
|---|---|---|
| `silent_spread` | Circulation silencieuse | Avant l'alerte officielle. |
| `detection_confirmation` | Detection et confirmation | Alerte, investigations, confirmation, declaration. |
| `regional_spread` | Extension regionale | Ituri, Nord-Kivu, Sud-Kivu, Ouganda. |
| `response_breakdown` | Riposte sous pression | Attaques, defiance, acces, moyens. |
| `cross_border_control` | Controle transfrontalier | Frontiere, isolement, quarantaine, Ouganda. |

Ces groupes doivent servir a naviguer dans l'histoire, mais sans forcer une lecture en chapitres rigides.

## Niveaux d'affichage

La timeline doit utiliser `display_tier`.

### `primary`

Affichage :

- point visible ;
- label possible ;
- annotation possible ;
- clic prioritaire.

Usage :

- jalons structurants ;
- ruptures majeures ;
- evenements utiles pour comprendre la progression.

### `secondary`

Affichage :

- point plus petit ;
- label seulement au hover ou au zoom ;
- inclus dans les fiches de detail.

Usage :

- faits utiles ;
- confirmations secondaires ;
- chiffres intermediaires.

### `context`

Affichage :

- masque par defaut ;
- visible dans un mode detail.

Usage :

- contexte social ou operationnel ;
- informations moins centrales.

### `verify`

Affichage :

- masque par defaut ;
- visible dans une couche "a verifier" ou "sources".

Usage :

- indices prometteurs ;
- signaux insuffisamment consolides ;
- hypotheses a ne pas mettre au premier plan.

## Regle d'affichage par defaut

Par defaut, la timeline affiche :

```text
display_tier in ['primary', 'secondary']
```

Les points `primary` doivent etre visuellement prioritaires.

Les points `secondary` doivent rester visibles mais discrets.

Les points `context` et `verify` sont masques par defaut.

## Interaction timeline -> carte

Quand l'utilisateur clique sur un point de timeline :

1. `selectedEventId` prend la valeur de l'evenement clique.
2. `currentDate` prend la date de l'evenement.
3. La carte filtre les evenements avec `events.date <= currentDate`.
4. L'evenement clique est mis en evidence sur la carte si son `place_id` est cartographique.
5. Les flux datés avant ou a la date active apparaissent si `showFlows = true`.
6. La fiche evenement affiche :
   - date ;
   - lieu ;
   - fait ;
   - citation si presente ;
   - source ;
   - confiance ;
   - statut ;
   - note.

## Interaction groupe -> carte

Quand l'utilisateur clique sur un groupe narratif :

1. `activeTimelineGroup` prend la valeur du groupe.
2. La timeline met en avant les evenements de ce groupe.
3. La carte peut filtrer ou attenuer les autres groupes.
4. Le cadrage carte se place sur la zone pertinente du groupe.

Comportement recommande :

- ne pas cacher brutalement tout le reste ;
- attenuer les autres groupes ;
- permettre de revenir a `all`.

## Interaction carte -> timeline

Quand l'utilisateur clique sur un point de carte :

1. `selectedPlaceId` prend la valeur du lieu clique.
2. La timeline met en evidence les evenements lies a ce lieu.
3. Les autres evenements restent visibles.
4. Une fiche liste les evenements du lieu par date.

Quand l'utilisateur clique sur un evenement dans cette fiche :

1. `selectedEventId` est mis a jour.
2. `currentDate` devient la date de l'evenement.
3. La timeline active ce point.

## Interaction source -> timeline

Depuis une fiche evenement, le lecteur doit pouvoir ouvrir la source.

Interaction recommandee :

- clic sur source : ouvrir panneau source ;
- afficher titre, editeur, date, type, lien si disponible ;
- ne pas quitter la dataviz par defaut si on peut afficher un panneau interne.

## Points majeurs a annoter

Les evenements `primary` suivants sont de bons candidats a annotation visible :

| Date | Event id | Raison |
|---|---|---|
| 2026-04-24 | `ev_20260424_bunia_first_known` | Debut connu et incertitude sur le point de depart. |
| 2026-05-05 | `ev_20260505_mongbwalu_alert` | Premier signal d'alerte. |
| 2026-05-11 | `ev_20260511_kampala_admission` | Passage transfrontalier precoce. |
| 2026-05-14 | `ev_20260514_lab_non_zaire` | Confirmation biologique preliminaire. |
| 2026-05-15 | `ev_20260515_drc_declaration` | Declaration officielle. |
| 2026-05-20 | `ev_20260520_insp_update` | Point de bascule chiffre. |
| 2026-05-21 | `ev_20260521_rwampara_tents_burned` | Rupture de controle a Rwampara. |
| 2026-05-23 | `ev_20260523_mongbwalu_tent_burned` | 18 cas suspects s'enfuient. |
| 2026-05-25 | `ev_20260525_uganda_7_cases` | Ouganda a 7 cas. |
| 2026-05-27 | `ev_20260527_tedros_ceasefire` | Appel OMS au cessez-le-feu. |
| 2026-05-27 | `ev_20260527_uganda_border_closed` | Fermeture temporaire de la frontiere. |
| 2026-05-28 | `ev_20260528_rwampara_motorbike` | Manque de moyens visible dans le soin. |

## Points secondaires

Les evenements `secondary` doivent exister sur la timeline, mais sans surcharge :

- points plus petits ;
- label au survol ;
- inclusion dans fiche detail ;
- pas d'annotation permanente.

## Gestion des jours sans evenement

La timeline ne doit pas inventer de points pour les jours sans evenement.

Elle peut afficher :

- des ticks quotidiens discrets ;
- les evenements documentes comme points ;
- des vides assumés comme signes de documentation incomplete.

## Mode cumulatif et mode actif

### Mode cumulatif recommande pour v2

Quand une date est active, la carte affiche tout ce qui est documente jusqu'a cette date.

Avantage :

- montre l'accumulation ;
- rend lisible la propagation progressive ;
- evite de faire disparaitre des faits importants.

### Mode jour actif possible plus tard

La carte n'affiche que les evenements du jour ou de la periode active.

Usage possible :

- mode expert ;
- analyse fine ;
- comparaison jour par jour.

## Comportement mobile

Sur mobile, la timeline horizontale peut devenir :

- un ruban scrollable ;
- une liste compacte par groupes ;
- un selecteur de chapitre.

Regle :

> Le texte actif doit rester visible sans obliger le lecteur a remonter constamment.

## Questions encore ouvertes

1. La timeline doit-elle etre toujours visible ou seulement dans le module carte ?
2. Faut-il afficher les labels des points `primary` en permanence ?
3. Faut-il prevoir un bouton "voir tous les evenements" ?
4. Faut-il un mode lecture et un mode expert ?
5. Faut-il pouvoir comparer deux dates ?

## Decision provisoire

Pour le premier prototype v2 :

- timeline horizontale compacte ;
- affichage par defaut de `primary` et `secondary` ;
- `context` et `verify` masques ;
- navigation possible par `timeline_group` ;
- mode cumulatif ;
- clic timeline -> carte + fiche evenement ;
- clic carte -> liste des evenements du lieu ;
- source accessible depuis la fiche.
