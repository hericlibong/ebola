# Procedure d'integration editoriale

Cette procedure decrit comment une ligne issue du staging INRB-UMIE peut entrer
dans `public/data/reference/counts.csv`.

Elle ne valide aucune donnee par elle-meme. Une ligne staging ne devient une
ligne publiee qu'apres arbitrage humain.

## Principe

Le parcours obligatoire reste :

```text
staging INRB-UMIE
  -> rapport de comparaison
  -> validation humaine
  -> sources.csv si nouvelle source
  -> counts.csv
  -> data-changelog.md
  -> validation automatique
  -> relecture de la visualisation
```

## Conditions avant integration

Une ligne peut etre proposee pour `counts.csv` seulement si :

- elle vient d'un snapshot INRB-UMIE identifie par commit ;
- son fichier source est connu ;
- son mapping vers `drc_total` ou un autre `entity_id` est explicite ;
- la valeur n'est pas `ND` ;
- le champ cible est clairement choisi ;
- les ecarts avec `counts.csv` sont visibles dans un rapport de comparaison ;
- les deces confirmes et suspects restent separes ;
- une note editoriale explique toute revision, baisse ou rupture de definition.

Une ligne ne doit pas etre integree si :

- elle remplace une valeur existante sans arbitrage ;
- elle transforme `ND` ou champ vide en zero ;
- elle force un total national par somme de zones ;
- elle alimente une serie generique `deaths` ;
- elle masque une divergence entre INRB-UMIE, Africa CDC, OMS ou une source
  journalistique.

## Creation ou choix du `source_id`

Deux conventions sont possibles.

### Source par snapshot INRB-UMIE

A utiliser quand plusieurs dates viennent du meme snapshot structure.

```text
inrb_umie_YYYY_MM_DD_snapshot
```

Exemple :

```text
inrb_umie_2026_06_08_snapshot
```

Usage recommande pour la premiere integration nationale, car le staging conserve
le commit upstream et les fichiers sources ligne par ligne.

### Source par SitRep INSP

A utiliser quand l'arbitrage editorial veut citer un rapport precis.

```text
insp_sitrep_YYYY_MM_DD_mve_NNN
```

Exemple :

```text
insp_sitrep_2026_06_06_mve_023
```

Usage recommande si une date ou une correction doit etre attribuee directement
a un SitRep.

## Ligne `sources.csv`

Champs attendus :

```text
source_id
title
publisher
author
published_at
url
source_type
access_status
notes
```

Exemple pour un snapshot :

```csv
inrb_umie_2026_06_08_snapshot,INRB-UMIE BDBV2026-Data snapshot fd27d5c,INRB-UMIE / INSP,,2026-06-08,https://github.com/INRB-UMIE/BDBV2026-Data,official,web,Snapshot structure utilise pour staging national; build manifest 979a344; donnees preliminaires a validation editoriale.
```

Regles :

- `publisher` doit mentionner INRB-UMIE et INSP.
- `source_type` doit rester une valeur autorisee par `labels.csv`.
- `access_status` doit indiquer si la source est web, locale ou fournie par
  l'utilisateur.
- `notes` doit contenir le commit ou snapshot utilise.

## Ligne `counts.csv`

Format de `count_id` recommande :

```text
ct_YYYYMMDD_drc_inrb_umie
```

ou, si le SitRep prime :

```text
ct_YYYYMMDD_drc_insp_mve_NNN
```

Mapping national :

| Staging | `counts.csv` |
|---|---|
| `mapped_entity_id` | `entity_id` |
| `drc_total` | `drc_total` |
| `confirmed_cases` | `confirmed_cases` |
| `suspected_cases` | `suspected_cases` |
| `confirmed_deaths` | `confirmed_deaths` |
| `suspected_deaths` | `suspected_deaths` |

Regles :

- `entity_type` vaut `country_total` pour `drc_total`.
- Les champs non donnes par la source restent vides.
- `contacts` reste vide pour INRB-UMIE national tant qu'aucune source nationale
  contacts n'est validee.
- `confidence` vaut `high` si la source est structuree, citee et coherente ;
  `medium` si une divergence doit encore etre documentee.
- `data_status` vaut `provisional` tant que les donnees sont preliminaires.

## Notes `counts.csv`

La note doit etre courte mais suffisante pour expliquer la provenance et les
arbitrages.

Modele :

```text
Bilan national INRB-UMIE/INSP; snapshot fd27d5c du 2026-06-08; fichier <nom_du_csv>; valeur validee apres comparaison avec <rapport>; donnees preliminaires.
```

Ajouter selon le cas :

- `reclassement laboratoire` ;
- `revision retroactive` ;
- `definition suspects modifiee` ;
- `valeur divergente Africa CDC` ;
- `suspected_deaths non communique` ;
- `ne pas comparer a une serie deces generique`.

## Changelog

Chaque integration dans `counts.csv` doit ajouter une entree dans
`docs/data-changelog.md`.

Modele :

```md
## YYYY-MM-DD

- Integration controlee de chiffres nationaux INRB-UMIE/INSP depuis le snapshot
  `<commit>` du `<snapshot_date>`.
- Source ajoutee : `<source_id>`.
- Lignes `counts.csv` ajoutees ou modifiees : `<liste courte>`.
- Points d'arbitrage : `<ecarts, ND, revisions, changements de definition>`.
- Rappel : deces confirmes et deces suspects restent separes.
```

## Validation automatique

Apres toute integration :

```bash
npm run validate:reference
npm run build
```

La validation doit :

- echouer si une serie confirmee baisse sans correction explicite ;
- avertir si `suspected_deaths` disparait puis reapparait ;
- avertir sur une forte baisse de `suspected_cases` sans note explicative ;
- refuser toute colonne generique `deaths` ou `deces`.

## Relecture de la visualisation

Apres validation technique, verifier l'interface :

- la ligne de chiffres ne doit pas afficher un libelle unique "deces" ambigu ;
- les deces confirmes et suspects doivent rester distinguables ;
- une valeur manquante ne doit pas apparaitre comme zero ;
- une baisse de suspects doit etre accompagnee d'une note ou d'un contexte ;
- les chiffres nationaux ne doivent pas remplacer les evenements narratifs.

## Statut

Cette procedure prepare l'integration. Elle ne remplace pas la validation
editoriale et ne donne pas l'autorisation d'ecrire automatiquement dans
`counts.csv`.
