# Prochaines etapes et chantiers (a partir du 7 juin 2026)

Evaluation des remarques de l'editeur, avec des options pour chacune.
Langage simple : chaque point dit le constat, les options, et ce que je
recommande.

---

## 1. Lisibilite de la timeline sur mobile

**Constat.** Sur petit ecran, les titres au-dessus des points (les annotations
des jalons) se chevauchent et deviennent illisibles. Les points aussi sont
trop serres.

**Options.**
- A. Sur mobile, **enlever les titres au-dessus des points** : on garde les
  points + les couleurs + les dates + la legende. On tape un point pour lire le
  detail dans le panneau. Simple, gros gain de lisibilite.
- B. Sur mobile, **passer la timeline en liste verticale** (un evenement par
  ligne) au lieu de la frise horizontale. Plus de travail, mais tres lisible.
- C. Garder les titres mais en montrer **moins** et plus petits sur mobile.
  Demi-mesure, risque de rester charge.

**Recommande : A** maintenant (rapide, efficace), B plus tard si on veut une
vraie version mobile dediee.

---

## 2. Recit : remplacer les textes provisoires par les vrais

**Constat.** Beaucoup de textes d'evenements (titres, faits) sont des brouillons
de synthese, pas encore de vrais textes journalistiques sources.

**Options.**
- A. Reecrire **evenement par evenement** a partir des sources (rapports,
  articles). Travail editorial soigne, mais long.
- B. S'appuyer sur l'**agent de recherche** (point 5) pour proposer des textes
  sources, puis relecture humaine.
- C. Commencer par les **evenements principaux** (les jalons), le reste ensuite.

**Recommande : C puis B.** Prioriser les jalons, et brancher l'agent de
recherche pour accelerer avec des sources verifiees.

---

## 3. Coherence des donnees + le bug de la courbe + format reactualisable

**Constat (bug reel).** Dans la courbe et la ligne de chiffres, le mot
« deces » change de sens d'une date a l'autre :
- au 29 mai : « 246 deces » = deces **suspects** ;
- au 31 mai : « 42 deces » = deces **confirmes** (les suspects n'etaient pas
  communiques ce jour-la).
Du coup on lit « 246 puis 42 », comme si les morts avaient baisse. C'est faux :
ce sont deux choses differentes melangees.

**Constat (donnees).** Le reste est plutot coherent : les confirmes ne font que
monter (8 -> 282), les suspects chutent au 31 mai (1199 -> 321) a cause du
reclassement de laboratoire (vrai, mais a expliquer).

**Options pour le bug.**
- A. **Toujours separer** « deces confirmes » et « deces suspects », jamais les
  fondre en un seul « deces ». La courbe peut avoir deux lignes de deces, ou on
  affiche les deux chiffres distincts. Honnete et clair.
- B. Afficher un seul « deces total » = confirmes + suspects. Mais avant on
  n'avait que les suspects : on melangerait encore des definitions. A eviter.

**Recommande : A.**

**Format reactualisable + detection d'incoherences.**
- Le CSV est deja « reactualisable » (on ajoute des lignes). Ce qui manque,
  c'est un **controle automatique de coherence**.
- Option : enrichir le script `scripts/validate-reference-data.mjs` avec des
  verifications : un cumul (confirmes, contacts) qui **baisse** sans raison, un
  champ « deces » qui change de type, des trous de dates, un total national
  incoherent. Le script signale les anomalies avant publication.
- Option : documenter une **procedure d'actualisation** claire (ou ajouter une
  ligne de bilan, ou ajouter un evenement, quoi verifier).

**Recommande : enrichir la validation avec des controles de coherence**, garder
le CSV, documenter la procedure.

---

## 4. Actualisation avec les nouveaux rapports CDC

**Constat.** Aujourd'hui (7 juin), les chiffres ont forcement evolue. L'editeur
veut importer de nouveaux PDF et actualiser la timeline.
**A noter :** pour l'instant je ne trouve que les rapports du **29/30/31 mai**
(deja integres). **Pas de nouveau PDF (1-6 juin)** dans le dossier connu. A
preciser : le chemin des nouveaux fichiers.

**Options.**
- A. Creer un dossier `sources_pdf_cdc/` dans le projet et y **ranger les PDF
  CDC** (tracabilite), puis lire les nouveaux et ajouter les bilans + evenements.
- B. Faire l'actualisation **apres** avoir corrige le point 3 (deces), pour ne
  pas propager l'incoherence dans les nouvelles donnees.

**Recommande : 3 d'abord, puis 4.** Corriger les deces et ajouter les controles,
ensuite ranger les PDF dans `sources_pdf_cdc/` et ingerer les nouvelles dates.

---

## 5. Agent de recherche d'actualite (le point de fond)

**Constat (tres juste).** Une timeline nourrie **seulement** par les rapports
CDC = seulement des chiffres nationaux. Or la force de la dataviz, c'est les
**evenements** lies a des lieux (attaques, mesures, declarations, passages de
frontiere) qui font vivre la carte et le recit. Les chiffres seuls cassent cette
dynamique.

**Options.**
- A. Un **agent de recherche recurrent** qui cherche l'actualite (OMS, AP,
  Reuters, Jeune Afrique, presse locale...) et **propose** des evenements
  candidats avec leurs sources, pour relecture humaine avant ajout.
- B. Une **passe de recherche manuelle** assistee a chaque actualisation
  (l'assistant cherche, l'editeur valide).
- C. **Hybride** : l'agent propose des candidats sources, l'editeur garde la main
  pour valider/ecrire. Controle editorial conserve.

**Recommande : C.** Commencer simple (recherche assistee a la demande), puis
automatiser en routine si ca marche. C'est aussi ce qui nourrira le point 2
(vrais textes) et le point 4 (vraies dates evenementielles, pas que des
chiffres).

---

## Ordre conseille

1. **Point 3** (corriger les deces + controles de coherence) — bloquant, rapide.
2. **Point 1** (timeline mobile) — rapide, visible.
3. **Point 4** (ranger les PDF + actualiser) — une fois 3 fait, et avec le chemin
   des nouveaux PDF.
4. **Point 5** (agent de recherche) — chantier de fond, a cadrer.
5. **Point 2** (vrais textes) — au fil de l'eau, aide par le point 5.
