# Note source - Jeune Afrique, 28 mai 2026

## Reference

Article : "Ebola : l'Ouganda ferme ses frontieres avec la RDC, alors que la guerre dans l'Est favorise la propagation de l'epidemie"

Source : Jeune Afrique

Publication : 28 mai 2026, 09h03

Statut dans le projet : source media recente, utile pour la v2 et pour la mise a jour du recit apres le 20 mai.

## Apports principaux

- Fermeture temporaire de la frontiere ougandaise avec la RDC le 27 mai.
- 7 infections confirmees en Ouganda, dont 1 mortelle.
- Plus de 1 000 cas suspects et 223 deces selon l'OMS.
- Appel de Tedros Adhanom Ghebreyesus a un cessez-le-feu immediat.
- Lien explicite entre conflit, deplacements de population, camps surpeuples et risque de transmission.
- Isolement obligatoire de 21 jours pour toute personne entrant en Ouganda depuis la RDC.
- Exceptions possibles pour les equipes Ebola et humanitaires, sous conditions strictes.
- Obligation annoncee pour les medias ougandais de consacrer 30 minutes quotidiennes en prime time a la sensibilisation Ebola.
- Manque de moyens a l'hopital de Rwampara.
- Patients parfois transportes a moto sans protection.
- Tentes d'isolement recemment incendiees par des jeunes voulant recuperer un corps.

## Integration possible aux donnees

Ces lignes sont proposees pour une v2. Je ne recommande pas de les ajouter directement a la v1 actuelle sans refonte de la periode et du recit.

### Evenements potentiels

```csv
event_id,date,date_end,place_id,event_type,title,kicker,description,uncertainty_note,confirmed_cases,suspected_cases,confirmed_deaths,suspected_deaths,contacts,source_label,source_type,confidence,data_status,map_action,map_center_lng,map_center_lat,map_zoom,visible_places,active_flows,story_step
ev_20260527_uganda_border,2026-05-27,,kampala,border_closure,L'Ouganda ferme temporairement sa frontiere,La crise devient transfrontaliere,"L'Ouganda annonce la fermeture temporaire de sa frontiere avec la RDC, avec exceptions possibles pour les equipes Ebola et humanitaires sous conditions medicales strictes.","La mesure porte sur le controle des mouvements frontaliers ; elle ne doit pas etre lue comme une preuve d'une transmission locale generalisee en Ouganda.",7,,,,,"Jeune Afrique 2026-05-28; ministere ougandais cite",media,high,confirmed,show_flow,31.6,0.75,6.2,kampala|bunia|aru|kasenyi_tchomia,flow_crossborder_risk,7
ev_20260527_ceasefire_call,2026-05-27,,goma,response_measure,L'OMS appelle a un cessez-le-feu,La riposte depend de l'acces humanitaire,"Tedros Adhanom Ghebreyesus appelle les belligerants de l'est de la RDC a un cessez-le-feu immediat pour permettre aux equipes medicales de travailler et limiter les deplacements de population.","Cet evenement concerne les conditions de controle de l'epidemie, pas une nouvelle chaine de transmission.",,,,,,"Jeune Afrique 2026-05-28; OMS citee",media,high,confirmed,show_all,30.3,0.3,5.4,bunia|mongbwalu|rwampara|goma|bukavu|kampala,,8
ev_20260528_rwampara_capacity,2026-05-28,,rwampara,response_constraint,Rwampara manque de moyens,Le soin devient un point de fragilite,"A l'hopital de Rwampara, les moyens manquent ; des patients arrivent parfois a moto sans protection et une salle d'isolement a ete improvisee apres l'incendie de tentes fournies par une ONG.","Les observations de terrain sont journalistiques ; elles documentent une contrainte operationnelle, pas un bilan epidemiologique.",,,,,,"Jeune Afrique 2026-05-28; AFP citee",media,medium,confirmed,focus_place,30.25,1.56,7.2,rwampara,,9
```

### Comptages potentiels

```csv
date,place_id,confirmed_cases,suspected_cases,confirmed_deaths,suspected_deaths,contacts,source_label,confidence,data_status
2026-05-27,uganda_total,7,,1,,,"Jeune Afrique 2026-05-28; ministere ougandais cite",high,confirmed
2026-05-28,drc_total,,1000,,223,,"Jeune Afrique 2026-05-28; OMS citee",medium,provisional
```

Avant integration, il faudra soit ajouter `drc_total` et `uganda_total` dans `places.csv` comme entites non cartographiques, soit creer une table separee `country_counts.csv`.

### Flux potentiel

```csv
flow_id,date,from_place_id,to_place_id,flow_type,description,source_label,confidence,data_status
flow_crossborder_risk,2026-05-27,bunia,kampala,risk_corridor,"Fermeture temporaire de la frontiere ougandaise avec exceptions humanitaires et isolement obligatoire de 21 jours pour les entrants depuis la RDC.",Jeune Afrique 2026-05-28,high,confirmed
```

Ce flux doit etre represente comme un corridor de risque et de controle frontalier, pas comme une transmission prouvee.

## Impact narratif

L'article renforce l'idee que la v2 ne doit pas seulement raconter la detection tardive. Elle doit aussi raconter la perte de controle :

1. circulation silencieuse ;
2. confirmation officielle ;
3. extension regionale ;
4. rupture de la riposte par conflit, defiance, incendies, manque de moyens ;
5. reponse transfrontaliere de l'Ouganda.

## Prudence editoriale

- Les chiffres "plus de 1 000 cas suspects" et "223 deces" doivent rester attribues a l'OMS telle que citee par Jeune Afrique.
- Le total de 7 cas en Ouganda doit etre separe des cas RDC.
- La fermeture de frontiere est une mesure de controle, pas un indicateur direct de transmission.
- Les observations a Rwampara doivent etre traitees comme observations journalistiques de terrain.
- Les details sur les structures incendiees doivent rester agreges pour ne pas exposer de points sensibles.
