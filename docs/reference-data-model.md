# Modele de donnees de reference

## Fichier maitre

Le fichier maitre du projet est :

`public/data/reference/events.csv`

Il contient la chronologie evenementielle de reference, du premier jalon connu de l'epidemie jusqu'au 28 mai 2026.

Chaque ligne correspond a un fait date et source :

- un signal clinique ;
- une alerte ;
- une confirmation ;
- une declaration officielle ;
- un bilan chiffre ;
- un evenement de riposte ;
- une contrainte de terrain ;
- une fermeture frontaliere ;
- une divergence ou note d'incertitude.

La carte, la timeline et les panneaux narratifs doivent partir de ce fichier.

## Tables de support

`events.csv` ne contient pas tout. Il se connecte a d'autres tables par identifiants.

| Fichier | Role | Cle principale |
|---|---|---|
| `events.csv` | Chronologie des faits | `event_id` |
| `places.csv` | Lieux, coordonnees et entites non cartographiques | `place_id` |
| `sources.csv` | Sources citees | `source_id` |
| `labels.csv` | Labels et valeurs autorisees | `label_group` + `key` |
| `flows.csv` | Deplacements, corridors et relations spatiales | `flow_id` |
| `counts.csv` | Bilans chiffres par date et entite | `count_id` |

## Jointure avec les lieux

Dans `events.csv`, chaque evenement possede un `place_id`.

Exemple :

```csv
ev_20260527_uganda_border_closed,2026-05-27,,kampala,...
```

Ce `place_id` renvoie a `places.csv` :

```csv
kampala,Kampala,Ouganda,Central Region,Kampala,city,0.315278,32.568611,...
```

La jointure est donc :

```text
events.place_id -> places.place_id
```

C'est cette jointure qui permet a la carte de recuperer le nom du lieu, le pays, le type de lieu, la latitude, la longitude et la precision geographique.

## Pourquoi les coordonnees ne sont pas dans `events.csv`

Les coordonnees ne sont pas dans `events.csv` pour eviter les duplications.

Un meme lieu peut apparaitre dans plusieurs evenements :

- Bunia ;
- Mongbwalu ;
- Rwampara ;
- Kampala ;
- Goma ;
- etc.

Si les coordonnees etaient recopiees dans chaque evenement, une correction geographique devrait etre repetee dans plusieurs lignes. En gardant les coordonnees dans `places.csv`, une seule correction suffit.

Regle :

> `events.csv` dit ce qui s'est passe. `places.csv` dit ou cela se situe.

## Entites non cartographiques

Certains `place_id` ne representent pas un point a afficher sur la carte.

Exemples :

- `drc_total`
- `uganda_total`

Ces entites servent aux bilans nationaux. Elles peuvent apparaitre dans `events.csv` ou `counts.csv`, mais ne doivent pas etre affichees comme des points geographiques ordinaires.

Regle :

> Un `place_id` peut etre narratif ou statistique sans etre cartographique.

## Quand creer un nouveau `place_id`

Creer un nouveau `place_id` seulement si le lieu est utile pour au moins l'un de ces usages :

- afficher un point ou une zone sur la carte ;
- rattacher plusieurs evenements au meme lieu ;
- distinguer une entite statistique ;
- representer un corridor ou une zone de risque ;
- eviter une confusion entre ville, zone de sante, province ou pays.

Ne pas creer de nouveau `place_id` pour :

- un detail trop localise et sensible ;
- une residence de cas ;
- un centre de traitement temporaire identifie trop precisement ;
- un itineraire individuel fin ;
- une information non verifiee.

Dans le doute, utiliser un lieu agrege ou une entite existante.

## Jointure avec les sources

Dans `events.csv`, chaque evenement possede un `source_id`.

Exemple :

```csv
ev_20260527_uganda_border_closed,...,ap_2026_05_27_uganda_border,...
```

Ce `source_id` renvoie a `sources.csv` :

```csv
ap_2026_05_27_uganda_border,Uganda closes its border with Congo where suspected cases of a rare Ebola type are surging,Associated Press,...
```

La jointure est donc :

```text
events.source_id -> sources.source_id
```

Cette jointure permet d'afficher :

- le titre de la source ;
- le media ou l'institution ;
- la date de publication ;
- l'URL si elle existe ;
- le type de source ;
- les notes d'usage.

## Champs obligatoires de `events.csv`

Chaque ligne de `events.csv` doit contenir :

| Champ | Role |
|---|---|
| `event_id` | Identifiant unique de l'evenement. |
| `date` | Date de reference au format `YYYY-MM-DD`. |
| `place_id` | Identifiant du lieu ou de l'entite. |
| `event_type` | Type d'evenement controle par `labels.csv`. |
| `headline` | Titre court de l'evenement. |
| `fact_text` | Formulation factuelle du fait. |
| `source_id` | Source principale. |
| `source_type` | Type de source controle par `labels.csv`. |
| `confidence` | Niveau de confiance controle par `labels.csv`. |
| `data_status` | Statut editorial controle par `labels.csv`. |
| `display_priority` | Priorite d'affichage. |
| `display_tier` | Niveau editorial d'affichage : principal, secondaire, contexte ou a verifier. |
| `map_layer` | Couche cartographique. |
| `timeline_group` | Groupe narratif de timeline. |
| `update_status` | Statut de la ligne dans le dataset. |

## Champs optionnels de `events.csv`

| Champ | Role |
|---|---|
| `date_end` | Date de fin si l'evenement couvre une periode. |
| `quote` | Citation courte et attribuable. |
| `confirmed_cases` | Cas confirmes associes au fait. |
| `suspected_cases` | Cas suspects associes au fait. |
| `confirmed_deaths` | Deces confirmes associes au fait. |
| `suspected_deaths` | Deces suspects associes au fait. |
| `contacts` | Contacts listes ou suivis. |
| `notes` | Note interne de prudence ou d'interpretation. |

Les champs chiffres vides ne signifient pas zero. Ils signifient que la valeur n'est pas renseignee pour cette ligne.

## Exemple de ligne bien formee

```csv
ev_20260527_uganda_border_closed,2026-05-27,,kampala,border_closure,"L'Ouganda ferme temporairement sa frontiere","L'Ouganda annonce la fermeture temporaire de sa frontiere avec la RDC avec effet immediat en raison de l'aggravation de l'epidemie.","Uganda is temporarily closing the border with the DRC with immediate effect",7,,,,,ap_2026_05_27_uganda_border,media,high,confirmed,1,mobility,cross_border_control,active,"Representer comme mesure de controle frontalier."
```

Lecture :

- date : 27 mai 2026 ;
- lieu : Kampala / Ouganda ;
- fait : fermeture temporaire de la frontiere ;
- source : Associated Press ;
- confiance : elevee ;
- statut : confirme ;
- couche carte : mobilite ;
- groupe timeline : controle transfrontalier ;
- chiffre associe : 7 cas confirmes en Ouganda.

## Valeurs controlees

Les valeurs controlees sont dans :

`public/data/reference/labels.csv`

Elles concernent notamment :

- `event_type`
- `flow_type`
- `source_type`
- `confidence`
- `data_status`
- `map_layer`
- `timeline_group`
- `display_tier`

Avant d'ajouter une nouvelle valeur dans `events.csv`, verifier qu'elle existe dans `labels.csv`. Si elle n'existe pas, l'ajouter d'abord dans `labels.csv` avec une description claire.

## Validation

Pour verifier le jeu de donnees :

```bash
npm run validate:reference
```

La validation controle notamment :

- les dates ;
- les references `place_id` ;
- les references `source_id` ;
- les valeurs controlees ;
- les champs numeriques ;
- les liens avec les tables de support.

Une ligne qui ne passe pas la validation ne doit pas etre utilisee dans la dataviz.
