// Script temporaire : génère les events pour la mise à jour du 2026-07-15
// Usage : node scripts/gen-events-2026-07-15.mjs >> public/data/reference/events.csv
import { createWriteStream } from 'fs';

const SRC = 'inrb_umie_2026_07_15_snapshot';

function csv(fields) {
  return fields
    .map((f) => {
      const s = f == null ? '' : String(f);
      // Quote si le champ contient une virgule, guillemet ou retour ligne
      if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    })
    .join(',');
}

// Données issues du dry-run JSON et de la ventilation par zone
const nationalRows = [
  {
    date: '2026-06-19', cc: '956', sc: '162', cd: '247', sd: '47',
    headline: '956 confirmés : la flambée continue de progresser en Ituri et au Nord-Kivu',
    fact_text: 'Au 19 juin, le bilan national atteint 956 cas confirmés, 162 cas suspects et 247 décès confirmés. La hausse s\'appuie sur l\'intensification des foyers historiques de l\'Ituri — Bunia, Mongbwalu, Rwampara — et sur la progression continue des zones de santé du Nord-Kivu comme Katwa et Butembo. La baisse des suspects reflète un reclassement en cours côté source.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-06-20', cc: '1003', sc: '201', cd: '254', sd: '30',
    headline: '1 003 cas confirmés : la flambée franchit le cap du millier',
    fact_text: 'Le 20 juin, la RDC dépasse pour la première fois le seuil de mille cas confirmés, avec 1 003 cas cumulés et 254 décès confirmés. Ce palier traduit une dynamique qui ne s\'essouffle pas : en cinq semaines, l\'épidémie est passée des premiers foyers de l\'Ituri à une crise régionale étendue du nord de l\'Ituri jusqu\'aux agglomérations du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-06-21', cc: '1048', sc: '202', cd: '267', sd: '60',
    headline: '1 048 confirmés, 267 décès : l\'épicentre iturien reste le cœur de la crise',
    fact_text: 'Au 21 juin, le bilan national progresse à 1 048 cas confirmés et 267 décès confirmés. Les décès suspects remontent à 60 après plusieurs jours de baisse, rappelant que la mortalité réelle dépasse encore la confirmation biologique. L\'épidémie continue de s\'étendre à de nouvelles zones de l\'Ituri et du Nord-Kivu, de plus en plus éloignées du triangle initial Bunia-Rwampara-Mongbwalu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-06-22', cc: '1094', sc: '131', cd: '277', sd: '44',
    headline: '1 094 confirmés, 277 décès : correction des suspects, la hausse des confirmés se poursuit',
    fact_text: 'Le 22 juin, le bilan monte à 1 094 cas confirmés et 277 décès confirmés. Les cas suspects et les décès suspects baissent fortement, effets d\'un reclassement côté source. Cette correction ne signifie pas un ralentissement de la transmission : les décès confirmés, en hausse régulière, mesurent l\'ampleur persistante de l\'épidémie dans les foyers actifs de l\'Ituri et du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-06-23', cc: '1118', sc: '138', cd: '291', sd: '45',
    headline: '1 118 confirmés : l\'Ituri et le Nord-Kivu concentrent la progression',
    fact_text: 'Au 23 juin, le bilan national atteint 1 118 cas confirmés et 291 décès confirmés. Entre l\'Ituri — où Bunia, Mongbwalu et Rwampara restent les foyers les plus chargés — et le Nord-Kivu, où Katwa et Butembo enregistrent des hausses régulières, l\'épidémie progresse sur deux fronts simultanément, à plusieurs centaines de kilomètres d\'écart.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-06-24', cc: '1155', sc: '154', cd: '304', sd: '40',
    headline: '1 155 confirmés : les décès confirmés franchissent le cap des 300',
    fact_text: 'Le 24 juin, les décès confirmés dépassent 300 pour la première fois, avec 304 cas cumulés. Le total des cas confirmés monte à 1 155. La légère baisse des décès suspects reflète un reclassement en cours côté source. En Ituri et au Nord-Kivu, les foyers principaux continuent d\'alimenter la progression.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-06-25', cc: '1203', sc: '265', cd: '321', sd: '77',
    headline: '1 203 confirmés, 321 décès : la courbe reste ascendante',
    fact_text: 'Au 25 juin, le bilan progresse à 1 203 cas confirmés et 321 décès confirmés. Les cas suspects rebondissent à 265 et les décès suspects à 77 : la série retrouve un rythme de déclaration plus complet après plusieurs jours de corrections. La flambée, alimentée par des foyers actifs en Ituri et au Nord-Kivu, ne montre aucun signe de fléchissement.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-06-27', cc: '1274', sc: '239', cd: '360', sd: '70',
    headline: '1 274 confirmés : deux jours de cumul révèlent l\'ampleur de la progression',
    fact_text: 'Le 27 juin — le 26 juin n\'ayant pas été publié par la source — le bilan national enregistre un bond à 1 274 cas confirmés et 360 décès confirmés. Ce cumul masque une progression quotidienne qui reste régulière : l\'épidémie ne connaît pas de pause, même lorsque les rapports tardent. La légère baisse des décès suspects traduit de nouveaux reclassements côté source.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; jour(s) entre le 2026-06-25 et le 2026-06-27 non publie(s) par la source (cadence SitRep); baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-06-29', cc: '1333', sc: '309', cd: '399', sd: '90',
    headline: '1 333 confirmés : le seuil des 400 décès est en vue',
    fact_text: 'Le 29 juin — le 28 juin n\'ayant pas été publié — le bilan monte à 1 333 cas confirmés et 399 décès confirmés, à un souffle du cap des 400. Les cas suspects remontent à 309, signal que la série de déclaration retrouve son rythme. De l\'Ituri jusqu\'au Nord-Kivu, les foyers actifs continuent d\'alimenter la progression quotidienne.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; jour(s) entre le 2026-06-27 et le 2026-06-29 non publie(s) par la source (cadence SitRep).',
  },
  {
    date: '2026-06-30', cc: '1406', sc: '301', cd: '438', sd: '90',
    headline: '1 406 confirmés, 438 décès : fin juin, la flambée ne s\'essouffle pas',
    fact_text: 'Au 30 juin, le bilan de la flambée Bundibugyo dépasse 1 400 cas confirmés et 438 décès confirmés. Cette photographie de fin de mois illustre une dynamique sans vrai palier depuis le début de l\'épidémie : en six semaines de surveillance officielle, le nombre de cas confirmés a été multiplié par plus de vingt, de l\'Ituri jusqu\'aux zones de santé du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-07-01', cc: '1460', sc: '150', cd: '452', sd: '41',
    headline: '1 460 confirmés, 452 décès : juillet s\'ouvre sur une épidémie non contenue',
    fact_text: 'Le 1er juillet, le bilan national atteint 1 460 cas confirmés et 452 décès confirmés. Les cas suspects baissent fortement à 150 — reflet d\'un reclassement massif côté source — tandis que les décès confirmés poursuivent leur progression. L\'entrée dans le second mois de surveillance officielle se fait sans signal d\'affaiblissement : les foyers d\'Ituri et du Nord-Kivu restent actifs.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-07-02', cc: '1502', sc: '213', cd: '473', sd: '63',
    headline: '1 502 confirmés : la barre des 1 500 cas est franchie',
    fact_text: 'Le 2 juillet, le total des cas confirmés dépasse 1 500, avec 1 502 cas cumulés et 473 décès confirmés. Les cas suspects remontent à 213. Cette étape survient dans un contexte de progression géographique persistante : au-delà des épicentres iturien, les zones de santé du Nord-Kivu et la métropole de Goma enregistrent de nouveaux cas.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-03', cc: '1528', sc: '185', cd: '492', sd: '67',
    headline: '1 528 confirmés, 492 décès : le cap des 500 décès est imminent',
    fact_text: 'Le 3 juillet, le bilan progresse à 1 528 cas confirmés et 492 décès confirmés, à quelques unités du seuil des 500. Les cas suspects baissent à 185, par reclassement côté source. L\'Ituri — Bunia, Mongbwalu, Rwampara — reste le cœur de la flambée, mais les foyers du Nord-Kivu, en particulier Katwa, continuent de croître régulièrement.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-07-04', cc: '1561', sc: '354', cd: '506', sd: '110',
    headline: '1 561 confirmés, 506 décès : le seuil des 500 décès est franchi',
    fact_text: 'Le 4 juillet, les décès confirmés dépassent 500 pour la première fois, avec 506 cas cumulés. Le total des cas confirmés monte à 1 561. Les cas suspects rebondissent à 354 et les décès suspects à 110 : après plusieurs jours de reclassements, la série retrouve un niveau de déclaration plus complet. La flambée garde son rythme ascendant sur l\'ensemble des foyers actifs.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-05', cc: '1624', sc: '135', cd: '521', sd: '23',
    headline: '1 624 confirmés : 63 nouveaux cas en une journée, la progression s\'accélère',
    fact_text: 'Le 5 juillet, la série enregistre 63 nouveaux cas confirmés en une seule journée, portant le total à 1 624. Les décès confirmés montent à 521. La forte baisse des suspects et des décès suspects — respectivement à 135 et 23 — traduit un reclassement côté source. Cette poussée journalière intervient alors que la flambée s\'étend à de nouvelles zones de santé de l\'Ituri.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-07-06', cc: '1708', sc: '237', cd: '580', sd: '70',
    headline: '1 708 confirmés : 84 nouveaux cas, l\'une des hausses journalières les plus élevées',
    fact_text: 'Le 6 juillet, la série marque 84 nouveaux cas confirmés en une journée, portant le total à 1 708 et les décès confirmés à 580. Les cas suspects et les décès suspects remontent après les reclassements de la veille. Cette accélération concerne l\'ensemble des foyers actifs, de l\'épicentre iturien jusqu\'aux zones de santé du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-07', cc: '1759', sc: '304', cd: '600', sd: '92',
    headline: '1 759 confirmés, 600 décès : un seuil symbolique dans une épidémie non maîtrisée',
    fact_text: 'Le 7 juillet, les décès confirmés franchissent le seuil des 600, avec 600 cas cumulés. Le total des confirmés atteint 1 759. Les cas suspects remontent à 304 et les décès suspects à 92, dans une dynamique de déclaration plus complète après les corrections précédentes. Six cents décès confirmés en moins de deux mois de surveillance officielle placent cette flambée Bundibugyo parmi les plus meurtrières enregistrées en RDC.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-08', cc: '1792', sc: '227', cd: '625', sd: '60',
    headline: '1 792 confirmés, 625 décès : correction des suspects, les confirmés progressent encore',
    fact_text: 'Le 8 juillet, le bilan atteint 1 792 cas confirmés et 625 décès confirmés. Les cas suspects baissent à 227 et les décès suspects à 60, effets d\'un reclassement côté source. Malgré ces corrections périodiques, la tendance de fond reste ascendante : l\'Ituri et le Nord-Kivu enregistrent de nouveaux cas quotidiens sans signal d\'inversion.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires; baisse de cas suspects et deces suspects liee a revision/reclassement ou changement de definition cote source.',
  },
  {
    date: '2026-07-09', cc: '1830', sc: '284', cd: '648', sd: '81',
    headline: '1 830 confirmés, 648 décès : la flambée avance sans fléchir',
    fact_text: 'Le 9 juillet, le bilan progresse à 1 830 cas confirmés et 648 décès confirmés. Les cas suspects remontent à 284 et les décès suspects à 81. Sur la semaine écoulée, la série a progressé de plusieurs centaines de cas : l\'épidémie reste non contenue, avec des foyers actifs répartis de l\'Ituri jusqu\'aux zones urbaines du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-10', cc: '1873', sc: '299', cd: '672', sd: '91',
    headline: '1 873 confirmés, 672 décès : la progression quotidienne reste soutenue',
    fact_text: 'Le 10 juillet, le total atteint 1 873 cas confirmés et 672 décès confirmés. En deux jours, la série a enregistré 43 nouveaux cas confirmés et 24 décès supplémentaires : le rythme de progression reste soutenu. La flambée s\'étend sur plusieurs zones de santé simultanément, l\'Ituri concentrant la majorité des foyers actifs, le Nord-Kivu maintenant ses propres dynamiques de transmission.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
  {
    date: '2026-07-11', cc: '1926', sc: '299', cd: '702', sd: '91',
    headline: '1 926 confirmés, 702 décès : le cap des 700 décès est franchi',
    fact_text: 'Le 11 juillet, les décès confirmés dépassent 700 pour la première fois, avec 702 cas cumulés. Le total des cas confirmés atteint 1 926, à quelques dizaines du seuil de 2 000. Les suspects restent stables par rapport à la veille, sans reclassement notable du jour. L\'épidémie s\'inscrit dans une trajectoire ascendante continue, de l\'épicentre iturien jusqu\'aux foyers du Nord-Kivu.',
    notes: 'Bilan national INRB-UMIE; snapshot 5a3950d du 2026-07-15; donnees preliminaires.',
  },
];

const geoRows = [
  {
    event_id: 'ev_20260620_butembo_nordkivu',
    date: '2026-06-20',
    place_id: 'butembo',
    headline: 'Butembo et Katwa : le Nord-Kivu s\'installe dans l\'épidémie',
    fact_text: 'Au 20 juin, les zones de santé du Nord-Kivu enregistrent 27 cas confirmés à Butembo et 28 à Katwa, soit 55 cas dans ce corridor urbain. La progression est régulière depuis mi-juin : l\'axe Butembo-Katwa, déjà éprouvé par l\'épidémie d\'Ebola 2018-2020, concentre l\'essentiel des foyers nordkivutiens, à plus de 400 kilomètres de l\'épicentre iturien.',
    cc: '27', sc: '', cd: '', sd: '',
    timeline_group: 'regional_spread',
    notes: 'Ventilation par zone de sante INRB-UMIE au 20 juin; Butembo 27 cas confirmes cumulatifs; Katwa 28 cas confirmes cumulatifs; ancre Butembo pour la carte.',
  },
  {
    event_id: 'ev_20260625_rwampara_surge',
    date: '2026-06-25',
    place_id: 'rwampara',
    headline: 'Rwampara : 258 cas confirmés, le foyer iturien maintient une cadence haute',
    fact_text: 'Au 25 juin, la zone de santé de Rwampara cumule 258 cas confirmés, avec 21 nouveaux cas dans la journée — l\'une des hausses quotidiennes les plus marquées pour ce foyer depuis le début de l\'épidémie. Rwampara, à la fois zone de transit entre Mongbwalu et Bunia et point de départ des premières alertes de mai, reste l\'un des foyers les plus actifs de l\'Ituri.',
    cc: '258', sc: '', cd: '', sd: '',
    timeline_group: 'response_breakdown',
    notes: 'Ventilation par zone de sante INRB-UMIE au 25 juin; Rwampara 258 cas confirmes cumulatifs (+21 vs 24 juin); foyer iturien majeur.',
  },
  {
    event_id: 'ev_20260627_katwa_nordkivu_surge',
    date: '2026-06-27',
    place_id: 'katwa',
    headline: 'Katwa dépasse 45 cas : le Nord-Kivu enregistre un bond significatif',
    fact_text: 'La zone de santé de Katwa, commune de Butembo en Nord-Kivu, enregistre 45 cas confirmés cumulés au 27 juin, contre 35 deux jours plus tôt. Ce bond de dix cas confirme que le pôle urbain Butembo-Katwa constitue désormais un foyer nordkivutien en pleine intensification, relié aux épicentres iturien par des axes de mobilité fréquentés.',
    cc: '45', sc: '', cd: '', sd: '',
    timeline_group: 'regional_spread',
    notes: 'Ventilation par zone de sante INRB-UMIE au 27 juin; Katwa 45 cas confirmes cumulatifs (+10 vs 25 juin); saut majeur en Nord-Kivu.',
  },
  {
    event_id: 'ev_20260702_goma_second_case',
    date: '2026-07-02',
    place_id: 'goma',
    headline: 'Goma : un deuxième cas confirme l\'implantation dans la métropole lacustre',
    fact_text: 'Le 2 juillet, la zone de santé de Goma enregistre un deuxième cas confirmé cumulé. Cette deuxième confirmation dans la métropole du Nord-Kivu mérite une vigilance particulière : Goma, carrefour de plus de deux millions d\'habitants à la frontière du Rwanda, concentre des flux de voyageurs et de commerçants qui peuvent accélérer la dispersion du virus si les chaînes de transmission ne sont pas rapidement identifiées.',
    cc: '2', sc: '', cd: '', sd: '',
    timeline_group: 'regional_spread',
    notes: 'Ventilation par zone de sante INRB-UMIE au 2 juillet; Goma 2 cas confirmes cumulatifs (vs 1 le 1er juillet); progression dans pole urbain transfrontalier.',
  },
  {
    event_id: 'ev_20260705_fataki_north_ituri',
    date: '2026-07-05',
    place_id: 'fataki',
    headline: 'Fataki : l\'Ituri septentrional enregistre un deuxième cas confirmé',
    fact_text: 'Le 5 juillet, la localité de Fataki, dans le nord de l\'Ituri, enregistre un deuxième cas confirmé cumulé. Bien que limité en nombre, ce signal géographique est notable : Fataki se situe sur des axes de mobilité entre Bunia et les zones frontalières du Soudan du Sud. Chaque nouveau foyer en Ituri septentrional étire les ressources de surveillance disponibles et complexifie la cartographie de la riposte.',
    cc: '2', sc: '', cd: '', sd: '',
    timeline_group: 'regional_spread',
    notes: 'Ventilation par zone de sante INRB-UMIE au 5 juillet; Fataki 2 cas confirmes cumulatifs (vs 1 le 4 juillet); extension nord-Ituri.',
  },
  {
    event_id: 'ev_20260709_katwa_66_nordkivu',
    date: '2026-07-09',
    place_id: 'katwa',
    headline: 'Katwa : 66 cas confirmés, le Nord-Kivu entre dans une phase de transmission soutenue',
    fact_text: 'Au 9 juillet, la zone de santé de Katwa cumule 66 cas confirmés, faisant de ce foyer nordkivutien l\'un des plus actifs hors Ituri. Sur les quatre dernières semaines, Katwa est passé de 21 cas mi-juin à 66 : une progression de plus de 200 % qui traduit une transmission endémique dans ce territoire urbain dense. Ajoutés aux 43 cas de Butembo voisine, ces foyers représentent la principale concentration de cas hors des épicentres iturien.',
    cc: '66', sc: '', cd: '', sd: '',
    timeline_group: 'regional_spread',
    notes: 'Ventilation par zone de sante INRB-UMIE au 9 juillet; Katwa 66 cas confirmes cumulatifs; Butembo 43; foyer nordkivutien dominant hors Ituri.',
  },
  {
    event_id: 'ev_20260711_mongbwalu_epicenter',
    date: '2026-07-11',
    place_id: 'mongbwalu',
    headline: 'Mongbwalu : 336 cas confirmés, l\'épicentre minier reste au cœur de la flambée',
    fact_text: 'Au 11 juillet, la zone de santé de Mongbwalu cumule 336 cas confirmés, maintenant son rang de troisième foyer le plus touché derrière Bunia (507) et Rwampara (393). Deux mois et demi après les premières alertes, cette zone minière très mobile reste un foyer persistant : la mobilité des travailleurs, les difficultés d\'accès et les tensions antérieures autour des enterrements sécurisés continuent de peser sur la riposte.',
    cc: '336', sc: '', cd: '', sd: '',
    timeline_group: 'response_breakdown',
    notes: 'Ventilation par zone de sante INRB-UMIE au 11 juillet; Mongbwalu 336 cas confirmes cumulatifs; 3eme foyer derriere Bunia (507) et Rwampara (393).',
  },
];

// Generate national event rows
const lines = [];

for (const r of nationalRows) {
  const dateStr = r.date.replace(/-/g, '');
  const event_id = `ev_${dateStr}_inrb_umie_update`;
  lines.push(csv([
    event_id,
    r.date,
    '',              // date_end
    'drc_total',
    'situation_update',
    r.headline,
    r.fact_text,
    '',              // quote
    r.cc,
    r.sc,
    r.cd,
    r.sd,
    '',              // contacts
    SRC,
    'official',
    'high',
    'provisional',
    '1',
    'secondary',
    'clinical',
    'response_breakdown',
    'active',
    r.notes,
  ]));
}

// Generate geographic event rows
for (const r of geoRows) {
  lines.push(csv([
    r.event_id,
    r.date,
    '',
    r.place_id,
    'situation_update',
    r.headline,
    r.fact_text,
    '',
    r.cc,
    r.sc,
    r.cd,
    r.sd,
    '',
    SRC,
    'official',
    'high',
    'provisional',
    '2',
    'secondary',
    'clinical',
    r.timeline_group,
    'active',
    r.notes,
  ]));
}

// Output to stdout (to be appended to events.csv)
for (const line of lines) {
  process.stdout.write(line + '\r\n');
}
