# Audit du codebase — 2026-06-13

Périmètre : `src/`, `scripts/`, `public/`, `docs/`, configuration, dépendances, git.  
Niveaux : **[BLOQUANT]** / **[IMPORTANT]** / **[MINEUR]**

---

## 1. Fichiers morts ou inutilisés

### `src/map.ts` — **[IMPORTANT]**

Implémentation MapLibre GL complète (marqueurs, popups, flyTo, phase markers). N'est importée
nulle part : ni dans `main.ts`, ni dans aucun autre module. L'application en production utilise
exclusivement `staticMap.ts`. `tsc` compile le fichier (il est dans `include: ["src"]`) et tire
ainsi dans ses types les ~20 fichiers `.d.ts` de maplibre et ses dépendances transitives, mais
aucun code MapLibre n'est bundlé par Vite (tree-shaking).

Risque concret : un futur intervenant peut croire que modifier `map.ts` change l'app. Le fichier
maintient aussi une surface de code à entretenir pour rien.

### `.agents/` et `.codex/` — **[MINEUR]**

Deux dossiers vides à la racine, probablement des vestiges de configuration d'outils IA
(OpenAI Codex, agents). Aucun contenu, aucun effet. Parasitent le `ls`.

### `docs/archive/v1-data/validate-data.mjs` — **[MINEUR]**

Ancien validateur V1. Référence `../public/data/` alors que les données ont été déplacées dans
`public/data/reference/` lors du passage en V2. Le script est cassé mais c'est intentionnel
(dossier `archive/`) — à condition que personne ne le lance par erreur.

---

## 2. TODOs et FIXMEs

**Aucun** dans `src/` ni dans `scripts/`. Le grep sur `TODO|FIXME|HACK|XXX|TEMP` ne retourne rien.

---

## 3. Incohérences entre CLAUDE.md et le code

### Date de couverture périmée dans `public/data/reference/README.md` — **[IMPORTANT]**

Le README dit : _"du début connu de l'épidémie jusqu'au 28 mai 2026"_. Or `events.csv` contient
des événements jusqu'au **7 juin 2026**, et le validateur a lui-même une règle hardcodée :

```js
if (events.some((row) => row.date > '2026-06-07')) warnings.push('events contain dates after 2026-06-07');
```

Le README est donc périmé d'au moins 10 jours par rapport aux données réelles.

### Date limite hardcodée dans `scripts/validate-reference-data.mjs` — **[IMPORTANT]**

La borne `'2026-06-07'` est hardcodée sans commentaire explicatif. Si les données sont étendues
au-delà de cette date, le warning apparaîtra à chaque validation sans qu'il soit clair si c'est
intentionnel ou une anomalie. Cette borne devrait être soit documentée (avec la raison : "date de
gel éditorial de la V2"), soit gérée par une variable nommée.

### `phases.ts` mentionné comme source unique — cohérent, mais couplage implicite — **[MINEUR]**

CLAUDE.md indique que `phases.ts` est la source unique de vérité pour les phases. C'est vrai pour
l'app, mais les keys (`timeline_group`) doivent aussi exister dans `labels.csv` (groupe
`timeline_group`) pour passer la validation. Ce couplage implicite n'est documenté que dans un
commentaire de `phases.ts` et pas dans `CLAUDE.md`.

### `labels.csv` non chargé par l'app — correct mais `phases.ts` duplique l'information — **[MINEUR]**

Les 5 valeurs de `timeline_group` dans `labels.csv` existent aussi dans `phases.ts`. Si une
phase est ajoutée à l'une sans l'autre, la validation échoue sans message évident. Pas une
incohérence CLAUDE.md/code, mais une source de confusion lors d'une mise à jour de données.

---

## 4. Dépendances installées mais non utilisées (ou mal classées)

### `maplibre-gl` — **[IMPORTANT]**

Déclarée en `dependencies` (pas `devDependencies`). Seul consommateur : `src/map.ts`, qui est
mort (§1). Représente l'essentiel du poids de `node_modules/` pour ce projet : MapLibre et ses
dépendances transitives (geojson-vt, vt-pbf, mapbox/point-geometry, tiny-sdf, etc.).

Impact build : Vite n'inclut pas MapLibre dans le bundle final (27 kB JS) car `map.ts` n'est
jamais importé. Mais `tsc` charge tous ses fichiers `.d.ts` à chaque typecheck.

### `d3-dsv` — **[MINEUR]**

Déclarée en `dependencies` alors qu'elle est utilisée uniquement dans les scripts Node
(`scripts/validate-reference-data.mjs`, `scripts/update-inrb-umie-staging.mjs`), pas dans
`src/`. Pour un projet `private: true`, la distinction `dependencies`/`devDependencies` n'a pas
d'impact fonctionnel, mais elle induit en erreur sur ce qui est nécessaire au runtime navigateur.

---

## 5. Branches Git non mergées ou en suspens

### `feature/inrb-umie-data-source` — **[IMPORTANT]**

Branche courante. Contient **4 commits non mergés** dans `main` :

```
3078213 Ajouter CLAUDE.md pour guider Claude Code
8ff37d9 Actualiser la comparaison INRB-UMIE
2fe8e58 Automatiser le staging INRB-UMIE
271a446 Integrer la source INRB-UMIE en staging
```

La CI (`.github/workflows/ci.yml`) tourne sur `main` et sur les PRs, mais ces commits ne sont
pas encore dans `main`. Le CLAUDE.md tout juste créé n'est donc pas encore sur la branche
principale.

### Pas de branches mortes — **[RAS]**

Aucune branche locale en dehors de `main` et `feature/inrb-umie-data-source`. Pas de stash.
Les branches de PRs précédentes (`claude/vigilant-pike-*`) ont été supprimées après merge.

---

## 6. Observations complémentaires (hors périmètre demandé)

### PDFs et documents de recherche trackés dans git — **[IMPORTANT]**

Les fichiers suivants sont dans l'index git mais n'appartiennent pas à une app web :

- `sources_pdf_cdc/` : 8 PDFs Africa CDC (~1,5 MB)
- `deep-research-report-ebola.md` (32 KB)
- `« Ebola ne respecte pas... ».pdf` (260 KB) et `élements_réfléxion_ebola.pdf` (160 KB) à la racine

Ces binaires alourdissent chaque `git clone` et n'ont aucun rôle dans le build ni dans l'app. Un
`.gitignore` sur `*.pdf` et un déplacement de `deep-research-report-ebola.md` hors du repo (ou
dans un dossier explicitement ignoré) éviteraient l'accumulation.

### Absence de linter — **[MINEUR]**

Aucun ESLint, Prettier ou Biome configuré. Le typage strict de TypeScript et les règles
`noUnusedLocals`/`noUnusedParameters` tiennent lieu de filet de sécurité sur le code, mais le
style (espaces, longueur de ligne, ordre des imports) n'est pas enforced automatiquement.

---

## Synthèse

| # | Sujet | Niveau |
|---|---|---|
| 1a | `src/map.ts` mort (MapLibre, non importé) | **IMPORTANT** |
| 1b | `.agents/`, `.codex/` vides | mineur |
| 1c | `docs/archive/v1-data/validate-data.mjs` cassé | mineur |
| 3a | README data date périmée (28 mai vs 7 juin) | **IMPORTANT** |
| 3b | Borne `2026-06-07` hardcodée sans explication | **IMPORTANT** |
| 3c | Couplage implicite `phases.ts` / `labels.csv` | mineur |
| 4a | `maplibre-gl` installée pour un fichier mort | **IMPORTANT** |
| 4b | `d3-dsv` mal classée en `dependencies` | mineur |
| 5a | Branche `feature/inrb-umie-data-source` non mergée (4 commits) | **IMPORTANT** |
| 6a | PDFs trackés dans git | **IMPORTANT** |
| 6b | Pas de linter | mineur |
