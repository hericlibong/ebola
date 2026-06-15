# Cadrage source INRB-UMIE

## Role de cette source

INRB-UMIE/BDBV2026-Data est une source structuree candidate pour les chiffres
de la storymap Ebola. Elle doit servir d'appui principal pour les series
nationales, sans remplacer le recit, la carte narrative ou la selection
editoriale du projet.

Usage vise :

- alimenter un staging de chiffres ;
- comparer ces chiffres avec `public/data/reference/counts.csv` ;
- documenter les ecarts ;
- permettre une validation humaine ;
- integrer ensuite, si valide, des lignes propres dans `counts.csv`.

Usage exclu :

- afficher directement les donnees INRB-UMIE dans la storymap ;
- importer automatiquement dans `counts.csv` ;
- transformer la storymap en dashboard ;
- sommer automatiquement les zones de sante pour recreer un total national ;
- creer une serie generique `deaths`.

## Fichiers INRB-UMIE a utiliser en priorite

Les fichiers nationaux sont la priorite de la premiere implementation. Ils ont
`nom = DRC` et une ligne par date de rapport.

| Fichier INRB-UMIE | Colonne source | Usage dans notre projet |
|---|---|---|
| `data/insp_sitrep/processed/insp_sitrep__national_cumulative_confirmed_cases__daily.csv` | `national_cumulative_confirmed_cases` | cas confirmes nationaux |
| `data/insp_sitrep/processed/insp_sitrep__national_cumulative_suspected_cases__daily.csv` | `national_cumulative_suspected_cases` | cas suspects nationaux |
| `data/insp_sitrep/processed/insp_sitrep__national_cumulative_confirmed_deaths__daily.csv` | `national_cumulative_confirmed_deaths` | deces confirmes nationaux |
| `data/insp_sitrep/processed/insp_sitrep__national_cumulative_suspected_deaths__daily.csv` | `national_cumulative_suspected_deaths` | deces suspects nationaux |

Fichiers de provenance a consulter avec chaque snapshot :

- `README.md` ;
- `data/README.md` ;
- `data/insp_sitrep/README.md` ;
- `data/insp_sitrep/metadata.yaml` ;
- `build/manifest.json`.

Fichiers zone-level utiles plus tard, mais hors premiere implementation :

- `data/insp_sitrep/processed/insp_sitrep__cumulative_confirmed_cases__daily.csv` ;
- `data/insp_sitrep/processed/insp_sitrep__cumulative_suspected_cases__daily.csv` ;
- `data/insp_sitrep/processed/insp_sitrep__cumulative_confirmed_deaths__daily.csv` ;
- `data/insp_sitrep/processed/insp_sitrep__cumulative_suspected_deaths__daily.csv` ;
- `data/insp_sitrep/processed/insp_sitrep__cumulative_contacts_traced__daily.csv`.

## Mapping national

Le mapping national minimal est volontairement strict.

| INRB-UMIE | Notre modele |
|---|---|
| `nom = DRC` | `entity_id = drc_total` |
| `national_cumulative_confirmed_cases` | `confirmed_cases` |
| `national_cumulative_suspected_cases` | `suspected_cases` |
| `national_cumulative_confirmed_deaths` | `confirmed_deaths` |
| `national_cumulative_suspected_deaths` | `suspected_deaths` |

Regles :

- `entity_type` reste `country_total`.
- `source_id` doit etre cree ou choisi apres validation humaine.
- `notes` doit mentionner INRB-UMIE, INSP, le SitRep si connu, le commit ou
  snapshot utilise et les limites eventuelles.
- Les dates importees en staging restent les dates de rapport des fichiers
  INRB-UMIE.

## Contacts

Il n'y a pas de fichier national `national_*contacts*` dans les fichiers
prioritaires identifies. Les contacts sont surtout presents dans les tables par
zone, par exemple `cumulative_contacts_traced`.

Pour la premiere implementation :

- ne pas remplir automatiquement `contacts` depuis INRB-UMIE ;
- garder les contacts existants dans `counts.csv` tant qu'ils sont sources ;
- traiter les contacts INRB-UMIE plus tard, avec une decision explicite sur la
  difference entre contacts listes, traces, vus ou isoles.

## Regles ND, champ vide et zero

Ces trois cas doivent rester distincts.

| Cas | Sens | Traitement |
|---|---|---|
| `ND` | non disponible ou non rapporte dans le SitRep | valeur manquante |
| champ vide | source finale ne donne pas la valeur | valeur manquante |
| `0` | la source rapporte explicitement zero | valeur numerique zero |

Regles :

- `ND` ne devient jamais `0`.
- Un champ vide ne devient jamais `0`.
- Une absence de `suspected_deaths` ne doit jamais etre remplacee par
  `confirmed_deaths`.
- Une absence de `confirmed_deaths` ne doit jamais etre remplacee par
  `suspected_deaths`.
- Une valeur manquante doit etre signalee dans le rapport de comparaison, pas
  corrigee automatiquement.

## Risques editoriaux documentes

### Donnees preliminaires

Le README INRB-UMIE indique que les donnees epidemiologiques sont preliminaires
et liees a des analyses en cours. La storymap doit donc eviter de presenter ces
chiffres comme definitifs.

### Citation

Chaque integration doit citer :

- INSP comme source des SitRep ;
- INRB-UMIE comme structuration/transcription ;
- le SitRep ou la serie de SitRep si identifiable ;
- le commit, release ou snapshot utilise ;
- la date de recuperation.

### Licence et republication

Le repo a une licence generale MIT, mais les metadonnees INSP demandent de
confirmer les conditions de distribution avant republication externe. Notre
usage doit donc rester prudent, attribue et valide editorialement.

### Changement de definition

Les fichiers INRB-UMIE documentent des changements de definition, notamment
autour des cas suspects sous investigation et en isolement. Ces changements
peuvent rendre une baisse apparente correcte mais editorialement dangereuse si
elle n'est pas annotee.

### Donnees manquantes

`ND` et les trous de serie sont attendus. Ils doivent produire des warnings ou
des notes, pas des imputations automatiques.

### Divergence national/zones

INRB-UMIE signale que les totaux par zone et les totaux nationaux peuvent
diverger. Pour les chiffres nationaux de la storymap, les fichiers
`national_cumulative_*` priment sur toute somme de zones.

### Deces confirmes et suspects

Le risque principal de notre projet reste le melange des deux series :

- `confirmed_deaths` ;
- `suspected_deaths`.

La visualisation, les imports et les validations doivent traiter ces champs
comme deux indicateurs differents, pas comme deux variantes d'une meme valeur
"deces".

## Principe de non-ecriture directe

Aucune donnee INRB-UMIE ne doit etre ecrite directement dans
`public/data/reference/counts.csv`.

Le parcours obligatoire est :

```text
source externe
  -> staging
  -> rapport de comparaison
  -> validation humaine
  -> counts.csv
```

Une ligne ne peut entrer dans `counts.csv` que si :

- sa source est citee ;
- son mapping est explicite ;
- son statut `ND` ou manquant est compris ;
- les ecarts avec les donnees existantes sont documentes ;
- les notes editoriales sont suffisantes.

## Statut de la phase 1

La phase 1 est complete quand :

- les fichiers INRB-UMIE prioritaires sont identifies ;
- le mapping national est documente ;
- les regles `ND`, champ vide et zero sont explicites ;
- les risques editoriaux sont listes ;
- le principe de staging avant validation est documente.
