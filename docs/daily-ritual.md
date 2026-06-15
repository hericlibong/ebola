# Rituel de suivi quotidien

> Procédure courte et réutilisable pour actualiser la storymap au jour le jour.
> Orchestration : elle relie les outils et docs existants, sans les répéter.

## Principe

Chaque jour, on suit l'épidémie en deux temps : **les chiffres** (source de vérité
INRB-UMIE, automatisable) puis **le récit** (recherche sourcée, protocole d'enrichissement).
Rien n'est copié automatiquement dans `counts.csv` : la validation reste humaine.

## Étapes

### 1. Récupérer les chiffres (automatique)

```bash
npm run update:inrb-umie:staging
```

Produit un snapshot + un rapport de comparaison dans `data/staging/inrb_umie/`.
Ne modifie jamais `public/data/reference/counts.csv`.

### 2. Lire le rapport de comparaison

Ouvrir le dernier `data/staging/inrb_umie/reports/inrb_umie_<date>_<commit>_comparison.md`.
Repérer : dates nouvelles, écarts, valeurs `ND`, baisses de cumul.

### 3. Intégrer les chiffres dans `counts.csv` (éditorial)

Pour chaque nouvelle date `drc_total`, ajouter une ligne en respectant :
- les **4 séries séparées** (`confirmed_cases`, `suspected_cases`, `confirmed_deaths`, `suspected_deaths`) ;
- **`ND` → champ vide**, jamais `0` ;
- une **note explicative** sur toute baisse de cumul (sinon la validation échoue).

Détail des champs et conventions : `docs/data-update-procedure.md`.
Cadrage de la source : `data/staging/inrb_umie/README.md`.

### 4. Ajouter un point d'évolution par date (`events.csv`)

Un `situation_update` par nouvelle date, calé sur les chiffres, pour que la timeline
et la carte progressent **jour par jour** (pas de saut entre deux dates).

### 5. Le récit — protocole d'enrichissement

La recherche d'une « histoire à raconter » pour chaque date relève du
**protocole d'enrichissement** (`docs/enrichment-protocol.md`, Phase 6), pas de ce rituel.
Tant qu'il n'est pas en place, les points de date restent factuels (chiffres seuls).

### 6. Données cartographiques si pertinent

Si une nouvelle date fait apparaître un lieu (nouvelle zone touchée), ajouter le lieu
dans `places.csv` (et l'événement le référence). La carte le révèle automatiquement à sa date
(dévoilement progressif).

### 7. Valider et tracer

```bash
npm run validate:reference   # doit passer sans erreur
npm run build                # validation + tsc + build
```

Documenter la mise à jour dans `docs/data-changelog.md`.

## Garde-fous

- Chiffres = INRB-UMIE uniquement ; récit = sources éditoriales séparées.
- Ne jamais transformer un `ND` en `0`, ni fusionner les 4 séries.
- Ne pas résoudre automatiquement un écart avec les données validées : arbitrage humain.
