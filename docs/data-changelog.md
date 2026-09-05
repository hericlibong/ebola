# Changelog des donnees

Ce fichier suit les changements substantiels apportes au jeu de donnees de reference.

Il ne remplace pas les sources. Il sert a documenter les ajouts, corrections et points a verifier.

## 2026-09-05 (2) — donnees du 30 aout

Integration controlee du bilan INRB-UMIE du **30 aout 2026**. Le 29 aout n'a pas
ete publie par la source (cadence SitRep).

### Pourquoi la PR #73 n'a pas ete fusionnee telle quelle

La branche `auto/data-2026-09-02` a ete creee sur `4ba0d77`, **avant** l'audit
editorial de la PR #76. Son `events.csv` porte donc encore les 38 textes non
corriges, les trois anciens identifiants, aucune colonne `counts_policy` et des
fins de ligne mixtes. La fusionner aurait ressuscite ces versions.

Seuls les **ajouts reellement nouveaux** ont donc ete reportes sur le `main`
corrige (`e58747e`) :

- `counts.csv` : 1 releve national, `ct_20260830_drc_inrb_umie` ;
- `sources.csv` : 1 source, `inrb_umie_2026_09_02_snapshot` ;
- `events.csv` : 2 events, `ev_20260830_inrb_umie_update` et `ev_20260830_katwa_geo` ;
- `data/staging/` : le snapshot `a0d0f97` et son rapport de comparaison.

Aucun CSV n'a ete remplace par la version de la PR #73.

### Bilan national

| Serie | 28 aout | 30 aout | Ecart |
|---|---:|---:|---:|
| Cas confirmes | 5 945 | **6 100** | +155 |
| Deces confirmes | 2 862 | **2 950** | +88 |

Cas suspects et deces suspects non communiques (ND).

### Audit differentiel des deux nouveaux textes

Verifie et exact : dates event/chiffres coherentes, totaux 6 100 / 2 950, ecart
+155 / +88 en deux jours, absence de publication le 29 aout, Katwa 390 (+13 sur
les 377 du 28 aout), Butembo 165, Beni 138, somme 693 donc "plus de 690" correct,
Bunia 1 397 et Rwampara 950 bien les deux premieres zones du pays, provinces
exactes.

Quatre erreurs certaines corrigees :

1. **"cinq mois apres les premiers signaux"** -> "un peu plus de quatre mois".
   Le premier signal documente est du 24 avril 2026 (`ev_20260424_bunia_first_known`),
   soit 4 mois et 6 jours avant le 30 aout.
2. **"deuxieme foyer du Nord-Kivu"** (titre de `ev_20260830_katwa_geo`) ->
   "premiere zone du Nord-Kivu". Katwa (390) devance Butembo (165) et Beni (138) :
   c'est la premiere zone de la province, ce que la PR #76 avait deja etabli pour
   `ev_20260720_katwa_geo`. Le rang provincial du Nord-Kivu, deuxieme apres
   l'Ituri, est desormais dit explicitement dans le corps du texte.
3. **"le Nord-Kivu represente un ensemble de pres de 700 cas"** -> les 693 cas
   sont le total des **trois zones citees**, pas de la province : Musienene
   comptait deja 75 cas au 28 aout, le Nord-Kivu depasse donc 768.
4. **"a 500 kilometres de l'epicentre iturien"** -> "environ 189 kilometres a vol
   d'oiseau de Bunia". Distance orthodromique calculee depuis les coordonnees de
   `places.csv` (Katwa 0,116513 / 29,371825 ; Bunia 1,5667 / 30,2500) : 188,5 km.
   La meme methode redonne 321,6 km pour Bunia-Isiro et 258,9 km pour Bunia-Wamba,
   conformes aux valeurs publiees le 2026-09-05.

Corrige aussi : "depuis les premieres contaminations de juin" -> mi-mai. Le point
INSP du 20 mai enregistre deja Katwa 1, Butembo 1 et Goma 1.

Les corrections sont tracees dans le champ `notes` de chaque event.

### Validation

`npm run validate:reference` : 48 labels, 17 places, 28 sources, **124 events**,
8 flows, **94 counts** — passe, 27 avertissements, inchange. `npm run build`
passe. `git diff --check` : rien. Les acquis de la PR #76 sont intacts : 14
mentions du Haut-Uele, distances a vol d'oiseau, 9 valeurs `narrative_only`,
entite `nizi` sans coordonnees, fins de ligne LF, aucun ancien identifiant
reintroduit.

Les PR #74 et #75, cumulatives jusqu'au 1er et au 2 septembre, ne sont pas
integrees et restent ouvertes.

## 2026-09-05

Audit editorial du corpus arrete au 28 aout 2026 (122 events). Aucune donnee du
30 aout n'est integree dans ce lot : les PR automatiques #73, #74 et #75 restent
ouvertes et feront l'objet d'un controle differentiel separe.

### Provinces

Isiro, Wamba et Pawa appartiennent au **Haut-Uele**. Onze events les rattachaient
au Bas-Uele, a la Tshopo ou au Maniema. Corriges : `ev_20260713_inrb_umie_update`,
`ev_20260723_inrb_umie_update`, `ev_20260803_inrb_umie_update`,
`ev_20260804_inrb_umie_update`, `ev_20260804_katwa_geo`, `ev_20260811_butembo_geo`,
`ev_20260811_inrb_umie_update`, `ev_20260819_inrb_umie_update`,
`ev_20260822_inrb_umie_update`, `ev_20260828_aru_geo` (renomme, voir plus bas) et
`ev_20260828_inrb_umie_update`.

Trois autres events portaient la meme erreur de province sans nommer de zone :
`ev_20260815_inrb_umie_update`, `ev_20260820_inrb_umie_update` et
`ev_20260826_inrb_umie_update`. Corriges egalement.

Places : `isiro` et `wamba` ajoutes au referentiel avec coordonnees verifiees
(Wikipedia / database.earth). Leurs `notes` portent la province exacte et la
distance a Bunia.

### Distances

Les deux mentions de « plus de 700 km de Bunia » etaient fausses. Remplacees par
des distances **a vol d'oiseau**, explicitement qualifiees et recalculees depuis
les coordonnees de `places.csv` : Bunia-Isiro environ **322 km**, Bunia-Wamba
environ **259 km**.

### Dates, calculs et comparaisons

- `ev_20260516_who_pheic` -> **`ev_20260517_who_pheic`** : la determination PHEIC
  est datee du 17 mai 2026. `date` corrigee, `date_end` videe, « autour du
  16-17 mai » retire.
- `ev_20260520_insp_update` : le point publie le 20 mai porte sur les donnees du
  **19 mai**. Date de reference rendue explicite dans le texte.
- `ev_20260615_inrb_umie_update` : 34 -> **31** zones de sante.
- `ev_20260617_nyankunde_surge` : Nyankunde etait a 45 cas les 15 et 16 juin puis
  68 le 17. « Pratiquement doubler » -> **environ +51 %**.
- `ev_20260620_inrb_umie_update` : « au moins cinq provinces » -> **trois
  provinces : Ituri, Nord-Kivu et Sud-Kivu**.
- `ev_20260623_inrb_umie_update` : 34 -> **33** zones de sante.
- `ev_20260630_inrb_umie_update` : 933 cas / 245 deces sont les valeurs du
  18 juin, pas l'ouverture de juin. Comparaison refaite au **1er juin : 344 cas
  confirmes, 60 deces confirmes**.
- `ev_20260711_inrb_umie_update` : 218 -> **302 cas supplementaires** depuis le
  5 juillet (1 624). Parenthese contradictoire « 1 708 le 6 » supprimee.
- `ev_20260720_inrb_umie_update` : Nizi « a double en trois semaines » -> **a plus
  que triple depuis fin juin**.
- `ev_20260720_katwa_geo` : Katwa ne depasse pas les autres zones du Nord-Kivu
  reunies. -> **premiere zone du Nord-Kivu prise individuellement**.
- `ev_20260731_inrb_umie_update` : environ 1 400 -> **1 100 nouveaux cas en juin**.
- `ev_20260804_katwa_geo` : « depasse 200 » -> **atteint 200**.
- `ev_20260809_inrb_umie_update` : « un mois et demi apres » -> **moins de trois
  semaines apres** le millier de morts du 22 juillet.
- `ev_20260810_inrb_umie_update` : valeurs du 11 aout retirees d'un event date du
  10 aout.
- `ev_20260811_inrb_umie_update` : « depasse 249 cas » -> **atteint 249 cas**.
- `ev_20260824_inrb_umie_update` : comparaison vague remplacee par le calcul exact
  — Nizi, environ **622 cas**, soit plus de trois fois le total du Nord-Kivu au
  15 juillet (environ **199 cas**).
- `ev_20260825_inrb_umie_update` : 80-100 -> **environ 70 a 80 nouveaux cas par
  jour sur la periode recente**.
- `ev_20260826_inrb_umie_update` : « Mangala (227) depasse Katwa (377) » etait faux
  et melangeait des chiffres du 28 aout. Remplace par les valeurs du **26 aout** :
  **Katwa 368, Mangala 212**, « Katwa reste nettement devant Mangala ».
- `ev_20260828_inrb_umie_update` : « la moitie des cas » -> **plus de quatre cas
  sur cinq**, soit environ 82,5 %.

### Bilans contemporains du 20 au 31 mai : `counts_policy`

Nouvelle colonne editoriale de `events.csv`, documentee dans
`docs/reference-data-model.md`. Valeur `narrative_only` : l'event porte deja un
bilan contemporain cite et attribue dans son texte (OMS, Africa CDC, El Pais), et
aucun bilan chiffre d'une autre serie ne doit lui etre rattache.

Neuf events marques : `ev_20260520_insp_update`, `ev_20260522_who_risk_very_high`,
`ev_20260525_drc_904_disputed`, `ev_20260526_who_900_223`,
`ev_20260528_238_deaths_reported`, `ev_20260529_cdc_update`,
`ev_20260530_cdc_update`, `ev_20260530_contacts_gap`, `ev_20260531_cdc_update`.

Sans ce drapeau, un consommateur qui joint `counts.csv` sur (date, entite) collait
la serie INRB-UMIE retrospective a ces events : le texte d'`ev_20260529_cdc_update`
annonce 203 confirmes (Africa CDC) tandis que la serie INRB donne 263 pour le meme
jour. Les deux series restent intactes et ne sont ni fusionnees ni substituees.

### Nizi

`ev_20260630_fataki_geo` parlait de Nizi mais etait ancre sur `fataki`, une autre
zone. Renomme en **`ev_20260630_nizi_geo`** et rattache a une nouvelle entite
`nizi`, **declaree sans coordonnees** : aucune source fiable ne les donne (le
staging INRB-UMIE note la zone comme absente du referentiel). L'event est donc
correctement nomme mais sans ancrage cartographique. Renseigner
`latitude`/`longitude` apres verification suffira a l'afficher. Aucune coordonnee
approximative n'a ete inventee et le proxy Fataki n'a pas ete retabli.

### Renommage

`ev_20260828_aru_geo` -> **`ev_20260828_isiro_geo`**. L'event porte sur Isiro et
Wamba ; `place_id` etait deja `isiro`, seuls l'identifiant et la note gardaient une
reference obsolete a Aru. Les trois identifiants renommes n'etaient references
nulle part ailleurs (ni `flows.csv`, ni `counts.csv`, ni `src/`, ni `docs/`).

### Fins de ligne

`events.csv` avait des fins de ligne **mixtes** : 65 de ses 123 lignes en CRLF,
les autres en LF. Le fichier est normalise en **LF**, comme les cinq autres CSV du
socle et comme les lignes ecrites par l'automatisation. Cela n'ajoute aucune
churn : la nouvelle colonne `counts_policy` reecrivait deja toutes les lignes.

### Validation

`npm run validate:reference` : 48 labels, 17 places, 27 sources, 122 events,
8 flows, 93 counts — passe, 27 avertissements, soit exactement le nombre d'avant
le lot. `npm run build` passe.

## 2026-06-15

- Debut du protocole d'enrichissement editorial (Phase A, jour par jour), avec
  recherche web par evenement et affichage en francais accentue.
- Source ajoutee : `who_don602_2026_05_16` (OMS Disease Outbreak News, 16 mai 2026).
- Evenements enrichis et resources sur l'OMS DON602 :
  - 24 avril (`ev_20260424_bunia_first_known`) : detail clinique + retard de detection de ~4 semaines.
  - 5 mai (`ev_20260505_mongbwalu_alert`) : alerte precisee (quatre soignants morts en quatre jours).
- Evenement cree : `ev_20260501_care_seeking` (1er mai), **reconstruction** de la
  migration de soins Mongbwalu -> Rwampara/Bunia. Date approximative : aucune source
  ne date precisement ces deplacements (periode de circulation silencieuse).

## 2026-06-13

- Reactualisation INRB-UMIE via le script de staging automatique.
- Snapshot amont integre : `6f156b6` (build manifest `1dfdf1e`, construit le 2026-06-12).
- Source ajoutee : `inrb_umie_2026_06_13_snapshot`.
- 4 lignes `counts.csv` ajoutees pour `drc_total`, du 8 au 11 juin :
  - 8 juin : 598 confirmes, 138 suspects, 115 deces confirmes, deces suspects non communiques (ND).
  - 9 juin : 635 confirmes, 119 suspects, 127 deces confirmes, deces suspects ND.
  - 10 juin : 676 confirmes, 119 suspects, 136 deces confirmes, deces suspects ND.
  - 11 juin : 689 confirmes, 168 suspects, 139 deces confirmes, **64 deces suspects** repris apres plusieurs jours sans communication.
- Point d'arbitrage : la serie des deces suspects passe de 242 (dernier point du
  7 juin) a 64 le 11 juin. Forte baisse documentee comme revision / reclassement
  ou changement de definition cote source ; les jours intermediaires restent ND
  (champs vides, pas des zeros).
- Un point de situation par date (`ev_2026060[8-9]`, `ev_2026061[0-1]_inrb_umie_update`)
  pour que la timeline progresse jour par jour et ne saute pas du 7 au 11 juin.
  Ces points restent cales sur la seule source chiffree INRB-UMIE (pas de recit
  de terrain, qui demanderait des sources editoriales separees).
- L'amont s'arrete au 11 juin (pas de bilan 12-13 juin dans ce snapshot).
- Borne de couverture editoriale (`EDITORIAL_COVERAGE_END`) portee au 11 juin 2026.
- **Reste a faire (recit)** : les chiffres 8-11 juin sont integres, mais les
  evenements narratifs de ces jours (« histoire a raconter ») restent a sourcer
  separement (rapports Africa CDC ou presse), la serie INRB-UMIE ne fournissant
  que les chiffres nationaux.

## 2026-06-08

- Bascule controlee de la serie nationale RDC vers INRB-UMIE/INSP depuis le
  snapshot `fd27d5c` du 2026-06-08 (build manifest `979a344`).
- Source ajoutee : `inrb_umie_2026_06_08_snapshot`.
- Les anciennes lignes nationales `drc_total` issues de sources multiples
  (documents locaux, OMS, AP, Jeune Afrique, El Pais, Africa CDC) sont remplacees
  par une serie nationale unique INRB-UMIE du 14 mai au 6 juin.
- Les lignes non nationales restent en place : Ouganda et photographie par zones
  de sante du 20 mai.
- Points d'arbitrage : la serie INRB-UMIE contient des revisions/reclassements,
  dont une baisse des cas confirmes le 30 mai et plusieurs baisses de cas
  suspects. Les notes de `counts.csv` documentent ces ruptures.
- Les deces suspects ne sont pas communiques sur plusieurs dates. Ces absences
  restent des champs vides, pas des zeros.
- Rappel : deces confirmes et deces suspects restent separes; aucune serie
  generique « deces » ne doit etre reconstituee.

## 2026-06-09

- Mise a jour INRB-UMIE via le script de staging automatique.
- Snapshot amont integre pour le point national du 7 juin :
  `4735863` (build manifest `6bc4479`, construit le 2026-06-09).
- Source ajoutee : `inrb_umie_2026_06_09_snapshot`.
- Ligne `counts.csv` ajoutee pour `drc_total` au 2026-06-07 :
  550 cas confirmes, 94 cas suspects, 101 deces confirmes, 242 deces suspects
  reportes avec asterisque sur la plateforme INRB-UMIE.
- Evenement `ev_20260607_inrb_umie_update` ajoute pour synchroniser la timeline
  et le panneau narratif avec le dernier bilan national.
- Borne publique de la storymap portee au 7 juin 2026.

## 2026-06-07

- Extension de la chronologie aux **1-5 juin** (rapports quotidiens Africa CDC) :
  5 bilans nationaux (`counts.csv`), 5 sources, et **4 evenements narratifs**
  (extension a de nouvelles zones de sante en Ituri ; attaque de l'equipe
  Croix-Rouge a Bunia le 1er juin ; attaque a Mongbwalu + 19 cas en fuite le
  4 juin ; saturation des lits a Bunia et flambee de 105 cas le 5 juin).
- Les PDF CDC (29 mai -> 5 juin) sont ranges dans `sources_pdf_cdc/`.
- **Correction d'incoherence (deces)** : le panneau affichait un seul « deces »
  qui changeait de type selon la date (suspects un jour, confirmes un autre),
  donnant de fausses baisses (ex. 246 -> 42). Desormais on **separe toujours**
  « deces confirmes » et « deces suspects ». La courbe utilise les **deces
  confirmes** (serie fiable et croissante : 17 -> 42 -> 78).
- Borne de validation portee au 2026-06-05.
- Reste a faire (voir `docs/prochaines-etapes.md`) : controles de coherence
  automatiques dans le script de validation.

## 2026-06-02

- Extension de la chronologie aux **29, 30 et 31 mai** a partir des rapports
  quotidiens Africa CDC (Daily Key Updates) fournis par l'utilisateur.
- 3 sources ajoutees : `africacdc_2026_05_29/30/31`.
- 3 bilans nationaux ajoutes dans `counts.csv` (drc_total) :
  - 29 mai : 203 confirmes, 1139 suspects, 17 deces confirmes, 246 deces suspects, 2987 contacts.
  - 30 mai : 254 confirmes, 1199 suspects, 42 deces confirmes, 259 deces suspects, 3200 contacts.
  - 31 mai : 282 confirmes, **321 suspects** (reclasses apres confirmation labo), 42 deces confirmes, contacts 3200.
- 6 evenements ajoutes (situation_update + mesures/contraintes de riposte),
  phase `response_breakdown`. Faits notables : livraison de reactifs (4800 tests,
  2000 a Bunia), seulement 30 % des contacts suivis, remise de 15 motos en Ituri,
  resorption du retard de laboratoire (suspects 1199 -> 321).
- Borne de validation des dates portee de 2026-05-28 a 2026-05-31.
- Note : la repartition des cas **par ville** reste figee au 20 mai (seul point
  INSP fiable) ; les rapports CDC sont nationaux, sans detail par ville.
- **Bulletins de chiffres sortis de la timeline** : les `situation_update` qui
  ne font que reporter le total national (25 mai 904 divergent, 26 mai, 28 mai
  238 deces, bulletins CDC 29/30/31) passent en `display_tier = context`. Ils
  restent dans `events.csv` mais ne sont plus des points de la timeline : la
  **courbe d'evolution** (panneau, depuis `counts.csv`) porte desormais ces
  chiffres. Conserves comme points : 20 mai (ancre de la photo par zone) et
  22 mai (l'OMS releve le risque national).
- **Phase renommee** : `response_breakdown` passe de « Riposte sous pression »
  a « Riposte debordee » (label dans `labels.csv` et `src/phases.ts`), plus
  clair et debarrasse de l'amalgame avec les compteurs.

## 2026-05-29

- Creation de la procedure d'actualisation des donnees.
- Confirmation du fichier maitre : `public/data/reference/events.csv`.
- Confirmation des tables de support : `sources.csv`, `places.csv`, `counts.csv`, `flows.csv`, `labels.csv`.
- Decision : les evenements `display_tier = verify` restent dans `events.csv`, mais ne sont pas affiches par defaut.
- Decision : les flux restent dans `flows.csv`, mais ne sont pas affiches par defaut dans la maquette actuelle.
