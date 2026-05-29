# Methode editoriale

## Intention

La dataviz raconte une enquete chronologique et geographique. Elle doit aider a comprendre comment une epidemie officiellement confirmee le 15 mai 2026 avait deja produit des signaux, des deplacements et des chiffres instables depuis le 24 avril.

La carte n'est pas une preuve epidemiologique autonome. Elle est un support de lecture critique.

## Hierarchie des sources

1. Sources officielles signees ou publiees : OMS, INSP/COUSP-RDC, ministere de la Sante de RDC, Africa CDC, Presidence de RDC.
2. Documents operationnels ou humanitaires : MSF, Logistics Cluster, documents de terrain.
3. Sources scientifiques ou genomiques : publications, prepublications, communications techniques.
4. Medias de reference : Jeune Afrique, Reuters, AP, The Guardian.
5. Analyse interne : synthese et reconstruction a partir des sources precedentes.

En cas de divergence, les donnees ne doivent pas etre lissees. La divergence doit etre documentee et, si elle est affichee, signalee au lecteur.

## Regles de formulation

- Dire "premier cas humain documente" et non "patient zero" ou "cas index" si la source animale n'est pas identifiee.
- Dire "deplacement documente" si un trajet est etabli, pas "transmission" sans preuve.
- Dire "deces suspects" lorsque la source parle de deces suspects, meme si le contexte suggere une forte probabilite.
- Dire "extension documentee" lorsque des cas sont rapportes dans une zone, sans supposer automatiquement une chaine de transmission complete.
- Dire "reconstruction narrative" lorsqu'un enchainement est plausible mais pas etabli patient par patient.

## Regles cartographiques

- Les points representant des villes peuvent etre places sur les coordonnees de ville.
- Les zones de sante doivent etre affichees avec `geo_precision = approximate`.
- Les corridors ou zones composites doivent etre affiches comme ancrages narratifs, pas comme localisations exactes.
- Les fleches ou arcs doivent porter un type visible ou documente :
  - `patient_travel`
  - `body_repatriation`
  - `sample_transport`
  - `risk_corridor`
  - `official_extension`
- Un arc ne doit jamais etre interprete comme une preuve de transmission sans mention explicite dans la source.

## Regles sur les chiffres

- Ne jamais additionner cas confirmes et cas suspects dans une seule valeur.
- Ne jamais additionner deces confirmes et deces suspects dans une seule valeur.
- Les champs vides ne signifient pas zero.
- Les chiffres globaux RDC ne doivent pas etre attribues au lieu principal d'un evenement.
- Les donnees INSP du 20 mai sont utilisables comme donnees provisoires.
- La divergence OMS/INSP du 20 mai doit rester visible :
  - INSP : 51 cas confirmes, 575 cas suspects, 148 deces suspects, 847 contacts listes.
  - OMS : 51 cas confirmes en RDC, pres de 600 cas suspects, 139 deces suspects.

## Statuts visuels recommandes

- `confirmed` : style plein, contraste fort.
- `provisional` : style plein mais avec note ou tonalite intermediaire.
- `reconstructed` : style pointille, attenue ou accompagne d'une note.
- `disputed` : style d'alerte editoriale, avec comparaison des sources.
- `suspected` : style distinct des confirmes, jamais fusionne.

## Questions ouvertes

- Le vrai cas index zoonotique reste inconnu.
- Les chaines de transmission patient-par-patient ne sont pas consolidees.
- Certaines coordonnees de zones de sante restent des approximations.
- Les chiffres du 19-20 mai peuvent encore relever de line-lists non harmonisees.
- La part exacte des transmissions communautaires, funeraires et liees aux soins reste a presenter avec prudence.
