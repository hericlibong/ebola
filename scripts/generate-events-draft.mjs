/**
 * Script de génération des brouillons d'events pour la période juin-juillet 2026.
 * Génère les lignes CSV à ajouter à public/data/reference/events.csv.
 * Usage: node scripts/generate-events-draft.mjs >> public/data/reference/events.csv
 */

import { createWriteStream } from 'fs';
import { appendFileSync } from 'fs';

const SOURCE = 'inrb_umie_2026_08_02_snapshot';

function csvField(value) {
  if (value === null || value === undefined || value === '') return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function row(fields) {
  return fields.map(csvField).join(',');
}

const events = [];

// ============================================================
// EVENTS NATIONAUX (situation_update sur drc_total)
// ============================================================

events.push(row([
  'ev_20260619_inrb_umie_update',
  '2026-06-19', '', 'drc_total', 'situation_update',
  '956 confirmés : la hausse reprend après une correction des suspects',
  'Le 19 juin, le bilan national atteint 956 cas confirmés et 247 décès confirmés. Les cas suspects reculent à 162 et les décès suspects à 47, en baisse par rapport au 18 juin : cette correction reflète un reclassement côté source, pas un ralentissement de la transmission. La flambée reste active de l\'épicentre iturien jusqu\'aux foyers du Nord-Kivu.',
  '', '956', '162', '247', '47', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260620_inrb_umie_update',
  '2026-06-20', '', 'drc_total', 'situation_update',
  'La barre des 1 000 cas confirmés est franchie',
  'Le 20 juin, le bilan officiel dépasse le millier de cas confirmés pour la première fois — 1 003 au total —, avec 254 décès confirmés. Ce seuil illustre une transmission qui n\'a pas été jugulée depuis la détection du virus à la mi-mai : la flambée circule dans plusieurs provinces, de l\'Ituri au Nord-Kivu.',
  '', '1003', '201', '254', '30', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; franchissement du cap des 1000 cas confirmes; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260621_inrb_umie_update',
  '2026-06-21', '', 'drc_total', 'situation_update',
  '1 048 confirmés : la dynamique reste ascendante',
  'Le 21 juin, le bilan atteint 1 048 cas confirmés et 267 décès confirmés. Les cas suspects rebondissent à 202, après la forte correction de la veille, et les décès suspects remontent à 60 : la consolidation de la série reste volatile, mais la tendance générale demeure à la hausse dans les zones de santé de l\'Ituri et du Nord-Kivu.',
  '', '1048', '202', '267', '60', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

events.push(row([
  'ev_20260622_inrb_umie_update',
  '2026-06-22', '', 'drc_total', 'situation_update',
  '1 094 confirmés : nouvelle correction des suspects',
  'Au 22 juin, la série nationale atteint 1 094 cas confirmés et 277 décès confirmés. Les cas suspects reculent à 131 et les décès suspects à 44 : ce nouvel ajustement à la baisse tient à un reclassement côté source — suspects basculés en confirmés ou écartés après investigation — et non à un ralentissement de la circulation du virus.',
  '', '1094', '131', '277', '44', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260623_inrb_umie_update',
  '2026-06-23', '', 'drc_total', 'situation_update',
  '291 décès confirmés : la mortalité franchit un nouveau palier',
  'Le 23 juin, les autorités enregistrent 1 118 cas confirmés et 291 décès confirmés. Cette progression continue — de l\'épicentre iturien où Bunia, Rwampara et Mongbwalu concentrent l\'essentiel des cas, jusqu\'aux foyers croissants du Nord-Kivu — reflète la difficulté à contenir une flambée couvrant une géographie aussi étendue.',
  '', '1118', '138', '291', '45', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

events.push(row([
  'ev_20260624_inrb_umie_update',
  '2026-06-24', '', 'drc_total', 'situation_update',
  '304 décès confirmés : le bilan franchit le cap des 300',
  'Le 24 juin, le bilan national atteint 1 155 cas confirmés et 304 décès confirmés — un premier franchissement du seuil des 300 décès. Les cas suspects remontent à 154 après la correction de la veille, tandis que les décès suspects reculent encore légèrement à 40 : la série reste sujette à des révisions, mais la tendance générale demeure ascendante.',
  '', '1155', '154', '304', '40', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

// JUNE 25 — national + zone event (Butembo)
events.push(row([
  'ev_20260625_inrb_umie_update',
  '2026-06-25', '', 'drc_total', 'situation_update',
  '1 203 confirmés et 321 décès : la flambée reste vigoureuse',
  'Le 25 juin, le bilan grimpe à 1 203 cas confirmés et 321 décès confirmés. Les cas suspects bondissent à 265 et les décès suspects à 77, retrouvant des niveaux élevés après plusieurs jours de révisions. La flambée, solidement ancrée en Ituri, continue de progresser vers le Nord-Kivu et de nouvelles zones de l\'intérieur de la province.',
  '', '1203', '265', '321', '77', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

events.push(row([
  'ev_20260625_nordkivu_cluster',
  '2026-06-25', '', 'butembo', 'situation_update',
  'Nord-Kivu : Katwa et Butembo s\'installent comme foyers secondaires',
  'Au 25 juin, la ventilation par zone de santé révèle que Katwa cumule 35 cas confirmés et Butembo 33. Ces deux foyers du Nord-Kivu, situés à plusieurs centaines de kilomètres de l\'épicentre iturien, confirment que la flambée n\'est plus confinée au triangle Bunia-Rwampara-Mongbwalu : le front s\'étend aussi bien vers les grandes agglomérations méridionales que vers de nouvelles zones de l\'Ituri.',
  '', '33', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'regional_spread', 'active',
  'Ventilation par zone de sante INRB-UMIE au 25 juin; Katwa 35 cas confirmes; Butembo 33 cas confirmes; ancre sur Butembo pour la carte.',
]));

events.push(row([
  'ev_20260627_inrb_umie_update',
  '2026-06-27', '', 'drc_total', 'situation_update',
  '1 274 confirmés au 27 juin : deux jours publiés en un seul relevé',
  'Le relevé du 27 juin intègre le 26 juin non publié par la source : 1 274 cas confirmés et 360 décès confirmés au total. Les cas suspects reculent à 239 et les décès suspects à 70, en partie sous l\'effet de reclassements. Sur deux jours, les décès confirmés progressent de 39 — un rythme qui traduit une pression persistante sur les structures de soins de l\'Ituri et du Nord-Kivu.',
  '', '1274', '239', '360', '70', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 26 juin non publie (cadence SitRep); baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260629_inrb_umie_update',
  '2026-06-29', '', 'drc_total', 'situation_update',
  '399 décès confirmés : la barre des 400 décès se rapproche',
  'Le bilan au 29 juin — couvrant également le 28 juin non publié — atteint 1 333 cas confirmés et 399 décès confirmés, à un décès du seuil des 400. Les cas suspects rebondissent à 309 et les décès suspects à 90. Dans ce même temps, la zone de santé de Nyankunde en Ituri voit son bilan s\'alourdir, tandis que le front Nord-Kivu reste actif.',
  '', '1333', '309', '399', '90', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 28 juin non publie (cadence SitRep).',
]));

// JUNE 30 — national + zone event (Nyankunde)
events.push(row([
  'ev_20260630_inrb_umie_update',
  '2026-06-30', '', 'drc_total', 'situation_update',
  'Fin juin : 1 406 confirmés et 438 décès, le pire bilan mensuel depuis le début',
  'Au 30 juin, la série nationale clôture le mois avec 1 406 cas confirmés et 438 décès confirmés — soit près de 475 cas et 195 décès de plus qu\'au début du mois. Cette évolution illustre une épidémie qui a résisté à la riposte : l\'extension géographique de l\'Ituri au Nord-Kivu, couplée à des chaînes de transmission actives dans de nombreuses zones de santé, complique le suivi et la consolidation des bilans.',
  '', '1406', '301', '438', '90', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260630_nyankunde_surge',
  '2026-06-30', '', 'nyankunde', 'situation_update',
  'Nyankunde : 95 cas confirmés dans la zone hospitalière de l\'Ituri',
  'La zone de santé de Nyankunde, en Ituri, enregistre 95 cas confirmés cumulés au 30 juin. Cette accélération dans une zone abritant un hôpital de référence rappelle la vulnérabilité des structures de soins face à une épidémie encore mal maîtrisée. À titre de comparaison, Bunia dépasse 387 cas et Rwampara 301 à la même date : le triangle ituri concentre toujours l\'essentiel de la flambée.',
  '', '95', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'regional_spread', 'active',
  'Ventilation par zone de sante INRB-UMIE au 30 juin; Nyankunde 95 cas confirmes cumulatifs; Bunia 387; Rwampara 301.',
]));

events.push(row([
  'ev_20260701_inrb_umie_update',
  '2026-07-01', '', 'drc_total', 'situation_update',
  'Juillet s\'ouvre à 1 460 confirmés après une forte révision des suspects',
  'Le premier bilan de juillet atteint 1 460 cas confirmés et 452 décès confirmés. Les cas suspects chutent à 150 et les décès suspects à 41 — en forte baisse par rapport au 30 juin — sous l\'effet d\'un reclassement côté source, pas d\'un arrêt de la transmission. L\'Ituri reste l\'épicentre dominant, mais le Nord-Kivu continue d\'afficher une activité de transmission significative.',
  '', '1460', '150', '452', '41', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260702_inrb_umie_update',
  '2026-07-02', '', 'drc_total', 'situation_update',
  '1 502 confirmés : la série franchit le cap des 1 500',
  'Le 2 juillet, le bilan national dépasse 1 500 cas confirmés pour la première fois — 1 502 au total —, avec 473 décès confirmés. Les cas suspects rebondissent à 213 et les décès suspects à 63. Cette progression continue traduit une transmission active dans des dizaines de zones de santé, de l\'Ituri jusqu\'au Nord-Kivu.',
  '', '1502', '213', '473', '63', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; franchissement du cap des 1500 cas confirmes.',
]));

events.push(row([
  'ev_20260703_inrb_umie_update',
  '2026-07-03', '', 'drc_total', 'situation_update',
  '1 528 confirmés : les décès approchent du seuil des 500',
  'Au 3 juillet, le cumul atteint 1 528 cas confirmés et 492 décès confirmés, à huit décès du seuil des 500. Les cas suspects reculent à 185, nouvel ajustement lié à un reclassement côté source. La pression reste forte sur les zones de santé de Bunia et de Rwampara en Ituri, où se concentre l\'essentiel de la mortalité confirmée.',
  '', '1528', '185', '492', '67', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260704_inrb_umie_update',
  '2026-07-04', '', 'drc_total', 'situation_update',
  '500 décès confirmés : un seuil tragique est franchi',
  'Le 4 juillet, le bilan officiel dépasse 500 décès confirmés — 506 au total — pour 1 561 cas. Les cas suspects bondissent à 354 et les décès suspects à 110, retrouvant des niveaux élevés après plusieurs jours de révisions. Ce seuil de 500 décès, atteint moins de deux mois et demi après les premiers signaux cliniques, souligne l\'intensité de la mortalité dans une flambée multizonale.',
  '', '1561', '354', '506', '110', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; franchissement du cap des 500 deces confirmes.',
]));

events.push(row([
  'ev_20260705_inrb_umie_update',
  '2026-07-05', '', 'drc_total', 'situation_update',
  '1 624 confirmés : forte révision à la baisse des suspects',
  'Au 5 juillet, la série nationale atteint 1 624 cas confirmés et 521 décès confirmés. Les cas suspects s\'effondrent à 135 et les décès suspects à 23 — en chute par rapport aux 354 et 110 de la veille. Ce recul brutal s\'explique par un reclassement côté source : des cas suspects basculent en confirmés ou sont écartés après investigation, ce qui amplifie le bilan confirmé sans signaler un arrêt de la transmission.',
  '', '1624', '135', '521', '23', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260706_inrb_umie_update',
  '2026-07-06', '', 'drc_total', 'situation_update',
  '1 708 confirmés et 580 décès : une journée de forte accélération',
  'Le 6 juillet enregistre un bond notable : 1 708 cas confirmés et 580 décès confirmés, soit 84 cas et 59 décès de plus que la veille. Les suspects remontent à 237 et les décès suspects à 70. Cette accélération tient à la fois à de nouvelles contaminations déclarées et à la consolidation de laboratoire, dans une épidémie qui progresse en Ituri et au Nord-Kivu.',
  '', '1708', '237', '580', '70', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

// JULY 7 — national + zone event (Katwa)
events.push(row([
  'ev_20260707_inrb_umie_update',
  '2026-07-07', '', 'drc_total', 'situation_update',
  '600 décès confirmés : le bilan franchit un seuil alarmant',
  'Le 7 juillet, le bilan national atteint 1 759 cas confirmés et 600 décès confirmés — le franchissement du seuil des 600 décès constitue un marqueur fort de l\'intensité de la flambée. Les cas suspects remontent à 304 et les décès suspects à 92. En moins de deux mois depuis la détection officielle, la létalité confirmée a été multipliée par six.',
  '', '1759', '304', '600', '92', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; franchissement du cap des 600 deces confirmes.',
]));

events.push(row([
  'ev_20260707_katwa_nordkivu',
  '2026-07-07', '', 'katwa', 'situation_update',
  'Katwa dépasse 60 cas : le Nord-Kivu s\'installe dans la durée',
  'La zone de santé de Katwa, proche de Butembo au Nord-Kivu, cumule 61 cas confirmés au 7 juillet — contre 35 deux semaines plus tôt. Butembo en compte 42. Ensemble, ces deux zones Nord-Kivu pèsent un front méridional significatif, à plusieurs centaines de kilomètres de l\'épicentre iturien, le long d\'axes routiers très fréquentés. L\'extension vers le sud oblige la riposte à diviser ses ressources entre l\'Ituri et le Nord-Kivu.',
  '', '61', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Ventilation par zone de sante INRB-UMIE au 7 juillet; Katwa 61 cas confirmes; Butembo 42 cas confirmes; ancre sur Katwa pour la carte.',
]));

events.push(row([
  'ev_20260708_inrb_umie_update',
  '2026-07-08', '', 'drc_total', 'situation_update',
  '1 792 confirmés : les suspects corrigés après le pic de la veille',
  'Au 8 juillet, le bilan atteint 1 792 cas confirmés et 625 décès confirmés. Les cas suspects reculent à 227 et les décès suspects à 60, en baisse par rapport aux 304 et 92 de la veille : ce recul tient à un reclassement côté source. La hausse des décès confirmés — 25 de plus qu\'au 7 juillet — reste soutenue, traduisant une pression persistante sur les structures de soins.',
  '', '1792', '227', '625', '60', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
]));

events.push(row([
  'ev_20260709_inrb_umie_update',
  '2026-07-09', '', 'drc_total', 'situation_update',
  '1 830 confirmés : la courbe nationale reste sur sa pente ascendante',
  'Le 9 juillet, le cumul national atteint 1 830 cas confirmés et 648 décès confirmés. Les cas suspects remontent à 284 et les décès suspects à 81. Ancrée depuis plusieurs semaines dans des dizaines de zones de santé — de Bunia et Rwampara en Ituri jusqu\'à Katwa et Butembo au Nord-Kivu — la flambée ne montre aucun signe de ralentissement structurel.',
  '', '1830', '284', '648', '81', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

events.push(row([
  'ev_20260710_inrb_umie_update',
  '2026-07-10', '', 'drc_total', 'situation_update',
  '1 873 confirmés et 672 décès : la flambée poursuit sa progression',
  'Au 10 juillet, le bilan national atteint 1 873 cas confirmés et 672 décès confirmés. Les cas suspects progressent légèrement à 299, tout comme les décès suspects à 91. Chaque journée ajoute en moyenne 40 à 80 cas confirmés supplémentaires — un rythme qui témoigne d\'une transmission active dans plusieurs provinces, de l\'épicentre iturien jusqu\'aux foyers du Nord-Kivu.',
  '', '1873', '299', '672', '91', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires.',
]));

events.push(row([
  'ev_20260711_inrb_umie_update',
  '2026-07-11', '', 'drc_total', 'situation_update',
  '700 décès confirmés : la flambée franchit un nouveau seuil de gravité',
  'Le 11 juillet, la série nationale dépasse 700 décès confirmés — 702 exactement —, pour 1 926 cas confirmés. Ce seuil, atteint deux mois à peine après les premiers signaux cliniques d\'avril, illustre une mortalité élevée dans une flambée qui touche plusieurs provinces. Les cas suspects et décès suspects restent stables à 299 et 91 respectivement.',
  '', '1926', '299', '702', '91', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; franchissement du cap des 700 deces confirmes.',
]));

// JULY 13 — national + zone event (Fataki)
events.push(row([
  'ev_20260713_inrb_umie_update',
  '2026-07-13', '', 'drc_total', 'situation_update',
  '2 000 cas confirmés dépassés : la flambée entre dans une nouvelle phase',
  'Le 13 juillet, le bilan officiel dépasse 2 000 cas confirmés — 2 011 au total —, avec 754 décès confirmés. Ce double relevé (le 12 juillet n\'a pas été publié) couvre deux jours d\'accélération. À partir de cette date, les décès suspects ne sont plus communiqués dans la série. Avec plus de 2 000 cas, l\'épidémie Bundibugyo en RDC est l\'une des plus importantes jamais enregistrées dans le pays.',
  '', '2011', '268', '754', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 12 juillet non publie (cadence SitRep); franchissement du cap des 2000 cas confirmes; deces suspects non communiques (ND) a partir de cette date.',
]));

events.push(row([
  'ev_20260713_fataki_ituri',
  '2026-07-13', '', 'fataki', 'situation_update',
  'Fataki : l\'épidémie atteint le nord de l\'Ituri',
  'La zone de santé de Fataki, localité du nord de l\'Ituri, enregistre 5 cas confirmés cumulés au 13 juillet — contre 1 fin juin. Ce signal, encore limité, indique que la flambée déborde au-delà des foyers historiques de Bunia, Rwampara et Mongbwalu vers des zones plus reculées de la province. Aru, point de passage commercial à la frontière ougandaise, reste stable à 3 cas et maintient une pression sur la surveillance transfrontalière.',
  '', '5', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'regional_spread', 'active',
  'Ventilation par zone de sante INRB-UMIE au 13 juillet; Fataki 5 cas confirmes; Aru 3 cas confirmes; extension nord-ituri au-dela du triangle historique.',
]));

events.push(row([
  'ev_20260715_inrb_umie_update',
  '2026-07-15', '', 'drc_total', 'situation_update',
  '2 124 confirmés et 828 décès : l\'accélération se confirme',
  'Le bilan au 15 juillet — couvrant également le 14 juillet non publié — atteint 2 124 cas confirmés et 828 décès confirmés. Les cas suspects bondissent à 389. En deux jours, la série gagne 113 cas et 74 décès supplémentaires : cette accélération, simultanée en Ituri et au Nord-Kivu, accentue la pression sur des équipes de riposte qui doivent couvrir une géographie de plus en plus étendue.',
  '', '2124', '389', '828', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 14 juillet non publie (cadence SitRep); deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260717_inrb_umie_update',
  '2026-07-17', '', 'drc_total', 'situation_update',
  '2 267 confirmés : forte révision des suspects alors que les décès approchent 900',
  'Le relevé du 17 juillet — couvrant également le 16 — porte le cumul à 2 267 cas confirmés et 893 décès confirmés. Les cas suspects chutent à 236, en forte baisse par rapport aux 389 de deux jours plus tôt, sous l\'effet d\'un reclassement côté source. Le seuil des 900 décès confirmés se rapproche, tandis que la flambée progresse simultanément dans plusieurs zones de l\'Ituri et du Nord-Kivu.',
  '', '2267', '236', '893', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 16 juillet non publie (cadence SitRep); baisse de cas suspects liee a revision/reclassement ou changement de definition cote source; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260718_inrb_umie_update',
  '2026-07-18', '', 'drc_total', 'situation_update',
  '930 décès confirmés : le bilan se rapproche du millier',
  'Le 18 juillet, le bilan national atteint 2 344 cas confirmés et 930 décès confirmés. À soixante-dix décès du seuil des 1 000, la flambée maintient un rythme soutenu. Les cas suspects reculent encore à 192, reflet d\'ajustements continus de la source. Cette consolidation ne masque pas l\'essentiel : la circulation du virus dans des dizaines de zones de santé, de l\'Ituri jusqu\'au Nord-Kivu.',
  '', '2344', '192', '930', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260719_inrb_umie_update',
  '2026-07-19', '', 'drc_total', 'situation_update',
  '967 décès : la barre des 1 000 décès confirmés est imminente',
  'Le 19 juillet, le cumul atteint 2 423 cas confirmés et 967 décès confirmés, à 33 décès du seuil des 1 000. Les cas suspects remontent à 252. Cette dynamique, sans signe de ralentissement structurel, intervient dans un contexte où la riposte peine à couvrir simultanément les foyers ituriers et les fronts ouverts du Nord-Kivu.',
  '', '2423', '252', '967', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; deces suspects non communiques (ND).',
]));

// JULY 20 — national + zone event (Mongbwalu)
events.push(row([
  'ev_20260720_inrb_umie_update',
  '2026-07-20', '', 'drc_total', 'situation_update',
  '999 décès confirmés : la flambée à la veille d\'un seuil historique',
  'Le 20 juillet, le bilan atteint 2 473 cas confirmés et 999 décès confirmés — à un décès du seuil des 1 000. Les cas suspects rebondissent à 322. La progression des décès confirmés confirme que l\'épidémie, active dans de nombreuses zones de santé entre l\'Ituri et le Nord-Kivu, ne montre pas de signe d\'essoufflement.',
  '', '2473', '322', '999', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260720_mongbwalu_ituri',
  '2026-07-20', '', 'mongbwalu', 'situation_update',
  'Mongbwalu : 364 cas dans le cœur minier de l\'Ituri',
  'La zone de santé de Mongbwalu, ancien foyer minier au cœur de l\'Ituri, cumule 364 cas confirmés au 20 juillet — derrière Bunia (657) et Rwampara (457). Cette zone, active depuis les premières semaines de la flambée, reste l\'un des moteurs silencieux de l\'épidémie iturienne, loin des axes urbains mais sur des corridors de mobilité minière intense.',
  '', '364', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Ventilation par zone de sante INRB-UMIE au 20 juillet; Mongbwalu 364 cas confirmes; Bunia 657; Rwampara 457; Nyankunde 99.',
]));

// JULY 22 — national + zone event (Nyankunde)
events.push(row([
  'ev_20260722_inrb_umie_update',
  '2026-07-22', '', 'drc_total', 'situation_update',
  'Bond sans précédent : +432 cas confirmés et +270 décès en 48 heures',
  'Le relevé du 22 juillet — couvrant le 21 juillet non publié — révèle un saut sans précédent depuis le début de la flambée : 2 905 cas confirmés et 1 269 décès confirmés, soit 432 cas et 270 décès de plus qu\'au 20 juillet. Ce bond massif reflète probablement un rattrapage de déclaration davantage qu\'une surmortalité instantanée sur 48 heures, mais il franchit d\'un coup les seuils des 2 500, 2 750 et 1 000 décès confirmés. La flambée touche désormais l\'Ituri, le Nord-Kivu et des zones frontières au nord de la province.',
  '', '2905', '318', '1269', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 21 juillet non publie (cadence SitRep); franchissement simultane des caps 2500/2750 cas et 1000 deces confirmes; baisse de cas suspects liee a revision/reclassement; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260722_nyankunde_accel',
  '2026-07-22', '', 'nyankunde', 'situation_update',
  'Nyankunde : 114 cas, la zone hospitalière de l\'Ituri sous pression croissante',
  'La zone de santé de Nyankunde, qui abritait 95 cas fin juin, en cumule 114 au 22 juillet. Dans le même temps, Mongbwalu (482 cas) talonne Rwampara (481), tous deux derrière Bunia (696). Cette montée en charge simultanée dans plusieurs zones de l\'Ituri central — dont Nyankunde avec son hôpital de référence — illustre la diffusion continue de la flambée loin des seuls épicentres urbains.',
  '', '114', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Ventilation par zone de sante INRB-UMIE au 22 juillet; Nyankunde 114 cas confirmes; Mongbwalu 482; Rwampara 481; Bunia 696.',
]));

events.push(row([
  'ev_20260723_inrb_umie_update',
  '2026-07-23', '', 'drc_total', 'situation_update',
  '2 973 confirmés et 1 309 décès : la consolidation du bond du 22 juillet',
  'Le 23 juillet, le bilan atteint 2 973 cas confirmés et 1 309 décès confirmés, soit 68 cas et 40 décès supplémentaires par rapport au relevé massif de la veille. Les cas suspects reculent légèrement à 315. Ce niveau de déclaration quotidienne, plus conforme à la tendance récente, suggère que le bond du 22 juillet intégrait une part de rattrapage de déclaration.',
  '', '2973', '315', '1309', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement; deces suspects non communiques (ND).',
]));

// JULY 25 — national + zone event (Butembo)
events.push(row([
  'ev_20260725_inrb_umie_update',
  '2026-07-25', '', 'drc_total', 'situation_update',
  '3 200 confirmés et 1 405 décès : le cap des 3 000 cas est dépassé',
  'Le relevé du 25 juillet — couvrant également le 24 juillet non publié — porte le cumul à 3 200 cas confirmés et 1 405 décès confirmés. En moins d\'une semaine depuis le bond du 22 juillet, la série a gagné 295 cas et 136 décès supplémentaires. La flambée continue de s\'étendre dans les zones de santé de l\'Ituri et du Nord-Kivu, ainsi que dans de nouveaux secteurs du nord de la province.',
  '', '3200', '340', '1405', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 24 juillet non publie (cadence SitRep); franchissement du cap des 3000 cas confirmes; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260725_butembo_nordkivu',
  '2026-07-25', '', 'butembo', 'situation_update',
  'Butembo et Katwa : le Nord-Kivu franchit 250 cas confirmés',
  'Au 25 juillet, Katwa cumule 166 cas confirmés et Butembo 82 — soit plus de 250 cas dans ces deux seules zones du Nord-Kivu. Ces pôles urbains à haute densité, déjà durement frappés lors de l\'épidémie de 2018-2020, concentrent un front méridional significatif à plusieurs centaines de kilomètres de l\'épicentre iturien. Leur progression souligne la nécessité de maintenir une riposte bifocale entre Ituri et Nord-Kivu.',
  '', '82', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Ventilation par zone de sante INRB-UMIE au 25 juillet; Katwa 166 cas confirmes; Butembo 82 cas confirmes; ancre sur Butembo pour la carte.',
]));

events.push(row([
  'ev_20260726_inrb_umie_update',
  '2026-07-26', '', 'drc_total', 'situation_update',
  '3 262 confirmés et 1 437 décès : la progression reste soutenue',
  'Le 26 juillet, le bilan national atteint 3 262 cas confirmés et 1 437 décès confirmés. Les cas suspects reculent légèrement à 326, un ajustement habituel de la série. Jour après jour, la flambée ajoute entre 60 et 100 cas confirmés supplémentaires dans les zones de santé de l\'Ituri — Bunia, Rwampara, Mongbwalu — et du Nord-Kivu, sans qu\'un infléchissement structurel ne soit encore visible.',
  '', '3262', '326', '1437', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement; deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260727_inrb_umie_update',
  '2026-07-27', '', 'drc_total', 'situation_update',
  '3 360 confirmés et 1 487 décès : la dynamique reste haute',
  'Le 27 juillet, le cumul national atteint 3 360 cas confirmés et 1 487 décès confirmés. Les cas suspects reculent encore légèrement à 321. Avec près de cent nouveaux cas confirmés dans la journée, la flambée maintient un rythme d\'expansion soutenu, de l\'Ituri au Nord-Kivu en passant par des zones d\'extension nouvelles comme Fataki dans le nord de la province.',
  '', '3360', '321', '1487', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; baisse de cas suspects liee a revision/reclassement; deces suspects non communiques (ND).',
]));

// JULY 30 — national + zone event (Fataki)
events.push(row([
  'ev_20260730_inrb_umie_update',
  '2026-07-30', '', 'drc_total', 'situation_update',
  '3 605 confirmés et 1 587 décès : le bilan de fin juillet dresse un tableau lourd',
  'Le relevé du 30 juillet — couvrant les 28 et 29 juillet non publiés — porte le cumul à 3 605 cas confirmés et 1 587 décès confirmés. Ce bilan de fin juillet, avec 374 cas suspects, illustre une flambée qui s\'est considérablement amplifiée depuis juin : en deux mois, les cas confirmés ont pratiquement quadruplé. La série reste préliminaire, sujette à des corrections ultérieures, mais la tendance est sans ambiguïté.',
  '', '3605', '374', '1587', '', '',
  SOURCE, 'official', 'high', 'provisional', '1', 'secondary', 'clinical', 'response_breakdown', 'active',
  'Bilan national INRB-UMIE/INSP; snapshot 7a42331 du 2026-08-02; donnees preliminaires; 28 et 29 juillet non publies (cadence SitRep); deces suspects non communiques (ND).',
]));

events.push(row([
  'ev_20260730_fataki_nord_ituri',
  '2026-07-30', '', 'fataki', 'situation_update',
  'Fataki : 27 cas, l\'Ituri nord s\'étend au-delà des foyers historiques',
  'La zone de santé de Fataki, dans le nord de l\'Ituri, cumule 27 cas confirmés au 30 juillet — contre 5 à la mi-juillet et 17 au 22 juillet. Cette progression régulière au-delà des foyers historiques de Bunia, Rwampara et Mongbwalu, conjuguée à la présence continue de cas à Aru (5 cas, stable) en bordure de la frontière ougandaise, maintient une pression de surveillance sur les corridors septentrionaux de la province.',
  '', '27', '', '', '', '',
  SOURCE, 'official', 'high', 'provisional', '2', 'secondary', 'clinical', 'regional_spread', 'active',
  'Ventilation par zone de sante INRB-UMIE au 30 juillet; Fataki 27 cas confirmes cumulatifs (vs 5 au 13 juillet; 17 au 22 juillet); Aru 5 cas confirmes (stable); extension nord-ituri.',
]));

// Write to stdout
for (const line of events) {
  process.stdout.write(line + '\n');
}

process.stderr.write(`Generated ${events.length} event rows\n`);
