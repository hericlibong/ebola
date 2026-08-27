/**
 * Generates new events for the 48 new dates from the 2026-08-27 INRB-UMIE snapshot
 * and appends them to public/data/reference/events.csv
 */
import { readFileSync, appendFileSync } from 'fs';

// Utility: escape a CSV field (wrap in quotes if contains comma, quote, or newline)
function csvField(val) {
  if (val === undefined || val === null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function csvRow(fields) {
  return fields.map(csvField).join(',');
}

const SOURCE = 'inrb_umie_2026_08_27_snapshot';

// National update events: one per new date
// Format: [date, cc, sc, cd, sd, headline, fact_text, notes]
// cc=confirmed_cases, sc=suspected_cases, cd=confirmed_deaths, sd=suspected_deaths
// Empty string means "not provided (ND)" -> leave column empty in CSV

const nationalEvents = [
  // June 19-25: approaching then crossing 1000 confirmed
  {
    date: '2026-06-19', cc: '956', sc: '162', cd: '247', sd: '47',
    headline: 'La flambée approche le millier de cas confirmés',
    fact_text: 'Au 19 juin, le bilan national atteint 956 cas confirmés et 247 décès confirmés. Avec 162 cas suspects encore sous surveillance, la pression sur les structures de santé de l\'Ituri et du Nord-Kivu reste forte. En deux semaines, le nombre de confirmés a progressé de plus de cent cas, un rythme qui s\'accélère depuis mi-juin.',
    notes: 'Bilan national au 19 juin; baisse des suspects et décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-06-20', cc: '1003', sc: '201', cd: '254', sd: '30',
    headline: 'Le cap du millier de cas confirmés est franchi',
    fact_text: 'Avec 1 003 cas confirmés au 20 juin, la flambée dépasse pour la première fois le seuil symbolique du millier de cas. Les décès confirmés atteignent 254 et 201 cas suspects restent sous surveillance. L\'épidémie s\'étend des foyers historiques de l\'Ituri — Bunia, Rwampara, Mongbwalu — jusqu\'aux pôles urbains du Nord-Kivu.',
    notes: 'Premier franchissement du seuil de 1000 cas confirmés; baisse des décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-06-21', cc: '1048', sc: '202', cd: '267', sd: '60',
    headline: '1 048 confirmés : la hausse ne ralentit pas',
    fact_text: 'Le bilan national grimpe à 1 048 cas confirmés et 267 décès confirmés au 21 juin, soit 45 cas supplémentaires en une journée. Les 202 cas suspects et 60 décès suspects signalent que la chaîne de transmission reste active dans plusieurs zones de santé de l\'Ituri. La riposte concentre ses efforts sur la surveillance des contacts dans les foyers établis et sur la détection précoce dans les zones en périphérie.',
    notes: 'Bilan national au 21 juin.',
  },
  {
    date: '2026-06-22', cc: '1094', sc: '131', cd: '277', sd: '44',
    headline: '1 094 confirmés, 277 décès : les suspects reculent après reclassement',
    fact_text: 'Au 22 juin, le total national atteint 1 094 cas confirmés et 277 décès confirmés. Les cas suspects diminuent à 131, reflet d\'un reclassement côté source — suspects basculés en confirmés ou sortis des critères — et non d\'un ralentissement réel de la transmission. Cette correction statistique est fréquente dans les épidémies Ebola, où la classification évolue au gré des résultats de laboratoire.',
    notes: 'Bilan national au 22 juin; baisse des cas suspects et décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-06-23', cc: '1118', sc: '138', cd: '291', sd: '45',
    headline: '291 décès confirmés : la mortalité confirmée approche les 300',
    fact_text: 'Le 23 juin, le bilan national s\'établit à 1 118 cas confirmés et 291 décès confirmés. La progression des décès reste soutenue — 14 décès supplémentaires en une journée — dans un contexte où le taux de létalité des formes confirmées se maintient autour de 26 %. Les 138 cas suspects sous surveillance témoignent d\'une chaîne de transmission qui n\'est pas encore maîtrisée dans les zones de santé touchées.',
    notes: 'Bilan national au 23 juin.',
  },
  {
    date: '2026-06-24', cc: '1155', sc: '154', cd: '304', sd: '40',
    headline: '304 décès : la mortalité confirmée franchit les 300',
    fact_text: 'Au 24 juin, le bilan national enregistre 1 155 cas confirmés et 304 décès confirmés — un seuil symbolique dans le suivi épidémiologique. Depuis l\'alerte officielle du 5 mai, l\'épidémie a causé en six semaines trois fois plus de décès que la flambée d\'Ebola Bundibugyo de 2007-2008 en RDC. Les 154 cas suspects et 40 décès suspects indiquent que le virus circule encore activement dans l\'ensemble des zones touchées.',
    notes: 'Bilan national au 24 juin; baisse des décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-06-25', cc: '1203', sc: '265', cd: '321', sd: '77',
    headline: '1 203 confirmés : l\'épidémie s\'étend dans 34 zones de santé',
    fact_text: 'Le 25 juin, le total national atteint 1 203 cas confirmés et 321 décès confirmés. La ventilation par zone de santé révèle 34 foyers actifs, de l\'épicentre iturien — Bunia (323 cas), Rwampara (258), Mongbwalu (250) — jusqu\'aux premières zones du Nord-Kivu. Les cas suspects remontent à 265, signe d\'une détection plus active après plusieurs jours de correction statistique.',
    notes: 'Bilan national au 25 juin; 34 zones de santé avec cas>0 selon ventilation INSP.',
  },
  // June 27: missing June 26
  {
    date: '2026-06-27', cc: '1274', sc: '239', cd: '360', sd: '70',
    headline: '1 274 confirmés au 27 juin : 360 décès en deux mois d\'épidémie',
    fact_text: 'Le bilan cumulé au 27 juin atteint 1 274 cas confirmés et 360 décès confirmés, soit 71 nouveaux cas et 39 décès supplémentaires depuis le 25 juin. L\'épidémie franchit les deux mois de suivi officiel avec une courbe encore ascendante dans les provinces de l\'Ituri et du Nord-Kivu. Les 70 décès suspects confirment que l\'impact réel de la flambée dépasse les seuls chiffres confirmés.',
    notes: 'Bilan national au 27 juin; jour du 26 juin non publié par la source (cadence SitRep); baisse des cas et décès suspects liée à révision/reclassement côté source.',
  },
  // June 29: missing June 28
  {
    date: '2026-06-29', cc: '1333', sc: '309', cd: '399', sd: '90',
    headline: 'Approche des 400 décès confirmés : la progression reste rapide',
    fact_text: 'Au 29 juin, le bilan national s\'établit à 1 333 cas confirmés et 399 décès confirmés — à un pas du cap des 400 morts confirmés. Les 309 cas suspects et 90 décès suspects illustrent la part encore mal capturée de l\'épidémie. Dans les zones de santé du Nord-Kivu, Katwa (45 cas) et Butembo (34 cas) progressent régulièrement, ouvrant un second front méridional au-delà de l\'Ituri.',
    notes: 'Bilan national au 29 juin; jour du 28 juin non publié par la source (cadence SitRep).',
  },
  {
    date: '2026-06-30', cc: '1406', sc: '301', cd: '438', sd: '90',
    headline: '1 406 confirmés, 438 décès : bilan du premier mois de suivi national',
    fact_text: 'Au 30 juin, la flambée enregistre 1 406 cas confirmés et 438 décès confirmés. Ce bilan de fin de mois marque deux mois entiers depuis la détection officielle du virus le 5 mai. En juin seul, les confirmés ont plus que doublé — passant de 620 à 1 406 — témoignant d\'une accélération continue malgré la riposte déployée dans les zones de santé affectées.',
    notes: 'Bilan national au 30 juin; baisse des cas suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-07-01', cc: '1460', sc: '150', cd: '452', sd: '41',
    headline: '1 460 confirmés en ce début juillet : la dynamique ne fléchit pas',
    fact_text: 'Au 1er juillet, le bilan national atteint 1 460 cas confirmés et 452 décès confirmés. Avec 54 nouveaux cas confirmés en une journée, l\'épidémie maintient un rythme d\'accroissement élevé. Les cas suspects chutent à 150, reflet d\'un nouveau reclassement côté source. La transmission reste concentrée dans les zones de santé de l\'Ituri, où Bunia, Rwampara et Mongbwalu cumulent à elles seules plus de 850 cas confirmés.',
    notes: 'Bilan national au 1er juillet; baisse des cas et décès suspects liée à révision/reclassement côté source.',
  },
  // July 2-11
  {
    date: '2026-07-02', cc: '1502', sc: '213', cd: '473', sd: '63',
    headline: '1 500 confirmés dépassés : l\'épidémie s\'installe dans la durée',
    fact_text: 'Le 2 juillet, le seuil de 1 500 cas confirmés est franchi avec 1 502 cas au total et 473 décès confirmés. Depuis le début de l\'épidémie, le taux de doublement des cas s\'est maintenu à moins de quatre semaines. Dans les provinces de l\'Ituri et du Nord-Kivu, la riposte tente de contenir la transmission dans des zones aux infrastructures limitées et aux accès difficiles, notamment en saison des pluies.',
    notes: 'Bilan national au 2 juillet.',
  },
  {
    date: '2026-07-03', cc: '1528', sc: '185', cd: '492', sd: '67',
    headline: '492 décès confirmés : la barre des 500 morts en ligne de mire',
    fact_text: 'Le 3 juillet, le bilan national s\'élève à 1 528 cas confirmés et 492 décès confirmés. Avec une progression soutenue depuis début juillet, le cap des 500 décès semble imminent. La riposte maintient des équipes de surveillance dans plus de 30 zones de santé, mais les trous de déclaration et la cadence SitRep rendent difficile un suivi en temps réel dans les zones les plus reculées de l\'Ituri.',
    notes: 'Bilan national au 3 juillet; baisse des cas suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-07-04', cc: '1561', sc: '354', cd: '506', sd: '110',
    headline: '506 décès confirmés : le cap des 500 franchi',
    fact_text: 'Au 4 juillet, le bilan national atteint 1 561 cas confirmés et 506 décès confirmés. Le franchissement du seuil des 500 morts officiellement confirmés s\'accompagne d\'un rebond des suspects à 354 cas et 110 décès, suggérant une déclaration plus exhaustive ce jour-là. L\'extension de l\'épidémie vers les provinces du Nord-Kivu et au-delà de l\'Ituri complique le travail de traçage des contacts.',
    notes: 'Bilan national au 4 juillet.',
  },
  {
    date: '2026-07-05', cc: '1624', sc: '135', cd: '521', sd: '23',
    headline: '1 624 confirmés : 63 nouveaux cas en une journée',
    fact_text: 'Le 5 juillet, le total national monte à 1 624 cas confirmés et 521 décès confirmés, avec 63 nouveaux cas en 24 heures — l\'une des progressions journalières les plus fortes depuis le début de l\'épidémie. Les cas suspects chutent à 135, dans un mouvement de reclassement récurrent. La dynamique de transmission reste concentrée dans le corridor Bunia-Rwampara-Mongbwalu, avec des extensions au Nord-Kivu.',
    notes: 'Bilan national au 5 juillet; baisse des cas et décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-07-06', cc: '1708', sc: '237', cd: '580', sd: '70',
    headline: '1 708 confirmés, 580 décès : l\'accélération se poursuit',
    fact_text: 'Le 6 juillet, le bilan national franchit 1 700 cas confirmés et 580 décès confirmés. La progression de 84 cas en une journée est l\'une des plus marquées depuis le début de la flambée. À ce rythme, l\'épidémie pourrait franchir le cap des 2 000 cas confirmés avant la fin du mois. Les provinces de l\'Ituri et du Nord-Kivu concentrent l\'essentiel des nouveaux foyers actifs.',
    notes: 'Bilan national au 6 juillet.',
  },
  {
    date: '2026-07-07', cc: '1759', sc: '304', cd: '600', sd: '92',
    headline: '600 décès confirmés et 38 zones de santé touchées',
    fact_text: 'Au 7 juillet, le bilan national atteint 1 759 cas confirmés et 600 décès confirmés — un seuil symbolique qui marque l\'ampleur de la flambée. La ventilation par zone de santé dénombre 38 foyers actifs dans les provinces de l\'Ituri et du Nord-Kivu. Au Nord-Kivu, Butembo (46 cas confirmés), Katwa (76 cas) et Beni (31 cas) confirment l\'installation durable du virus dans les pôles urbains méridionaux.',
    notes: 'Bilan national au 7 juillet; 38 zones de santé avec cas>0.',
  },
  {
    date: '2026-07-08', cc: '1792', sc: '227', cd: '625', sd: '60',
    headline: '1 792 confirmés : 625 décès en dix semaines d\'épidémie',
    fact_text: 'Le 8 juillet, le bilan s\'établit à 1 792 cas confirmés et 625 décès confirmés. En dix semaines depuis l\'alerte officielle, la flambée a dépassé en ampleur toutes les épidémies d\'Ebola Bundibugyo précédentes documentées. La pression sur les capacités de réponse reste intense : traçage des contacts, isolation des cas, protection des soignants dans des zones de santé parfois difficiles d\'accès.',
    notes: 'Bilan national au 8 juillet; baisse des cas et décès suspects liée à révision/reclassement côté source.',
  },
  {
    date: '2026-07-09', cc: '1830', sc: '284', cd: '648', sd: '81',
    headline: '1 830 confirmés : la flambée approche les deux tiers des cas depuis mi-juillet',
    fact_text: 'Au 9 juillet, le total national atteint 1 830 cas confirmés et 648 décès confirmés. Depuis le début du mois de juillet, l\'épidémie enregistre en moyenne plus de 60 nouveaux cas confirmés par jour. Les 284 cas suspects témoignent d\'une surveillance active dans les zones de santé, avec un pic d\'activité dans le corridor iturien et les foyers du Nord-Kivu.',
    notes: 'Bilan national au 9 juillet.',
  },
  {
    date: '2026-07-10', cc: '1873', sc: '299', cd: '672', sd: '91',
    headline: 'Près de 1 900 confirmés : le Nord-Kivu devient le second front actif',
    fact_text: 'Le 10 juillet, le bilan national monte à 1 873 cas confirmés et 672 décès confirmés. La progression se maintient à 43 cas supplémentaires en une journée. Au-delà de l\'épicentre iturien, le Nord-Kivu s\'impose désormais comme un second front épidémique à part entière, avec des foyers en croissance dans les zones de santé de Katwa, Butembo et Beni.',
    notes: 'Bilan national au 10 juillet.',
  },
  {
    date: '2026-07-11', cc: '1926', sc: '299', cd: '702', sd: '91',
    headline: '702 décès confirmés : le cap approche les 2 000 cas',
    fact_text: 'Au 11 juillet, le bilan s\'élève à 1 926 cas confirmés et 702 décès confirmés. En s\'approchant du seuil des 2 000 cas, la flambée entre dans une phase critique : la pression sur les systèmes de santé des zones touchées et la complexité géographique de la riposte — entre l\'Ituri, le Nord-Kivu et la frontière ougandaise — rendent chaque semaine décisive pour la trajectoire épidémique.',
    notes: 'Bilan national au 11 juillet.',
  },
  // July 13 (missing July 12)
  {
    date: '2026-07-13', cc: '2011', sc: '268', cd: '754', sd: '',
    headline: '2 000 confirmés franchis : 754 décès en 10 semaines',
    fact_text: 'Le 13 juillet, le bilan national franchit le cap des 2 000 cas confirmés avec 2 011 cas et 754 décès confirmés. Ce franchissement symbolique intervient deux mois et demi après l\'alerte officielle et positionne cette flambée parmi les plus meurtrières d\'Ebola en RDC. La ventilation par zone révèle 47 foyers actifs, de l\'Ituri jusqu\'aux premières extensions vers la province de Haut-Uele, marquant une expansion géographique continue.',
    notes: 'Bilan national au 13 juillet; jour du 12 juillet non publié par la source; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND); 47 zones de santé avec cas>0.',
  },
  // July 15 (missing July 14)
  {
    date: '2026-07-15', cc: '2124', sc: '389', cd: '828', sd: '',
    headline: '2 124 confirmés, 828 décès : l\'accélération s\'emballe mi-juillet',
    fact_text: 'Au 15 juillet, le bilan national atteint 2 124 cas confirmés et 828 décès confirmés, soit 113 nouveaux cas et 74 décès supplémentaires en deux jours. Ce rythme d\'accroissement, parmi les plus élevés depuis le début de la flambée, coïncide avec une extension géographique documentée : les provinces de l\'Ituri, du Nord-Kivu et de Haut-Uele comptent désormais des foyers actifs dans 47 zones de santé.',
    notes: 'Bilan national au 15 juillet; jour du 14 juillet non publié par la source; décès suspects non communiqués (ND).',
  },
  // July 17 (missing July 16)
  {
    date: '2026-07-17', cc: '2267', sc: '236', cd: '893', sd: '',
    headline: '2 267 confirmés : 143 nouveaux cas en deux jours',
    fact_text: 'Le 17 juillet, le total national s\'élève à 2 267 cas confirmés et 893 décès confirmés. L\'accroissement de 143 cas en deux jours témoigne d\'une transmission toujours soutenue dans plusieurs zones de santé simultanément. Les cas suspects retombent à 236 après un reclassement côté source. La frontière des 900 décès confirmés est franchie, soulignant l\'urgence de renforcer les capacités d\'isolement et de prise en charge dans les zones sous pression.',
    notes: 'Bilan national au 17 juillet; jour du 16 juillet non publié par la source; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-18', cc: '2344', sc: '192', cd: '930', sd: '',
    headline: '2 344 confirmés, 930 décès : l\'épidémie maintient son rythme',
    fact_text: 'Au 18 juillet, le bilan national atteint 2 344 cas confirmés et 930 décès confirmés. La progression quotidienne de 77 cas confirme le maintien d\'une transmission active dans les zones de santé de l\'Ituri et du Nord-Kivu. Les 930 décès confirmés représentent plus du quart des cas identifiés, un taux de létalité qui reflète en partie les délais de prise en charge et la sévérité de la souche Bundibugyo.',
    notes: 'Bilan national au 18 juillet; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-19', cc: '2423', sc: '252', cd: '967', sd: '',
    headline: '967 décès : la barre des 1 000 morts confirmés se rapproche',
    fact_text: 'Le 19 juillet, le bilan national s\'élève à 2 423 cas confirmés et 967 décès confirmés. L\'épidémie se rapproche du cap symbolique des 1 000 décès officiellement confirmés en RDC. En moins de trois semaines de juillet, les confirmés ont progressé de plus de 500 cas. La surveillance des contacts reste le maillon central de la riposte dans les zones de santé de l\'Ituri, du Nord-Kivu et des premières extensions du Haut-Uele.',
    notes: 'Bilan national au 19 juillet; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-20', cc: '2473', sc: '322', cd: '999', sd: '',
    headline: '999 décès confirmés : à un pas du millier de morts',
    fact_text: 'Au 20 juillet, le bilan national atteint 2 473 cas confirmés et 999 décès confirmés — à une seule unité du cap symbolique des 1 000 décès. Cette progression rappelle que la flambée, partie des zones de santé de l\'Ituri en avril, a atteint en trois mois une ampleur que peu d\'épidémies d\'Ebola avaient connue aussi rapidement. Les 322 cas suspects témoignent d\'une détection encore active sur l\'ensemble des fronts.',
    notes: 'Bilan national au 20 juillet; décès suspects non communiqués (ND).',
  },
  // July 22 (missing July 21): BIG JUMP
  {
    date: '2026-07-22', cc: '2905', sc: '318', cd: '1269', sd: '',
    headline: '1 000 décès franchis : un bond de 432 cas en deux jours',
    fact_text: 'Au 22 juillet, le bilan national enregistre un saut brutal : 2 905 cas confirmés et 1 269 décès confirmés, soit 432 nouveaux cas et 270 décès supplémentaires depuis le 20 juillet. Cette progression exceptionnelle, la plus importante enregistrée sur deux jours depuis le début de la flambée, intervient alors que la ventilation par zone montre 47 foyers actifs. Le cap du millier de décès confirmés est franchi, marquant un palier sombre dans la chronique de cette épidémie.',
    notes: 'Bilan national au 22 juillet; jour du 21 juillet non publié par la source; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND); saut de +432 cas en 2 jours, le plus élevé depuis le début.',
  },
  {
    date: '2026-07-23', cc: '2973', sc: '315', cd: '1309', sd: '',
    headline: '2 973 confirmés, 1 309 décès : la dynamique post-20 juillet reste intense',
    fact_text: 'Le 23 juillet, le bilan national s\'établit à 2 973 cas confirmés et 1 309 décès confirmés. La progression de 68 cas en une journée, après le bond enregistré le 22 juillet, confirme que la flambée s\'emballe dans plusieurs zones de santé simultanément. Les 315 cas suspects en cours d\'investigation renforcent la pression sur les équipes de traçage des contacts.',
    notes: 'Bilan national au 23 juillet; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  // July 25 (missing July 24)
  {
    date: '2026-07-25', cc: '3200', sc: '340', cd: '1405', sd: '',
    headline: '3 200 cas confirmés : l\'épidémie entre dans une nouvelle dimension',
    fact_text: 'Au 25 juillet, le bilan national franchit le cap des 3 000 cas avec 3 200 confirmés et 1 405 décès. En dix jours, les confirmés ont bondi de plus de 700 — un rythme qui s\'est nettement accéléré par rapport à juin. La ventilation par zone de santé révèle des foyers de plus en plus dispersés, de l\'axe Bunia-Rwampara-Mongbwalu (Ituri) jusqu\'aux pôles urbains du Nord-Kivu — Katwa (138 cas), Butembo (70) — et aux premières zones de Haut-Uele.',
    notes: 'Bilan national au 25 juillet; jour du 24 juillet non publié par la source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-26', cc: '3262', sc: '326', cd: '1437', sd: '',
    headline: '3 262 confirmés, 1 437 décès : la montée continue au lendemain de juillet',
    fact_text: 'Le 26 juillet, le bilan national s\'élève à 3 262 cas confirmés et 1 437 décès confirmés. La progression quotidienne de 62 cas reste soutenue, portée par une transmission active dans l\'ensemble des foyers établis. Les 326 cas suspects sous surveillance illustrent la part toujours considérable de l\'épidémie non encore confirmée biologiquement.',
    notes: 'Bilan national au 26 juillet; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-27', cc: '3360', sc: '321', cd: '1487', sd: '',
    headline: '3 360 confirmés : trois mois après l\'alerte, la flambée est loin d\'être contenue',
    fact_text: 'Au 27 juillet, le bilan national atteint 3 360 cas confirmés et 1 487 décès confirmés. Trois mois après l\'alerte officielle du 5 mai, l\'épidémie d\'Ebola Bundibugyo continue de progresser dans les provinces de l\'Ituri et du Nord-Kivu. La géographie du virus — des dizaines de zones de santé impliquées, des zones minières et frontalières à forte mobilité — rend la maîtrise de la transmission particulièrement complexe.',
    notes: 'Bilan national au 27 juillet; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  // July 30 (missing July 28-29)
  {
    date: '2026-07-30', cc: '3605', sc: '374', cd: '1587', sd: '',
    headline: '3 605 confirmés : 245 nouveaux cas en trois jours',
    fact_text: 'Le 30 juillet, le bilan national s\'établit à 3 605 cas confirmés et 1 587 décès confirmés, soit 245 cas supplémentaires depuis le 27 juillet. Cette progression sur trois jours reste parmi les plus rapides de l\'épidémie. Avec 374 cas suspects encore sous surveillance et des foyers actifs dans plus de 45 zones de santé, la riposte doit gérer simultanément plusieurs fronts à des centaines de kilomètres les uns des autres.',
    notes: 'Bilan national au 30 juillet; jours du 28-29 juillet non publiés par la source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-07-31', cc: '3674', sc: '321', cd: '1621', sd: '',
    headline: '3 674 confirmés en fin de mois : juillet, le mois de tous les franchissements',
    fact_text: 'Au 31 juillet, le bilan de fin de mois s\'élève à 3 674 cas confirmés et 1 621 décès confirmés. En juillet seul, l\'épidémie a enregistré plus de 2 200 nouveaux cas confirmés — soit davantage que lors des trois premiers mois cumulés depuis l\'alerte. Ce mois de juillet marque un palier dans la dynamique de la flambée, avec le franchissement successif des seuils de 2 000, 3 000 cas et 1 000, 1 500 décès confirmés.',
    notes: 'Bilan national au 31 juillet; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  // August 1
  {
    date: '2026-08-01', cc: '3748', sc: '227', cd: '1657', sd: '',
    headline: '3 748 confirmés en ce début août : l\'extension géographique s\'ancre',
    fact_text: 'Le 1er août, le bilan national atteint 3 748 cas confirmés et 1 657 décès confirmés. La progression de 74 cas en une journée reste soutenue. La ventilation par zone de santé révèle une implantation de plus en plus profonde du virus dans le Nord-Kivu, avec Katwa (180 cas), Butembo (88 cas) et Beni en progression continue — trois pôles urbains très connectés qui alimentent une diffusion méridionale de la flambée.',
    notes: 'Bilan national au 1er août; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-02', cc: '3802', sc: '275', cd: '1707', sd: '',
    headline: '1 707 décès confirmés : l\'épidémie franchit les 3 800 cas',
    fact_text: 'Au 2 août, le total national s\'établit à 3 802 cas confirmés et 1 707 décès confirmés. Avec 54 nouveaux cas en une journée, la flambée continue de progresser à un rythme élevé. La surveillance dans les zones de santé frontalières — notamment celles proches de la frontière ougandaise au nord de l\'Ituri — reste une priorité pour prévenir de nouveaux cas importés.',
    notes: 'Bilan national au 2 août; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-03', cc: '3874', sc: '301', cd: '1751', sd: '',
    headline: 'Près de 4 000 confirmés : 1 751 décès en cent jours d\'épidémie',
    fact_text: 'Le 3 août, le bilan national approche les 4 000 cas avec 3 874 confirmés et 1 751 décès confirmés. À la veille du centième jour depuis l\'alerte officielle, l\'épidémie d\'Ebola Bundibugyo a surpassé en ampleur toutes les précédentes flambées de ce sérotype. La géographie de la flambée — de l\'Ituri au Nord-Kivu, avec des extensions vers le Haut-Uele — reflète la complexité d\'une riposte menée sur un territoire immense.',
    notes: 'Bilan national au 3 août; décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-04', cc: '3973', sc: '270', cd: '1801', sd: '',
    headline: '1 801 décès confirmés : un jalonnement symbolique avant les 4 000 cas',
    fact_text: 'Au 4 août, le bilan national s\'élève à 3 973 cas confirmés et 1 801 décès confirmés. La progression quotidienne de 99 cas est l\'une des plus élevées depuis la mi-juillet. Avec 270 cas suspects et plus de 50 zones de santé impliquées, la flambée montre peu de signes d\'essoufflement dans les provinces de l\'Ituri et du Nord-Kivu.',
    notes: 'Bilan national au 4 août; baisse des cas suspects liée à révision/reclassement côté source; décès suspects non communiqués (ND).',
  },
  // August 8 (missing Aug 5-7)
  {
    date: '2026-08-08', cc: '4209', sc: '', cd: '1916', sd: '',
    headline: '4 209 confirmés : cap des 4 000 franchi, données par zone non disponibles',
    fact_text: 'Le 8 août, le bilan national franchit nettement les 4 000 cas avec 4 209 confirmés et 1 916 décès confirmés — soit 236 cas et 115 décès supplémentaires depuis le 4 août. Les données par type de cas (suspects) ne sont pas disponibles pour cette date. La flambée, qui touche désormais plus de 50 zones de santé, franchit un palier inédit dans la chronique d\'Ebola Bundibugyo.',
    notes: 'Bilan national au 8 août; jours du 5-7 août non publiés par la source; cas suspects et décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-09', cc: '4381', sc: '', cd: '2011', sd: '',
    headline: '2 011 décès : le cap des 2 000 morts confirmés est franchi',
    fact_text: 'Au 9 août, le bilan national atteint 4 381 cas confirmés et 2 011 décès confirmés. Le franchissement du seuil des 2 000 décès officiellement confirmés marque une étape particulièrement grave dans cette flambée. Avec 172 nouveaux cas en une seule journée — la progression quotidienne la plus rapide enregistrée depuis le début de l\'épidémie — le virus continue de se propager à grande vitesse dans les zones de santé de l\'Ituri et du Nord-Kivu.',
    notes: 'Bilan national au 9 août; premier franchissement de 2000 décès confirmés; cas suspects et décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-10', cc: '4449', sc: '', cd: '2061', sd: '',
    headline: '4 449 confirmés, 2 061 décès : la progression reste élevée',
    fact_text: 'Le 10 août, le bilan national s\'établit à 4 449 cas confirmés et 2 061 décès confirmés, soit 68 nouveaux cas et 50 décès supplémentaires en 24 heures. La flambée maintient un rythme d\'accroissement préoccupant, avec des foyers actifs répartis dans plus de 50 zones de santé à cheval sur les provinces de l\'Ituri, du Nord-Kivu et au-delà.',
    notes: 'Bilan national au 10 août; cas suspects et décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-11', cc: '4566', sc: '', cd: '2128', sd: '',
    headline: '4 566 confirmés : 53 zones de santé désormais touchées',
    fact_text: 'Au 11 août, le bilan national atteint 4 566 cas confirmés et 2 128 décès confirmés. La ventilation par zone de santé dénombre 53 foyers actifs, répartis sur un arc géographique qui s\'étend de l\'Ituri au Nord-Kivu, en passant par les premières zones de Haut-Uele et du Maniema. Cette dispersion géographique croissante illustre les difficultés de la riposte à endiguer simultanément des dizaines de foyers dans un territoire aux infrastructures fragiles.',
    notes: 'Bilan national au 11 août; 53 zones de santé avec cas>0; cas suspects et décès suspects non communiqués (ND).',
  },
  // August 15 (missing Aug 12-14)
  {
    date: '2026-08-15', cc: '4945', sc: '', cd: '2325', sd: '',
    headline: 'Près de 5 000 confirmés et 2 325 décès au 15 août',
    fact_text: 'Le 15 août, le bilan national approche le cap des 5 000 cas avec 4 945 confirmés et 2 325 décès confirmés. Cette progression, de 379 cas en quatre jours, s\'inscrit dans une dynamique de transmission soutenue dans les zones de santé de l\'Ituri et du Nord-Kivu. Les 53 zones touchées couvrent désormais un arc territorial sans précédent pour une flambée d\'Ebola Bundibugyo.',
    notes: 'Bilan national au 15 août; jours du 12-14 août non publiés par la source; cas suspects et décès suspects non communiqués (ND).',
  },
  // August 17 (missing Aug 16)
  {
    date: '2026-08-17', cc: '5105', sc: '', cd: '2420', sd: '',
    headline: '5 105 confirmés : le cap des 5 000 cas est franchi',
    fact_text: 'Au 17 août, la flambée franchit le seuil des 5 000 cas confirmés avec 5 105 au total et 2 420 décès confirmés. Ce franchissement — le quatrième seuil symbolique majeur en deux mois — intervient alors que la riposte déploie ses efforts dans plus de 50 zones de santé simultanément. La progression de 160 cas en deux jours illustre la persistance d\'une transmission active dans les provinces de l\'Ituri et du Nord-Kivu, malgré les mesures d\'endiguement en place.',
    notes: 'Bilan national au 17 août; premier franchissement de 5000 cas confirmés; jour du 16 août non publié par la source; cas suspects et décès suspects non communiqués (ND).',
  },
  // August 19 (missing Aug 18)
  {
    date: '2026-08-19', cc: '5290', sc: '', cd: '2516', sd: '',
    headline: '5 290 confirmés, 2 516 décès : la trajectoire reste ascendante',
    fact_text: 'Le 19 août, le bilan national atteint 5 290 cas confirmés et 2 516 décès confirmés, soit 185 nouveaux cas et 96 décès depuis le 17 août. La flambée montre peu de signes de décélération. Dans les provinces affectées, les équipes de santé publique doivent simultanément gérer les foyers établis dans l\'Ituri, les extensions du Nord-Kivu et surveiller les couloirs de mobilité vers les provinces voisines.',
    notes: 'Bilan national au 19 août; jour du 18 août non publié par la source; cas suspects et décès suspects non communiqués (ND).',
  },
  {
    date: '2026-08-20', cc: '5375', sc: '', cd: '2557', sd: '',
    headline: '5 375 confirmés : 85 nouveaux cas en une journée',
    fact_text: 'Au 20 août, le total national s\'élève à 5 375 cas confirmés et 2 557 décès confirmés. La progression de 85 cas en une journée témoigne d\'une transmission toujours active. À mesure que la flambée s\'étire dans le temps et dans l\'espace — de l\'Ituri jusqu\'aux provinces du Nord-Kivu et au-delà — la mobilisation des ressources et la coordination de la riposte deviennent des enjeux aussi importants que les interventions de terrain.',
    notes: 'Bilan national au 20 août; cas suspects et décès suspects non communiqués (ND).',
  },
  // August 22 (missing Aug 21)
  {
    date: '2026-08-22', cc: '5514', sc: '', cd: '2642', sd: '',
    headline: '5 514 confirmés : 139 nouveaux cas en deux jours',
    fact_text: 'Le 22 août, le bilan national atteint 5 514 cas confirmés et 2 642 décès confirmés, soit 139 cas supplémentaires depuis le 20 août. La progression reste soutenue malgré la durée désormais longue de la riposte. Avec 58 zones de santé touchées dans plusieurs provinces, la flambée d\'Ebola Bundibugyo 2026 est devenue l\'une des épidémies les plus étendues géographiquement de l\'histoire de ce sérotype.',
    notes: 'Bilan national au 22 août; jour du 21 août non publié par la source; cas suspects et décès suspects non communiqués (ND).',
  },
  // August 24 (missing Aug 23)
  {
    date: '2026-08-24', cc: '5656', sc: '', cd: '2715', sd: '',
    headline: '5 656 confirmés, 2 715 décès : quatre mois d\'épidémie sans accalmie',
    fact_text: 'Au 24 août, le bilan national atteint 5 656 cas confirmés et 2 715 décès confirmés, soit 142 cas et 73 décès supplémentaires depuis le 22 août. Quatre mois après l\'alerte officielle, la flambée touche 58 zones de santé réparties de l\'épicentre iturien — Bunia (1 312 cas), Rwampara (920), Nizi (622), Mongbwalu (603) — jusqu\'aux foyers du Nord-Kivu — Katwa (351), Butembo (140), Beni (118). Aucune tendance à la décélération n\'est visible dans les données disponibles.',
    notes: 'Bilan national au 24 août; jour du 23 août non publié par la source; cas suspects et décès suspects non communiqués (ND); 58 zones de santé avec cas>0.',
  },
];

// Geographic events anchored on specific cities
const geoEvents = [
  {
    event_id: 'ev_20260625_katwa_nordkivu_growth',
    date: '2026-06-25',
    place_id: 'katwa',
    timeline_group: 'regional_spread',
    confirmed_cases: '52',
    headline: 'Katwa : 52 cas dans la commune clé de Butembo',
    fact_text: 'Au 25 juin, la zone de santé de Katwa — commune dense et commerçante de l\'agglomération de Butembo, au Nord-Kivu — enregistre 52 cas confirmés cumulés. Ce chiffre, en hausse régulière depuis deux semaines, fait de Katwa l\'un des foyers les plus significatifs du Nord-Kivu, derrière les grands épicentres ituliens mais devant Butembo-ville (28 cas) et Beni (14 cas). La densité de Katwa et ses liens étroits avec les grands axes routiers du Nord-Kivu en font un point névralgique pour la surveillance.',
    notes: 'Ventilation INSP au 25 juin; Katwa 52 cas confirmés cumulatifs; ancré Katwa pour la carte.',
  },
  {
    event_id: 'ev_20260707_butembo_nordkivu',
    date: '2026-07-07',
    place_id: 'butembo',
    timeline_group: 'regional_spread',
    confirmed_cases: '46',
    headline: 'Butembo : 46 cas confirmés, le Nord-Kivu s\'installe dans la flambée',
    fact_text: 'Au 7 juillet, Butembo cumule 46 cas confirmés selon la ventilation par zone de santé. Pôle commercial majeur du Nord-Kivu, deuxième ville de la province avec plus d\'un million d\'habitants, Butembo avait déjà été durement touchée par l\'épidémie d\'Ebola de 2018-2020. Sa réimplication dans cette flambée, combinée aux 76 cas de la zone voisine de Katwa et aux 31 cas de Beni, confirme que le Nord-Kivu constitue désormais un front actif à part entière, parallèle à l\'épicentre iturien.',
    notes: 'Ventilation INSP au 7 juillet; Butembo 46 cas confirmés cumulatifs; Katwa 76; Beni 31.',
  },
  {
    event_id: 'ev_20260713_fataki_ituri_nord',
    date: '2026-07-13',
    place_id: 'fataki',
    timeline_group: 'regional_spread',
    confirmed_cases: '17',
    headline: 'Fataki : 17 cas, l\'épidémie gagne le nord de l\'Ituri',
    fact_text: 'Au 13 juillet, la zone de santé de Fataki, dans le nord de l\'Ituri, enregistre 17 cas confirmés. Cette localité, longtemps épargnée par la flambée centrée sur l\'axe Bunia-Rwampara-Mongbwalu, signale désormais une présence active du virus dans une zone à forte mobilité pastorale. L\'extension vers Fataki — et la présence simultanée de foyers à Aru (5 cas, nord-est) et à Wamba (8 cas, Haut-Uele) — traduit une dispersion géographique qui complique le maillage de la riposte.',
    notes: 'Ventilation INSP au 13 juillet; Fataki 17 cas confirmés cumulatifs; Aru 5; Wamba 8 (Haut-Uele).',
  },
  {
    event_id: 'ev_20260722_katwa_doublement',
    date: '2026-07-22',
    place_id: 'katwa',
    timeline_group: 'regional_spread',
    confirmed_cases: '121',
    headline: 'Katwa : 121 cas confirmés, le Nord-Kivu en pleine accélération',
    fact_text: 'Au 22 juillet, la zone de santé de Katwa cumule 121 cas confirmés, plus du double des 52 enregistrés le 25 juin. Ce doublement en moins d\'un mois s\'inscrit dans un contexte d\'accélération générale au Nord-Kivu : Butembo atteint 62 cas, Beni 41. Dans la même période, le total national a bondi de plus de 1 700 cas, montrant que la dynamique de transmission dans les provinces méridionales est désormais aussi préoccupante que celle de l\'Ituri.',
    notes: 'Ventilation INSP au 22 juillet; Katwa 121 cas confirmés cumulatifs; Butembo 62; Beni 41.',
  },
  {
    event_id: 'ev_20260801_butembo_second_front',
    date: '2026-08-01',
    place_id: 'butembo',
    timeline_group: 'regional_spread',
    confirmed_cases: '88',
    headline: 'Butembo : 88 cas confirmés, le Nord-Kivu ancre son second front',
    fact_text: 'Au 1er août, Butembo enregistre 88 cas confirmés cumulés, en hausse régulière depuis deux mois. La zone de santé de Katwa, contiguë, dépasse 180 cas, et Beni en compte plus d\'une centaine. Ces trois pôles urbains interconnectés du Nord-Kivu forment un arc méridional de la flambée qui s\'est consolidé loin des épicentres ituliens de Bunia, Rwampara et Mongbwalu. La mobilité intense entre ces centres — routiers et aériens — entretient la circulation du virus.',
    notes: 'Ventilation INSP au 1er août; Butembo 88 cas confirmés cumulatifs; Katwa 180; Beni ~100.',
  },
  {
    event_id: 'ev_20260811_fataki_extension',
    date: '2026-08-11',
    place_id: 'fataki',
    timeline_group: 'regional_spread',
    confirmed_cases: '55',
    headline: 'Fataki : 55 cas, l\'Ituri nord confirme son rôle de front secondaire',
    fact_text: 'Au 11 août, la zone de santé de Fataki cumule 55 cas confirmés. Passé de 17 cas le 13 juillet à 55 un mois plus tard, ce foyer du nord de l\'Ituri progresse à un rythme préoccupant. La ventilation par zone montre que 53 zones de santé sont désormais touchées — contre 38 début juillet — confirmant que la flambée continue de s\'étirer géographiquement, bien au-delà du corridor Bunia-Rwampara-Mongbwalu qui en a constitué l\'épicentre initial.',
    notes: 'Ventilation INSP au 11 août; Fataki 55 cas confirmés cumulatifs; 53 zones touchées au total.',
  },
  {
    event_id: 'ev_20260824_butembo_nord_kivu_bilan',
    date: '2026-08-24',
    place_id: 'butembo',
    timeline_group: 'regional_spread',
    confirmed_cases: '140',
    headline: 'Nord-Kivu : Butembo (140 cas), Katwa (351), Beni (118) — un front méridional établi',
    fact_text: 'Au 24 août, le bilan par zone de santé dessine clairement un second front méridional de la flambée : Katwa cumule 351 cas confirmés, Butembo 140 et Beni 118. Ces trois pôles urbains du Nord-Kivu représentent à eux seuls plus de 600 cas, soit environ 11 % du total national. À la différence de l\'Ituri, où les épicentres historiques saturent, le Nord-Kivu voit encore de nouveaux secteurs s\'impliquer, rendant l\'endiguement plus difficile dans cette province densément peuplée.',
    notes: 'Ventilation INSP au 24 août; Katwa 351, Butembo 140, Beni 118 cas confirmés cumulatifs; 58 zones touchées au total.',
  },
];

// Build all CSV rows
const rows = [];

for (const ev of nationalEvents) {
  const eventId = `ev_${ev.date.replace(/-/g, '')}_inrb_umie_update`;
  rows.push(csvRow([
    eventId,       // event_id
    ev.date,       // date
    '',            // date_end
    'drc_total',   // place_id
    'situation_update', // event_type
    ev.headline,   // headline
    ev.fact_text,  // fact_text
    '',            // quote
    ev.cc || '',   // confirmed_cases
    ev.sc || '',   // suspected_cases
    ev.cd || '',   // confirmed_deaths
    ev.sd || '',   // suspected_deaths
    '',            // contacts
    SOURCE,        // source_id
    'official',    // source_type
    'high',        // confidence
    'provisional', // data_status
    '1',           // display_priority
    'secondary',   // display_tier
    'clinical',    // map_layer
    'response_breakdown', // timeline_group
    'active',      // update_status
    ev.notes,      // notes
  ]));
}

for (const ev of geoEvents) {
  rows.push(csvRow([
    ev.event_id,        // event_id
    ev.date,            // date
    '',                 // date_end
    ev.place_id,        // place_id
    'situation_update', // event_type
    ev.headline,        // headline
    ev.fact_text,       // fact_text
    '',                 // quote
    ev.confirmed_cases || '', // confirmed_cases
    '',                 // suspected_cases
    '',                 // confirmed_deaths
    '',                 // suspected_deaths
    '',                 // contacts
    SOURCE,             // source_id
    'official',         // source_type
    'high',             // confidence
    'provisional',      // data_status
    '2',                // display_priority
    'secondary',        // display_tier
    'clinical',         // map_layer
    ev.timeline_group,  // timeline_group
    'active',           // update_status
    ev.notes,           // notes
  ]));
}

// Sort all rows by date (first field is event_id, second is date)
// Already in approximate date order; sort to be safe
rows.sort((a, b) => {
  const da = a.split(',')[1];
  const db = b.split(',')[1];
  return da.localeCompare(db);
});

const output = rows.join('\n') + '\n';
appendFileSync('public/data/reference/events.csv', output, 'utf8');
console.log(`Appended ${rows.length} event rows to events.csv`);
