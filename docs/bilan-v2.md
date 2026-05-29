# Bilan V2

## Statut general

La V2 est un brouillon narratif exploitable, mais pas une version publiable.

Elle marque un vrai progres par rapport a la V1 :

- le projet repose maintenant sur un jeu de donnees de reference ;
- la carte, la timeline et le panneau texte lisent les donnees ;
- le format plein ecran a ete remplace par un module plus integrable dans une page d'article ;
- les lignes parasites ont ete retirees ;
- le panneau texte est redevenu plus editorial ;
- la carte suit a nouveau l'evenement actif par mouvement et zoom ;
- la timeline conserve maintenant sa position horizontale apres un clic.

La V2 donne donc une base de travail. Elle ne regle pas encore les questions de rythme, d'esthetique, de synchronisation fine et de force narrative.

## Ce qui fonctionne

### Donnees

Le projet dispose d'un socle de donnees solide :

- `public/data/reference/events.csv` comme fichier maitre ;
- `places.csv` pour les lieux et coordonnees ;
- `sources.csv` pour les sources ;
- `counts.csv` pour les bilans chiffres ;
- `flows.csv` pour les deplacements ou corridors ;
- `labels.csv` pour les valeurs controlees.

La validation automatique fonctionne :

```bash
npm run validate:reference
```

### Methode

La Phase G a stabilise la procedure d'actualisation :

- ajout d'une source ;
- ajout d'un evenement ;
- ajout d'un bilan chiffre ;
- ajout ou correction d'un lieu ;
- gestion des evenements a verifier ;
- changelog des donnees.

Document principal :

`docs/data-update-procedure.md`

### Interface

La maquette actuelle est plus lisible que la V1 :

- elle n'est plus en plein ecran ;
- elle laisse une vraie place au texte ;
- la carte affiche l'evenement actif au lieu d'empiler tous les faits ;
- les flux ne sont plus affiches par defaut ;
- les metadonnees techniques ont ete retirees du panneau principal ;
- les statuts restent visibles dans la timeline et le tooltip.

## Ce qui ne fonctionne pas encore

### Timeline

La timeline reste le principal chantier.

Problemes identifies :

- l'etat actif n'est pas encore assez visible ;
- le curseur ou indicateur de selection n'est pas vraiment synchronise avec l'evenement choisi ;
- les etapes ne sont pas assez marquees ;
- la timeline prend encore trop de hauteur ;
- elle pourrait etre plus fine, plus dense et plus clairement presentee comme axe temporel.

### Carte

La carte reste trop generique.

Problemes identifies :

- le fond OpenStreetMap donne encore un rendu trop outil ;
- la carte n'a pas encore une qualite journalistique suffisante ;
- les marqueurs sont fonctionnels mais pas encore tres elegants ;
- les lieux proches en Ituri restent difficiles a distinguer ;
- le bon equilibre entre zoom regional et zoom local reste a trouver.

Decision actuelle :

- garder le zoom et le mouvement de carte ;
- ne pas reintroduire les lignes permanentes ;
- n'utiliser d'eventuels flux visuels que plus tard, de facon ponctuelle et non cumulative.

### Panneau texte et tooltips

Le panneau texte est mieux oriente, mais il doit encore etre retravaille.

Problemes identifies :

- les textes du dataset sont encore trop courts ou trop descriptifs ;
- certains evenements devront etre reformules ;
- il faut mieux repartir l'information entre panneau, tooltip et timeline ;
- les tooltips doivent rester courts mais plus elegants ;
- la source doit rester visible sans alourdir le recit.

### Donnees narratives

Le dataset est structurellement solide, mais il doit encore etre edite.

Problemes identifies :

- certains evenements devront etre fusionnes, deplaces ou retrogrades ;
- les titres doivent etre plus narratifs sans devenir sensationalistes ;
- les evenements `primary`, `secondary`, `context` et `verify` doivent etre reevaluaes ;
- les donnees de cas et de deces devront probablement etre mieux integrees au recit visuel.

### Cas, deces et rythme epidemiologique

Il manque une lecture parallele des cas et des deces.

Piste :

- ajouter une mini-timeline ou un axe secondaire des contaminations et deces ;
- garder les categories separees : confirmes, suspects, deces confirmes, deces suspects ;
- eviter toute courbe qui donnerait une precision fausse si les donnees restent provisoires.

## Decisions prises

- `events.csv` reste le fichier maitre.
- Les coordonnees restent dans `places.csv`.
- Les sources restent dans `sources.csv`.
- Les flux restent dans `flows.csv`, mais ne sont pas affiches par defaut.
- Le panneau texte n'affiche plus les metadonnees brutes.
- Les metadonnees restent utiles pour les donnees, les tooltips, les filtres ou un futur mode detail.
- La carte doit suivre l'evenement actif avec mouvement et zoom.
- La timeline doit devenir le prochain chantier prioritaire.

## Recommandation

Ouvrir une Phase H dediee a la synchronisation narrative et a la refonte d'usage.

Ordre recommande :

1. Refaire la timeline : selection active, curseur, finesse, synchronisation.
2. Revoir les evenements du dataset : hierarchie, titres, textes, groupes.
3. Repenser la carte : fond, marqueurs, cadrages, lisibilite regionale.
4. Integrer une lecture des cas et deces.
5. Reprendre le panneau texte et les tooltips dans une logique editoriale finale.

## Conclusion

La V2 n'est pas une fin. C'est un point d'appui.

Elle a permis de sortir du simple prototype technique et de faire apparaitre les vrais chantiers : rythme narratif, synchronisation, cartographie, edition des donnees et integration des chiffres.
