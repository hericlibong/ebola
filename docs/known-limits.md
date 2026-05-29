# Limites connues de la v1

Cette v1 est une maquette fonctionnelle et editorialement prudente. Elle n'est pas encore une version publiante.

## Limites visuelles

- La direction artistique reste encore proche d'un prototype technique.
- La mise en page carte + panneau lateral fonctionne, mais elle manque de rythme narratif.
- Les transitions cartographiques sont utiles, sans etre encore vraiment choregraphiees.
- Les bulles proportionnelles donnent une premiere lecture des cas confirmes, mais la legende quantitative reste minimale.
- Les arcs restent des lignes droites ; ils ne traduisent pas encore bien les corridors, les routes ou les contraintes de terrain.

## Limites cartographiques

- Les coordonnees sont des ancrages approximatifs.
- Les zones de sante comme Rwampara ou Katwa ne sont pas representees sous forme de polygones.
- Les corridors comme Kasenyi/Tchomia sont reduits a un point d'ancrage.
- Les tuiles OpenStreetMap sont chargees en ligne ; une demo totalement hors ligne n'est pas encore possible.

## Limites editoriales

- Les donnees restent issues d'une premiere extraction du rapport Markdown et des documents disponibles.
- Le PDF de reflexion ajoute au dossier n'a pas encore ete integre.
- Les sources primaires citees dans le rapport doivent encore etre reliees plus finement aux lignes CSV.
- Les donnees du 20 mai restent provisoires et marquees comme telles.
- Les divergences OMS/INSP sont documentees, mais pas encore visualisees dans une interface dediee.

## Limites techniques

- Il n'y a pas encore de tests navigateur automatises.
- La validation de donnees couvre la coherence structurelle, pas la veracite factuelle.
- Le bundle est volumineux a cause de MapLibre ; c'est acceptable pour la v1, mais a surveiller.
- L'accessibilite clavier et lecteur d'ecran doit encore etre amelioree.

## Points prioritaires apres v1

- Repenser le design narratif general.
- Repenser le format editorial : la pleine page actuelle n'est pas adaptee a une integration dans un article.
- Redonner plus de place au texte et a la densite journalistique.
- Revoir la timeline laterale, son role, sa taille et sa position.
- Rendre la carte moins "outil geographique" et plus narrative/journalistique.
- Reinterroger le choix cartographique : MapLibre stylise, Mapbox, SVG/D3 ou approche hybride.
- Enrichir l'interaction directe avec les points, bulles, arcs et annotations de carte.
- Ajouter une vraie legende quantitative pour les bulles.
- Afficher les divergences de chiffres sous forme de note ou comparaison.
- Ajouter une vue "sources" par sequence.
- Affiner les cadrages carte et les transitions.
- Relire et enrichir les donnees depuis les sources primaires.
