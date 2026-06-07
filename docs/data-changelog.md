# Changelog des donnees

Ce fichier suit les changements substantiels apportes au jeu de donnees de reference.

Il ne remplace pas les sources. Il sert a documenter les ajouts, corrections et points a verifier.

## 2026-06-07

- Extension de la chronologie aux **1-5 juin** (rapports quotidiens Africa CDC) :
  5 bilans nationaux (`counts.csv`), 5 sources, et **4 evenements narratifs**
  (extension a de nouvelles zones de sante en Ituri ; attaque de l'equipe
  Croix-Rouge a Bunia le 1er juin ; attaque a Mongbwalu + 19 cas en fuite le
  4 juin ; saturation des lits a Bunia et flambee de 105 cas le 5 juin).
- Les PDF CDC (29 mai -> 5 juin) sont ranges dans `sources_pdf_cdc/`.
- **Correction d'incoherence (deces)** : le panneau affichait un seul « deces »
  qui changeait de type selon la date (suspects un jour, confirmes un autre),
  donnant de fausses baisses (ex. 246 -> 42). Desormais on **separe toujours**
  « deces confirmes » et « deces suspects ». La courbe utilise les **deces
  confirmes** (serie fiable et croissante : 17 -> 42 -> 78).
- Borne de validation portee au 2026-06-05.
- Reste a faire (voir `docs/prochaines-etapes.md`) : controles de coherence
  automatiques dans le script de validation.

## 2026-06-02

- Extension de la chronologie aux **29, 30 et 31 mai** a partir des rapports
  quotidiens Africa CDC (Daily Key Updates) fournis par l'utilisateur.
- 3 sources ajoutees : `africacdc_2026_05_29/30/31`.
- 3 bilans nationaux ajoutes dans `counts.csv` (drc_total) :
  - 29 mai : 203 confirmes, 1139 suspects, 17 deces confirmes, 246 deces suspects, 2987 contacts.
  - 30 mai : 254 confirmes, 1199 suspects, 42 deces confirmes, 259 deces suspects, 3200 contacts.
  - 31 mai : 282 confirmes, **321 suspects** (reclasses apres confirmation labo), 42 deces confirmes, contacts 3200.
- 6 evenements ajoutes (situation_update + mesures/contraintes de riposte),
  phase `response_breakdown`. Faits notables : livraison de reactifs (4800 tests,
  2000 a Bunia), seulement 30 % des contacts suivis, remise de 15 motos en Ituri,
  resorption du retard de laboratoire (suspects 1199 -> 321).
- Borne de validation des dates portee de 2026-05-28 a 2026-05-31.
- Note : la repartition des cas **par ville** reste figee au 20 mai (seul point
  INSP fiable) ; les rapports CDC sont nationaux, sans detail par ville.
- **Bulletins de chiffres sortis de la timeline** : les `situation_update` qui
  ne font que reporter le total national (25 mai 904 divergent, 26 mai, 28 mai
  238 deces, bulletins CDC 29/30/31) passent en `display_tier = context`. Ils
  restent dans `events.csv` mais ne sont plus des points de la timeline : la
  **courbe d'evolution** (panneau, depuis `counts.csv`) porte desormais ces
  chiffres. Conserves comme points : 20 mai (ancre de la photo par zone) et
  22 mai (l'OMS releve le risque national).
- **Phase renommee** : `response_breakdown` passe de « Riposte sous pression »
  a « Riposte debordee » (label dans `labels.csv` et `src/phases.ts`), plus
  clair et debarrasse de l'amalgame avec les compteurs.

## 2026-05-29

- Creation de la procedure d'actualisation des donnees.
- Confirmation du fichier maitre : `public/data/reference/events.csv`.
- Confirmation des tables de support : `sources.csv`, `places.csv`, `counts.csv`, `flows.csv`, `labels.csv`.
- Decision : les evenements `display_tier = verify` restent dans `events.csv`, mais ne sont pas affiches par defaut.
- Decision : les flux restent dans `flows.csv`, mais ne sont pas affiches par defaut dans la maquette actuelle.
