# Carte interactive v2

## Objectif

Cette phase ne definit pas une infographie statique.

Elle definit le comportement de la carte interactive a partir du fichier maitre :

`public/data/reference/events.csv`

La carte doit permettre de comprendre comment l'epidemie se deploie dans le temps et l'espace, sans forcer une lecture lineaire ou une fausse preuve de transmission.

## Principe central

La carte est pilotee par un etat interactif.

```text
etat utilisateur -> filtre temporel -> filtres editoriaux -> couches visibles -> fiche active
```

L'etat utilisateur peut venir :

- de la timeline ;
- d'un clic sur un point ;
- d'un clic sur un flux ;
- d'un changement de filtre ;
- d'une navigation par groupe narratif.

## Donnees utilisees

### Fichier maitre

`events.csv`

Il fournit :

- `date`
- `place_id`
- `event_type`
- `headline`
- `fact_text`
- `quote`
- `source_id`
- `confidence`
- `data_status`
- `display_priority`
- `display_tier`
- `map_layer`
- `timeline_group`

### Tables jointes

`places.csv`

Utilise pour transformer `place_id` en :

- nom du lieu ;
- pays ;
- province ;
- type de lieu ;
- latitude ;
- longitude ;
- precision geographique ;
- note de prudence.

`sources.csv`

Utilise pour afficher :

- titre de la source ;
- editeur ;
- date de publication ;
- URL ;
- type de source.

`flows.csv`

Utilise pour afficher :

- deplacements documentes ;
- rapatriements de corps ;
- recherches de soins ;
- corridors de risque ;
- extensions regionales.

`counts.csv`

Utilise pour afficher des bilans chiffres, mais pas comme points cartographiques par defaut.

## Etat interactif minimal

La future carte doit pouvoir etre pilotee par cet etat :

```ts
interface MapState {
  currentDate: string;
  selectedEventId: string | null;
  selectedPlaceId: string | null;
  activeTimelineGroup: string | 'all';
  activeMapLayers: string[];
  visibleTiers: string[];
  showUncertain: boolean;
  showFlows: boolean;
}
```

Valeurs par defaut recommandees :

```ts
{
  currentDate: '2026-05-28',
  selectedEventId: null,
  selectedPlaceId: null,
  activeTimelineGroup: 'all',
  activeMapLayers: ['clinical', 'alert', 'mobility', 'response', 'constraint'],
  visibleTiers: ['primary', 'secondary'],
  showUncertain: false,
  showFlows: true
}
```

## Filtre temporel

Quand la timeline avance a une date `D`, la carte affiche :

```text
events.date <= D
```

Si `date_end` existe :

```text
events.date <= D && events.date_end >= D
```

ou, pour une vue cumulative :

```text
events.date <= D
```

Decision recommandee pour la v2 :

- mode par defaut : cumulatif ;
- possibilite future : mode "jour actif".

## Filtres editoriaux

Par defaut, la carte affiche :

```text
display_tier in ['primary', 'secondary']
```

Les evenements `context` et `verify` ne doivent pas etre visibles par defaut.

Ils peuvent etre accessibles via :

- mode detail ;
- filtre "afficher les elements a verifier" ;
- panneau sources ;
- couche expert.

## Evenements affichables sur la carte

Tous les evenements de `events.csv` ne doivent pas devenir des points.

### Affichage carte par defaut

Afficher sur la carte :

- `first_known_case`
- `early_signal`
- `alert`
- `investigation`
- `lab_confirmation`
- `official_declaration`
- `cross_border_case`
- `response_measure`
- `response_constraint`
- `attack`
- `border_closure`

Afficher autrement, pas comme points ordinaires :

- `situation_update`
- `uncertainty_note`

### Cas particuliers

`situation_update`

- Si `place_id` est un vrai lieu : peut apparaitre comme point discret.
- Si `place_id` vaut `drc_total` ou `uganda_total` : afficher dans un panneau chiffres, pas sur la carte.

`uncertainty_note`

- Afficher dans le panneau d'incertitude ou en couche expert.
- Ne pas afficher comme point principal.

## Entites non cartographiques

Ces `place_id` ne doivent pas etre affiches comme points :

- `drc_total`
- `uganda_total`

Ils servent a afficher :

- bilans nationaux ;
- divergences ;
- resume de situation ;
- chiffres dans une fiche ou un encart.

Regle :

```text
if places.latitude is empty or places.longitude is empty:
  do not render as map point
```

## Couches interactives

La carte doit pouvoir filtrer les evenements par `map_layer`.

### `clinical`

Montre :

- cas connus ;
- deces ;
- bilans ;
- signaux cliniques.

Interaction :

- clic : ouvre la fiche evenement ;
- hover : affiche date, lieu, statut, chiffre si disponible.

### `alert`

Montre :

- alertes ;
- confirmations ;
- declarations.

Interaction :

- clic : ouvre la fiche evenement ;
- hover : indique le type d'alerte et le niveau de confiance.

### `mobility`

Montre :

- cas importes ;
- deplacements de patients ;
- rapatriements de corps ;
- corridors frontaliers.

Interaction :

- clic sur flux : ouvre fiche flux + evenements lies ;
- hover : rappelle que le flux ne prouve pas une transmission.

### `response`

Montre :

- mesures de controle ;
- interdictions ;
- isolement ;
- appels institutionnels.

Interaction :

- clic : explique la mesure et sa source.

### `constraint`

Montre :

- attaques ;
- incendies ;
- manque de moyens ;
- defiance ;
- acces humanitaire.

Interaction :

- clic : explique pourquoi l'evenement change la capacite de controle.

## Flux interactifs

Les flux viennent de :

`flows.csv`

Ils sont filtres par date :

```text
flows.date <= currentDate
```

et par `showFlows`.

### Regles d'interaction

Au survol :

- afficher type de flux ;
- date ;
- source ;
- niveau de confiance ;
- note de prudence.

Au clic :

- selectionner le flux ;
- mettre en avant `from_place_id` et `to_place_id` ;
- afficher les evenements associes par date et lieux ;
- afficher un avertissement si `data_status` est `reconstructed` ou `provisional`.

### Regle editoriale

Tout tooltip de flux doit inclure une phrase de prudence :

> Ce lien represente un deplacement, un corridor ou une relation documentee ; il ne prouve pas a lui seul une chaine de transmission.

## Interactions principales

### Timeline -> carte

Quand l'utilisateur selectionne une date ou un evenement dans la timeline :

1. `currentDate` est mis a jour.
2. Les evenements posterieurs disparaissent.
3. Les points et flux anterieurs restent visibles en mode cumulatif.
4. L'evenement selectionne est mis en avant.
5. La carte se recadre si l'evenement a un vrai lieu cartographique.
6. La fiche evenement affiche le texte, la source, la confiance et le statut.

### Carte -> fiche evenement

Quand l'utilisateur clique sur un point :

1. `selectedPlaceId` est mis a jour.
2. La fiche affiche les evenements lies a ce lieu jusqu'a `currentDate`.
3. Les evenements `primary` apparaissent en premier.
4. Les evenements `verify` sont separes dans une zone "a verifier".

### Point -> timeline

Quand un point est selectionne :

1. Les points de timeline correspondant a ce lieu sont mis en evidence.
2. La timeline ne change pas forcement de date.
3. L'utilisateur peut cliquer sur un evenement de la fiche pour changer la date active.

### Filtre -> carte

Quand l'utilisateur active/desactive une couche :

1. Les evenements de `map_layer` correspondant apparaissent/disparaissent.
2. Les flux restent visibles seulement si `showFlows = true`.
3. Les fiches ne perdent pas les donnees ; seules les couches visuelles changent.

## Zooms et cadrages

La carte ne doit pas zoomer brutalement a chaque interaction.

Regles recommandees :

- clic timeline sur evenement local : zoom doux vers le lieu ;
- clic sur evenement national `drc_total` ou `uganda_total` : pas de zoom local ;
- clic sur flux transfrontalier : cadrage englobant les deux lieux ;
- clic sur groupe narratif : cadrage regional ;
- selection d'un point deja visible : pas de recadrage inutile.

## Comportement par groupe narratif

### `silent_spread`

Periode : fin avril - debut mai.

Carte :

- Bunia ;
- Mongbwalu ;
- flux funeraire/reconstruit si active.

But :

- montrer l'incertitude du depart ;
- eviter le "patient zero".

### `detection_confirmation`

Periode : 5 - 17 mai.

Carte :

- Mongbwalu ;
- Rwampara ;
- Bunia ;
- Kampala si cas importe actif.

But :

- montrer le decalage alerte / confirmation / declaration.

### `regional_spread`

Periode : 18 - 20 mai.

Carte :

- Ituri ;
- Nord-Kivu ;
- Kampala ;
- eventuellement Sud-Kivu si active.

But :

- montrer que la confirmation revele deja une propagation regionale.

### `response_breakdown`

Periode : 21 - 28 mai.

Carte :

- Rwampara ;
- Mongbwalu ;
- Bunia ;
- Goma / Kivu ;
- points de contrainte.

But :

- montrer que conflit, defiance et manque de moyens reduisent la capacite de controle.

### `cross_border_control`

Periode : 25 - 28 mai.

Carte :

- Kampala ;
- frontière Ouganda/RDC ;
- corridors de controle.

But :

- montrer la reponse transfrontaliere : fermeture, isolement, controle.

## Questions a trancher avant prototypage

1. La carte v2 doit-elle etre cumulative par defaut ou centree sur une date active ?
2. Les evenements `secondary` doivent-ils etre visibles par defaut ou seulement apres zoom/interaction ?
3. Veut-on une interaction principale par date ou par chapitre narratif ?
4. Les flux doivent-ils etre visibles en permanence ou seulement quand une couche mobilite est active ?
5. Les points de bilan national doivent-ils apparaitre dans la carte sous forme d'encart ou dans un panneau separe ?

## Decision provisoire

Pour le premier prototype v2 :

- mode cumulatif ;
- afficher `primary` et `secondary` ;
- masquer `context` et `verify` par defaut ;
- utiliser `timeline_group` comme navigation principale ;
- utiliser `currentDate` comme filtre temporel ;
- afficher les flux seulement si `showFlows = true` ;
- ne pas afficher `drc_total` et `uganda_total` comme points.
