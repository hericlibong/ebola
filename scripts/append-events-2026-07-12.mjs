// Script d'ajout des events du 2026-07-12
// Run: node scripts/append-events-2026-07-12.mjs

import { readFileSync, writeFileSync } from 'fs';

const EVENTS_PATH = 'public/data/reference/events.csv';
const SOURCE_ID = 'inrb_umie_2026_07_12_snapshot';

// Helper: quote a CSV field if it contains comma, quote, or newline
function q(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function row(fields) {
  return fields.map(q).join(',');
}

// Columns: event_id,date,date_end,place_id,event_type,headline,fact_text,quote,
//          confirmed_cases,suspected_cases,confirmed_deaths,suspected_deaths,contacts,
//          source_id,source_type,confidence,data_status,display_priority,display_tier,
//          map_layer,timeline_group,update_status,notes

function national(date, yyyymmdd, headline, fact, cc, sc, cd, sd, notes) {
  return row([
    `ev_${yyyymmdd}_inrb_umie_update`, date, '', 'drc_total', 'situation_update',
    headline, fact, '',
    cc, sc, cd, sd, '',
    SOURCE_ID, 'official', 'high', 'provisional', '1', 'secondary',
    'clinical', 'response_breakdown', 'active', notes
  ]);
}

function geo(eventId, date, placeId, headline, fact, cc, notes) {
  return row([
    eventId, date, '', placeId, 'situation_update',
    headline, fact, '',
    cc, '', '', '', '',
    SOURCE_ID, 'official', 'high', 'provisional', '2', 'secondary',
    'clinical', 'regional_spread', 'active', notes
  ]);
}

const BASE = `Bilan national INRB-UMIE/INSP; snapshot c76ad77 du 2026-07-12; donnees preliminaires`;
const N = BASE + '.';
const N_SD = BASE + '; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.';
const N_SC_SD = BASE + '; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.';
const N_SC = BASE + '; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.';
const N_GAP2527 = BASE + '; jour(s) entre le 2026-06-25 et le 2026-06-27 non publie(s) par la source (cadence SitRep); baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.';
const N_GAP2729 = BASE + '; jour(s) entre le 2026-06-27 et le 2026-06-29 non publie(s) par la source (cadence SitRep).';

const lines = [

  // ── National events ──────────────────────────────────────────────────────────

  national('2026-06-19', '20260619',
    `956 cas confirmés : la flambée se maintient à haut régime`,
    `Au 19 juin, le bilan national atteint 956 cas confirmés et 247 décès confirmés. Les cas suspects reculent à 162 et les décès suspects à 47 — un reclassement côté source, pas un recul de la transmission. L'épidémie reste portée par les foyers de l'Ituri et du Nord-Kivu.`,
    '956', '162', '247', '47', N_SC_SD),

  national('2026-06-20', '20260620',
    `La barre des 1 000 cas confirmés est franchie`,
    `Le 20 juin, le bilan national dépasse pour la première fois le millier de cas confirmés, à 1 003, avec 254 décès confirmés. Ce seuil illustre l'ampleur d'une flambée installée depuis deux mois : l'Ituri concentre les épicentres historiques, le Nord-Kivu ancre un second front persistant.`,
    '1003', '201', '254', '30', N_SD),

  national('2026-06-21', '20260621',
    `1 048 confirmés : la progression ne marque aucune pause`,
    `Au 21 juin, le total national atteint 1 048 cas confirmés et 267 décès confirmés. La hausse quotidienne tourne autour d'une quarantaine de cas — un rythme soutenu, maintenu sur plusieurs semaines, qui traduit une transmission persistante sans signe de rupture de tendance.`,
    '1048', '202', '267', '60', N),

  national('2026-06-22', '20260622',
    `1 094 confirmés, les suspects s'effondrent : reclassement massif`,
    `Au 22 juin, le bilan atteint 1 094 cas confirmés et 277 décès confirmés. Les cas suspects chutent à 131 et les décès suspects à 44 : cette correction abrupte est un effet de reclassement côté source — une partie des suspects bascule en confirmés ou sort des critères — et non un ralentissement réel de la transmission.`,
    '1094', '131', '277', '44', N_SC_SD),

  national('2026-06-23', '20260623',
    `1 118 confirmés, 291 décès : la flambée reste en plateau haut`,
    `Au 23 juin, le bilan national s'élève à 1 118 cas confirmés et 291 décès confirmés. La progression quotidienne, plus modeste que les jours précédents, ne signale pas un vrai ralentissement : l'épidémie reste active dans les épicentres iturien et dans les foyers nord-kivutiens.`,
    '1118', '138', '291', '45', N),

  national('2026-06-24', '20260624',
    `Le seuil des 300 décès confirmés est franchi`,
    `Au 24 juin, les décès confirmés dépassent la barre des 300, à 304, tandis que les cas confirmés s'élèvent à 1 155. Avec 40 décès suspects encore en attente de reclassement, la mortalité totale depuis le début de la flambée est vraisemblablement supérieure à ce que reflète seul le décompte des confirmés.`,
    '1155', '154', '304', '40', N_SD),

  national('2026-06-25', '20260625',
    `1 203 confirmés, 321 décès : l'épidémie accélère en fin de semaine`,
    `Au 25 juin, le bilan national franchit 1 200 cas confirmés et 321 décès confirmés. Les cas suspects rebondissent à 265 et les décès suspects à 77, après plusieurs jours de corrections à la baisse. La dynamique reste ascendante dans les foyers de l'Ituri et du Nord-Kivu.`,
    '1203', '265', '321', '77', N),

  national('2026-06-27', '20260627',
    `1 274 confirmés, 360 décès : la semaine s'achève sans rupture`,
    `Le sitrep du 27 juin — le 26 n'ayant pas été publié par la source — porte le bilan à 1 274 cas confirmés et 360 décès confirmés. En deux jours, plus de 70 nouvelles confirmations de cas et environ 40 décès supplémentaires. L'épidémie maintient un régime élevé sur un territoire allant de l'Ituri jusqu'aux grandes villes du Nord-Kivu.`,
    '1274', '239', '360', '70', N_GAP2527),

  national('2026-06-29', '20260629',
    `399 décès confirmés : le bilan de fin juin approche les 400`,
    `Le sitrep du 29 juin — le 28 n'ayant pas été publié par la source — porte le bilan à 1 333 cas confirmés et 399 décès confirmés. En deux jours, près de 60 nouvelles confirmations de cas. La flambée a traversé tout le mois de juin sans aucune rupture de tendance visible.`,
    '1333', '309', '399', '90', N_GAP2729),

  national('2026-06-30', '20260630',
    `Fin juin : 1 406 confirmés, le virus n'a pas marqué de pause`,
    `En clôture de juin, le bilan national s'établit à 1 406 cas confirmés et 438 décès confirmés — près de 500 cas de plus qu'en début du mois. Les cas suspects remontent à 301 et les décès suspects à 90. La flambée couvre plusieurs dizaines de zones de santé en Ituri et au Nord-Kivu.`,
    '1406', '301', '438', '90', N_SC),

  national('2026-07-01', '20260701',
    `Début juillet : 1 460 confirmés, la dynamique ne fléchit pas`,
    `Au 1er juillet, le bilan national atteint 1 460 cas confirmés et 452 décès confirmés. Les cas suspects chutent à 150, signe d'un reclassement côté source. La flambée franchit le cap symbolique des deux mois depuis la déclaration officielle du 15 mai, sans aucun signal d'atténuation.`,
    '1460', '150', '452', '41', N_SC_SD),

  national('2026-07-02', '20260702',
    `La barre des 1 500 cas confirmés est franchie`,
    `Le 2 juillet, le total national dépasse 1 500 cas confirmés, à 1 502, avec 473 décès confirmés. Cette progression régulière sur plusieurs semaines confirme que la riposte n'a pas encore réussi à casser la courbe épidémique, malgré les moyens déployés en Ituri et dans les zones du Nord-Kivu.`,
    '1502', '213', '473', '63', N),

  national('2026-07-03', '20260703',
    `1 528 confirmés : les 500 décès se profilent à l'horizon`,
    `Au 3 juillet, le bilan grimpe à 1 528 cas confirmés et 492 décès confirmés — le seuil des 500 décès est imminent. Les cas suspects reculent à 185, dans une dynamique de reclassement désormais habituelle, tandis que la série reste qualifiée de préliminaire.`,
    '1528', '185', '492', '67', N_SC),

  national('2026-07-04', '20260704',
    `500 décès confirmés : un bilan qui pèse sur la riposte`,
    `Au 4 juillet, le bilan national franchit le cap des 500 décès confirmés, à 506. Les cas confirmés atteignent 1 561. Les cas suspects rebondissent fortement à 354 et les décès suspects à 110, reflétant une accélération des déclarations dans un contexte de transmission active de l'Ituri jusqu'au Nord-Kivu.`,
    '1561', '354', '506', '110', N),

  national('2026-07-05', '20260705',
    `1 624 confirmés : plus de 60 nouvelles confirmations en une journée`,
    `Au 5 juillet, le bilan atteint 1 624 cas confirmés et 521 décès confirmés — 63 nouvelles confirmations en une seule journée, parmi les hausses les plus importantes depuis le début de la flambée. Les suspects s'effondrent à 135 et les décès suspects à 23 : un reclassement massif fait basculer une partie de l'arriéré vers la colonne des confirmés.`,
    '1624', '135', '521', '23', N_SC_SD),

  national('2026-07-06', '20260706',
    `1 708 confirmés, 580 décès : la journée du 6 juillet aggrave le bilan`,
    `Au 6 juillet, 84 nouvelles confirmations en une seule journée font grimper le total national à 1 708 cas confirmés et 580 décès confirmés. Cette pointe reflète en partie le rattrapage de données tardives depuis des zones reculées, mais confirme aussi une transmission persistante dans l'ensemble des foyers — de l'Ituri aux provinces voisines.`,
    '1708', '237', '580', '70', N),

  national('2026-07-07', '20260707',
    `Le cap des 600 décès confirmés est franchi`,
    `Le 7 juillet marque le passage à 600 décès confirmés. Le bilan national atteint 1 759 cas confirmés. Cette progression — de 247 décès confirmés au 19 juin à 600 décès trois semaines plus tard — illustre l'ampleur et la durée d'une flambée qui ne fléchit pas depuis la déclaration d'urgence internationale mi-mai.`,
    '1759', '304', '600', '92', N),

  national('2026-07-08', '20260708',
    `1 792 confirmés, 625 décès : le bilan s'alourdit semaine après semaine`,
    `Au 8 juillet, le bilan national porte à 1 792 cas confirmés et 625 décès confirmés. La hausse reste soutenue — plus de 30 nouvelles confirmations quotidiennes dans la dernière semaine. L'épidémie s'étend sur des dizaines de zones de santé en Ituri et au Nord-Kivu, certaines zones iituriennes secondaires montrant des signes d'accélération marqués.`,
    '1792', '227', '625', '60', N_SC_SD),

  // ── Geographic events ────────────────────────────────────────────────────────

  geo('ev_20260620_nordkivu_spread', '2026-06-20', 'katwa',
    `Le Nord-Kivu gagne de nouvelles zones : Miti-Murhesa, Mabalako, Musienene`,
    `La ventilation par zones de santé au 20 juin révèle que l'épidémie déborde les premiers foyers nord-kivutiens. Katwa cumule 28 cas confirmés, Butembo 27 et Beni 17. Fait nouveau : quatre zones jusqu'alors absentes du décompte — Miti-Murhesa, Mabalako, Vuhovi, Musienene — signalent leurs premiers cas, densifiant la carte du Nord-Kivu au-delà des seuls pôles urbains initiaux.`,
    '28',
    `Ventilation par zone de sante INRB-UMIE au 20 juin; Katwa 28 cas confirmes; nouvelles zones Nord-Kivu: Miti-Murhesa 3, Mabalako 1, Vuhovi 1, Musienene 1; ancre Katwa pour la carte.`),

  geo('ev_20260625_mongbwalu_deadliest', '2026-06-25', 'mongbwalu',
    `Mongbwalu : 250 cas et 109 décès, la zone la plus meurtrière de la flambée`,
    `Au 25 juin, Mongbwalu cumule 250 cas confirmés et 109 décès — le bilan le plus lourd de toutes les zones de santé touchées. L'épicentre iturien historique, lieu du premier signal épidémique début mai, reste aussi le foyer le plus meurtrier : la létalité confirmée y dépasse 40 %, probablement liée à la détection tardive et aux tensions qui ont entravé la riposte dans cette zone minière très mobile.`,
    '250',
    `Ventilation par zone de sante INRB-UMIE au 25 juin; Mongbwalu 250 cas confirmes; 109 deces confirmes (zone la plus meurtriere); letalite superieure a 40%.`),

  geo('ev_20260630_ituri_south_spread', '2026-06-30', 'nyankunde',
    `Nyankunde, Mandima, Lolwa : l'Ituri méridionale entre dans la flambée`,
    `La ventilation du 30 juin révèle 95 cas confirmés à Nyankunde, exposée dès les premières semaines. Deux nouvelles zones font leur apparition dans le décompte : Mandima et Lolwa, en Ituri méridionale. Ce mouvement d'extension au-delà du triangle initial Bunia-Rwampara-Mongbwalu confirme que la surveillance doit couvrir un territoire de plus en plus fragmenté.`,
    '95',
    `Ventilation par zone de sante INRB-UMIE au 30 juin; Nyankunde 95 cas confirmes; nouvelles zones Ituri meridionale: Mandima 2, Lolwa 1; ancre Nyankunde pour la carte.`),

  geo('ev_20260704_nordkivu_second_front', '2026-07-04', 'butembo',
    `Nord-Kivu : Katwa et Butembo ancrent un second front durable`,
    `À la date du 4 juillet, les zones de santé du Nord-Kivu consolident leur présence dans le bilan : Katwa cumule 52 cas confirmés et 38 décès, Butembo 40 cas et 18 décès, Beni 29 cas et 17 décès. Ce second front méridional, séparé de l'épicentre iturien par des centaines de kilomètres mais relié à lui par des axes routiers fréquentés, s'installe dans la durée dans une région déjà éprouvée par l'épidémie de 2018-2020.`,
    '40',
    `Ventilation par zone de sante INRB-UMIE au 4 juillet; Katwa 52 cas confirmes, 38 deces; Butembo 40 cas, 18 deces; Beni 29 cas, 17 deces; ancre Butembo pour la carte.`),

  geo('ev_20260708_ituri_second_ring', '2026-07-08', 'fataki',
    `Nizi, Nia-Nia, Mangala : la seconde couronne iturienne s'embrase`,
    `La ventilation du 8 juillet révèle une accélération marquée dans les zones secondaires de l'Ituri. Nizi atteint 104 cas confirmés — pratiquement doublé depuis fin juin —, Nia-Nia 35 cas et Mangala 43. Ces zones, situées dans la seconde couronne autour des épicentres de Bunia et Mongbwalu, montrent que la transmission s'installe progressivement dans des secteurs ruraux où les capacités de diagnostic et de suivi des contacts restent limitées.`,
    '4',
    `Ventilation par zone de sante INRB-UMIE au 8 juillet; Nizi 104 cas confirmes (+43 depuis le 30 juin), Nia-Nia 35, Mangala 43; Boga apparait pour la premiere fois (1 cas); ancre Fataki (4 cas) comme proxy Ituri secondaire nord.`),

];

// Append to events.csv
const current = readFileSync(EVENTS_PATH, 'utf8');
const withNewline = current.endsWith('\n') ? current : current + '\n';
const newContent = withNewline + lines.join('\n') + '\n';

writeFileSync(EVENTS_PATH, newContent, 'utf8');
console.log(`Appended ${lines.length} events to ${EVENTS_PATH}`);
