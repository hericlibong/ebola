# Dictionnaire des donnees

Ce document decrit les fichiers de donnees utilises par la maquette. Il sert de garde-fou editorial : chaque valeur affichee doit pouvoir etre reliee a un statut, une source et un niveau de certitude.

## Valeurs controlees

### `confidence`

Niveau de confiance attache a un evenement, un flux ou un chiffre.

| Valeur | Sens | Usage |
|---|---|---|
| `high` | Fait solide, bien etabli par une source officielle ou plusieurs sources convergentes. | Date de confirmation, declaration officielle, premier signal documente. |
| `medium` | Fait documente mais encore provisoire, incomplet ou susceptible d'etre harmonise. | Chiffres de situation, extension geographique, repartitions par zone. |
| `low` | Reconstruction narrative, hypothese prudente ou element documente surtout par source media. | Rites funeraires, chaines probables, liens non prouves entre lieux. |

### `source_type`

Nature de la source principale utilisee.

| Valeur | Sens |
|---|---|
| `official` | Institution publique ou intergouvernementale : OMS, INSP/COUSP-RDC, ministere, presidence, Africa CDC. |
| `media` | Article ou depeche journalistique. |
| `analysis` | Analyse produite a partir de plusieurs sources. |
| `humanitarian` | Organisation humanitaire ou operationnelle : MSF, cluster logistique, etc. |
| `scientific` | Article scientifique, donnees genomiques ou prepublication technique. |

### `data_status`

Statut editorial de la donnee.

| Valeur | Sens | Regle d'affichage |
|---|---|---|
| `confirmed` | Fait ou cas confirme selon la source citee. | Peut etre affiche avec un style plein. |
| `suspected` | Signal, cas ou deces suspect, non confirme. | Ne jamais fusionner avec les confirmes. |
| `provisional` | Donnee officielle mais encore instable ou susceptible d'harmonisation. | Afficher avec avertissement ou style intermediaire. |
| `reconstructed` | Reconstruction narrative ou analytique. | Style prudent, souvent pointille ou attenue. |
| `disputed` | Chiffre ou interpretation divergente entre sources. | Afficher explicitement la divergence. |

## `places.csv`

Referentiel des lieux affichables ou utilisables dans les donnees.

| Champ | Type | Description |
|---|---|---|
| `place_id` | string | Identifiant stable en minuscules, sans espace. |
| `name` | string | Nom lisible du lieu. |
| `country` | string | Pays. |
| `province` | string | Province, region ou entite administrative equivalente. |
| `health_zone` | string | Zone de sante si elle est connue ou utile. |
| `place_type` | string | Type : `city`, `health_zone`, `locality`, `mining_area`, `territory`, `corridor`. |
| `latitude` | number | Latitude en WGS84. |
| `longitude` | number | Longitude en WGS84. |
| `geo_precision` | string | Precision geographique : actuellement `approximate` pour tous les lieux. |
| `notes` | string | Note editoriale sur la prudence de representation. |

Regle : une zone de sante ou un corridor ne doit jamais etre presente comme un point exact. Le point sert seulement d'ancrage cartographique.

## `events.csv`

Evenements narratifs qui pilotent la timeline.

| Champ | Type | Description |
|---|---|---|
| `event_id` | string | Identifiant unique de l'evenement. |
| `date` | date | Date de debut au format ISO `YYYY-MM-DD`. |
| `date_end` | date ou vide | Date de fin si l'evenement couvre une periode. |
| `place_id` | string | Lieu principal associe a l'evenement. |
| `event_type` | string | Type narratif ou epidemiologique. |
| `title` | string | Titre court affiche dans l'interface. |
| `kicker` | string | Accroche narrative courte affichant l'enjeu de la sequence. |
| `description` | string | Texte narratif court. |
| `uncertainty_note` | string | Note visible indiquant ce que la sequence ne prouve pas ou ce qui reste provisoire. |
| `confirmed_cases` | number ou vide | Cas confirmes associes a l'evenement. |
| `suspected_cases` | number ou vide | Cas suspects associes a l'evenement. |
| `confirmed_deaths` | number ou vide | Deces confirmes associes a l'evenement. |
| `suspected_deaths` | number ou vide | Deces suspects associes a l'evenement. |
| `contacts` | number ou vide | Contacts listes. |
| `source_label` | string | Source ou groupe de sources. |
| `source_type` | enum | Voir valeurs controlees. |
| `confidence` | enum | Voir valeurs controlees. |
| `data_status` | enum | Voir valeurs controlees. |
| `map_action` | string | Action cartographique de la sequence. |
| `map_center_lng` | number ou vide | Longitude du cadrage cartographique de la sequence. |
| `map_center_lat` | number ou vide | Latitude du cadrage cartographique de la sequence. |
| `map_zoom` | number ou vide | Niveau de zoom MapLibre de la sequence. |
| `visible_places` | string | Liste de `place_id` separes par `|` a afficher pendant la sequence. |
| `active_flows` | string | Liste de `flow_id` separes par `|` a afficher pendant la sequence. |
| `story_step` | number | Ordre narratif dans la timeline. |

Regle : si un chiffre est global RDC, il ne doit pas etre interprete comme un chiffre du seul `place_id`.

Regle : les champs `visible_places`, `active_flows` et `map_*` pilotent la mise en scene, mais ne changent pas le statut epidemiologique d'une donnee.

## `flows.csv`

Flux, deplacements ou relations cartographiques entre deux lieux.

| Champ | Type | Description |
|---|---|---|
| `flow_id` | string | Identifiant unique du flux. |
| `date` | date | Date associee au flux ou a sa documentation. |
| `from_place_id` | string | Lieu de depart. |
| `to_place_id` | string | Lieu d'arrivee. |
| `flow_type` | string | Type : `patient_travel`, `body_repatriation`, `suspected_spread`, `sample_transport`, `risk_corridor`, `official_extension`. |
| `description` | string | Description prudente du flux. |
| `source_label` | string | Source ou groupe de sources. |
| `confidence` | enum | Voir valeurs controlees. |
| `data_status` | enum | Voir valeurs controlees. |

Regle : une ligne dans `flows.csv` n'est pas une preuve de transmission. Elle represente un deplacement, une hypothese, un corridor ou une extension documentee selon `flow_type` et `data_status`.

## `zone_counts.csv`

Chiffres par lieu ou zone, separes de la narration.

| Champ | Type | Description |
|---|---|---|
| `date` | date | Date de reference. |
| `place_id` | string | Lieu ou zone associee. |
| `confirmed_cases` | number ou vide | Cas confirmes. |
| `suspected_cases` | number ou vide | Cas suspects. |
| `confirmed_deaths` | number ou vide | Deces confirmes. |
| `suspected_deaths` | number ou vide | Deces suspects. |
| `contacts` | number ou vide | Contacts listes. |
| `source_label` | string | Source du chiffre. |
| `confidence` | enum | Niveau de confiance. |
| `data_status` | enum | Statut editorial. |

Regle : les valeurs vides signifient "non renseigne dans ce fichier", pas zero.
