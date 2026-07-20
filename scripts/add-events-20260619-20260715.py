#!/usr/bin/env python3
"""Ajoute les events INRB-UMIE pour les dates 2026-06-19 au 2026-07-15."""
import csv
import sys
import os

EVENTS_FILE = "public/data/reference/events.csv"
SOURCE = "inrb_umie_2026_07_20_snapshot"

FIELDNAMES = [
    "event_id", "date", "date_end", "place_id", "event_type",
    "headline", "fact_text", "quote",
    "confirmed_cases", "suspected_cases", "confirmed_deaths", "suspected_deaths",
    "contacts", "source_id", "source_type", "confidence", "data_status",
    "display_priority", "display_tier", "map_layer", "timeline_group",
    "update_status", "notes"
]

def nat(event_id, date, headline, fact_text,
        cc, sc, cd, sd,
        notes, display_priority="1"):
    return {
        "event_id": event_id,
        "date": date,
        "date_end": "",
        "place_id": "drc_total",
        "event_type": "situation_update",
        "headline": headline,
        "fact_text": fact_text,
        "quote": "",
        "confirmed_cases": cc,
        "suspected_cases": sc,
        "confirmed_deaths": cd,
        "suspected_deaths": sd,
        "contacts": "",
        "source_id": SOURCE,
        "source_type": "official",
        "confidence": "high",
        "data_status": "provisional",
        "display_priority": display_priority,
        "display_tier": "secondary",
        "map_layer": "clinical",
        "timeline_group": "response_breakdown",
        "update_status": "active",
        "notes": notes,
    }

def geo(event_id, date, place_id, headline, fact_text, cc, notes, timeline_group="regional_spread"):
    return {
        "event_id": event_id,
        "date": date,
        "date_end": "",
        "place_id": place_id,
        "event_type": "situation_update",
        "headline": headline,
        "fact_text": fact_text,
        "quote": "",
        "confirmed_cases": cc,
        "suspected_cases": "",
        "confirmed_deaths": "",
        "suspected_deaths": "",
        "contacts": "",
        "source_id": SOURCE,
        "source_type": "official",
        "confidence": "high",
        "data_status": "provisional",
        "display_priority": "2",
        "display_tier": "secondary",
        "map_layer": "clinical",
        "timeline_group": timeline_group,
        "update_status": "active",
        "notes": notes,
    }

NEW_EVENTS = [
    # ── ÉVÉNEMENTS NATIONAUX ────────────────────────────────────────────────
    nat(
        "ev_20260619_inrb_umie_update", "2026-06-19",
        "956 confirmés au 19 juin : la flambée poursuit sa progression",
        ("Au 19 juin, le bilan national atteint 956 cas confirmés et 162 cas suspects, "
         "avec 247 décès confirmés et 47 décès suspects. La dynamique de transmission reste "
         "soutenue depuis l'épicentre iturien — Bunia, Rwampara, Mongbwalu — jusqu'aux foyers "
         "du Nord-Kivu, où Katwa, Butembo et Beni maintiennent chacun une implantation active. "
         "Malgré l'intensification de la riposte, le suivi des milliers de contacts actifs "
         "peine à couvrir l'ensemble des foyers."),
        "956", "162", "247", "47",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires; "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260620_inrb_umie_update", "2026-06-20",
        "La RDC franchit le seuil des 1 000 cas confirmés",
        ("Le 20 juin, la barre des 1 000 cas confirmés est franchie : 1 003 au total, "
         "pour 254 décès confirmés. Ce cap, atteint moins de deux mois après les premiers "
         "signaux cliniques de Bunia, mesure à la fois la profondeur de la transmission et "
         "le rattrapage progressif des analyses de laboratoire sur une flambée qui circulait "
         "depuis des semaines sans diagnostic. Du cœur iturien aux foyers émergents du "
         "Nord-Kivu, la flambée touche désormais plusieurs dizaines de zones de santé "
         "réparties sur plusieurs centaines de kilomètres."),
        "1003", "201", "254", "30",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage du seuil des 1000 cas confirmes; "
        "baisse de deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260621_inrb_umie_update", "2026-06-21",
        "1 048 confirmés : la courbe reste ascendante après le passage du cap",
        ("Au 21 juin, le bilan monte à 1 048 cas confirmés et 267 décès confirmés, "
         "pour 202 suspects et 60 décès suspects. Aucun signe de ralentissement n'est perceptible "
         "dans les données : la flambée continue d'alimenter de nouveaux cas en Ituri "
         "pendant que les zones du Nord-Kivu consolident leurs bilans respectifs. "
         "La hausse quotidienne des confirmés témoigne d'une transmission toujours active "
         "dans un espace géographique étendu."),
        "1048", "202", "267", "60",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260622_inrb_umie_update", "2026-06-22",
        "1 094 confirmés, 277 décès : la montée s'inscrit dans la durée",
        ("Au 22 juin, le bilan atteint 1 094 cas confirmés et 277 décès confirmés. "
         "Les cas suspects retombent à 131 et les décès suspects à 44 en raison de "
         "reclassements en cours côté source — sans que cela reflète un ralentissement "
         "de la transmission réelle. La flambée continue de progresser dans une configuration "
         "multi-foyers, de l'épicentre iturien aux zones de santé du Nord-Kivu."),
        "1094", "131", "277", "44",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260623_inrb_umie_update", "2026-06-23",
        "1 118 confirmés : la flambée approche les 300 décès confirmés",
        ("Au 23 juin, le bilan national atteint 1 118 cas confirmés et 291 décès confirmés, "
         "à moins de dix unités du cap symbolique des 300 morts confirmés. Les cas suspects "
         "remontent légèrement à 138. Depuis les foyers de Bunia, Rwampara et Mongbwalu "
         "jusqu'aux zones de santé du Nord-Kivu, les équipes de terrain maintiennent un "
         "rythme d'investigation intense sur plusieurs fronts simultanés."),
        "1118", "138", "291", "45",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260624_inrb_umie_update", "2026-06-24",
        "1 155 confirmés et 304 décès : le cap du tiers de millier de morts franchi",
        ("Au 24 juin, le bilan national dépasse les 300 décès confirmés, avec 304 enregistrés "
         "pour 1 155 cas confirmés. Ce rapport entre décès et cas confirmés illustre la gravité "
         "clinique persistante d'une souche Bundibugyo qui frappe dans une population dont "
         "une grande partie ne dispose que d'un accès limité aux centres de traitement. "
         "L'accès aux soins reste un défi structurant de la riposte, de l'Ituri jusqu'au "
         "Nord-Kivu."),
        "1155", "154", "304", "40",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 300 deces confirmes; "
        "baisse de deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260625_inrb_umie_update", "2026-06-25",
        "1 203 confirmés, 321 décès : une semaine de hausse ininterrompue",
        ("Au 25 juin, la série nationale atteint 1 203 cas confirmés et 321 décès confirmés. "
         "En une semaine, la flambée a ajouté environ 270 cas confirmés supplémentaires. "
         "Le Nord-Kivu concentre désormais plusieurs dizaines de cas confirmés répartis "
         "entre trois pôles distincts — Katwa, Butembo et Beni — à des centaines de "
         "kilomètres du cœur iturien, le long d'axes routiers très fréquentés reliant "
         "les deux provinces."),
        "1203", "265", "321", "77",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260627_inrb_umie_update", "2026-06-27",
        "1 274 confirmés, 360 décès : reprise de publication après deux jours sans données",
        ("Au 27 juin, la publication reprend après un intervalle de deux jours non couverts "
         "par la source. Le bilan atteint 1 274 cas confirmés et 360 décès confirmés. "
         "La cadence irrégulière de publication complique les comparaisons quotidiennes, "
         "mais la tendance de fond reste fermement à la hausse. Les cas suspects accusent "
         "une baisse à 239 liée à des reclassements, non à une réduction de la transmission "
         "dans les foyers actifs d'Ituri et du Nord-Kivu."),
        "1274", "239", "360", "70",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "jour(s) entre le 2026-06-25 et le 2026-06-27 non publies (cadence SitRep); "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260629_inrb_umie_update", "2026-06-29",
        "1 333 confirmés : à un pas du cap des 400 décès confirmés",
        ("Au 29 juin, après un second intervalle de deux jours non publiés, le bilan s'établit "
         "à 1 333 cas confirmés et 399 décès confirmés — à une unité seulement du cap des "
         "400 morts confirmés. En un mois depuis la déclaration officielle du 15 mai, "
         "la flambée a plus que décuplé son bilan de cas confirmés, témoignant d'une dynamique "
         "de transmission toujours active dans les provinces de l'Ituri et du Nord-Kivu."),
        "1333", "309", "399", "90",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "jour(s) entre le 2026-06-27 et le 2026-06-29 non publies (cadence SitRep)."
    ),
    nat(
        "ev_20260630_inrb_umie_update", "2026-06-30",
        "Fin juin : 1 406 confirmés et 438 décès, la flambée s'installe dans la durée",
        ("Au dernier jour de juin, le bilan national dépasse les 1 400 cas confirmés et "
         "les 400 décès confirmés, avec 438 enregistrés. Trois mois après les premiers "
         "signaux cliniques de Bunia, l'épidémie ne montre aucun signe de plateau. "
         "Dans le seul couloir Ituri, la zone de santé de Nizi — dans la ceinture minière — "
         "cumule désormais 61 cas confirmés, plus du double de son bilan du 19 juin, "
         "illustrant l'extension vers des zones à forte mobilité économique."),
        "1406", "301", "438", "90",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; bilan de fin de mois; "
        "baisse de cas suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260701_inrb_umie_update", "2026-07-01",
        "Début juillet : 1 460 confirmés, la flambée entre dans son troisième mois actif",
        ("En ouvrant juillet, le bilan national atteint 1 460 cas confirmés et 452 décès "
         "confirmés. L'épidémie entre dans son troisième mois d'activité documentée sans signe "
         "d'essoufflement. Les cas suspects tombent à 150 — effet d'un reclassement intensif "
         "côté source — sans que cela reflète une réduction de la transmission dans les foyers "
         "actifs d'Ituri et du Nord-Kivu, qui concentrent ensemble plusieurs centaines de cas."),
        "1460", "150", "452", "41",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; debut du mois de juillet; "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260702_inrb_umie_update", "2026-07-02",
        "1 502 confirmés : la flambée franchit le cap des 1 500",
        ("Le 2 juillet, le seuil des 1 500 cas confirmés est dépassé, avec 1 502 cas "
         "au total et 473 décès confirmés. En six semaines depuis le passage des 1 000, "
         "la flambée a ajouté 500 cas confirmés supplémentaires — un rythme d'environ "
         "80 cas par semaine. Cette accélération souligne la capacité de transmission "
         "maintenue du virus dans les foyers simultanément actifs de l'Ituri, "
         "de la zone minière de Nizi jusqu'aux pôles urbains du Nord-Kivu."),
        "1502", "213", "473", "63",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 1500 cas confirmes."
    ),
    nat(
        "ev_20260703_inrb_umie_update", "2026-07-03",
        "1 528 confirmés : les décès confirmés frôlent les 500",
        ("Au 3 juillet, le bilan s'établit à 1 528 cas confirmés et 492 décès confirmés, "
         "à quelques unités seulement du cap des 500 décès. Les cas suspects reculent "
         "à 185 en raison de reclassements, mais la tendance des cas confirmés demeure "
         "fermement ascendante. Les foyers de Bunia, Rwampara et Mongbwalu restent les "
         "pôles dominants, tandis que les zones de santé périphériques de l'Ituri "
         "et du Nord-Kivu poursuivent leur progression."),
        "1528", "185", "492", "67",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "baisse de cas suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260704_inrb_umie_update", "2026-07-04",
        "1 561 confirmés et 506 décès : la flambée dépasse le cap des 500 morts confirmés",
        ("Au 4 juillet, la barre des 500 décès confirmés est franchie, avec 506 enregistrés "
         "pour 1 561 cas confirmés. Les cas suspects remontent significativement à 354 "
         "et les décès suspects à 110, signalant un regain de signalement dans les foyers "
         "périphériques. La flambée couvre désormais un arc géographique étendu, "
         "des zones minières ituriennes jusqu'aux pôles urbains de Katwa et Butembo "
         "dans le Nord-Kivu."),
        "1561", "354", "506", "110",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 500 deces confirmes."
    ),
    nat(
        "ev_20260705_inrb_umie_update", "2026-07-05",
        "1 624 confirmés : un bond de plus de 60 cas en une journée",
        ("Au 5 juillet, le bilan national bondit à 1 624 cas confirmés et 521 décès "
         "confirmés, soit 63 nouveaux cas en une journée par rapport à la veille. "
         "Les cas suspects retombent à 135 et les décès suspects à 23, traduisant "
         "un cycle de reclassement important. Cette cadence — forte hausse des confirmés, "
         "correction simultanée des suspects — est caractéristique de la dynamique "
         "de consolidation du bilan dans les premiers jours de juillet."),
        "1624", "135", "521", "23",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260706_inrb_umie_update", "2026-07-06",
        "1 708 confirmés, 580 décès : l'accélération se confirme en début de mois",
        ("Au 6 juillet, le bilan atteint 1 708 cas confirmés et 580 décès confirmés, "
         "soit 84 nouveaux cas par rapport à la veille — l'un des sauts quotidiens "
         "les plus importants depuis le début de la crise. Dans le Nord-Kivu, "
         "Katwa et Nizi concentrent une part croissante des nouveaux cas, "
         "tandis que les foyers iturien de Rwampara et Mongbwalu restent parmi "
         "les plus chargés du pays."),
        "1708", "237", "580", "70",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260707_inrb_umie_update", "2026-07-07",
        "600 décès confirmés : un cap lourd dans une flambée toujours ascendante",
        ("Au 7 juillet, la série franchit exactement le cap des 600 décès confirmés, "
         "pour 1 759 cas confirmés au total. Ce chiffre, qui représente la seule part "
         "biologiquement validée de la mortalité, reste en deçà de la réalité : "
         "les décès communautaires non prélevés et les suspects en cours de confirmation "
         "complètent un tableau toujours partiel. La flambée couvre à ce stade un arc "
         "de plusieurs centaines de kilomètres, de l'épicentre iturien jusqu'aux "
         "foyers consolidés du Nord-Kivu."),
        "1759", "304", "600", "92",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 600 deces confirmes."
    ),
    nat(
        "ev_20260708_inrb_umie_update", "2026-07-08",
        "1 792 confirmés, 625 décès : la progression se poursuit sans inflexion",
        ("Au 8 juillet, le bilan s'établit à 1 792 cas confirmés et 625 décès confirmés. "
         "Les cas suspects reculent à 227 et les décès suspects à 60 en raison "
         "d'ajustements côté source. La dynamique de transmission reste soutenue "
         "dans les principaux foyers de l'Ituri, pendant que le Nord-Kivu consolide "
         "une implantation désormais solidement établie dans plusieurs zones de santé "
         "dont Katwa, Butembo, Beni et Lita."),
        "1792", "227", "625", "60",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; "
        "baisse de cas suspects et deces suspects liee a revision/reclassement cote source."
    ),
    nat(
        "ev_20260709_inrb_umie_update", "2026-07-09",
        "1 830 confirmés : la flambée s'approche du cap des 1 900",
        ("Au 9 juillet, le bilan national atteint 1 830 cas confirmés et 648 décès "
         "confirmés. Avec près de 40 nouveaux cas confirmés par rapport à la veille, "
         "la cadence reste élevée. Plus de deux mois après la déclaration officielle "
         "du 15 mai, aucun plateau n'est visible dans les données de terrain : "
         "l'Ituri et le Nord-Kivu maintiennent ensemble une transmission active "
         "dans plusieurs dizaines de zones de santé."),
        "1830", "284", "648", "81",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260710_inrb_umie_update", "2026-07-10",
        "1 873 confirmés, 672 décès : la courbe reste orientée à la hausse",
        ("Au 10 juillet, le bilan s'élève à 1 873 cas confirmés et 672 décès confirmés. "
         "Les cas suspects remontent à 299 et les décès suspects à 91 après plusieurs "
         "jours de corrections. L'écart entre la dynamique toujours dominante de "
         "l'Ituri — portée par Bunia, Rwampara et Mongbwalu — et la montée en puissance "
         "des foyers du Nord-Kivu continue de définir la géographie d'une flambée "
         "qui approche les deux mille cas confirmés."),
        "1873", "299", "672", "91",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; donnees preliminaires."
    ),
    nat(
        "ev_20260711_inrb_umie_update", "2026-07-11",
        "702 décès confirmés et 1 926 cas : la flambée touche au seuil des 2 000",
        ("Au 11 juillet, la série dépasse les 700 décès confirmés — 702 exactement — "
         "pour 1 926 cas confirmés au total. La flambée s'installe dans une durée "
         "et une ampleur qui dépassent les projections initiales. En Ituri, "
         "la zone de santé de Nizi cumule 121 cas confirmés, s'imposant comme "
         "un foyer intermédiaire en forte croissance dans la ceinture minière, "
         "à mi-chemin entre les épicentres de Bunia et les axes forestiers de l'est."),
        "1926", "299", "702", "91",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 700 deces confirmes; "
        "flambee en approche du cap des 2000 cas confirmes."
    ),
    nat(
        "ev_20260713_inrb_umie_update", "2026-07-13",
        "La RDC franchit le cap des 2 000 cas confirmés",
        ("Le 13 juillet, après un intervalle de deux jours non publiés, la barre des "
         "2 000 cas confirmés est franchie : 2 011 au total, pour 754 décès confirmés. "
         "Les décès suspects ne sont pas communiqués dans ce relevé. Ce seuil symbolique, "
         "atteint moins de deux mois après le passage des 1 000, consacre une flambée "
         "qui s'étend sur plusieurs provinces — Ituri en tête, Nord-Kivu en progression "
         "soutenue — et plusieurs dizaines de zones de santé."),
        "2011", "268", "754", "",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 2000 cas confirmes; "
        "jour(s) entre le 2026-07-11 et le 2026-07-13 non publies (cadence SitRep); "
        "baisse de cas suspects liee a revision/reclassement cote source; "
        "deces suspects non communiques (ND)."
    ),
    nat(
        "ev_20260715_inrb_umie_update", "2026-07-15",
        "2 124 confirmés et 828 décès : le rythme reste élevé à mi-juillet",
        ("Au 15 juillet, après un second intervalle de deux jours non couverts, "
         "le bilan national atteint 2 124 cas confirmés et 828 décès confirmés. "
         "Les cas suspects remontent à 389. En deux jours, 113 nouveaux cas confirmés "
         "ont été enregistrés — un rythme qui reflète la transmission continue "
         "dans l'ensemble des foyers actifs, de l'épicentre iturien jusqu'aux "
         "zones de santé du Nord-Kivu, où Katwa, Lita et Butembo dépassent "
         "chacun le seuil des 50 cas confirmés."),
        "2124", "389", "828", "",
        "Bilan national INRB-UMIE/INSP; snapshot ccc24d9; passage des 800 deces confirmes; "
        "jour(s) entre le 2026-07-13 et le 2026-07-15 non publies (cadence SitRep); "
        "deces suspects non communiques (ND)."
    ),

    # ── ÉVÉNEMENTS GÉOGRAPHIQUES ───────────────────────────────────────────
    geo(
        "ev_20260625_nordkivu_trois_foyers", "2026-06-25",
        "katwa",
        "Katwa, Butembo, Beni : trois pôles du Nord-Kivu dépassent les 20 cas confirmés",
        ("Au 25 juin, la ventilation par zone de santé révèle que le Nord-Kivu consolide "
         "trois foyers distincts : Katwa totalise 35 cas confirmés cumulés, Butembo 33 "
         "et Beni 22. Cette géographie à trois pôles, à des centaines de kilomètres de "
         "l'épicentre iturien, confirme que l'épidémie n'est plus une crise locale "
         "de l'Ituri mais une flambée régionale dont les tentacules s'enfoncent dans "
         "des zones densément peuplées, reliées par des axes routiers très fréquentés."),
        "35",
        "Ventilation par zone de sante INRB-UMIE au 25 juin; ancre Katwa (35 cas); "
        "Butembo 33 Beni 22 cas confirmes cumulatifs; source inrb_umie_2026_07_20_snapshot."
    ),
    geo(
        "ev_20260630_ituri_nizi_surge", "2026-06-30",
        "nyankunde",
        "Nizi : le foyer minier d'Ituri double en dix jours",
        ("Au 30 juin, la zone de santé de Nizi — dans la ceinture minière de l'Ituri, "
         "entre Bunia et le massif forestier — cumule 61 cas confirmés, soit plus du "
         "double de son bilan du 19 juin. Cette accélération dans une zone à forte "
         "mobilité économique — mines artisanales, commerce sur axes routiers — "
         "illustre comment la flambée déborde des épicentres initiaux vers des "
         "localités périphériques moins équipées en infrastructures de santé."),
        "61",
        "Ventilation par zone de sante INRB-UMIE au 30 juin; Nizi 61 cas confirmes cumulatifs "
        "(vs 26 au 19 juin); ancre Nyankunde comme proxy zone miniere iturie; "
        "Nia Nia 12 signalements (nouveau foyer)."
    ),
    geo(
        "ev_20260707_nordkivu_butembo", "2026-07-07",
        "butembo",
        "Butembo et Katwa franchissent ensemble les 100 cas confirmés dans le Nord-Kivu",
        ("Au 7 juillet, les zones de santé de Katwa (61 cas confirmés cumulés) et Butembo (42) "
         "totalisent plus de 100 cas dans le seul couloir Butembo-Katwa du Nord-Kivu. "
         "La zone de Nia-Nia, plus au nord dans le territoire de Mambasa, signale quant "
         "à elle 35 cas, illustrant l'extension progressive de la flambée vers des "
         "territoires forestiers moins accessibles et plus éloignés des centres de "
         "diagnostic et de traitement."),
        "42",
        "Ventilation par zone de sante INRB-UMIE au 7 juillet; ancre Butembo (42 cas); "
        "Katwa 61 Nia-Nia 35 cas confirmes cumulatifs."
    ),
    geo(
        "ev_20260711_nizi_surge", "2026-07-11",
        "nyankunde",
        "La zone de Nizi dépasse 121 cas : le couloir minier iturien s'emballe",
        ("Au 11 juillet, la zone de santé de Nizi cumule 121 cas confirmés — un bond "
         "de près de 30 % en quatre jours par rapport aux 94 du 7 juillet. Cette zone "
         "de la ceinture minière de l'Ituri s'impose comme le quatrième foyer le plus "
         "important du pays, derrière les épicentres de Bunia (507 cas), Rwampara (393) "
         "et Mongbwalu (336). Sa croissance rapide, dans un tissu de mobilité économique "
         "intense mêlant mines artisanales et axes commerciaux, représente l'un des "
         "défis majeurs pour la riposte dans la seconde moitié de la flambée."),
        "121",
        "Ventilation par zone de sante INRB-UMIE au 11 juillet; Nizi 121 cas confirmes cumulatifs "
        "(+27 vs 7 juillet); ancre Nyankunde comme proxy zone miniere iturie; "
        "Bunia 507 Rwampara 393 Mongbwalu 336 pour reference."
    ),
    geo(
        "ev_20260715_nordkivu_bilan", "2026-07-15",
        "katwa",
        "Le Nord-Kivu totalise plus de 200 cas : Katwa, Lita et Butembo dépassent le seuil des 50",
        ("Au 15 juillet, trois zones de santé du Nord-Kivu franchissent le seuil des "
         "50 cas confirmés cumulés : Katwa en tête avec 82 cas, suivie de Lita (66) "
         "et Butembo (52). Beni totalise 33 cas supplémentaires. Le Nord-Kivu "
         "concentre désormais plus de 200 cas confirmés — soit environ 10 % du bilan "
         "national — répartis dans au moins quatre zones de santé distinctes, à des "
         "centaines de kilomètres du cœur iturien mais reliées à lui par des axes "
         "de mobilité très actifs."),
        "82",
        "Ventilation par zone de sante INRB-UMIE au 15 juillet; ancre Katwa (82 cas); "
        "Lita 66 Butembo 52 Beni 33 cas confirmes cumulatifs; source inrb_umie_2026_07_20_snapshot."
    ),
]


def main():
    if not os.path.exists(EVENTS_FILE):
        print(f"ERREUR : {EVENTS_FILE} introuvable", file=sys.stderr)
        sys.exit(1)

    # Lire les event_id existants
    with open(EVENTS_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        existing_ids = {row["event_id"] for row in reader}

    added = 0
    skipped = 0
    with open(EVENTS_FILE, "a", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, quoting=csv.QUOTE_MINIMAL)
        for event in NEW_EVENTS:
            eid = event["event_id"]
            if eid in existing_ids:
                print(f"  SKIP (existe déjà) : {eid}", file=sys.stderr)
                skipped += 1
            else:
                writer.writerow(event)
                print(f"  + {eid}")
                added += 1

    print(f"\nRésultat : {added} event(s) ajouté(s), {skipped} ignoré(s).")


if __name__ == "__main__":
    main()
