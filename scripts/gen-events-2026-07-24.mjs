/**
 * Génère et appende les events pour les dates 2026-06-19 à 2026-07-20
 * dans public/data/reference/events.csv
 * Usage : node scripts/gen-events-2026-07-24.mjs
 */

import { appendFileSync } from 'fs';

const OUT = 'public/data/reference/events.csv';
const SRC = 'inrb_umie_2026_07_24_snapshot';

function q(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function row(fields) {
  return fields.map(q).join(',') + '\n';
}

function natRow({
  date, cc, sc, cd, sd, headline, fact_text, note,
  priority = 1, tier = 'secondary', group = 'response_breakdown'
}) {
  const dateId = date.replace(/-/g, '');
  return row([
    `ev_${dateId}_inrb_umie_update`,
    date, '', 'drc_total', 'situation_update',
    headline, fact_text, '',
    cc, sc, cd, sd !== null && sd !== undefined ? sd : '',
    '',
    SRC, 'official', 'high', 'provisional',
    priority, tier, 'clinical', group,
    'active', note
  ]);
}

function geoRow({
  event_id, date, place_id, headline, fact_text,
  cc = '', sc = '', cd = '', sd = '',
  priority = 2, tier = 'secondary', group = 'regional_spread', note = ''
}) {
  return row([
    event_id, date, '', place_id, 'situation_update',
    headline, fact_text, '',
    cc, sc, cd, sd,
    '',
    SRC, 'official', 'high', 'provisional',
    priority, tier, 'clinical', group,
    'active', note
  ]);
}

const events = [];

// ─────────────────────────────────────────────
// 27 bilans nationaux
// ─────────────────────────────────────────────

events.push(natRow({
  date: '2026-06-19', cc: 956, sc: 162, cd: 247, sd: 47,
  headline: 'La flambée dépasse 950 cas confirmés de l\'Ituri au Nord-Kivu',
  fact_text: 'Au 19 juin, le bilan national atteint 956 cas confirmés et 247 décès confirmés. Les cas suspects reculent à 162 et les décès suspects à 47, un mouvement lié à des reclassements côté source et non à un ralentissement réel de l\'épidémie. L\'épicentre reste ancré dans les zones de Bunia, Rwampara et Mongbwalu, tandis que les foyers du Nord-Kivu progressent en parallèle.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-06-20', cc: 1003, sc: 201, cd: 254, sd: 30,
  headline: 'Le millier de cas confirmés est franchi : l\'épidémie entre dans une autre dimension',
  fact_text: 'Le 20 juin, la barre des 1 000 cas confirmés est franchie pour la première fois avec 1 003 cas et 254 décès confirmés en RDC. Ce seuil symbolique traduit une flambée qui s\'est installée sur plusieurs mois dans l\'est du pays, de l\'épicentre iturien — Bunia, Rwampara, Mongbwalu — jusqu\'aux zones émergentes du Nord-Kivu.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-06-21', cc: 1048, sc: 202, cd: 267, sd: 60,
  headline: '1 048 cas confirmés : l\'Ituri reste le moteur d\'une épidémie qui s\'élargit',
  fact_text: 'Au 21 juin, le bilan grimpe à 1 048 cas confirmés et 267 décès. Avec 202 cas suspects et 60 décès suspects, la série retrouve une cohérence après les corrections de la veille. Dans les grandes zones de santé de l\'Ituri, la transmission reste active ; en parallèle, le Nord-Kivu voit ses chiffres progresser sans relâche.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-06-22', cc: 1094, sc: 131, cd: 277, sd: 44,
  headline: '277 décès confirmés : la progression touche l\'Ituri et le Nord-Kivu',
  fact_text: 'Au 22 juin, les décès confirmés atteignent 277 pour 1 094 cas. Les cas suspects chutent à 131 et les décès suspects à 44, sous l\'effet de reclassements côté source qui ne reflètent pas une amélioration sur le terrain. L\'extension géographique se poursuit dans les deux provinces, sans signal de reflux.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-06-23', cc: 1118, sc: 138, cd: 291, sd: 45,
  headline: 'L\'épidémie dépasse 290 décès confirmés en Ituri et au Nord-Kivu',
  fact_text: 'Au 23 juin, le bilan s\'établit à 1 118 cas confirmés et 291 décès confirmés, avec 138 cas suspects et 45 décès suspects. La progression journalière reste soutenue. Les zones de santé de l\'Ituri concentrent l\'essentiel des cas, mais le front Nord-Kivu s\'élargit progressivement vers Katwa, Butembo et au-delà.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-06-24', cc: 1155, sc: 154, cd: 304, sd: 40,
  headline: 'Plus de 300 décès confirmés : un cap sombre dans l\'est de la RDC',
  fact_text: 'Le 24 juin, la RDC enregistre 1 155 cas confirmés et 304 décès confirmés. Ce franchissement des 300 décès s\'inscrit dans une progression régulière depuis la détection de la flambée à la mi-mai. Les zones de santé les plus touchées restent Bunia, Rwampara et Mongbwalu en Ituri, mais Katwa et Butembo en Nord-Kivu consolident leurs bilans.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-06-25', cc: 1203, sc: 265, cd: 321, sd: 77,
  headline: '1 200 cas confirmés et 321 décès : la flambée s\'installe durablement dans deux provinces',
  fact_text: 'Au 25 juin, la série nationale atteint 1 203 cas confirmés et 321 décès. Les cas suspects rebondissent à 265 et les décès suspects à 77, signe que la surveillance capte des signaux plus larges. La répartition géographique confirme la dualité de l\'épidémie : un épicentre iturien solide autour de Bunia, Rwampara et Mongbwalu, et un deuxième front en Nord-Kivu avec Katwa à 35 cas et Butembo à 33.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-06-27', cc: 1274, sc: 239, cd: 360, sd: 70,
  headline: '360 décès confirmés : l\'épidémie accélère sur deux jours de cadence SitRep',
  fact_text: 'Au 27 juin, le bilan national s\'élève à 1 274 cas confirmés et 360 décès, le 26 juin n\'ayant pas été publié par la source. Cette cadence bihebdomadaire ne traduit pas de rupture dans la transmission, mais compresse l\'information : en deux jours, la RDC a enregistré 71 nouveaux cas confirmés et 39 nouveaux décès. Les foyers de Bunia, Rwampara et Mongbwalu restent les zones les plus actives.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; jour(s) entre le 2026-06-25 et le 2026-06-27 non publie(s) par la source (cadence SitRep); baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-06-29', cc: 1333, sc: 309, cd: 399, sd: 90,
  headline: 'Le seuil des 400 décès confirmés est en vue sur les deux fronts actifs',
  fact_text: 'Au 29 juin, le bilan atteint 1 333 cas confirmés et 399 décès, le 28 juin n\'ayant pas été publié. La flambée touche désormais plusieurs dizaines de zones de santé, de l\'épicentre de l\'Ituri jusqu\'aux foyers du Nord-Kivu. Avec 309 cas suspects et 90 décès suspects, la surveillance reste active dans les deux provinces.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; jour(s) entre le 2026-06-27 et le 2026-06-29 non publie(s) par la source (cadence SitRep).'
}));

events.push(natRow({
  date: '2026-06-30', cc: 1406, sc: 301, cd: 438, sd: 90,
  headline: 'Fin juin : 1 406 cas confirmés et 438 décès, bilan d\'un mois de flambée soutenue',
  fact_text: 'La fin du mois de juin s\'achève avec 1 406 cas confirmés et 438 décès en RDC. Depuis la déclaration officielle le 15 mai, l\'épidémie n\'a connu aucun fléchissement. Les zones de santé de l\'Ituri concentrent les principaux foyers, mais le Nord-Kivu s\'est affirmé comme un second théâtre de transmission avec des cas confirmés à Katwa, Butembo, Beni et Nizi.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-07-01', cc: 1460, sc: 150, cd: 452, sd: 41,
  headline: 'La flambée entre en juillet à plus de 1 400 cas confirmés',
  fact_text: 'Au 1er juillet, la RDC compte 1 460 cas confirmés et 452 décès. Les cas suspects chutent à 150 et les décès suspects à 41 en raison de reclassements côté source, non d\'une amélioration épidémiologique. L\'Ituri reste le cœur de l\'épidémie, tandis qu\'au Nord-Kivu les zones de Nizi (65 cas), Nyankunde (95) et Katwa (49) maintiennent une pression sur la riposte.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-07-02', cc: 1502, sc: 213, cd: 473, sd: 63,
  headline: '1 500 cas confirmés : l\'épidémie poursuit sa progression dans l\'est de la RDC',
  fact_text: 'Le 2 juillet, le bilan national franchit 1 500 cas confirmés avec 1 502 cas et 473 décès. La progression reste régulière dans l\'Ituri et au Nord-Kivu. Les cas suspects remontent à 213 et les décès suspects à 63, retrouvant un rythme de déclaration habituel après les corrections des jours précédents.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-03', cc: 1528, sc: 185, cd: 492, sd: 67,
  headline: 'Les décès confirmés approchent 500 en Ituri et au-delà',
  fact_text: 'Au 3 juillet, les décès confirmés en RDC atteignent 492 pour 1 528 cas. Les cas suspects baissent à 185 sous l\'effet de reclassements côté source. L\'épicentre iturien reste Bunia, Rwampara et Mongbwalu, mais Nyankunde maintient 95 cas confirmés cumulés, confirmant le rôle de cette zone hospitalière dans la géographie de l\'épidémie.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-07-04', cc: 1561, sc: 354, cd: 506, sd: 110,
  headline: '500 décès confirmés : un seuil dramatique dans l\'est de la RDC',
  fact_text: 'Le 4 juillet, la RDC franchit le seuil des 500 décès confirmés avec 506 morts et 1 561 cas. Les cas suspects bondissent à 354 et les décès suspects à 110, reflétant un afflux de nouveaux signaux dans le système de surveillance. La flambée touche désormais un arc géographique étendu, de Bunia jusqu\'aux zones frontières du Nord-Kivu.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-05', cc: 1624, sc: 135, cd: 521, sd: 23,
  headline: '1 624 cas confirmés : la flambée ne montre aucun signe de ralentissement',
  fact_text: 'Au 5 juillet, le bilan atteint 1 624 cas confirmés et 521 décès. Les cas suspects chutent à 135 et les décès suspects à 23 en raison de reclassements massifs côté source. La dynamique de transmission reste active dans l\'Ituri et au Nord-Kivu, où plusieurs zones de santé continuent de signaler de nouveaux cas chaque semaine.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-07-06', cc: 1708, sc: 237, cd: 580, sd: 70,
  headline: '1 700 cas confirmés et 580 décès : l\'accélération se confirme dans les deux provinces',
  fact_text: 'Au 6 juillet, le bilan national grimpe à 1 708 cas confirmés et 580 décès, soit 84 nouveaux cas et 59 nouveaux décès par rapport au 5 juillet. Cette accélération touche un territoire étendu, de Bunia (472 cas) et Rwampara (357) à l\'épicentre iturien, jusqu\'au Nord-Kivu où Nizi (84 cas) et Katwa (56) progressent en parallèle.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-07', cc: 1759, sc: 304, cd: 600, sd: 92,
  headline: '600 décès confirmés en RDC : un bilan qui pèse sur deux provinces',
  fact_text: 'Le 7 juillet, la RDC franchit le seuil des 600 décès confirmés avec 1 759 cas. La flambée dépasse un front de plusieurs centaines de kilomètres, de l\'épicentre iturien de Bunia, Rwampara et Mongbwalu jusqu\'aux zones du Nord-Kivu. À Butembo, 42 cas confirmés cumulés témoignent d\'une implantation durable du virus dans cette ville déjà éprouvée par l\'épidémie de 2018-2020.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-08', cc: 1792, sc: 227, cd: 625, sd: 60,
  headline: '625 décès confirmés : la flambée se consolide sur un front élargi',
  fact_text: 'Au 8 juillet, le bilan national atteint 1 792 cas confirmés et 625 décès. Les cas suspects reculent à 227 et les décès suspects à 60, sous l\'effet de reclassements côté source. Les zones de santé de Bunia, Rwampara et Mongbwalu restent les foyers principaux, tandis que la progression en Nord-Kivu continue sur plusieurs sites simultanément.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.'
}));

events.push(natRow({
  date: '2026-07-09', cc: 1830, sc: 284, cd: 648, sd: 81,
  headline: '1 830 cas confirmés : la transmission reste active de Bunia à Butembo',
  fact_text: 'Au 9 juillet, le bilan s\'établit à 1 830 cas confirmés et 648 décès, avec 284 cas suspects et 81 décès suspects. La flambée occupe un corridor épidémique qui s\'étend du nord de l\'Ituri jusqu\'au Nord-Kivu, où les foyers de Nizi, Katwa et Butembo progressent sans relâche.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-10', cc: 1873, sc: 299, cd: 672, sd: 91,
  headline: '672 décès confirmés : l\'épidémie s\'étend sur un front de plus de 500 km',
  fact_text: 'Au 10 juillet, la RDC compte 1 873 cas confirmés et 672 décès, avec 299 cas suspects et 91 décès suspects. La géographie de l\'épidémie s\'est durablement installée sur deux provinces : l\'Ituri concentre les principaux épicentres, mais le Nord-Kivu avec ses zones de Nizi (110 cas), Katwa et Butembo maintient une pression parallèle sur le système de santé.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

events.push(natRow({
  date: '2026-07-11', cc: 1926, sc: 299, cd: 702, sd: 91,
  headline: '700 décès confirmés : un cap tragique pour les zones de santé de l\'est',
  fact_text: 'Le 11 juillet, la RDC franchit le seuil des 700 décès confirmés avec 1 926 cas et 702 décès. Ce cap s\'inscrit dans une progression régulière depuis la mi-mai et traduit le coût humain d\'une épidémie qui s\'est étendue sur un vaste territoire couvrant l\'Ituri et le Nord-Kivu. La plupart des zones de santé actives enregistrent encore des cas chaque semaine.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires.'
}));

// SD vide (ND) pour les dates suivantes
events.push(natRow({
  date: '2026-07-13', cc: 2011, sc: 268, cd: 754, sd: undefined,
  headline: '2 011 cas confirmés : le cap des 2 000 est franchi sur un front élargi',
  fact_text: 'Le 13 juillet, la flambée dépasse pour la première fois les 2 000 cas confirmés avec 2 011 cas et 754 décès, le 12 juillet n\'ayant pas été publié par la source. Les zones de santé de Bunia (534 cas), Rwampara (405) et Mongbwalu (336) restent les épicentres principaux, mais Nizi (131) et Katwa (76) en Nord-Kivu attestent d\'une extension durable vers le sud.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; jour(s) entre le 2026-07-11 et le 2026-07-13 non publie(s) par la source (cadence SitRep); baisse de cas suspects liee a revision/reclassement ou changement de definition cote source; deces suspects non communique(s) (ND).'
}));

events.push(natRow({
  date: '2026-07-15', cc: 2124, sc: 389, cd: 828, sd: undefined,
  headline: '2 124 cas confirmés et 828 décès : l\'extension géographique se confirme',
  fact_text: 'Au 15 juillet, le bilan national atteint 2 124 cas confirmés et 828 décès, le 14 juillet n\'ayant pas été publié. La flambée touche plusieurs dizaines de zones de santé. Katwa (76 cas) et Lita (59) illustrent l\'élargissement du front épidémique au-delà des trois épicentres historiques de l\'Ituri.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; jour(s) entre le 2026-07-13 et le 2026-07-15 non publie(s) par la source (cadence SitRep); deces suspects non communique(s) (ND).'
}));

events.push(natRow({
  date: '2026-07-17', cc: 2267, sc: 236, cd: 893, sd: undefined,
  headline: 'L\'épidémie dépasse 2 200 cas et approche des 900 décès confirmés',
  fact_text: 'Au 17 juillet, la RDC compte 2 267 cas confirmés et 893 décès, le 16 juillet n\'ayant pas été publié. Les cas suspects baissent à 236 sous l\'effet de reclassements côté source. La progression reste rapide, avec 143 nouveaux cas confirmés en deux jours. Le front épidémique va de Bunia, au cœur de l\'Ituri, jusqu\'aux zones de Katwa et Butembo au Nord-Kivu.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; jour(s) entre le 2026-07-15 et le 2026-07-17 non publie(s) par la source (cadence SitRep); baisse de cas suspects liee a revision/reclassement ou changement de definition cote source; deces suspects non communique(s) (ND).'
}));

events.push(natRow({
  date: '2026-07-18', cc: 2344, sc: 192, cd: 930, sd: undefined,
  headline: '930 décès confirmés : la deuxième quinzaine de juillet sous forte pression épidémique',
  fact_text: 'Le 18 juillet, le bilan national atteint 2 344 cas confirmés et 930 décès confirmés. Les cas suspects chutent à 192 en raison de reclassements côté source. Avec 77 nouveaux cas confirmés dans la journée, la flambée reste ascendante en Ituri et au Nord-Kivu, où les zones de Nizi, Katwa et Butembo concentrent l\'essentiel des foyers actifs du front méridional.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source; deces suspects non communique(s) (ND).'
}));

events.push(natRow({
  date: '2026-07-19', cc: 2423, sc: 252, cd: 967, sd: undefined,
  headline: '967 décès confirmés : la flambée approche du millier de morts',
  fact_text: 'Au 19 juillet, la RDC compte 2 423 cas confirmés et 967 décès. L\'épidémie poursuit sa progression dans les deux provinces les plus touchées : l\'Ituri — avec Bunia à 639 cas, Rwampara à 457 et Mongbwalu à 364 — et le Nord-Kivu, où Nizi (214 cas) et Katwa (108) ont considérablement alourdi le bilan depuis le début du mois.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; deces suspects non communique(s) (ND).'
}));

events.push(natRow({
  date: '2026-07-20', cc: 2473, sc: 322, cd: 999, sd: undefined,
  headline: '999 décès confirmés : à la veille du millier, l\'Ituri et le Nord-Kivu restent en première ligne',
  fact_text: 'Le 20 juillet, le bilan national atteint 2 473 cas confirmés et 999 décès confirmés. La flambée est à un décès du cap symbolique du millier. La répartition géographique reflète six semaines de propagation soutenue : Bunia (657 cas), Rwampara (457) et Mongbwalu (364) dominent en Ituri, tandis que Nizi (223), Katwa (108), Nyankunde (99) et Butembo (61) confirment la profondeur du front Nord-Kivu.',
  note: 'Bilan national INRB-UMIE/INSP; snapshot 6925986 du 2026-07-24; donnees preliminaires; deces suspects non communique(s) (ND).'
}));

// ─────────────────────────────────────────────
// Events géographiques (places.csv uniquement)
// ─────────────────────────────────────────────

events.push(geoRow({
  event_id: 'ev_20260620_butembo_nordkivu',
  date: '2026-06-20',
  place_id: 'butembo',
  headline: 'Butembo et Katwa s\'installent dans la carte de l\'épidémie en Nord-Kivu',
  fact_text: 'Au lendemain du franchissement des 1 000 cas confirmés, la ventilation géographique révèle que le Nord-Kivu n\'est plus une extension marginale : Katwa enregistre 28 cas confirmés cumulés et Butembo 27, soit plus de 55 cas dans l\'aire urbaine de Butembo. Pour une ville déjà profondément marquée par l\'épidémie de 2018-2020, cette réapparition du virus représente une menace que la mémoire de la précédente crise rend particulièrement anxiogène.',
  cc: 27,
  note: 'Ventilation par zone de sante INRB-UMIE/INSP au 20 juin; Butembo 27 cas confirmes cumulatifs; Katwa 28; ancre Butembo pour la carte.'
}));

events.push(geoRow({
  event_id: 'ev_20260625_katwa_nordkivu',
  date: '2026-06-25',
  place_id: 'katwa',
  headline: 'Katwa dépasse 35 cas confirmés : le Nord-Kivu s\'affirme comme second front',
  fact_text: 'Au 25 juin, la zone de santé de Katwa (35 cas confirmés) et Butembo (33 cas) cumulent près de 70 cas dans l\'agglomération nord-kivutienne, auxquels s\'ajoutent 22 cas à Beni et 32 dans la zone de Nizi. Ce cluster urbain — à des centaines de kilomètres de l\'épicentre iturien — témoigne d\'une propagation qui ne se limite plus à l\'Ituri. La riposte doit désormais gérer deux théâtres simultanément, avec des contraintes logistiques très différentes.',
  cc: 35,
  note: 'Ventilation par zone de sante INRB-UMIE/INSP au 25 juin; Katwa 35 cas confirmes; Butembo 33; Beni 22; Nizi 32.'
}));

events.push(geoRow({
  event_id: 'ev_20260707_butembo_sixweeks',
  date: '2026-07-07',
  place_id: 'butembo',
  headline: 'Butembo à 42 cas confirmés : six semaines d\'épidémie dans la capitale du Nord-Kivu',
  fact_text: 'Au 7 juillet, Butembo enregistre 42 cas confirmés cumulés, Katwa 61 et Nizi — zone de santé adossée à l\'axe Butembo-Beni — 94. Ces chiffres confirment que le Nord-Kivu est devenu un foyer autonome, géographiquement distant mais épidémiologiquement actif. Butembo, ville de plus d\'un million d\'habitants aux carrefours commerciaux du Kivu, avait concentré une part importante de l\'épidémie de 2018-2020 : la réapparition du virus sur ce même territoire six ans plus tard pèse sur la mémoire collective et la confiance dans la riposte.',
  cc: 42,
  note: 'Ventilation par zone de sante INRB-UMIE/INSP au 7 juillet; Butembo 42 cas confirmes cumulatifs; Katwa 61; Nizi 94.'
}));

events.push(geoRow({
  event_id: 'ev_20260713_fataki_ituri_nord',
  date: '2026-07-13',
  place_id: 'fataki',
  headline: 'Fataki : 5 cas confirmés dans le nord de l\'Ituri, un front qui s\'élargit',
  fact_text: 'Au 13 juillet, la zone de santé de Fataki enregistre 5 cas confirmés, dans le nord de l\'Ituri à environ 130 km au nord-est de Bunia. Cette implantation, modeste en chiffres absolus, marque l\'extension de l\'épidémie vers une zone plus retirée à proximité des axes reliant l\'Ituri à la province du Haut-Uélé. Elle s\'ajoute aux cas d\'Aru (3 cas) au nord-ouest et de Nizi (131) au sud pour dessiner un front iturien plus large que le seul triangle initial.',
  cc: 5,
  note: 'Ventilation par zone de sante INRB-UMIE/INSP au 13 juillet; Fataki 5 cas confirmes cumulatifs.'
}));

events.push(geoRow({
  event_id: 'ev_20260720_katwa_nordkivu_surge',
  date: '2026-07-20',
  place_id: 'katwa',
  headline: 'Katwa dépasse 100 cas confirmés : le Nord-Kivu s\'impose comme deuxième foyer',
  fact_text: 'Le 20 juillet, Katwa atteint 108 cas confirmés, devenant la quatrième zone de santé la plus touchée de l\'épidémie, derrière les trois épicentres historiques de l\'Ituri. Avec Butembo (61 cas), Nizi (223) et Beni (37), la province du Nord-Kivu cumule plus de 430 cas confirmés, soit près d\'un sixième du total national. Ce bilan souligne que l\'épidémie a quitté son berceau iturien pour s\'installer durablement dans les agglomérations du Nord-Kivu.',
  cc: 108,
  note: 'Ventilation par zone de sante INRB-UMIE/INSP au 20 juillet; Katwa 108 cas confirmes; Butembo 61; Nizi 223; Beni 37.'
}));

// Écriture
const lines = events.join('');
appendFileSync(OUT, lines, 'utf8');
console.log(`Appended ${events.length} events to ${OUT}`);
