# Staging INRB-UMIE

Ce dossier sert a preparer l'integration de INRB-UMIE/BDBV2026-Data comme
source structuree pour les chiffres de la storymap Ebola.

Il ne contient pas de donnees publiees directement par l'interface. Tout ce qui
arrive ici doit etre compare, relu et valide humainement avant une eventuelle
integration dans `public/data/reference/counts.csv`.

## Regle principale

Aucune donnee de ce dossier ne doit etre copiee automatiquement dans
`counts.csv`.

Flux obligatoire :

```text
INRB-UMIE source externe
  -> staging
  -> rapport de comparaison
  -> validation humaine
  -> counts.csv editorial valide
```

## Sous-dossiers

- `snapshots/` : fichiers staging generes ou poses a partir d'un commit precis
  du repo INRB-UMIE.
- `reports/` : rapports Markdown de comparaison entre staging et
  `public/data/reference/counts.csv`.
- `inrb_umie_place_mapping.csv` : table de travail pour relier les noms
  INRB-UMIE `nom` a nos `place_id`. Cette table ne vaut pas ajout automatique
  dans `places.csv`.

## Modele de staging national

Le fichier `national-counts-staging.template.csv` definit l'en-tete attendu
pour les quatre series nationales prioritaires :

- `national_cumulative_confirmed_cases` ;
- `national_cumulative_suspected_cases` ;
- `national_cumulative_confirmed_deaths` ;
- `national_cumulative_suspected_deaths`.

Mapping attendu :

| INRB-UMIE | Notre modele |
|---|---|
| `nom = DRC` | `mapped_entity_id = drc_total` |
| `national_cumulative_confirmed_cases` | `mapped_field = confirmed_cases` |
| `national_cumulative_suspected_cases` | `mapped_field = suspected_cases` |
| `national_cumulative_confirmed_deaths` | `mapped_field = confirmed_deaths` |
| `national_cumulative_suspected_deaths` | `mapped_field = suspected_deaths` |

## Valeurs manquantes

- `ND` signifie non disponible ou non rapporte.
- Un champ vide signifie valeur absente dans la source finale.
- `0` signifie zero uniquement si la source rapporte explicitement zero.

`ND` et les champs vides ne doivent jamais etre convertis en `0`.

## Nommage recommande des snapshots

```text
snapshots/inrb_umie_YYYY-MM-DD_<commit>_national_counts.csv
```

Exemple :

```text
snapshots/inrb_umie_2026-06-07_df291a5_national_counts.csv
```

## Nommage recommande des rapports

```text
reports/inrb_umie_YYYY-MM-DD_<commit>_comparison.md
```

Le rapport doit signaler les dates nouvelles, les ecarts, les valeurs `ND`, les
baisses de cumul et les changements de definition.

## Mapping des zones de sante

La table `inrb_umie_place_mapping.csv` distingue :

- les lieux deja presents dans `places.csv` ;
- les alias a consolider ;
- les nouvelles zones candidates ;
- les libelles a exclure.

Les nouvelles zones restent en staging tant qu'elles n'ont pas d'utilite
editoriale explicite pour la storymap.
