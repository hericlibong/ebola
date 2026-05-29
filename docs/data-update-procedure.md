# Phase G - Actualisation des donnees

## Objectif

La Phase G sert a rendre le projet actualisable.

Elle ne porte pas sur le design de la carte ou de la timeline. Elle definit comment ajouter, corriger ou retirer des informations dans le jeu de donnees de reference sans perdre la rigueur editoriale.

Fichier maitre :

`public/data/reference/events.csv`

Tables de support :

- `public/data/reference/sources.csv`
- `public/data/reference/places.csv`
- `public/data/reference/counts.csv`
- `public/data/reference/flows.csv`
- `public/data/reference/labels.csv`

## Principe general

Toute nouvelle information doit suivre cet ordre :

1. Identifier la source.
2. Evaluer ce que la source apporte vraiment.
3. Decider si l'information merite un evenement, un bilan chiffre, un lieu, un flux ou seulement une note.
4. Ajouter ou mettre a jour les fichiers CSV concernes.
5. Lancer la validation.
6. Documenter le changement dans le changelog.

Regle :

> On n'ajoute pas une information parce qu'elle est interessante. On l'ajoute si elle modifie la chronologie, le lieu, les chiffres, la comprehension de la riposte ou l'incertitude.

## Ajouter une nouvelle source

Fichier concerne :

`public/data/reference/sources.csv`

Etapes :

1. Creer un `source_id` stable.
2. Renseigner le titre complet.
3. Renseigner l'editeur ou l'institution.
4. Renseigner l'auteur si connu.
5. Renseigner la date de publication au format `YYYY-MM-DD`.
6. Ajouter l'URL si elle existe.
7. Renseigner `source_type`.
8. Renseigner `access_status`.
9. Ajouter une note courte sur l'usage de la source.

Format recommande du `source_id` :

```text
editeur_YYYY_MM_DD_motcle
```

Exemples :

```text
who_2026_05_29_situation
ja_2026_05_28_border
ap_2026_05_27_uganda_border
```

Avant d'utiliser la source dans `events.csv`, verifier que le `source_id` existe bien dans `sources.csv`.

## Ajouter un nouvel evenement

Fichier concerne :

`public/data/reference/events.csv`

Un evenement doit etre ajoute seulement si la source apporte :

- une nouvelle date ;
- un nouveau lieu ;
- un nouveau fait important ;
- une confirmation ;
- une correction ;
- un changement de bilan ;
- une mesure de riposte ;
- une contrainte importante ;
- une divergence utile a documenter.

Champs a remplir obligatoirement :

- `event_id`
- `date`
- `place_id`
- `event_type`
- `headline`
- `fact_text`
- `source_id`
- `source_type`
- `confidence`
- `data_status`
- `display_priority`
- `display_tier`
- `map_layer`
- `timeline_group`
- `update_status`

Format recommande du `event_id` :

```text
ev_YYYYMMDD_lieu_motcle
```

Exemple :

```text
ev_20260527_uganda_border_closed
```

### Regles editoriales

`headline`

- court ;
- factuel ;
- lisible dans une timeline ;
- pas de formule dramatique gratuite.

`fact_text`

- une ou deux phrases maximum ;
- attribution claire si necessaire ;
- pas d'hypothese presentee comme fait.

`quote`

- courte ;
- attribuable ;
- utile seulement si elle ajoute une formulation forte ou institutionnelle.

`notes`

- interne ou semi-interne ;
- ne doit pas devenir automatiquement un avertissement affiche au lecteur.

## Ajouter un nouveau bilan chiffre

Fichier concerne :

`public/data/reference/counts.csv`

Utiliser `counts.csv` quand l'information est un bilan global ou local, par exemple :

- total RDC ;
- total Ouganda ;
- total d'une zone de sante ;
- nombre de contacts ;
- nombre de cas suspects ;
- nombre de deces suspects.

Ne pas fusionner les categories :

- `confirmed_cases`
- `suspected_cases`
- `confirmed_deaths`
- `suspected_deaths`
- `contacts`

Les champs vides ne signifient pas zero. Ils signifient que la source ne donne pas la valeur.

Format recommande du `count_id` :

```text
ct_YYYYMMDD_entite_source
```

Exemple :

```text
ct_20260528_drc_ja_oms
```

Si un bilan chiffre devient un moment narratif important, il peut aussi y avoir une ligne dans `events.csv`, mais les chiffres restent propres dans `counts.csv`.

## Ajouter un nouveau lieu

Fichier concerne :

`public/data/reference/places.csv`

Creer un nouveau `place_id` seulement si le lieu est utile pour :

- la carte ;
- une jointure avec plusieurs evenements ;
- une distinction entre ville, zone de sante, province ou pays ;
- un bilan local ;
- un point de passage ou de risque clairement documente.

Ne pas ajouter de lieu trop precis si cela expose :

- un patient ;
- une famille ;
- une adresse ;
- un centre temporaire sensible ;
- un trajet individuel trop fin.

Si la precision est faible, utiliser :

- `health_zone_proxy`
- `corridor_proxy`
- `approx_inferred`
- ou une entite plus large.

## Ajouter un flux ou deplacement

Fichier concerne :

`public/data/reference/flows.csv`

Les flux sont sensibles editorialement.

Un flux ne doit etre ajoute que s'il represente :

- un deplacement documente ;
- un rapatriement de corps documente ;
- un corridor de risque clairement mentionne ;
- une mesure frontaliere ;
- une extension geographique officielle ou rapportee.

Regle d'affichage actuelle :

> Les flux ne sont pas affiches par defaut dans la maquette. Ils restent dans les donnees pour un usage narratif futur, ponctuel et non cumulatif.

Toujours distinguer :

- deplacement documente ;
- corridor probable ;
- transmission prouvee.

Ne jamais utiliser un flux comme preuve automatique de contamination.

## Evenements a verifier

Pour l'instant, les evenements a verifier restent dans `events.csv` avec :

```text
display_tier = verify
```

et un statut adapte :

- `provisional`
- `reconstructed`
- `disputed`

Ils ne doivent pas apparaitre par defaut dans la maquette.

Plus tard, si la liste devient trop longue, on pourra creer un fichier separe :

```text
public/data/reference/review_queue.csv
```

Mais ce fichier n'est pas necessaire pour l'instant.

## Correction d'une information existante

Ne pas supprimer brutalement une ligne utile.

Procedure recommandee :

1. Corriger la ligne si l'erreur est simple.
2. Ajouter une note dans `notes` si la correction a une importance editoriale.
3. Si une information est remplacee par une autre source, mettre a jour `source_id`.
4. Si une ligne ne doit plus etre utilisee, passer `update_status` a `retired` ou `superseded` si ces labels sont ajoutes.
5. Documenter la correction dans le changelog.

## Validation avant publication

Avant toute utilisation de nouvelles donnees :

```bash
npm run validate:reference
```

La validation doit passer sans erreur.

Checklist editoriale :

- la source existe dans `sources.csv` ;
- le lieu existe dans `places.csv` ;
- les dates sont au format `YYYY-MM-DD` ;
- les chiffres suspects et confirmes ne sont pas melanges ;
- les deces suspects et confirmes ne sont pas melanges ;
- le niveau `confidence` est coherent ;
- le `data_status` est coherent ;
- les evenements incertains ne sont pas en `primary` sans justification ;
- le texte ne transforme pas une hypothese en fait.

## Changelog

Chaque mise a jour substantielle doit etre documentee dans :

`docs/data-changelog.md`

Format recommande :

```markdown
## YYYY-MM-DD

- Ajout source : ...
- Ajout evenement : ...
- Ajout bilan : ...
- Correction : ...
- Point a verifier : ...
```

Le changelog n'est pas une source journalistique. Il sert a suivre l'evolution du dataset.

## Definition de reussite de la Phase G

La Phase G est reussie si :

- on sait ajouter une source sans ambiguite ;
- on sait ajouter un evenement sans casser les jointures ;
- on sait ajouter un bilan chiffre sans melanger les categories ;
- les evenements a verifier restent visibles dans les donnees mais caches par defaut ;
- chaque mise a jour peut etre validee par script ;
- chaque changement important peut etre retrouve dans le changelog.
