# Sources et notes de verification

Ce document liste les sources actuellement utilisees ou identifiees pour la maquette. Les sources locales restent les documents de travail principaux ; les references externes servent surtout a verifier les lieux et a documenter les limites.

## Documents locaux

| Fichier | Role |
|---|---|
| `deep-research-report-ebola.md` | Source de synthese principale : chronologie, chiffres, divergences, sequence narrative et prudence editoriale. |
| `« Ebola ne respecte pas les frontieres » _ en RDC, une souche inedite du virus complique la riposte sanitaire.pdf` | Source journalistique narrative : circulation silencieuse, rites funeraires, cas de Kampala, contexte de conflit. |
| `elements_reflexion_ebola.pdf` | Document de reflexion a analyser plus tard avant integration. |

## Sources institutionnelles mentionnees dans le rapport

| Source | Usage dans le projet |
|---|---|
| OMS | Confirmation, urgence internationale, chiffres globaux, situation Ouganda/RDC. |
| INSP/COUSP-RDC | SitReps, repartition par zone, contacts, deces suspects, signaux operationnels. |
| Ministere de la Sante de RDC | Declaration nationale de l'epidemie. |
| Africa CDC | Urgence continentale et coordination regionale. |
| Presidence de RDC | Reunion de crise et surveillance renforcee. |
| MSF | Alertes humanitaires et lecture terrain. |
| Logistics Cluster | Contraintes d'acces et logistique. |

## Sources media mentionnees dans le rapport

| Source | Usage dans le projet |
|---|---|
| Jeune Afrique | Couche narrative : circulation silencieuse, perceptions locales, rites funeraires, trajet vers Kampala. |
| Reuters | Recoupement international des chiffres et declarations. |
| AP | Recoupement international des chiffres et declarations. |
| The Guardian | Recoupement media international. |

## Notes de verification geographique

Les coordonnees de la v1 sont des points d'ancrage narratifs, pas des emplacements epidemiologiques exacts.

| Lieu | Statut actuel | Note |
|---|---|---|
| Bunia | Verifie approximativement | Les coordonnees utilisees sont coherentes avec des bases de villes comme GeoNames/Mongabay. |
| Mongbwalu | Verifie approximativement | Les coordonnees utilisees correspondent a un point de localite autour de 1 deg 57 N, 30 deg 02 E. |
| Rwampara | Approximation a consolider | Zone de sante representee par un point proche de Bunia ; ne pas lire comme lieu exact. |
| Nyankunde | Verifie approximativement | Point rapproche d'une reference aeroport/localite. |
| Goma | Verifie approximativement | Coordonnees de ville consolidees. |
| Katwa | Approximation a consolider | Zone de sante proche de Butembo ; representation volontairement approximative. |
| Butembo | Verifie approximativement | Coordonnees de ville consolidees. |
| Kampala | Verifie approximativement | Coordonnees de ville consolidees. |
| Bukavu | Verifie approximativement | Lieu potentiel, pas encore utilise dans le recit. |
| Aru | Verifie approximativement | Lieu potentiel, pas encore utilise dans le recit. |
| Kasenyi/Tchomia | Approximation de corridor | Point moyen approximatif ; a utiliser seulement comme corridor de risque ou point d'entree sensible. |

References externes consultees pour les coordonnees :

- Bunia : https://population.mongabay.com/cities/democratic-republic-of-the-congo/bunia.html
- Mongbwalu : https://nona.net/features/map/placedetail.1783526/Mongbwalu/
- Goma et Butembo : https://www.distancecalculator.net/from-butembo-to-goma
- Kampala : https://www.latlong.net/place/kampala-uganda-13546.html
- Bukavu : https://www.geodatos.net/en/coordinates/democratic-republic-of-the-congo/bukavu
- Aru : https://fr.wikipedia.org/wiki/Aru_%28Ituri%29
- Nyankunde : https://www.pilotnav.com/airport/airport-59001
- Tchomia : https://bamwor.com/en/countries/drc/cities/tchomia
- Kasenyi : https://www.geocords.com/place/kasenyi-democratic-republic-of-the-congo-10146/

## Divergences a conserver

| Date | Source | Chiffres | Statut |
|---|---|---|---|
| 2026-05-15 | RDC | 8 cas positifs, 246 cas suspects, 80 deces | Provisoire |
| 2026-05-19 | OMS | 30 cas confirmes, plus de 500 cas suspects, 130 deces suspects | Provisoire |
| 2026-05-20 | INSP | 51 cas confirmes, 575 cas suspects, 148 deces suspects, 847 contacts | Provisoire |
| 2026-05-20 | OMS | 51 cas confirmes en RDC, pres de 600 cas suspects, 139 deces suspects | Divergent/provisoire |

## Regle de mise a jour

Toute nouvelle donnee ajoutee dans les CSV doit etre accompagnee :

- d'une source ;
- d'un `source_type` ;
- d'un `confidence` ;
- d'un `data_status` ;
- d'une note si elle peut etre mal interpretee visuellement.

## Sources ajoutees apres v1

### Jeune Afrique - 28 mai 2026

Document d'exploitation : `docs/source-note-2026-05-28-jeune-afrique.md`

Article : "Ebola : l'Ouganda ferme ses frontieres avec la RDC, alors que la guerre dans l'Est favorise la propagation de l'epidemie".

Apports principaux :

- fermeture temporaire de la frontiere ougandaise avec la RDC ;
- 7 cas confirmes en Ouganda, dont 1 mortel ;
- plus de 1 000 cas suspects et 223 deces selon l'OMS citee par l'article ;
- isolement obligatoire de 21 jours pour les entrants en Ouganda depuis la RDC ;
- appel de l'OMS a un cessez-le-feu immediat ;
- lien explicite entre guerre, deplacements de population et aggravation du risque ;
- manque de moyens a Rwampara ;
- patients arrivant parfois a moto sans protection ;
- tentes d'isolement incendiees apres conflit autour d'un corps.

Usage recommande :

- source media utile pour la v2 ;
- a utiliser pour une sequence "rupture de controle / fermeture frontaliere" ;
- ne pas integrer telle quelle dans la v1 sans elargir la periode et le modele de donnees ;
- recouper les chiffres avec une source OMS ou ministerielle directe avant publication.
