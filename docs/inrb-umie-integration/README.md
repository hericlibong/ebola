# Integration INRB-UMIE

Ce dossier regroupe les documents de travail lies a l'integration de
INRB-UMIE/BDBV2026-Data comme source structuree candidate pour les chiffres de
la storymap Ebola.

Le projet reste une storymap narrative. Les donnees INRB-UMIE doivent passer
par un staging, un rapport de comparaison et une validation humaine avant toute
integration dans `public/data/reference/counts.csv`.

## Documents du dossier

- `roadmap.md` : plan de travail operationnel par phases.
- `source-cadrage.md` : cadrage de la source, fichiers prioritaires, mapping
  national, regles `ND` / champ vide / zero et risques editoriaux.
- `editorial-integration-procedure.md` : procedure pour faire entrer une ligne
  validee dans `counts.csv`, creer la source, renseigner les notes, documenter
  le changelog et relire l'interface.

## References hors dossier

Ces documents restent a leur emplacement d'origine pour eviter les copies de
travail divergentes :

- `../data-update-procedure.md` : procedure generale d'actualisation des
  donnees.
- `../reference-data-model.md` : modele de donnees de reference du projet.
- `../prochaines-etapes.md` : contexte editorial et chantiers identifies.
