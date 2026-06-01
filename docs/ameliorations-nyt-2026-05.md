# Ameliorations inspirees des cartes NYT (mai 2026)

## Contexte

Apres la V1 (carte MapLibre + timeline + panneau recit, build vert, socle de
donnees fige), des cartes editoriales du New York Times ont ete fournies comme
**direction**, pas comme modeles a reproduire a l'identique. Trois references :

1. Carte de reperage sobre : fond beige, un seul point rouge sur Mongbwalu,
   lieux labellises, frontiere de province en pointilles, echelle, encart
   Afrique "Detail area".
2. "Historical Ebola outbreaks" : axe temporel 1976 -> 2026 avec bulles
   proportionnelles au nombre de cas, couleur par type de virus ; en dessous
   une carte ou les bulles sont placees geographiquement, avec annotations et
   legende de taille (50 / 500 / 15000).
3. "La ou Ebola s'est propage" : fond satellite, lieux labellises, annotations
   a ligne de rappel, aplat de zone affectee, encart, echelle, note de source.

## Ce que ces references enseignent

- Retenue editoriale, palette sobre, hierarchie typographique forte.
- Encodage proportionnel : la taille porte l'ampleur.
- Annotations directement sur la carte, avec lignes de rappel.
- Le temps comme axe proportionnel relie a la magnitude.
- Incertitude assumee ("cas majoritairement suspects et non confirmes").
- Encart de reperage, echelle, note de source persistante.

## Gisements de donnees encore inexploites

Deux fichiers du socle ne sont pas encore utilises par l'interface et debloquent
directement ce langage visuel :

- `counts.csv` : series chiffrees. Cas suspects RDC 246 -> 575 -> 750 -> 904 ->
  1000 ; deces 80 -> 148 -> 177 -> 223 -> 238 ; plus un instantane par zone au
  20 mai (Rwampara 25, Mongbwalu 13, Bunia 6, Nyankunde 4, etc.). Matiere de la
  courbe epidemique et des bulles proportionnelles.
- `flows.csv` : 8 flux de mobilite (rapatriement de corps Bunia -> Mongbwalu,
  cas importe Bunia -> Kampala, extension Ituri -> Nord-Kivu -> Sud-Kivu,
  corridor de controle frontalier). Matiere des arcs de propagation.

Limite geographique honnete : `places.csv` indique un `geo_precision` variable
(proxy, approx_inferred) et note explicitement "a remplacer par polygone
officiel de zone de sante". Il n'y a donc **pas de polygones** dans le socle :
l'aplat de zone affectee (reference 3) serait une approximation, pas une verite.
A ne pas faire sans nouvelle donnee geo.

## Menu de propositions

Pondere selon la priorite affichee : timeline (format, style, fonction,
informations interactives) en premier, puis recit, puis carte.

### Timeline

| Id | Proposition | Donnees | Effort | Pret |
|---|---|---|---|---|
| T1 | Ruban-axe proportionnel : un point par evenement a sa vraie date, periode 24 avr -> 28 mai a l'echelle. | events | M | oui |
| T2 | Bulles d'ampleur : taille du point = cas suspects/confirmes. Legende de taille. | events + counts | M | oui |
| T3 | Couleur semantique des points par `map_layer` (alerte, clinique, mobilite, riposte, contrainte). | labels | S | oui |
| T4 | Courbe epidemique discrete sous l'axe : aire cas suspects + ligne deces. | counts | M | oui |
| T5 | Fonction de controleur : survol -> surlignage carte + tooltip ; tete de lecture ; lecture animee optionnelle. | logique existante | M | oui |

### Recit

| Id | Proposition | Donnees | Effort | Pret |
|---|---|---|---|---|
| R1 | Badge de statut/confiance (Provisoire / Divergent / Reconstruit). | data_status, confidence | S | oui |
| R2 | Chiffre-cle contextualise a la date (bilan courant via counts). | counts | M | oui |
| R3 | Source cliquable + type (Officielle / Media / Analyse). | sources | S | oui |
| R4 | Allegement : fait en une phrase + contexte repliable. | mise en forme | S | oui |
| R5 | Repere de progression (phase x/5, evenement y/33). | derive | S | oui |

### Carte

| Id | Proposition | Donnees | Effort | Pret |
|---|---|---|---|---|
| C1 | Arcs de mobilite (flows.csv), style par type de flux. | flows + places | M | oui |
| C2 | Symboles proportionnels (taille = ampleur). | counts | M | oui |
| C3 | Polish editorial : encart Afrique, echelle, note de source/incertitude persistante. | statique + sources | S | oui |
| C4 | Annotation active sur la carte (callout + ligne de rappel). | events + places | M | oui |
| C5 | Compteurs hors-carte pour drc_total / uganda_total. | counts | S | oui |
| -- | Aplat de zone affectee : **non realisable** sans polygones officiels. | -- | L | non |

## Priorisation retenue

Principe du projet : un point a la fois, sobrement, sans refonte.

Sequence decidee avec l'editeur :

1. **T1** (fait) : axe temporel proportionnel. Fondateur (l'echelle x sert
   ensuite a T4 ; l'echelle de taille servira a C2). Repond a la question du
   "rythme" laissee ouverte depuis la V1.
2. **Axe enrichi** (fait) : decision de supprimer le carrousel de cartes,
   redondant avec le ruban, et de replier l'utile sur l'axe. A absorbe les
   reperes de phase (couleur + libelle), une partie de T5 (survol enrichi) et
   ajoute les annotations de jalons facon NYT. Detail dans
   `docs/timeline-increments.md`.
3. **Desencombrement + legende-filtre** (fait) : retour editeur sur la
   surcharge d'information. Timeline reduite a dates + points + couleurs +
   annotations. Le nom de phase ne vit plus que dans une legende, devenue un
   filtre cliquable (concentre timeline et carte sur une phase). Fonctions
   redistribuees : timeline = vue d'ensemble, legende = cle + focus, carte =
   geographie, panneau = detail.
4. **R2** (fait) : bilan national chiffre a la date, dans le panneau recit.
   A remplace T2 et T4 (l'ampleur va dans le panneau, pas dans la timeline).
5. T5 (reste) : tete de lecture / scrub / lecture animee.
6. C1 : arcs de mobilite.

Note : T2 (bulles d'ampleur) et T4 (courbe epidemique) sont **annules**.
L'evolution chiffree de l'epidemie est portee par R2 dans le panneau recit,
pour ne pas surcharger la timeline. Voir `docs/roadmap-ameliorations.md`.

Note : la couleur des points est aujourd'hui portee par la **phase**
(`timeline_group`), pas par `map_layer`. Le T3 d'origine (couleur par
`map_layer`) devient donc une alternative, pas un ajout : a trancher plus tard
si l'on veut encoder la nature de l'evenement plutot que sa phase.

Le polish recit (R1 + R3 + C3) est garde comme respiration peu couteuse entre
deux gros points.

## Journal d'implementation

Le detail des increments timeline est tenu dans `docs/timeline-increments.md`.
