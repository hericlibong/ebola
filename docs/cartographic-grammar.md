# Grammaire cartographique

Ce document decrit les conventions visuelles appliquees dans la phase 4.

## Points et lieux

Les points restent des ancrages geographiques. Ils ne doivent pas etre lus comme des localisations epidemiologiques exactes lorsque `geo_precision` vaut `approximate`.

Convention actuelle :

- couleur issue du `data_status` de la sequence active ;
- contour plein pour les faits confirmes ou provisoires ;
- contour pointille pour les elements reconstruits ;
- halo discret pour les donnees provisoires.

## Bulles proportionnelles

Les bulles de taille apparaissent lorsque des chiffres par zone sont disponibles dans `zone_counts.csv`.

Dans la v1, elles representent les `confirmed_cases` du 20 mai 2026.

Regles :

- la taille encode les cas confirmes, pas les cas suspects ;
- le nombre affiche au centre correspond aux cas confirmes ;
- les champs vides ne sont jamais interpretes comme zero ;
- les donnees du 20 mai restent `provisional`.

## Arcs et flux

Les arcs viennent de `flows.csv`. Ils representent des relations documentees ou reconstruites, pas automatiquement des transmissions.

Types pris en charge :

- `patient_travel` : deplacement documente d'un patient ;
- `body_repatriation` : rapatriement de corps ;
- `sample_transport` : transport, investigation ou circulation operationnelle ;
- `suspected_spread` : propagation suspectee ;
- `risk_corridor` : corridor de risque ;
- `official_extension` : extension officiellement documentee.

Convention actuelle :

- couleur selon `data_status` ;
- opacite selon `confidence` ;
- trait pointille pour `reconstructed` ;
- trait interrompu pour `provisional` ;
- trait plus epais pour les deplacements de patients.

## Notes et tooltips

La carte affiche une note contextuelle sous la legende :

- sans arc actif : rappel sur l'approximation des points ;
- avec arc reconstruit : rappel que l'arc ne prouve pas une chaine de transmission ;
- avec arc documente : rappel qu'un deplacement n'est pas automatiquement une transmission.

Les arcs affichent un tooltip au survol avec :

- le type de flux ;
- la description editoriale du flux.

## Risque principal

Le risque principal reste la surinterpretation des fleches. Toute amelioration visuelle des arcs doit conserver une distinction claire entre :

- deplacement documente ;
- corridor de risque ;
- extension administrative ;
- transmission prouvee.
