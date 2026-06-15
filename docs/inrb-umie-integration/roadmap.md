# Roadmap integration INRB-UMIE

## Objectif general

Integrer INRB-UMIE/BDBV2026-Data comme source structuree principale candidate
pour les chiffres de la storymap Ebola, en particulier les series nationales :

- cas confirmes ;
- cas suspects ;
- deces confirmes ;
- deces suspects.

Cette integration doit ameliorer la tracabilite, la coherence temporelle, la
separation des definitions et la facilite d'actualisation des chiffres.

Elle ne doit pas transformer la storymap en dashboard. Le projet garde sa
logique de recit, de carte narrative, de selection editoriale et de contextualisation
des evenements.

## Principes editoriaux

- Ne jamais melanger les deces confirmes et les deces suspects sous un seul
  libelle generique "deces".
- Ne jamais creer une serie implicite `deaths` qui prendrait parfois
  `confirmed_deaths`, parfois `suspected_deaths`.
- Ne jamais interpreter `ND`, un champ vide ou une valeur absente comme zero.
- Garder une validation humaine avant toute ecriture dans
  `public/data/reference/counts.csv`.
- Passer par un fichier de staging et un rapport de comparaison avant toute
  integration editoriale.
- Garder Reuters, AP, OMS, Jeune Afrique et les autres sources journalistiques
  ou institutionnelles pour les evenements narratifs, le contexte, les citations
  et les decisions editoriales.
- Citer clairement INRB-UMIE, INSP, le SitRep utilise, le commit ou le snapshot
  de donnees, et la date de recuperation.
- Documenter les reclassements, corrections retroactives et changements de
  definition dans les notes, pas seulement dans le code.

## Architecture cible proposee

```text
INRB-UMIE/BDBV2026-Data
source externe a commit fixe
        |
        v
staging INRB-UMIE
donnees importees mais non publiees
        |
        v
rapport de comparaison
ecarts, dates nouvelles, ND, changements de definition
        |
        v
validation humaine
selection et arbitrage editorial
        |
        v
counts.csv
donnees editoriales validees
        |
        v
storymap
recit, carte narrative, courbe et annotations
```

Le fichier final `counts.csv` reste editorial et valide. Le staging sert a
preparer, comparer et documenter les donnees externes. Il ne doit pas devenir
une source affichee directement par l'interface.

## Phase 1 - Documentation et cadrage

- [x] Documenter les fichiers INRB-UMIE utilises.
- [x] Documenter le mapping national `DRC` vers `drc_total`.
- [x] Documenter les correspondances entre metriques INRB-UMIE et colonnes
  `counts.csv`.
- [x] Documenter les regles `ND`, champ vide, valeur manquante et zero.
- [x] Documenter les risques editoriaux : donnees preliminaires, citation,
  definitions changeantes, divergences national/zones.
- [x] Documenter le principe : aucun import direct dans `counts.csv`.

Document de reference :

`source-cadrage.md`

Critere de reussite :

- L'equipe sait quelles sources INRB-UMIE sont utilisees, ce qu'elles signifient
  et quelles limites doivent etre verifiees avant publication.

## Phase 2 - Staging national

- [x] Creer le dossier de staging propose.
- [x] Definir la structure du CSV de staging.
- [x] Importer uniquement les quatre series nationales :
  `national_cumulative_confirmed_cases`,
  `national_cumulative_suspected_cases`,
  `national_cumulative_confirmed_deaths`,
  `national_cumulative_suspected_deaths`.
- [x] Mapper `DRC` vers `drc_total`.
- [x] Conserver le nom de fichier source INRB-UMIE.
- [x] Conserver le commit ou snapshot upstream.
- [x] Conserver le statut des valeurs manquantes (`ND` ou champ absent).
- [x] Ne pas modifier `counts.csv`.

Structure de staging recommandee :

```text
date
upstream_nom
upstream_metric
upstream_value
mapped_entity_id
mapped_field
upstream_file
upstream_commit
snapshot_date
sitrep_id
import_status
notes
```

Critere de reussite :

- Les chiffres nationaux INRB-UMIE sont disponibles localement dans un fichier
  intermediaire, sans impact sur les donnees publiees.

## Phase 3 - Rapport de comparaison

- [x] Comparer le staging avec `public/data/reference/counts.csv`.
- [x] Identifier les dates nouvelles.
- [x] Identifier les dates deja presentes.
- [x] Identifier les ecarts par metrique.
- [x] Identifier les valeurs manquantes ou `ND`.
- [x] Signaler les changements de definition.
- [x] Signaler les corrections retroactives.
- [x] Signaler les baisses de cumul.
- [x] Generer un rapport Markdown lisible.

Le rapport doit distinguer :

- ecart normal entre sources ;
- valeur manquante ;
- correction retroactive ;
- changement de definition ;
- anomalie a arbitrer.

Critere de reussite :

- Un editeur peut decider quelles lignes doivent entrer dans `counts.csv`, sans
  relire manuellement tous les CSV externes.

## Phase 4 - Validation et controles

- [x] Ajouter les controles empechant une serie implicite `deaths`.
- [x] Ajouter un warning si `suspected_deaths` disparait puis reapparait.
- [x] Ajouter un controle de baisse des `confirmed_cases`.
- [x] Ajouter un controle de baisse des `confirmed_deaths`.
- [x] Ajouter un warning sur baisse forte des `suspected_cases`.
- [x] Exiger une note explicative en cas de baisse forte liee a un reclassement
  ou une revision.
- [x] Verifier que les champs vides restent des valeurs manquantes.
- [x] Verifier que `ND` n'est jamais converti en zero.
- [x] Verifier les doublons `(date, entity_id, source_id)`.
- [x] Comparer les totaux nationaux aux sommes de zones en warning seulement,
  jamais en erreur bloquante.

Critere de reussite :

- Le bug "deces" ne peut pas etre reproduit silencieusement par une nouvelle
  donnee ou par une transformation d'import.

## Phase 5 - Integration editoriale controlee

- [x] Definir comment une ligne validee entre dans `counts.csv`.
- [x] Definir comment creer le `source_id`.
- [x] Definir comment renseigner `notes`.
- [x] Definir comment indiquer le commit ou snapshot INRB-UMIE utilise.
- [x] Definir comment citer le SitRep si la date correspond a un rapport precis.
- [x] Definir comment documenter le changement dans `docs/data-changelog.md`.
- [x] Appliquer la procedure a une selection de lignes validees humainement.
- [x] Lancer la validation apres integration.
- [ ] Relire la courbe et la ligne de chiffres dans l'interface.

Document de reference :

`editorial-integration-procedure.md`

Convention proposee pour `source_id` :

```text
inrb_umie_YYYY_MM_DD_snapshot
```

ou, si l'arbitrage se fait au niveau SitRep :

```text
insp_sitrep_YYYY_MM_DD_mve_023
```

Critere de reussite :

- Les donnees publiees dans `counts.csv` sont attribuables, relues et
  editorialement assumables.

## Phase 6 - Extension zones de sante

- [x] Creer ou proposer une table de mapping INRB-UMIE `nom` vers `place_id`.
- [x] Identifier les zones deja presentes dans `places.csv`.
- [x] Identifier les nouvelles zones a ajouter.
- [x] Identifier les zones utiles pour le recit.
- [x] Identifier les zones a garder hors storymap.
- [x] Ne pas importer toutes les zones sans choix editorial.
- [x] Documenter les alias sensibles : `Mongbalu` / `Mongbwalu`,
  `Nyakunde` / `Nyankunde`.
- [x] Distinguer ville, zone de sante, proxy cartographique et entite nationale.

Table de mapping proposee :

```text
data/staging/inrb_umie/inrb_umie_place_mapping.csv
```

Colonnes recommandees :

```text
upstream_nom
place_id
mapping_status
place_type
editorial_use
notes
```

Critere de reussite :

- Les donnees par zone peuvent etre evaluees sans polluer `places.csv` avec des
  lieux non utiles au recit.

## Phase 7 - Impact visualisation

- [x] Revoir la courbe nationale.
- [x] Separer clairement cas confirmes et cas suspects.
- [x] Separer clairement deces confirmes et deces suspects.
- [x] Eviter tout libelle unique "deces" si deux definitions sont presentes.
- [x] Proposer une note ou annotation lors des reclassements de laboratoire.
- [x] Verifier si l'interface actuelle suffit.
- [x] Identifier la plus petite evolution UI necessaire si l'interface actuelle
  entretient l'ambiguite.
- [x] Afficher les quatre series nationales en courbes distinctes :
  cas confirmes, cas suspects, deces confirmes, deces suspects.
- [x] Conserver la derniere mesure connue sur une courbe lorsqu'un indicateur
  n'est pas publie a une date donnee.

Critere de reussite :

- Le lecteur voit chaque indicateur separement et comprend, via les notes, qu'une
  baisse des suspects ou une absence de suspects peut venir d'un reclassement,
  d'une revision ou d'une non-publication.

## Evolutions possibles du modele

Ces evolutions ne sont pas obligatoires pour la premiere implementation, mais
elles doivent rester ouvertes si l'integration INRB-UMIE devient centrale.

### Option A - Garder `counts.csv` comme fichier final unique

Avantage : simple, compatible avec l'existant.

Limite : le fichier melange national, zones, sources et niveaux de validation.

### Option B - Ajouter `source_snapshots.csv`

But : tracer proprement les commits, snapshots, releases, SitRep et dates de
recuperation.

Fichier possible :

```text
public/data/reference/source_snapshots.csv
```

Colonnes possibles :

```text
snapshot_id
source_id
retrieved_at
upstream_repo
upstream_commit
upstream_release
source_files
notes
```

### Option C - Separer chiffres nationaux et chiffres par zone

But : eviter que les series nationales et les series locales aient les memes
regles de validation.

Fichiers possibles :

```text
public/data/reference/counts_national.csv
public/data/reference/counts_zones.csv
```

A ne faire que si `counts.csv` devient trop ambigu. Pour la premiere
implementation, garder `counts.csv` est suffisant.

## Questions ouvertes

- `counts.csv` doit-il rester le fichier final unique ?
- Faut-il creer `source_snapshots.csv` pour tracer les commits et snapshots ?
- Faut-il separer chiffres nationaux et chiffres par zone ?
- Quelles zones de sante INRB-UMIE doivent entrer dans le recit ?
- Quelles zones doivent rester uniquement dans le staging ?
- Comment representer les reclassements de laboratoire dans la dataviz ?
- Faut-il montrer `suspected_deaths` si la serie a des trous importants ?
- Quel niveau de divergence entre INRB-UMIE, Africa CDC et OMS declenche une
  note editoriale ?
- Le `source_id` doit-il representer INRB-UMIE comme snapshot ou INSP comme
  SitRep primaire ?

## Definition de reussite

L'integration sera consideree reussie quand :

- les quatre series nationales INRB-UMIE sont importables en staging ;
- aucune ecriture directe dans `counts.csv` n'est possible sans validation ;
- un rapport de comparaison signale dates nouvelles, ecarts, `ND`, baisses et
  changements de definition ;
- `confirmed_deaths` et `suspected_deaths` restent separes dans les donnees,
  les controles et l'interface ;
- les sources sont citees avec INRB-UMIE, INSP, SitRep, commit ou snapshot ;
- les donnees validees peuvent alimenter la storymap sans transformer le projet
  en dashboard ;
- les evenements narratifs restent selectionnes editorialement a partir de
  sources contextualisees.

## Premiere action recommandee

La premiere tache d'implementation doit etre limitee au staging national :

1. creer le dossier `data/staging/inrb_umie/` ;
2. definir le CSV de staging ;
3. importer uniquement les quatre fichiers nationaux `national_cumulative_*` ;
4. mapper seulement `DRC` vers `drc_total` ;
5. produire un premier rapport de comparaison ;
6. ne pas modifier `counts.csv`.

Cette premiere etape valide le flux de travail sans changer les donnees
publiees ni l'interface.
