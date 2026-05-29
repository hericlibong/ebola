# Critique post-v1

## Diagnostic general

La v1 constitue un bon brouillon technique, mais pas une version publiable.

Elle valide l'existence d'un socle :

- les donnees sont structurees ;
- la carte s'affiche ;
- la timeline fonctionne ;
- le panneau narratif reagit aux etapes ;
- les statuts editoriaux sont presents ;
- les limites et incertitudes sont documentees.

Mais elle ne produit pas encore un vrai recit cartographique. Elle reste une maquette fonctionnelle, trop proche d'un prototype technique.

## Probleme principal

La v1 montre des elements narratifs, mais elle ne raconte pas encore vraiment l'histoire.

L'idee est la, le brouillon est la, mais il manque :

- un format editorial adapte ;
- une mise en scene ;
- une hierarchie visuelle ;
- une densite textuelle suffisante ;
- une interaction plus riche avec la carte ;
- une carte moins "outil geographique" et plus "objet journalistique".

## Format et integration editoriale

Le format pleine page ne convient pas.

Problemes observes :

- la carte est trop grande ;
- l'ensemble donne une impression massive et disproportionnee ;
- le format ne semble pas fait pour s'integrer dans une page d'article ;
- l'equilibre entre carte, timeline et texte ne fonctionne pas ;
- l'experience donne une impression de bloc plein ecran plutot que de module editorial.

Orientation a explorer :

- concevoir un format integre a une page d'article ;
- travailler un module de largeur controlee, compatible avec une colonne ou un corps d'article ;
- envisager une carte encadree en milieu de page ;
- eviter l'effet "gros outil pleine page" ;
- penser la dataviz comme un objet editorial insere dans un recit, pas comme une application autonome.

## Probleme de timeline

La timeline laterale n'est pas encore convaincante.

Problemes observes :

- elle est disproportionnee ;
- elle prend beaucoup de place ;
- elle ne donne pas encore un rythme narratif clair ;
- elle oblige parfois a scroller ou a remonter pour retrouver les informations ;
- l'interaction semble trop concentree sur elle.

Questions a reouvrir :

- la timeline doit-elle vraiment etre sur le cote ?
- faut-il plutot une progression verticale dans l'article ?
- faut-il des etapes integrees au texte, avec la carte qui evolue au fil du scroll ?
- faut-il une timeline plus compacte, en haut ou sous la carte ?
- faut-il une navigation par chapitres plutot qu'une timeline visible en permanence ?

## Texte et narration

Le texte est trop court et trop marginal.

Problemes observes :

- il n'y a pas assez de place pour le texte ;
- le texte n'a pas assez de densite journalistique ;
- les informations narratives sont trop reduites ;
- le panneau ne porte pas encore l'histoire ;
- il faut souvent revenir en haut pour relire l'information principale.

Orientation a explorer :

- donner davantage de place au texte ;
- ecrire de vrais blocs narratifs par sequence ;
- integrer les chiffres, les incertitudes et les sources dans un recit plus dense ;
- faire porter l'histoire par le texte autant que par la carte ;
- eviter que le texte soit un simple commentaire de la carte.

## Carte

La carte est trop geographique et pas assez narrative.

Problemes observes :

- elle ressemble trop a une carte outil ;
- elle manque d'intention journalistique ;
- elle ne guide pas assez le regard ;
- elle n'explique pas assez les distances, les bascules d'echelle et les corridors ;
- les interactions restent limitees ;
- les lieux et arcs ne produisent pas encore une lecture sensible de la propagation silencieuse.

Orientation a explorer :

- rendre la carte plus editoriale ;
- styliser davantage le fond cartographique ;
- simplifier ou redessiner certains elements ;
- travailler des cadrages plus expressifs ;
- ajouter des annotations directement sur la carte ;
- donner un role narratif aux bulles, tooltips et labels ;
- faire en sorte que l'interaction existe aussi sur la carte, pas seulement dans la timeline.

## Choix technique cartographique

Le choix de MapLibre doit etre reinterroge.

MapLibre fonctionne techniquement, mais il donne pour l'instant une sensation d'outil geographique standard.

Questions a explorer :

- MapLibre est-il le bon outil pour un objet journalistique tres stylise ?
- Faut-il conserver MapLibre mais fortement personnaliser le style ?
- Faut-il passer par Mapbox pour beneficier d'un style plus controle et d'un ecosysteme cartographique plus editorial ?
- Faut-il envisager une carte plus custom en SVG/D3, avec moins de fond geographique et plus de mise en scene ?
- Faut-il une solution hybride : fond raster simplifie + couches narratives D3/SVG ?

## Interaction

L'interaction est encore trop pauvre.

Problemes observes :

- l'interaction se fait surtout par la timeline ;
- la carte elle-meme ne propose pas assez d'exploration ;
- les tooltips sont trop simples ;
- les bulles et points ne racontent pas assez ;
- les arcs ne donnent pas encore assez de contexte.

Orientation a explorer :

- enrichir les tooltips avec chiffres, statut, source et note de prudence ;
- rendre les points cliquables ;
- afficher des cartes d'information sur les lieux ;
- faire apparaitre des annotations contextuelles ;
- permettre de comparer les donnees INSP/OMS ;
- utiliser les interactions de carte pour declencher du texte, pas seulement l'inverse.

## Probleme de navigation et scroll

L'experience actuelle cree des frictions.

Problemes observes :

- cliquer sur une etape peut conduire a perdre la position de lecture ;
- le lecteur doit parfois remonter pour revoir les informations ;
- l'equilibre entre scroll, carte et panneau n'est pas encore maitrise.

Orientation a explorer :

- eviter les changements de position inattendus ;
- tester un layout ou la carte reste stable pendant que le texte progresse ;
- etudier un format scrollytelling ;
- reduire les elements fixes qui prennent trop de place ;
- garder l'information principale toujours visible au moment de l'interaction.

## Conclusion editoriale

La v1 n'est pas publiable.

Elle doit etre consideree comme :

- un brouillon technique ;
- une preuve de faisabilite ;
- une base de donnees et d'interactions ;
- un support pour identifier les vrais problemes de narration.

La suite ne doit pas consister a simplement "embellir" cette interface. Il faut reposer la question du format, du role de la carte, de la place du texte et de la maniere dont le lecteur traverse l'histoire.

## Priorites pour la suite

1. Repenser le format editorial : module integre a un article plutot qu'application pleine page.
2. Redonner de la place au texte et a la narration.
3. Choisir une direction cartographique plus journalistique.
4. Revoir la timeline : position, taille, role et interaction.
5. Enrichir l'interaction directe avec la carte.
6. Tester des alternatives techniques : MapLibre stylise, Mapbox, SVG/D3 ou approche hybride.
7. Construire une v2 autour du recit, pas autour de l'outil.

## Mise a jour apres article Jeune Afrique du 28 mai

L'article du 28 mai confirme que la v2 doit elargir le recit au-dela de la detection tardive. Il faut integrer la sequence de rupture de controle :

- fermeture temporaire de la frontiere ougandaise avec la RDC ;
- 7 cas confirmes en Ouganda, dont 1 deces ;
- isolement obligatoire de 21 jours pour les entrants depuis la RDC ;
- appel de l'OMS a un cessez-le-feu immediat ;
- lien entre conflit, deplacements de population, camps surpeuples et transmission ;
- manque de moyens a Rwampara ;
- patients arrivant parfois a moto sans protection ;
- tentes d'isolement incendiees apres conflit autour d'un corps.

Cette source renforce l'hypothese d'une v2 structuree non seulement autour de "l'alerte arrive trop tard", mais autour de "la riposte perd du terrain face a la combinaison maladie, mobilite, conflit et defiance".
