# Maquette visuelle v2

## Objectif

La phase F transforme le brouillon plein ecran de la v1 en module editorial integrable dans une page d'article.

La maquette ne cherche pas encore a etre publiable. Elle sert a tester une direction visuelle et interactive fondee sur les specs precedentes :

- `docs/map-interaction-v2.md`
- `docs/timeline-interaction-v2.md`
- `public/data/reference/events.csv`

## Decisions appliquees

### Format

Le plein ecran est abandonne.

Le module est limite a une largeur de lecture :

```text
max-width: 1120px
```

Il peut etre insere dans le corps d'un article au lieu d'occuper toute la page.

### Composition

La maquette utilise trois zones :

1. Une carte contenue a gauche.
2. Une fiche evenement a droite.
3. Une timeline horizontale compacte sous l'ensemble.

Schema :

```text
[ carte narrative ] [ fiche evenement ]
[ timeline horizontale compacte       ]
```

Sur mobile, les zones passent en colonne :

```text
[ carte ]
[ fiche ]
[ timeline scrollable ]
```

### Donnees

L'application lit maintenant le dossier de reference :

- `public/data/reference/events.csv`
- `public/data/reference/places.csv`
- `public/data/reference/flows.csv`
- `public/data/reference/counts.csv`
- `public/data/reference/sources.csv`

La v2 ne depend donc plus des anciens fichiers de demo de la v1.

### Carte

La carte est cumulative :

```text
events.date <= date active
```

Elle affiche par defaut les evenements :

```text
display_tier = primary ou secondary
```

Les lieux sans coordonnees, comme `drc_total` et `uganda_total`, ne sont pas rendus comme points.

Les marqueurs de lieux sont cliquables. Le clic selectionne le dernier evenement visible associe au lieu.

Les arcs sont filtres par date :

```text
flows.date <= date active
```

Ils restent interpretes comme deplacements, corridors ou relations documentees, pas comme preuves automatiques de transmission.

### Timeline

La timeline laterale de la v1 est remplacee par une timeline horizontale compacte.

Elle affiche les evenements `primary` et `secondary`.

Les evenements `context` et `verify` restent masques pour eviter de surcharger la maquette.

Le clic sur un point de timeline :

1. selectionne l'evenement ;
2. met a jour la fiche ;
3. met a jour les points et arcs visibles sur la carte ;
4. recadre doucement la carte quand l'evenement a un lieu cartographique.

### Fiche evenement

La fiche affiche :

- groupe narratif ;
- date ;
- titre court ;
- lieu ;
- fait documente ;
- citation courte si disponible ;
- chiffres disponibles ;
- statut ;
- niveau de confiance ;
- type de source ;
- source.

Les notes de prudence restent visibles quand elles existent.

## Etat actuel dans le code

Fichiers principaux modifies :

- `src/main.ts`
- `src/data.ts`
- `src/types.ts`
- `src/map.ts`
- `src/story.ts`
- `src/timeline.ts`
- `src/styles.css`

## Limites assumees

- Ce n'est pas encore une direction graphique finale.
- Les fonds de carte restent ceux de MapLibre / OpenStreetMap.
- Les annotations sur carte sont encore des labels et notes, pas des annotations journalistiques composees a la main.
- La timeline n'a pas encore de navigation par groupe narratif.
- Les sources ne s'ouvrent pas encore dans un panneau dedie.
- Les evenements `context` et `verify` ne sont pas encore accessibles depuis un mode expert.

## Verification

Commandes passees :

```text
npm run validate:reference
npm run build
```

Resultat :

- validation du dataset de reference OK ;
- build de l'application OK ;
- serveur local deja actif sur `http://localhost:5173`.

## Suite recommandee

La prochaine iteration devrait porter sur :

- un vrai systeme d'annotations cartographiques ;
- une navigation par groupes narratifs ;
- un panneau source ;
- un mode detail pour afficher les evenements `context` et `verify` ;
- une revue visuelle de la composition apres observation dans le navigateur.
