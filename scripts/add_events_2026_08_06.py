#!/usr/bin/env python3
# Script ponctuel : ajoute les events du backfill 2026-06-19 au 2026-08-04
# Genere via la routine quotidienne du 2026-08-06.
import csv, sys

EVENTS_PATH = "public/data/reference/events.csv"
SOURCE = "inrb_umie_2026_08_06_snapshot"

COLS = [
    "event_id","date","date_end","place_id","event_type","headline","fact_text",
    "quote","confirmed_cases","suspected_cases","confirmed_deaths","suspected_deaths",
    "contacts","source_id","source_type","confidence","data_status",
    "display_priority","display_tier","map_layer","timeline_group","update_status","notes"
]

def row(event_id, date, place_id, event_type, headline, fact_text,
        cc="", sc="", cd="", sd="",
        source_id=SOURCE, source_type="official", confidence="high",
        data_status="provisional", display_priority=1, display_tier="secondary",
        map_layer="clinical", timeline_group="response_breakdown",
        update_status="active", notes="", quote="", contacts="", date_end=""):
    return {
        "event_id": event_id,
        "date": date,
        "date_end": date_end,
        "place_id": place_id,
        "event_type": event_type,
        "headline": headline,
        "fact_text": fact_text,
        "quote": quote,
        "confirmed_cases": cc,
        "suspected_cases": sc,
        "confirmed_deaths": cd,
        "suspected_deaths": sd,
        "contacts": contacts,
        "source_id": source_id,
        "source_type": source_type,
        "confidence": confidence,
        "data_status": data_status,
        "display_priority": display_priority,
        "display_tier": display_tier,
        "map_layer": map_layer,
        "timeline_group": timeline_group,
        "update_status": update_status,
        "notes": notes,
    }

EVENTS = [

# ──────────────────────────────────────────────────────────────────────
# 2026-06-19
# ──────────────────────────────────────────────────────────────────────
row("ev_20260619_inrb_umie_update", "2026-06-19", "drc_total", "situation_update",
    "956 cas confirmés : la flambée reste ascendante en Ituri",
    "La barre des 900 cas confirmés est désormais franchie. Le bilan reste tiré par les foyers ituriens — Bunia, Rwampara, Mongbwalu — tandis que le Nord-Kivu installe durablement ses propres chaînes de transmission. Les cas suspects, en recul par rapport à la veille, reflètent un reclassement côté source plutôt qu'un ralentissement de la transmission.",
    cc="956", sc="162", cd="247", sd="47",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-19; snapshot 5d9e722; baisse suspects liee a revision/reclassement cote source."),

row("ev_20260619_katwa_nordkivu_arc", "2026-06-19", "katwa", "situation_update",
    "Le Nord-Kivu s'installe sur un front de 35 zones — Katwa en tête",
    "Au 19 juin, la zone de santé de Katwa, dans l'agglomération de Butembo, cumule 26 cas confirmés — à égalité avec la voisine Nizi — tandis que Butembo compte 25 cas et Beni 16. En quelques semaines, le Nord-Kivu a construit un front secondaire solide, portant à plus de 35 le nombre de zones de santé actives sur l'ensemble de l'épidémie. Le virus circule désormais à la fois dans l'épicentre iturien et le long des axes urbains nord-kivutiens, deux espaces épidémiques distincts mais en interaction.",
    cc="26",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-06-19; Katwa 26 cas confirmes cumulatifs; insp_sitrep__cumulative_confirmed_cases__daily.csv."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-20
# ──────────────────────────────────────────────────────────────────────
row("ev_20260620_inrb_umie_update", "2026-06-20", "drc_total", "situation_update",
    "Le cap des mille cas confirmés est franchi",
    "Avec 1 003 cas confirmés au 20 juin, l'épidémie dépasse pour la première fois ce seuil symbolique. La progression touche désormais plusieurs provinces, de l'épicentre iturien jusqu'aux zones de santé du Nord-Kivu. Malgré la hausse des confirmés, les cas suspects restent à un niveau modéré, reflet d'un diagnostic plus rapide qu'au début de la flambée.",
    cc="1003", sc="201", cd="254", sd="30",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-20; snapshot 5d9e722; franchissement du seuil de 1000 cas confirmes."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-21
# ──────────────────────────────────────────────────────────────────────
row("ev_20260621_inrb_umie_update", "2026-06-21", "drc_total", "situation_update",
    "Progression constante : 1 048 confirmés, 267 décès",
    "La courbe nationale poursuit sa montée régulière avec 45 nouveaux cas confirmés dans la journée. L'Ituri reste le moteur de la flambée, mais les nouvelles zones de santé du Nord-Kivu contribuent chaque jour davantage au total national. Les 267 décès confirmés cumulés illustrent la létalité persistante d'une épidémie encore mal contenue.",
    cc="1048", sc="202", cd="267", sd="60",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-21; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-22
# ──────────────────────────────────────────────────────────────────────
row("ev_20260622_inrb_umie_update", "2026-06-22", "drc_total", "situation_update",
    "Les suspects chutent : correction technique, pas de répit sur le terrain",
    "Au 22 juin, le bilan atteint 1 094 cas confirmés et 277 décès confirmés. Les cas suspects tombent à 131, en forte baisse par rapport à la veille : ce recul tient à un reclassement côté source — des suspects basculés en confirmés ou hors critères — et non à un reflux de l'épidémie sur le terrain, qui reste active de l'Ituri au Nord-Kivu.",
    cc="1094", sc="131", cd="277", sd="44",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-22; snapshot 5d9e722; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-23
# ──────────────────────────────────────────────────────────────────────
row("ev_20260623_inrb_umie_update", "2026-06-23", "drc_total", "situation_update",
    "291 décès confirmés cumulés, la mortalité reste élevée",
    "Le 23 juin, 1 118 cas confirmés et 291 décès confirmés sont enregistrés. Avec près de 300 décès cumulés en moins de six semaines depuis la déclaration officielle, la létalité de l'épidémie reste préoccupante. L'Ituri concentre l'essentiel des cas, même si les zones du Nord-Kivu continuent de consolider leur présence dans le bilan national.",
    cc="1118", sc="138", cd="291", sd="45",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-23; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-24
# ──────────────────────────────────────────────────────────────────────
row("ev_20260624_inrb_umie_update", "2026-06-24", "drc_total", "situation_update",
    "La barre des 300 décès confirmés est franchie",
    "Avec 304 décès confirmés au 24 juin, l'épidémie dépasse le seuil des 300 morts officiellement attestés. Le bilan de 1 155 cas confirmés confirme une progression régulière, même si les décès suspects refluent légèrement sous l'effet d'un reclassement côté source. La flambée reste active sur un arc géographique qui s'étend de l'Ituri jusqu'aux foyers du Nord-Kivu.",
    cc="1155", sc="154", cd="304", sd="40",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-24; snapshot 5d9e722; franchissement du seuil de 300 deces confirmes; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-25
# ──────────────────────────────────────────────────────────────────────
row("ev_20260625_inrb_umie_update", "2026-06-25", "drc_total", "situation_update",
    "1 203 confirmés, 321 décès : les suspects remontent nettement",
    "Au 25 juin, les cas suspects rebondissent à 265, après plusieurs jours de correction à la baisse : ce retour reflète la déclaration de nouveaux cas non encore testés, signe d'une transmission encore très active sur le terrain. La barre des 1 200 cas confirmés est franchie et les 321 décès cumulés traduisent une pression constante sur les structures de soins de l'Ituri et du Nord-Kivu.",
    cc="1203", sc="265", cd="321", sd="77",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-25; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-27 (26 juin non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260627_inrb_umie_update", "2026-06-27", "drc_total", "situation_update",
    "360 décès confirmés cumulés : la semaine de juin s'alourdit",
    "Le 26 juin n'ayant pas été publié par la source, ce bilan couvre deux jours d'évolution : 71 nouveaux cas confirmés et 39 décès supplémentaires portent les totaux à 1 274 et 360 respectivement. Les cas suspects reculent à nouveau sous l'effet de reclassements. La flambée reste soutenue sur l'ensemble du front iturien, qui alimente encore l'essentiel de la progression nationale.",
    cc="1274", sc="239", cd="360", sd="70",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-27; snapshot 5d9e722; 26 juin non publie par la source; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-29 (28 juin non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260629_inrb_umie_update", "2026-06-29", "drc_total", "situation_update",
    "Vers 400 décès confirmés : la flambée ne marque pas de pause",
    "Le bilan du 29 juin — le 28 n'ayant pas été publié — atteint 1 333 cas confirmés et 399 décès confirmés, à la veille du seuil des 400. Les cas suspects remontent à 309, leur niveau le plus élevé depuis mi-juin, signe que les signalements terrain continuent de précéder les confirmations de laboratoire. L'épidémie reste active dans les zones de santé d'Ituri et de Nord-Kivu.",
    cc="1333", sc="309", cd="399", sd="90",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-29; snapshot 5d9e722; 28 juin non publie par la source."),

# ──────────────────────────────────────────────────────────────────────
# 2026-06-30
# ──────────────────────────────────────────────────────────────────────
row("ev_20260630_inrb_umie_update", "2026-06-30", "drc_total", "situation_update",
    "1 406 confirmés au 30 juin : fin de mois sous pression",
    "Au terme du mois de juin, la flambée enregistre 1 406 cas confirmés et 438 décès confirmés. En un seul mois, l'épidémie a plus que quadruplé son bilan confirmé. La légère correction des cas suspects traduit un reclassement côté source, mais le total national reste sur une trajectoire ascendante. Les foyers du Nord-Kivu continuent de peser dans le bilan, aux côtés de l'épicentre iturien.",
    cc="1406", sc="301", cd="438", sd="90",
    notes="Bilan national INRB-UMIE/INSP du 2026-06-30; snapshot 5d9e722; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-01
# ──────────────────────────────────────────────────────────────────────
row("ev_20260701_inrb_umie_update", "2026-07-01", "drc_total", "situation_update",
    "1 460 confirmés, 452 décès : les suspects s'effondrent après révision",
    "Le 1er juillet, les cas suspects chutent à 150 — leur niveau le plus bas depuis plusieurs semaines — sous l'effet d'une révision massive de la série côté source. Le bilan de 1 460 cas confirmés et 452 décès confirmés reste en hausse. Cette oscillation des suspects ne traduit pas un reflux de la transmission, mais les ajustements techniques d'un suivi épidémiologique consolidé dans une zone difficile d'accès.",
    cc="1460", sc="150", cd="452", sd="41",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-01; snapshot 5d9e722; forte baisse suspects liee a revision/reclassement cote source."),

row("ev_20260701_butembo_nordkivu_front", "2026-07-01", "butembo", "situation_update",
    "Butembo et Katwa : le front Nord-Kivu se solidifie à 83 cas",
    "Au 1er juillet, Katwa cumule 49 cas confirmés et Butembo 34, faisant de la zone métropolitaine de Butembo l'un des foyers secondaires les plus actifs de la flambée. La zone de Nizi, avec 65 cas, dépasse désormais toutes les zones du Nord-Kivu, rappelant que le front méridional n'est pas un simple débordement de l'Ituri mais une dynamique propre, ancrée dans les mobilités denses de cette région.",
    cc="34",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-07-01; Butembo 34 cas confirmes cumulatifs; Katwa 49; Nizi 65; insp_sitrep__cumulative_confirmed_cases__daily.csv."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-02
# ──────────────────────────────────────────────────────────────────────
row("ev_20260702_inrb_umie_update", "2026-07-02", "drc_total", "situation_update",
    "1 502 confirmés : le cap de 1 500 est franchi",
    "Le 2 juillet, les cas confirmés dépassent le seuil de 1 500, avec 1 502 cas et 473 décès cumulés. Les suspects remontent à 213 après la correction de la veille, retrouvant leur niveau habituel de signalement. La progression touche toujours les deux grands blocs géographiques actifs : le triangle iturien autour de Bunia, Rwampara et Mongbwalu, et l'arc nord-kivutien centré sur Nizi, Katwa et Butembo.",
    cc="1502", sc="213", cd="473", sd="63",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-02; snapshot 5d9e722; franchissement du seuil de 1500 cas confirmes."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-03
# ──────────────────────────────────────────────────────────────────────
row("ev_20260703_inrb_umie_update", "2026-07-03", "drc_total", "situation_update",
    "La progression se tasse sur un jour, les décès approchent 500",
    "Le 3 juillet enregistre une hausse de 26 cas confirmés, inférieure à la moyenne des jours précédents, mais les 492 décès confirmés cumulés signalent que la mortalité reste soutenue. Les suspects refluent à 185 après un nouveau reclassement côté source. La consolidation du bilan national reste un travail quotidien pour des équipes qui opèrent souvent en zone d'accès difficile.",
    cc="1528", sc="185", cd="492", sd="67",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-03; snapshot 5d9e722; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-04
# ──────────────────────────────────────────────────────────────────────
row("ev_20260704_inrb_umie_update", "2026-07-04", "drc_total", "situation_update",
    "500 décès confirmés franchis : les suspects bondissent à 354",
    "Au 4 juillet, le bilan dépasse les 500 décès confirmés (506) pour la première fois, franchissant un seuil dramatique. Dans le même temps, les cas suspects bondissent à 354 — leur plus haut niveau depuis fin mai —, signe que les déclarations de terrain dépassent à nouveau largement le rythme des confirmations biologiques. La flambée couvre désormais plus de 40 zones de santé entre l'Ituri et le Nord-Kivu.",
    cc="1561", sc="354", cd="506", sd="110",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-04; snapshot 5d9e722; franchissement du seuil de 500 deces confirmes."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-05
# ──────────────────────────────────────────────────────────────────────
row("ev_20260705_inrb_umie_update", "2026-07-05", "drc_total", "situation_update",
    "Les suspects plongent sous l'effet d'un vaste reclassement",
    "Le 5 juillet, les cas suspects s'effondrent à 135 — une baisse de 219 en une seule journée — et les décès suspects reculent à 23 : ce mouvement brutal traduit un reclassement massif côté source, non une amélioration soudaine sur le terrain. Les 1 624 cas confirmés et 521 décès attestent que la transmission reste active. Ces oscillations de la série suspects invitent à lire le bilan national avec prudence, en privilégiant les confirmés.",
    cc="1624", sc="135", cd="521", sd="23",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-05; snapshot 5d9e722; forte baisse suspects liee a revision/reclassement cote source."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-06
# ──────────────────────────────────────────────────────────────────────
row("ev_20260706_inrb_umie_update", "2026-07-06", "drc_total", "situation_update",
    "1 708 confirmés, 580 décès : l'une des journées les plus chargées",
    "Le 6 juillet enregistre 84 nouveaux cas confirmés en une journée — l'une des progressions quotidiennes les plus importantes depuis le début de la flambée. Les 580 décès confirmés cumulés et le rebond des cas suspects à 237 confirment que la semaine du 5 au 11 juillet est marquée par une accélération visible sur les deux séries. L'ensemble des zones actives, de Bunia à Butembo, contribue à cette hausse.",
    cc="1708", sc="237", cd="580", sd="70",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-06; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-07
# ──────────────────────────────────────────────────────────────────────
row("ev_20260707_inrb_umie_update", "2026-07-07", "drc_total", "situation_update",
    "600 décès confirmés : un seuil funeste atteint",
    "Le 7 juillet, les décès confirmés franchissent le cap des 600, atteignant exactement ce seuil. Les 1 759 cas confirmés et les 304 suspects témoignent d'une flambée toujours active, qui touche désormais plusieurs dizaines de zones de santé. Pour les équipes médicales qui opèrent en Ituri et au Nord-Kivu, ce bilan confirme l'ampleur d'une crise qui n'a pas encore fléchi.",
    cc="1759", sc="304", cd="600", sd="92",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-07; snapshot 5d9e722; franchissement du seuil de 600 deces confirmes."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-08
# ──────────────────────────────────────────────────────────────────────
row("ev_20260708_inrb_umie_update", "2026-07-08", "drc_total", "situation_update",
    "1 792 confirmés : la série oscille, les décès progressent",
    "Le 8 juillet, les cas suspects retombent à 227 après une nouvelle correction côté source, tandis que les confirmés approchent 1 800. La mortalité confirmée monte à 625, poursuivant une hausse quasi continue depuis mi-juin. Ces ajustements répétés de la série suspects illustrent la difficulté de consolidation dans une épidémie qui se déploie sur un front géographique dispersé entre l'Ituri et le Nord-Kivu.",
    cc="1792", sc="227", cd="625", sd="60",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-08; snapshot 5d9e722; baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-09
# ──────────────────────────────────────────────────────────────────────
row("ev_20260709_inrb_umie_update", "2026-07-09", "drc_total", "situation_update",
    "1 830 confirmés : la flambée maintient son rythme",
    "Le 9 juillet, le bilan national atteint 1 830 cas confirmés et 648 décès confirmés. Les cas suspects remontent à 284 après leur correction de la veille, retrouvant un niveau cohérent avec les signalements de terrain. La progression reste régulière sur l'ensemble des foyers actifs, de l'épicentre iturien jusqu'aux zones du Nord-Kivu.",
    cc="1830", sc="284", cd="648", sd="81",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-09; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-10
# ──────────────────────────────────────────────────────────────────────
row("ev_20260710_inrb_umie_update", "2026-07-10", "drc_total", "situation_update",
    "Vers 1 900 confirmés et 700 décès : la courbe ne se brise pas",
    "Le 10 juillet, 1 873 cas confirmés et 672 décès cumulés confirment que la flambée reste ascendante sans signe de rupture. Les suspects se stabilisent près de 300, ce qui traduit un flux continu de signalements depuis les zones actives. En moins de deux mois depuis la déclaration officielle, l'épidémie a dépassé les bilans les plus pessimistes des premières évaluations.",
    cc="1873", sc="299", cd="672", sd="91",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-10; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-11
# ──────────────────────────────────────────────────────────────────────
row("ev_20260711_inrb_umie_update", "2026-07-11", "drc_total", "situation_update",
    "1 926 confirmés, 702 décès : le bilan s'alourdit encore",
    "Le 11 juillet, les cas confirmés approchent 2 000 et les décès confirmés dépassent 700. Les cas suspects restent stables à 299, au même niveau que la veille. Ce bilan traduit une épidémie qui s'intensifie progressivement sur plusieurs fronts géographiques, sans que les efforts de riposte n'aient encore réussi à inverser la courbe nationale.",
    cc="1926", sc="299", cd="702", sd="91",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-11; snapshot 5d9e722."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-13 (12 juillet non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260713_inrb_umie_update", "2026-07-13", "drc_total", "situation_update",
    "2 011 confirmés, 754 décès : le cap des 2 000 est franchi",
    "Le 12 juillet n'ayant pas été publié, ce bilan balaie deux jours d'évolution : 85 nouveaux cas confirmés et 52 décès supplémentaires franchissent les seuils symboliques de 2 000 confirmés et 750 décès. Les cas suspects reculent à 268 par révision, et les décès suspects ne sont pas communiqués. La flambée s'étend désormais à une cinquantaine de zones de santé entre l'Ituri, le Nord-Kivu et des provinces plus lointaines.",
    cc="2011", sc="268", cd="754",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-13; snapshot 5d9e722; 12 juillet non publie par la source; deces suspects non communiques (ND)."),

row("ev_20260713_fataki_ituri_extension", "2026-07-13", "fataki", "situation_update",
    "Fataki : l'épidémie s'étend vers le nord de l'Ituri",
    "Au 13 juillet, la zone de santé de Fataki, dans le nord de l'Ituri, enregistre cinq cas confirmés cumulés — un chiffre modeste mais significatif : Fataki ouvre un front septentrional dans la province, à distance des trois foyers historiques du sud iturien. Avec plus d'une cinquantaine de zones de santé désormais actives, la flambée ne cesse d'élargir son empreinte géographique, ajoutant chaque semaine de nouveaux territoires à surveiller.",
    cc="5",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-07-13; Fataki 5 cas confirmes cumulatifs; insp_sitrep__cumulative_confirmed_cases__daily.csv."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-15 (14 juillet non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260715_inrb_umie_update", "2026-07-15", "drc_total", "situation_update",
    "2 124 confirmés, 828 décès : les suspects remontent vivement",
    "Le bilan du 15 juillet — le 14 n'ayant pas été publié — franchit 2 100 cas confirmés et 800 décès confirmés. Les cas suspects bondissent à 389, leur plus haut niveau depuis début juin, signe que les signalements de terrain s'accélèrent. Les décès suspects ne sont pas communiqués pour cette date. La dynamique reste ascendante sur l'ensemble des provinces touchées, de l'Ituri jusqu'aux foyers du Nord-Kivu.",
    cc="2124", sc="389", cd="828",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-15; snapshot 5d9e722; 14 juillet non publie par la source; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-17 (16 juillet non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260717_inrb_umie_update", "2026-07-17", "drc_total", "situation_update",
    "2 267 confirmés, 893 décès : les suspects s'effondrent à nouveau",
    "Après deux jours sans publication (le 16 juillet non communiqué), le bilan du 17 juillet monte à 2 267 cas confirmés et 893 décès confirmés. Les cas suspects chutent brutalement à 236 — une baisse de 153 — par reclassement côté source. À moins de dix confirmés des 900 décès, la mortalité de cette épidémie dépasse désormais les bilans cumulés de plusieurs flambées précédentes.",
    cc="2267", sc="236", cd="893",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-17; snapshot 5d9e722; 16 juillet non publie par la source; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-18
# ──────────────────────────────────────────────────────────────────────
row("ev_20260718_inrb_umie_update", "2026-07-18", "drc_total", "situation_update",
    "2 344 confirmés, 930 décès : la barre des 2 300 est franchie",
    "Le 18 juillet, le bilan national progresse à 2 344 cas confirmés et 930 décès confirmés. Les cas suspects continuent de reculer à 192 sous l'effet de reclassements. Plus d'une cinquantaine de zones de santé sont désormais touchées — de l'Ituri au Nord-Kivu en passant par des extensions plus lointaines —, illustrant l'empreinte géographique croissante d'une épidémie qui entre dans son troisième mois.",
    cc="2344", sc="192", cd="930",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-18; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-19
# ──────────────────────────────────────────────────────────────────────
row("ev_20260719_inrb_umie_update", "2026-07-19", "drc_total", "situation_update",
    "2 423 confirmés, 967 décès : le seuil de mille décès est proche",
    "Le 19 juillet, la flambée enregistre 2 423 cas confirmés et 967 décès confirmés, à seulement 33 morts du seuil des 1 000. Les cas suspects remontent à 252 après leur correction de la veille. La dynamique reste portée par les trois foyers principaux de l'Ituri — Bunia, Rwampara, Mongbwalu — auxquels s'ajoutent des zones de santé du Nord-Kivu et des provinces voisines.",
    cc="2423", sc="252", cd="967",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-19; snapshot 5d9e722; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-20
# ──────────────────────────────────────────────────────────────────────
row("ev_20260720_inrb_umie_update", "2026-07-20", "drc_total", "situation_update",
    "2 473 confirmés, 999 décès : la limite des mille est à portée",
    "Le 20 juillet, le cumul des décès confirmés atteint 999 — à un seul décès du seuil des 1 000. Les 2 473 cas confirmés placent cette épidémie parmi les plus importantes qu'ait connues la RDC. Les cas suspects remontent à 322, signe de signalements actifs sur le terrain. Le lendemain ne sera pas publié par la source, laissant le passage de ce seuil sans bilan officiel intermédiaire.",
    cc="2473", sc="322", cd="999",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-20; snapshot 5d9e722; deces suspects non communiques (ND); 2026-07-21 non publie par la source."),

row("ev_20260720_katwa_surpasses_nyankunde", "2026-07-20", "katwa", "situation_update",
    "Katwa dépasse Nyankunde et consolide le front Nord-Kivu",
    "Au 20 juillet, la zone de santé de Katwa cumule 108 cas confirmés, dépassant pour la première fois Nyankunde (99 cas) dans le classement des zones les plus touchées hors grand épicentre iturien. Butembo atteint 61 cas dans la même agglomération. Ces chiffres confirment que le front Nord-Kivu n'est plus une extension périphérique mais un foyer structuré, ancré dans les réseaux de mobilité denses reliant Butembo, Katwa et les zones voisines.",
    cc="108",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-07-20; Katwa 108 cas confirmes cumulatifs; premier depassement de Nyankunde (99 cas); insp_sitrep__cumulative_confirmed_cases__daily.csv."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-22 (21 juillet non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260722_inrb_umie_update", "2026-07-22", "drc_total", "situation_update",
    "Le seuil des 1 000 décès est franchi : 2 905 confirmés en deux jours",
    "Le 21 juillet n'ayant pas été publié, le bilan du 22 juillet concentre deux jours d'évolution et révèle une hausse brutale : 432 nouveaux cas confirmés et 270 décès supplémentaires portent les totaux à 2 905 et 1 269 respectivement. Le cap des 1 000 décès confirmés est ainsi franchi, un seuil qui fait de cet épisode Bundibugyo l'un des plus meurtriers jamais enregistrés. Les suspects se tassent à 318, les décès suspects restent non communiqués.",
    cc="2905", sc="318", cd="1269",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-22; snapshot 5d9e722; 21 juillet non publie par la source; deces suspects non communiques (ND); franchissement du seuil de 1000 deces confirmes; forte hausse liee a deux jours d'accumulation."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-23
# ──────────────────────────────────────────────────────────────────────
row("ev_20260723_inrb_umie_update", "2026-07-23", "drc_total", "situation_update",
    "2 973 confirmés, 1 309 décès : la courbe reste soutenue après le cap",
    "Le 23 juillet, la progression continue avec 68 nouveaux cas confirmés et 40 décès supplémentaires. Les 2 973 cas et 1 309 décès confirmés confirment que le franchissement du seuil des 1 000 morts n'a pas été suivi d'une décrue. Les suspects se stabilisent à 315. La flambée reste active sur un front étendu qui couvre l'Ituri, le Nord-Kivu, le Maniema et des zones encore plus lointaines.",
    cc="2973", sc="315", cd="1309",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-23; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-25 (24 juillet non publie)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260725_inrb_umie_update", "2026-07-25", "drc_total", "situation_update",
    "3 200 confirmés : le cap des 3 000 est largement dépassé",
    "Le 24 juillet n'ayant pas été publié, ce bilan couvre deux jours et franchit nettement le seuil de 3 000 cas confirmés : 3 200 confirmés et 1 405 décès au 25 juillet. La progression sur deux jours atteint 227 nouveaux confirmés et 96 décès supplémentaires. Les suspects remontent légèrement à 340. L'épidémie, qui a triplé son bilan depuis la mi-juin, ne montre aucun signe de fléchissement.",
    cc="3200", sc="340", cd="1405",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-25; snapshot 5d9e722; 24 juillet non publie par la source; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-26
# ──────────────────────────────────────────────────────────────────────
row("ev_20260726_inrb_umie_update", "2026-07-26", "drc_total", "situation_update",
    "3 262 confirmés, 1 437 décès : la flambée s'installe dans le temps long",
    "Le 26 juillet, la flambée enregistre 62 nouveaux cas confirmés et 32 décès supplémentaires, avec un total de 3 262 cas et 1 437 décès confirmés. Les suspects reculent légèrement à 326 sous l'effet d'un reclassement. Trois mois après la déclaration officielle, l'épidémie occupe durablement les systèmes de santé de l'Ituri, du Nord-Kivu et des provinces adjacentes, sans rupture visible dans la chaîne de transmission.",
    cc="3262", sc="326", cd="1437",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-26; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-27
# ──────────────────────────────────────────────────────────────────────
row("ev_20260727_inrb_umie_update", "2026-07-27", "drc_total", "situation_update",
    "3 360 confirmés, 1 487 décès : le Nord-Kivu pèse lourd dans le bilan",
    "Le 27 juillet, 98 nouveaux cas confirmés et 50 décès supplémentaires alourdissent un bilan qui atteint 3 360 cas et 1 487 décès confirmés. La zone de santé de Nizi, avec 360 cas confirmés cumulés, est devenue l'un des foyers les plus actifs hors Ituri, devant Katwa (145) et Butembo (75). Cette montée en puissance du Nord-Kivu redistribue le poids géographique de la flambée.",
    cc="3360", sc="321", cd="1487",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-27; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

row("ev_20260727_butembo_75_nordkivu", "2026-07-27", "butembo", "situation_update",
    "75 cas à Butembo : l'arc Nizi-Katwa-Butembo domine le front Nord-Kivu",
    "Au 27 juillet, Butembo cumule 75 cas confirmés et Katwa 145, portant à plus de 220 le nombre de cas dans la seule zone métropolitaine de Butembo. La zone de Nizi, limitrophe, atteint 360 cas — un total qui rivalise avec Mongbwalu (528) et s'approche des grands foyers ituriens. Cette concentration dans le couloir Nizi-Katwa-Butembo trace un arc nord-kivutien qui redistribue durablement le poids géographique de la flambée.",
    cc="75",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-07-27; Butembo 75 cas confirmes cumulatifs; Katwa 145; Nizi 360; insp_sitrep__cumulative_confirmed_cases__daily.csv."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-30 (28 et 29 juillet non publies)
# ──────────────────────────────────────────────────────────────────────
row("ev_20260730_inrb_umie_update", "2026-07-30", "drc_total", "situation_update",
    "3 605 confirmés : trois jours sans publication, puis le bilan s'emballe",
    "Les 28 et 29 juillet n'ayant pas été publiés, ce bilan couvre trois jours : 245 nouveaux cas confirmés et 100 décès supplémentaires portent les totaux à 3 605 et 1 587 respectivement. Les suspects remontent à 374. Cette accumulation sur plusieurs jours tend à amplifier les variations apparentes ; en réalité, la transmission reste régulière sur l'ensemble des zones actives de l'Ituri et du Nord-Kivu.",
    cc="3605", sc="374", cd="1587",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-30; snapshot 5d9e722; 28 et 29 juillet non publies par la source; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-07-31
# ──────────────────────────────────────────────────────────────────────
row("ev_20260731_inrb_umie_update", "2026-07-31", "drc_total", "situation_update",
    "3 674 confirmés, 1 621 décès : fin juillet sous tension",
    "Le dernier jour de juillet voit la flambée atteindre 3 674 cas confirmés et 1 621 décès confirmés. Les cas suspects reculent à 321 sous l'effet d'un reclassement. Quatre mois après la première alerte au nord de l'Ituri, l'épidémie Bundibugyo continue sa progression régulière, sans que les efforts de riposte n'aient encore eu raison de la transmission dans les foyers les plus actifs.",
    cc="3674", sc="321", cd="1621",
    notes="Bilan national INRB-UMIE/INSP du 2026-07-31; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-08-01
# ──────────────────────────────────────────────────────────────────────
row("ev_20260801_inrb_umie_update", "2026-08-01", "drc_total", "situation_update",
    "3 748 confirmés : août commence avec une série toujours ascendante",
    "Le 1er août, le bilan national atteint 3 748 cas confirmés et 1 657 décès confirmés. Les cas suspects s'effondrent à 227 — une chute de 94 — par révision de la série côté source. Cette correction n'efface pas la tendance de fond : la flambée reste active dans l'ensemble des zones touchées, et les confirmations biologiques continuent de progresser à un rythme soutenu.",
    cc="3748", sc="227", cd="1657",
    notes="Bilan national INRB-UMIE/INSP du 2026-08-01; snapshot 5d9e722; deces suspects non communiques (ND); forte baisse suspects liee a revision/reclassement."),

# ──────────────────────────────────────────────────────────────────────
# 2026-08-02
# ──────────────────────────────────────────────────────────────────────
row("ev_20260802_inrb_umie_update", "2026-08-02", "drc_total", "situation_update",
    "3 802 confirmés, 1 707 décès : la flambée dépasse 3 800",
    "Le 2 août, 54 nouveaux cas confirmés et 50 décès supplémentaires portent les totaux à 3 802 et 1 707 respectivement. Les cas suspects remontent à 275. Avec plus de 1 700 décès confirmés en moins de trois mois depuis la déclaration officielle, l'épidémie Bundibugyo 2026 s'inscrit désormais parmi les plus mortelles de l'histoire de la RDC.",
    cc="3802", sc="275", cd="1707",
    notes="Bilan national INRB-UMIE/INSP du 2026-08-02; snapshot 5d9e722; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-08-03
# ──────────────────────────────────────────────────────────────────────
row("ev_20260803_inrb_umie_update", "2026-08-03", "drc_total", "situation_update",
    "3 874 confirmés, 1 751 décès : la progression reste régulière en août",
    "Le 3 août, la flambée enregistre 72 nouveaux cas confirmés et 44 décès supplémentaires. Le total atteint 3 874 cas et 1 751 décès confirmés, avec 301 suspects. La riposte fait face à une épidémie installée dans la durée : après trois mois de flambée active, la transmission continue de toucher plusieurs dizaines de zones de santé à travers l'Ituri, le Nord-Kivu et des provinces voisines.",
    cc="3874", sc="301", cd="1751",
    notes="Bilan national INRB-UMIE/INSP du 2026-08-03; snapshot 5d9e722; deces suspects non communiques (ND)."),

# ──────────────────────────────────────────────────────────────────────
# 2026-08-04
# ──────────────────────────────────────────────────────────────────────
row("ev_20260804_inrb_umie_update", "2026-08-04", "drc_total", "situation_update",
    "3 973 confirmés, 1 801 décès : la flambée approche les 4 000 cas",
    "Au 4 août, le bilan national frôle les 4 000 cas confirmés avec 3 973 cas et 1 801 décès confirmés. En quelques jours, la mortalité confirmée a franchi le seuil des 1 800. La zone de santé de Nizi concentre 431 cas confirmés cumulés, dépassant toutes les zones hors Ituri ; Katwa atteint 200 cas, et l'extension vers des territoires plus lointains — Maniema, Tshopo — se confirme progressivement.",
    cc="3973", sc="270", cd="1801",
    notes="Bilan national INRB-UMIE/INSP du 2026-08-04; snapshot 5d9e722; deces suspects non communiques (ND); baisse suspects liee a revision/reclassement; franchissement du seuil de 1800 deces confirmes."),

row("ev_20260804_katwa_200_milestone", "2026-08-04", "katwa", "situation_update",
    "Katwa franchit 200 cas confirmés : Nord-Kivu au cœur de la flambée",
    "Au 4 août, la zone de santé de Katwa atteint 200 cas confirmés cumulés — un seuil qui confirme que le Nord-Kivu est devenu un deuxième front majeur de l'épidémie, aux côtés de l'épicentre iturien. Butembo cumule 92 cas dans la même agglomération, et la zone de Nizi, limitrophe, atteint 431 cas. Plus loin, Fataki (40 cas en Ituri nord) et Isiro (25 cas en Bas-Uele) illustrent une extension qui touche désormais plusieurs provinces au-delà du foyer initial.",
    cc="200",
    display_priority=2, timeline_group="regional_spread",
    notes="Ventilation par zone de sante INRB-UMIE du 2026-08-04; Katwa 200 cas confirmes cumulatifs; Butembo 92; Nizi 431; Fataki 40; Isiro 25; insp_sitrep__cumulative_confirmed_cases__daily.csv."),

]

# ── Lecture du fichier existant pour detecter la ligne de fin ──────────
with open(EVENTS_PATH, "r", encoding="utf-8", newline="") as f:
    raw = f.read()

# Detecter CRLF ou LF
crlf = "\r\n" in raw
eol = "\r\n" if crlf else "\n"

# Verifier que les event_id ne sont pas deja presents
existing_ids = set()
for line in raw.splitlines():
    if line.strip():
        existing_ids.add(line.split(",")[0].strip('"'))

new_events = [e for e in EVENTS if e["event_id"] not in existing_ids]
if not new_events:
    print("Aucun nouvel evenement a ajouter (tous deja presents).")
    sys.exit(0)

# ── Construction des nouvelles lignes CSV ──────────────────────────────
import io
buf = io.StringIO()
writer = csv.DictWriter(buf, fieldnames=COLS, lineterminator=eol,
                        quoting=csv.QUOTE_MINIMAL)
for ev in new_events:
    writer.writerow(ev)

# Assurer que le fichier existant se termine par une seule fin de ligne
if not raw.endswith(eol) and not raw.endswith("\n"):
    raw += eol

with open(EVENTS_PATH, "w", encoding="utf-8", newline="") as f:
    f.write(raw)
    f.write(buf.getvalue())

print(f"{len(new_events)} evenements ajoutes a {EVENTS_PATH}.")
for ev in new_events:
    print(f"  + {ev['event_id']} ({ev['date']}, {ev['place_id']})")
