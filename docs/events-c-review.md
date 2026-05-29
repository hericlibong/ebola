# Revue phase C - `events.csv`

## Objectif

La phase C consiste a nettoyer et renforcer le fichier maitre :

`public/data/reference/events.csv`

Le but n'est pas de supprimer de la matiere, mais de distinguer ce qui doit etre central dans la future dataviz de ce qui doit rester secondaire, contextuel ou a verifier.

## Decision principale

Ajout du champ :

`display_tier`

Ce champ donne le niveau editorial d'affichage d'un evenement.

## Valeurs de `display_tier`

| Valeur | Usage |
|---|---|
| `primary` | Evenement structurant a afficher en priorite dans la timeline et/ou sur la carte. |
| `secondary` | Evenement utile, mais a afficher de maniere plus discrete. |
| `context` | Element de contexte a conserver dans les donnees, mais pas forcement a visualiser par defaut. |
| `verify` | Element prometteur ou important, mais qui demande un recoupement avant affichage principal. |

Ces valeurs sont declarees dans :

`public/data/reference/labels.csv`

## Lecture editoriale

### Evenements principaux

Les evenements `primary` structurent le recit :

- premier cas humain connu ;
- premiere alerte a Mongbwalu ;
- admission du premier cas importe a Kampala ;
- detection laboratoire non-Zaire / Bundibugyo ;
- declaration officielle de l'epidemie ;
- qualification internationale par l'OMS ;
- point INSP du 20 mai ;
- tentes incendiees a Rwampara ;
- risque OMS tres eleve au 22 mai ;
- tente incendiee a Mongbwalu et fuite de cas suspects ;
- troisieme attaque contre une structure de sante ;
- Ouganda a 7 cas ;
- appel OMS au cessez-le-feu ;
- fermeture temporaire de la frontiere ougandaise ;
- patients transportes a moto sans protection a Rwampara.

### Evenements secondaires

Les evenements `secondary` enrichissent la lecture :

- notification officielle ;
- alertes MSF ;
- reunion d'urgence ;
- prelevements ;
- deces a Kampala ;
- second cas importe ;
- extension Nyankunde ;
- changements de bilan ;
- interdiction des veillees funeraires ;
- isolement obligatoire de 21 jours ;
- aide medicale ;
- nouveaux bilans provisoires.

### Elements de contexte

Les evenements `context` doivent etre conserves mais affiches avec parcimonie :

- tensions generales autour des enterrements ;
- obligation de 30 minutes quotidiennes de sensibilisation dans les medias ougandais.

### Elements a verifier

Les evenements `verify` ne doivent pas etre au premier plan sans recoupement :

- proche du premier cas malade le 26 avril ;
- indice IFRC d'expositions possibles des mars.

## Points de vigilance

- Certains evenements restent bases sur des syntheses locales plutot que sur la source primaire.
- Les chiffres du 25 au 28 mai restent instables.
- Les citations doivent rester courtes et attribuables.
- Les entites `drc_total` et `uganda_total` sont statistiques, pas cartographiques.
- Les evenements lies aux structures de soin ne doivent pas exposer de localisations hyperprecises.

## Usage pour la v2

La future timeline pourra afficher :

- `primary` comme points majeurs ou annotations ;
- `secondary` comme points plus petits ;
- `context` dans un mode detail ou panneau lateral ;
- `verify` dans un mode expert ou une couche "a verifier".

La future carte pourra filtrer par :

- `map_layer` ;
- `timeline_group` ;
- `data_status` ;
- `confidence` ;
- `display_tier`.
