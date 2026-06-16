# Réactualisation quotidienne des données (counts + events)

Objectif : maintenir `counts.csv` et `events.csv` à jour chaque jour à partir de
la source externe fiable (INRB-UMIE / INSP), **sans intervention manuelle**, tout
en gardant un garde-fou éditorial humain.

## Principe : déterministe pour les chiffres, assisté pour le récit

- **Les chiffres** (séries nationales) sont intégrés mécaniquement par un script,
  testable et idempotent : `scripts/integrate-inrb-umie-counts.mjs`.
- **Les events narratifs** sont rédigés par l'agent (prose enrichie, accents,
  villes et phases variées, sourçage sur la ventilation par zone), puis **relus
  par un humain** : rien ne part en ligne sans validation.

## Étape 1 — script déterministe d'intégration des chiffres

`scripts/integrate-inrb-umie-counts.mjs` :

1. lit le dernier snapshot de `data/staging/inrb_umie/snapshots/` (produit par
   `npm run update:inrb-umie:staging`) ;
2. détecte les dates présentes dans le snapshot mais absentes de `counts.csv`
   pour `drc_total`, jusqu'à aujourd'hui, avec au moins les cas confirmés ;
3. ajoute les lignes manquantes avec les règles métier :
   - `ND` / valeur absente → champ vide (jamais `0`) ;
   - baisse de cumul → note contenant les mots-clés que le validateur attend
     (`revision/reclassement/definition`) pour la requalifier en avertissement ;
   - trou de publication (jour sauté par la source) → note explicite ;
   - ajoute au besoin la ligne de source dans `sources.csv`.

```bash
node scripts/integrate-inrb-umie-counts.mjs            # dry-run : affiche le resume JSON, n'ecrit rien
node scripts/integrate-inrb-umie-counts.mjs --write     # applique les ajouts
```

Le dry-run émet un **résumé JSON** (dates nouvelles, valeurs, notes, source à
ajouter) réutilisé par la routine pour rédiger les events et la notification.

## Étape 2 — playbook de la routine quotidienne

La routine planifiée (agent Claude, 1×/jour) exécute, dans une copie du repo :

1. `npm run update:inrb-umie:staging` — rafraîchit la source.
2. `node scripts/integrate-inrb-umie-counts.mjs --write` — intègre les chiffres.
   - Si `newDates` est vide → **ne rien faire**, signaler « pas de nouvelle
     donnée » et s'arrêter (pas de PR vide).
3. Pour chaque date nouvelle, **rédiger un brouillon d'events** :
   - un point national chiffré (`situation_update`, `drc_total`) ;
   - quand la ventilation par zone le justifie, un event ancré sur une **ville
     variée** (Nord-Kivu, frontière…) pour enrichir la carte et changer de phase ;
   - prose en français **avec accents**, voix éditoriale, sans inventer
     d'incident non sourcé.
4. `npm run validate:reference` puis `npm run build` — tout doit passer.
5. Ouvrir une **Pull Request** vers `main` dont la description contient le
   **résumé lisible** (nouveaux confirmés/décès, villes touchées, events rédigés).
   GitHub notifie automatiquement par e-mail à l'ouverture de la PR.
6. Un humain relit et merge ; le déploiement suit (cf. procédure de déploiement).

## Garde-fou

- La routine **n'écrit jamais directement sur `main`** : elle ouvre une PR.
- Les chiffres sont sourcés et déterministes ; les textes sont toujours relus.
- En cas d'absence de données, d'échec de pull ou de baisse suspecte, la routine
  le signale dans le résumé plutôt que de produire une PR douteuse.
