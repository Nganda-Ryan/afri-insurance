import type { AutoInsuranceProductData } from "@/types/auto-insurance";

export const AUTO_INSURANCE_PRODUCT_DATA: AutoInsuranceProductData = {
  document_info: {
    titre: "TARIF A LECTURE DIRECTE ASSURANCE AUTOMOBILE",
    compagnie: "AFRI INSURANCE",
    devise: "FCFA",
  },
  zones: [
    {
      nom: "ZONE A",
      categories: [
        {
          id: "1",
          nom: "CATEGORIE 1",
          description: "Véhicules de tourisme et de promenade",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 52499, dr: 2000, ipt: 7500, prime_nette: 12400, accessoires: 2500, fichier_central: 1000, tva: 3061, carte_rose: 1000, prime_ttc: 19961 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 63784, dr: 2000, ipt: 7500, prime_nette: 14657, accessoires: 2500, fichier_central: 1000, tva: 3495, carte_rose: 1000, prime_ttc: 22652 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 70877, dr: 2000, ipt: 7500, prime_nette: 16075, accessoires: 2500, fichier_central: 1000, tva: 3768, carte_rose: 1000, prime_ttc: 24344 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 92497, dr: 2000, ipt: 7500, prime_nette: 20399, accessoires: 2500, fichier_central: 1000, tva: 4601, carte_rose: 1000, prime_ttc: 29500 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 117764, dr: 2000, ipt: 7500, prime_nette: 25453, accessoires: 2500, fichier_central: 1000, tva: 5573, carte_rose: 1000, prime_ttc: 35526 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 138863, dr: 2000, ipt: 7500, prime_nette: 29673, accessoires: 2500, fichier_central: 1000, tva: 6386, carte_rose: 1000, prime_ttc: 40558 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 52499, dr: 2000, ipt: 7500, prime_nette: 24800, accessoires: 2500, fichier_central: 1000, tva: 5448, carte_rose: 1000, prime_ttc: 34747 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 63784, dr: 2000, ipt: 7500, prime_nette: 29314, accessoires: 2500, fichier_central: 1000, tva: 6317, carte_rose: 1000, prime_ttc: 40130 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 70877, dr: 2000, ipt: 7500, prime_nette: 32151, accessoires: 2500, fichier_central: 1000, tva: 6863, carte_rose: 1000, prime_ttc: 43514 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 92497, dr: 2000, ipt: 7500, prime_nette: 40799, accessoires: 2500, fichier_central: 1000, tva: 8528, carte_rose: 1000, prime_ttc: 53826 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 117764, dr: 2000, ipt: 7500, prime_nette: 50906, accessoires: 2500, fichier_central: 1000, tva: 10473, carte_rose: 1000, prime_ttc: 65879 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 138863, dr: 2000, ipt: 7500, prime_nette: 59345, accessoires: 2500, fichier_central: 1000, tva: 12098, carte_rose: 1000, prime_ttc: 75943 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 52499, dr: 2000, ipt: 7500, prime_nette: 37199, accessoires: 2500, fichier_central: 1000, tva: 7835, carte_rose: 1000, prime_ttc: 49534 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 63784, dr: 2000, ipt: 7500, prime_nette: 43970, accessoires: 2500, fichier_central: 1000, tva: 9138, carte_rose: 1000, prime_ttc: 57608 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 70877, dr: 2000, ipt: 7500, prime_nette: 48226, accessoires: 2500, fichier_central: 1000, tva: 9957, carte_rose: 1000, prime_ttc: 62683 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 92497, dr: 2000, ipt: 7500, prime_nette: 61198, accessoires: 2500, fichier_central: 1000, tva: 12454, carte_rose: 1000, prime_ttc: 78153 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 117764, dr: 2000, ipt: 7500, prime_nette: 76358, accessoires: 2500, fichier_central: 1000, tva: 15373, carte_rose: 1000, prime_ttc: 96231 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 138863, dr: 2000, ipt: 7500, prime_nette: 89018, accessoires: 2500, fichier_central: 1000, tva: 17810, carte_rose: 1000, prime_ttc: 111327 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 52499, dr: 2000, ipt: 7500, prime_nette: 49599, accessoires: 2500, fichier_central: 1000, tva: 10222, carte_rose: 1000, prime_ttc: 64321 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 63784, dr: 2000, ipt: 7500, prime_nette: 58627, accessoires: 2500, fichier_central: 1000, tva: 11959, carte_rose: 1000, prime_ttc: 75087 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 70877, dr: 2000, ipt: 7500, prime_nette: 64302, accessoires: 2500, fichier_central: 1000, tva: 13052, carte_rose: 1000, prime_ttc: 81853 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 92497, dr: 2000, ipt: 7500, prime_nette: 81598, accessoires: 2500, fichier_central: 1000, tva: 16381, carte_rose: 1000, prime_ttc: 102479 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 117764, dr: 2000, ipt: 7500, prime_nette: 101811, accessoires: 2500, fichier_central: 1000, tva: 20272, carte_rose: 1000, prime_ttc: 126584 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 138863, dr: 2000, ipt: 7500, prime_nette: 118690, accessoires: 2500, fichier_central: 1000, tva: 23522, carte_rose: 1000, prime_ttc: 146712 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 52499, dr: 2000, ipt: 7500, prime_nette: 61999, accessoires: 2500, fichier_central: 1000, tva: 12609, carte_rose: 1000, prime_ttc: 79108 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 63784, dr: 2000, ipt: 7500, prime_nette: 73284, accessoires: 2500, fichier_central: 1000, tva: 14781, carte_rose: 1000, prime_ttc: 92565 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 70877, dr: 2000, ipt: 7500, prime_nette: 80377, accessoires: 2500, fichier_central: 1000, tva: 16146, carte_rose: 1000, prime_ttc: 101023 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 92497, dr: 2000, ipt: 7500, prime_nette: 101997, accessoires: 2500, fichier_central: 1000, tva: 20308, carte_rose: 1000, prime_ttc: 126805 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 117764, dr: 2000, ipt: 7500, prime_nette: 127264, accessoires: 2500, fichier_central: 1000, tva: 25172, carte_rose: 1000, prime_ttc: 156936 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 138863, dr: 2000, ipt: 7500, prime_nette: 148363, accessoires: 2500, fichier_central: 1000, tva: 29234, carte_rose: 1000, prime_ttc: 182097 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2",
          nom: "CATEGORIE 2 - SANS REMORQUE",
          description: "Véhicules de transport d'objets, marchandises ou matériel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 58759, dr: 2000, ipt: 7500, prime_nette: 13652, accessoires: 2500, fichier_central: 1000, tva: 3302, carte_rose: 1000, prime_ttc: 21454 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 71183, dr: 2000, ipt: 7500, prime_nette: 16137, accessoires: 2500, fichier_central: 1000, tva: 3780, carte_rose: 1000, prime_ttc: 24417 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 80918, dr: 2000, ipt: 7500, prime_nette: 18084, accessoires: 2500, fichier_central: 1000, tva: 4155, carte_rose: 1000, prime_ttc: 26738 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 121212, dr: 2000, ipt: 7500, prime_nette: 26142, accessoires: 2500, fichier_central: 1000, tva: 5706, carte_rose: 1000, prime_ttc: 36349 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 150086, dr: 2000, ipt: 7500, prime_nette: 31917, accessoires: 2500, fichier_central: 1000, tva: 6818, carte_rose: 1000, prime_ttc: 43235 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 173591, dr: 2000, ipt: 7500, prime_nette: 36618, accessoires: 2500, fichier_central: 1000, tva: 7723, carte_rose: 1000, prime_ttc: 48841 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 58759, dr: 2000, ipt: 7500, prime_nette: 27304, accessoires: 2500, fichier_central: 1000, tva: 5930, carte_rose: 1000, prime_ttc: 37733 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 71183, dr: 2000, ipt: 7500, prime_nette: 32273, accessoires: 2500, fichier_central: 1000, tva: 6886, carte_rose: 1000, prime_ttc: 43660 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 80918, dr: 2000, ipt: 7500, prime_nette: 36167, accessoires: 2500, fichier_central: 1000, tva: 7636, carte_rose: 1000, prime_ttc: 48303 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 121212, dr: 2000, ipt: 7500, prime_nette: 52285, accessoires: 2500, fichier_central: 1000, tva: 10739, carte_rose: 1000, prime_ttc: 67523 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 150086, dr: 2000, ipt: 7500, prime_nette: 63834, accessoires: 2500, fichier_central: 1000, tva: 12962, carte_rose: 1000, prime_ttc: 81296 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 173591, dr: 2000, ipt: 7500, prime_nette: 73236, accessoires: 2500, fichier_central: 1000, tva: 14772, carte_rose: 1000, prime_ttc: 92508 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 58759, dr: 2000, ipt: 7500, prime_nette: 40955, accessoires: 2500, fichier_central: 1000, tva: 8558, carte_rose: 1000, prime_ttc: 54013 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 71183, dr: 2000, ipt: 7500, prime_nette: 48410, accessoires: 2500, fichier_central: 1000, tva: 9993, carte_rose: 1000, prime_ttc: 62902 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 80918, dr: 2000, ipt: 7500, prime_nette: 54251, accessoires: 2500, fichier_central: 1000, tva: 11117, carte_rose: 1000, prime_ttc: 69868 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 121212, dr: 2000, ipt: 7500, prime_nette: 78427, accessoires: 2500, fichier_central: 1000, tva: 15771, carte_rose: 1000, prime_ttc: 98698 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 150086, dr: 2000, ipt: 7500, prime_nette: 95752, accessoires: 2500, fichier_central: 1000, tva: 19106, carte_rose: 1000, prime_ttc: 119358 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 173591, dr: 2000, ipt: 7500, prime_nette: 109855, accessoires: 2500, fichier_central: 1000, tva: 21821, carte_rose: 1000, prime_ttc: 136175 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 58759, dr: 2000, ipt: 7500, prime_nette: 54607, accessoires: 2500, fichier_central: 1000, tva: 11186, carte_rose: 1000, prime_ttc: 70293 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 71183, dr: 2000, ipt: 7500, prime_nette: 64546, accessoires: 2500, fichier_central: 1000, tva: 13099, carte_rose: 1000, prime_ttc: 82145 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 80918, dr: 2000, ipt: 7500, prime_nette: 72334, accessoires: 2500, fichier_central: 1000, tva: 14598, carte_rose: 1000, prime_ttc: 91433 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 121212, dr: 2000, ipt: 7500, prime_nette: 104570, accessoires: 2500, fichier_central: 1000, tva: 20803, carte_rose: 1000, prime_ttc: 129873 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 150086, dr: 2000, ipt: 7500, prime_nette: 127669, accessoires: 2500, fichier_central: 1000, tva: 25250, carte_rose: 1000, prime_ttc: 157419 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 173591, dr: 2000, ipt: 7500, prime_nette: 146473, accessoires: 2500, fichier_central: 1000, tva: 28870, carte_rose: 1000, prime_ttc: 179843 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 58759, dr: 2000, ipt: 7500, prime_nette: 68259, accessoires: 2500, fichier_central: 1000, tva: 13814, carte_rose: 1000, prime_ttc: 86573 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 71183, dr: 2000, ipt: 7500, prime_nette: 80683, accessoires: 2500, fichier_central: 1000, tva: 16205, carte_rose: 1000, prime_ttc: 101388 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 80918, dr: 2000, ipt: 7500, prime_nette: 90418, accessoires: 2500, fichier_central: 1000, tva: 18079, carte_rose: 1000, prime_ttc: 112997 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 121212, dr: 2000, ipt: 7500, prime_nette: 130712, accessoires: 2500, fichier_central: 1000, tva: 25836, carte_rose: 1000, prime_ttc: 161048 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 150086, dr: 2000, ipt: 7500, prime_nette: 159586, accessoires: 2500, fichier_central: 1000, tva: 31394, carte_rose: 1000, prime_ttc: 195480 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 73591, dr: 2000, ipt: 7500, prime_nette: 183091, accessoires: 2500, fichier_central: 1000, tva: 35919, carte_rose: 1000, prime_ttc: 223510 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2_AVEC_REMORQUE",
          nom: "CATEGORIE 2 - AVEC REMORQUE",
          description: "Véhicules de transport d'objets avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 70504, dr: 2000, ipt: 7500, prime_nette: 16001, accessoires: 2500, fichier_central: 1000, tva: 3754, carte_rose: 1000, prime_ttc: 24255 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 85420, dr: 2000, ipt: 7500, prime_nette: 18984, accessoires: 2500, fichier_central: 1000, tva: 4328, carte_rose: 1000, prime_ttc: 27812 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 97102, dr: 2000, ipt: 7500, prime_nette: 21320, accessoires: 2500, fichier_central: 1000, tva: 4778, carte_rose: 1000, prime_ttc: 30598 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 145454, dr: 2000, ipt: 7500, prime_nette: 30991, accessoires: 2500, fichier_central: 1000, tva: 6639, carte_rose: 1000, prime_ttc: 42130 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 180103, dr: 2000, ipt: 7500, prime_nette: 37921, accessoires: 2500, fichier_central: 1000, tva: 7973, carte_rose: 1000, prime_ttc: 50394 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 208309, dr: 2000, ipt: 7500, prime_nette: 43562, accessoires: 2500, fichier_central: 1000, tva: 9059, carte_rose: 1000, prime_ttc: 57121 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 70504, dr: 2000, ipt: 7500, prime_nette: 32002, accessoires: 2500, fichier_central: 1000, tva: 6834, carte_rose: 1000, prime_ttc: 43336 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 85420, dr: 2000, ipt: 7500, prime_nette: 37968, accessoires: 2500, fichier_central: 1000, tva: 7983, carte_rose: 1000, prime_ttc: 50451 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 97102, dr: 2000, ipt: 7500, prime_nette: 42641, accessoires: 2500, fichier_central: 1000, tva: 8882, carte_rose: 1000, prime_ttc: 56023 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 145454, dr: 2000, ipt: 7500, prime_nette: 61982, accessoires: 2500, fichier_central: 1000, tva: 12605, carte_rose: 1000, prime_ttc: 79087 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 180103, dr: 2000, ipt: 7500, prime_nette: 75841, accessoires: 2500, fichier_central: 1000, tva: 15273, carte_rose: 1000, prime_ttc: 95614 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 208309, dr: 2000, ipt: 7500, prime_nette: 87124, accessoires: 2500, fichier_central: 1000, tva: 17445, carte_rose: 1000, prime_ttc: 109069 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 70504, dr: 2000, ipt: 7500, prime_nette: 48002, accessoires: 2500, fichier_central: 1000, tva: 9914, carte_rose: 1000, prime_ttc: 62417 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 85420, dr: 2000, ipt: 7500, prime_nette: 56952, accessoires: 2500, fichier_central: 1000, tva: 11637, carte_rose: 1000, prime_ttc: 73089 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 97102, dr: 2000, ipt: 7500, prime_nette: 63961, accessoires: 2500, fichier_central: 1000, tva: 12986, carte_rose: 1000, prime_ttc: 81447 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 145454, dr: 2000, ipt: 7500, prime_nette: 92972, accessoires: 2500, fichier_central: 1000, tva: 18571, carte_rose: 1000, prime_ttc: 116043 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 180103, dr: 2000, ipt: 7500, prime_nette: 113762, accessoires: 2500, fichier_central: 1000, tva: 22573, carte_rose: 1000, prime_ttc: 140835 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 208309, dr: 2000, ipt: 7500, prime_nette: 130685, accessoires: 2500, fichier_central: 1000, tva: 25831, carte_rose: 1000, prime_ttc: 161016 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 70504, dr: 2000, ipt: 7500, prime_nette: 64003, accessoires: 2500, fichier_central: 1000, tva: 12994, carte_rose: 1000, prime_ttc: 81498 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 85420, dr: 2000, ipt: 7500, prime_nette: 75936, accessoires: 2500, fichier_central: 1000, tva: 15291, carte_rose: 1000, prime_ttc: 95727 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 97102, dr: 2000, ipt: 7500, prime_nette: 85282, accessoires: 2500, fichier_central: 1000, tva: 17090, carte_rose: 1000, prime_ttc: 106872 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 145454, dr: 2000, ipt: 7500, prime_nette: 123963, accessoires: 2500, fichier_central: 1000, tva: 24537, carte_rose: 1000, prime_ttc: 153000 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 180103, dr: 2000, ipt: 7500, prime_nette: 151682, accessoires: 2500, fichier_central: 1000, tva: 29873, carte_rose: 1000, prime_ttc: 186055 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 208309, dr: 2000, ipt: 7500, prime_nette: 174247, accessoires: 2500, fichier_central: 1000, tva: 34216, carte_rose: 1000, prime_ttc: 212964 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 70504, dr: 2000, ipt: 7500, prime_nette: 80004, accessoires: 2500, fichier_central: 1000, tva: 16075, carte_rose: 1000, prime_ttc: 100579 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 85420, dr: 2000, ipt: 7500, prime_nette: 94920, accessoires: 2500, fichier_central: 1000, tva: 18946, carte_rose: 1000, prime_ttc: 118366 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 97102, dr: 2000, ipt: 7500, prime_nette: 106602, accessoires: 2500, fichier_central: 1000, tva: 21195, carte_rose: 1000, prime_ttc: 132297 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 145454, dr: 2000, ipt: 7500, prime_nette: 154954, accessoires: 2500, fichier_central: 1000, tva: 30502, carte_rose: 1000, prime_ttc: 189956 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 180103, dr: 2000, ipt: 7500, prime_nette: 189603, accessoires: 2500, fichier_central: 1000, tva: 37172, carte_rose: 1000, prime_ttc: 231275 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 208309, dr: 2000, ipt: 7500, prime_nette: 217809, accessoires: 2500, fichier_central: 1000, tva: 42602, carte_rose: 1000, prime_ttc: 264911 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "3",
          nom: "CATEGORIE 3 - SANS REMORQUE",
          description: "Véhicules de transport public de voyageurs, transport de personnel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 94044, dr: 2000, ipt: 5000, prime_nette: 20209, accessoires: 2500, fichier_central: 1000, tva: 4564, carte_rose: 1000, prime_ttc: 29273 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 116045, dr: 2000, ipt: 5000, prime_nette: 24609, accessoires: 2500, fichier_central: 1000, tva: 5411, carte_rose: 1000, prime_ttc: 34520 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 132900, dr: 2000, ipt: 5000, prime_nette: 27980, accessoires: 2500, fichier_central: 1000, tva: 6060, carte_rose: 1000, prime_ttc: 38540 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 196282, dr: 2000, ipt: 5000, prime_nette: 40656, accessoires: 2500, fichier_central: 1000, tva: 8500, carte_rose: 1000, prime_ttc: 53657 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 250210, dr: 2000, ipt: 5000, prime_nette: 51442, accessoires: 2500, fichier_central: 1000, tva: 10576, carte_rose: 1000, prime_ttc: 66518 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 290326, dr: 2000, ipt: 5000, prime_nette: 59465, accessoires: 2500, fichier_central: 1000, tva: 12121, carte_rose: 1000, prime_ttc: 76086 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 94044, dr: 2000, ipt: 5000, prime_nette: 40418, accessoires: 2500, fichier_central: 1000, tva: 8454, carte_rose: 1000, prime_ttc: 53372 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 116045, dr: 2000, ipt: 5000, prime_nette: 49218, accessoires: 2500, fichier_central: 1000, tva: 10148, carte_rose: 1000, prime_ttc: 63866 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 132900, dr: 2000, ipt: 5000, prime_nette: 55960, accessoires: 2500, fichier_central: 1000, tva: 11446, carte_rose: 1000, prime_ttc: 71906 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 196282, dr: 2000, ipt: 5000, prime_nette: 81313, accessoires: 2500, fichier_central: 1000, tva: 16326, carte_rose: 1000, prime_ttc: 102139 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 250210, dr: 2000, ipt: 5000, prime_nette: 102884, accessoires: 2500, fichier_central: 1000, tva: 20479, carte_rose: 1000, prime_ttc: 127863 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 290326, dr: 2000, ipt: 5000, prime_nette: 118930, accessoires: 2500, fichier_central: 1000, tva: 23568, carte_rose: 1000, prime_ttc: 146998 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 94044, dr: 2000, ipt: 5000, prime_nette: 60626, accessoires: 2500, fichier_central: 1000, tva: 12344, carte_rose: 1000, prime_ttc: 77471 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 116045, dr: 2000, ipt: 5000, prime_nette: 73827, accessoires: 2500, fichier_central: 1000, tva: 14885, carte_rose: 1000, prime_ttc: 93212 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 132900, dr: 2000, ipt: 5000, prime_nette: 83940, accessoires: 2500, fichier_central: 1000, tva: 16832, carte_rose: 1000, prime_ttc: 105272 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 196282, dr: 2000, ipt: 5000, prime_nette: 121969, accessoires: 2500, fichier_central: 1000, tva: 24153, carte_rose: 1000, prime_ttc: 150622 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 250210, dr: 2000, ipt: 5000, prime_nette: 154326, accessoires: 2500, fichier_central: 1000, tva: 30382, carte_rose: 1000, prime_ttc: 189208 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 290326, dr: 2000, ipt: 5000, prime_nette: 178396, accessoires: 2500, fichier_central: 1000, tva: 35015, carte_rose: 1000, prime_ttc: 217911 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 94044, dr: 2000, ipt: 5000, prime_nette: 80835, accessoires: 2500, fichier_central: 1000, tva: 16235, carte_rose: 1000, prime_ttc: 101570 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 116045, dr: 2000, ipt: 5000, prime_nette: 98436, accessoires: 2500, fichier_central: 1000, tva: 19623, carte_rose: 1000, prime_ttc: 122559 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 132900, dr: 2000, ipt: 5000, prime_nette: 111920, accessoires: 2500, fichier_central: 1000, tva: 22218, carte_rose: 1000, prime_ttc: 138638 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 196282, dr: 2000, ipt: 5000, prime_nette: 162626, accessoires: 2500, fichier_central: 1000, tva: 31979, carte_rose: 1000, prime_ttc: 199105 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 250210, dr: 2000, ipt: 5000, prime_nette: 205768, accessoires: 2500, fichier_central: 1000, tva: 40284, carte_rose: 1000, prime_ttc: 250552 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 290326, dr: 2000, ipt: 5000, prime_nette: 237861, accessoires: 2500, fichier_central: 1000, tva: 46462, carte_rose: 1000, prime_ttc: 288823 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 94044, dr: 2000, ipt: 5000, prime_nette: 101044, accessoires: 2500, fichier_central: 1000, tva: 20125, carte_rose: 1000, prime_ttc: 125669 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 116045, dr: 2000, ipt: 5000, prime_nette: 123045, accessoires: 2500, fichier_central: 1000, tva: 24360, carte_rose: 1000, prime_ttc: 151905 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 132900, dr: 2000, ipt: 5000, prime_nette: 139900, accessoires: 2500, fichier_central: 1000, tva: 27605, carte_rose: 1000, prime_ttc: 172005 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 196282, dr: 2000, ipt: 5000, prime_nette: 203282, accessoires: 2500, fichier_central: 1000, tva: 39806, carte_rose: 1000, prime_ttc: 247588 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 250210, dr: 2000, ipt: 5000, prime_nette: 257210, accessoires: 2500, fichier_central: 1000, tva: 50187, carte_rose: 1000, prime_ttc: 311897 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 290326, dr: 2000, ipt: 5000, prime_nette: 297326, accessoires: 2500, fichier_central: 1000, tva: 57909, carte_rose: 1000, prime_ttc: 359735 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: 99, montant: 150000 }
          ]
        },
        {
          id: "3_AVEC_REMORQUE",
          nom: "CATEGORIE 3 - AVEC REMORQUE",
          description: "Véhicules de transport public de voyageurs avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: 5000, prime_nette: 25851, accessoires: 2500, fichier_central: 1000, tva: 5650, carte_rose: 1000, prime_ttc: 36002 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: 5000, prime_nette: 31572, accessoires: 2500, fichier_central: 1000, tva: 6751, carte_rose: 1000, prime_ttc: 42823 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: 5000, prime_nette: 35954, accessoires: 2500, fichier_central: 1000, tva: 7595, carte_rose: 1000, prime_ttc: 48049 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: 5000, prime_nette: 52433, accessoires: 2500, fichier_central: 1000, tva: 10767, carte_rose: 1000, prime_ttc: 67701 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: 5000, prime_nette: 66454, accessoires: 2500, fichier_central: 1000, tva: 13466, carte_rose: 1000, prime_ttc: 84421 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: 5000, prime_nette: 76885, accessoires: 2500, fichier_central: 1000, tva: 15474, carte_rose: 1000, prime_ttc: 96859 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: 5000, prime_nette: 51703, accessoires: 2500, fichier_central: 1000, tva: 10627, carte_rose: 1000, prime_ttc: 66829 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: 5000, prime_nette: 63143, accessoires: 2500, fichier_central: 1000, tva: 12829, carte_rose: 1000, prime_ttc: 80472 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: 5000, prime_nette: 71908, accessoires: 2500, fichier_central: 1000, tva: 14516, carte_rose: 1000, prime_ttc: 90925 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: 5000, prime_nette: 104867, accessoires: 2500, fichier_central: 1000, tva: 20861, carte_rose: 1000, prime_ttc: 130227 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: 5000, prime_nette: 132909, accessoires: 2500, fichier_central: 1000, tva: 26259, carte_rose: 1000, prime_ttc: 163667 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: 5000, prime_nette: 153770, accessoires: 2500, fichier_central: 1000, tva: 30275, carte_rose: 1000, prime_ttc: 188545 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: 5000, prime_nette: 77554, accessoires: 2500, fichier_central: 1000, tva: 15603, carte_rose: 1000, prime_ttc: 97657 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: 5000, prime_nette: 94715, accessoires: 2500, fichier_central: 1000, tva: 18906, carte_rose: 1000, prime_ttc: 118121 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: 5000, prime_nette: 107863, accessoires: 2500, fichier_central: 1000, tva: 21437, carte_rose: 1000, prime_ttc: 133800 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: 5000, prime_nette: 157300, accessoires: 2500, fichier_central: 1000, tva: 30954, carte_rose: 1000, prime_ttc: 192754 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: 5000, prime_nette: 199363, accessoires: 2500, fichier_central: 1000, tva: 39051, carte_rose: 1000, prime_ttc: 242914 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: 5000, prime_nette: 230656, accessoires: 2500, fichier_central: 1000, tva: 45075, carte_rose: 1000, prime_ttc: 280231 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: 5000, prime_nette: 103406, accessoires: 2500, fichier_central: 1000, tva: 20579, carte_rose: 1000, prime_ttc: 128485 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: 5000, prime_nette: 126286, accessoires: 2500, fichier_central: 1000, tva: 24984, carte_rose: 1000, prime_ttc: 155770 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: 5000, prime_nette: 143817, accessoires: 2500, fichier_central: 1000, tva: 28358, carte_rose: 1000, prime_ttc: 176675 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: 5000, prime_nette: 209734, accessoires: 2500, fichier_central: 1000, tva: 41047, carte_rose: 1000, prime_ttc: 255281 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: 5000, prime_nette: 265818, accessoires: 2500, fichier_central: 1000, tva: 51844, carte_rose: 1000, prime_ttc: 322161 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: 5000, prime_nette: 307541, accessoires: 2500, fichier_central: 1000, tva: 59875, carte_rose: 1000, prime_ttc: 371916 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: 5000, prime_nette: 129257, accessoires: 2500, fichier_central: 1000, tva: 25556, carte_rose: 1000, prime_ttc: 159313 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: 5000, prime_nette: 157858, accessoires: 2500, fichier_central: 1000, tva: 31061, carte_rose: 1000, prime_ttc: 193419 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: 5000, prime_nette: 179771, accessoires: 2500, fichier_central: 1000, tva: 35280, carte_rose: 1000, prime_ttc: 219551 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: 5000, prime_nette: 262167, accessoires: 2500, fichier_central: 1000, tva: 51141, carte_rose: 1000, prime_ttc: 317808 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: 5000, prime_nette: 332272, accessoires: 2500, fichier_central: 1000, tva: 64636, carte_rose: 1000, prime_ttc: 401408 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: 5000, prime_nette: 384426, accessoires: 2500, fichier_central: 1000, tva: 74676, carte_rose: 1000, prime_ttc: 463602 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: 150000, montant: 150000 }
          ]
        },
        {
          id: "3_REMORQUE_SIMPLE",
          nom: "CATEGORIE 3 - REMORQUE SIMPLE",
          description: "Remorques simples rattachées à la catégorie 3",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 6043, accessoires: 2500, fichier_central: 1000, tva: 1837, carte_rose: 1000, prime_ttc: 12380 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 7363, accessoires: 2500, fichier_central: 1000, tva: 2091, carte_rose: 1000, prime_ttc: 13954 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 8374, accessoires: 2500, fichier_central: 1000, tva: 2286, carte_rose: 1000, prime_ttc: 15160 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 12177, accessoires: 2500, fichier_central: 1000, tva: 3018, carte_rose: 1000, prime_ttc: 19695 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 15412, accessoires: 2500, fichier_central: 1000, tva: 3641, carte_rose: 1000, prime_ttc: 23553 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 17820, accessoires: 2500, fichier_central: 1000, tva: 4104, carte_rose: 1000, prime_ttc: 26424 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 12085, accessoires: 2500, fichier_central: 1000, tva: 3000, carte_rose: 1000, prime_ttc: 19585 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 14725, accessoires: 2500, fichier_central: 1000, tva: 3508, carte_rose: 1000, prime_ttc: 22734 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 16748, accessoires: 2500, fichier_central: 1000, tva: 3898, carte_rose: 1000, prime_ttc: 25146 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 24354, accessoires: 2500, fichier_central: 1000, tva: 5362, carte_rose: 1000, prime_ttc: 34216 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 30825, accessoires: 2500, fichier_central: 1000, tva: 6608, carte_rose: 1000, prime_ttc: 41932 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 35640, accessoires: 2500, fichier_central: 1000, tva: 7534, carte_rose: 1000, prime_ttc: 47674 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 18128, accessoires: 2500, fichier_central: 1000, tva: 4163, carte_rose: 1000, prime_ttc: 26791 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 22088, accessoires: 2500, fichier_central: 1000, tva: 4926, carte_rose: 1000, prime_ttc: 31513 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 25123, accessoires: 2500, fichier_central: 1000, tva: 5510, carte_rose: 1000, prime_ttc: 35132 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 36531, accessoires: 2500, fichier_central: 1000, tva: 7706, carte_rose: 1000, prime_ttc: 48737 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 46237, accessoires: 2500, fichier_central: 1000, tva: 9574, carte_rose: 1000, prime_ttc: 60312 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 53460, accessoires: 2500, fichier_central: 1000, tva: 10965, carte_rose: 1000, prime_ttc: 68925 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 24170, accessoires: 2500, fichier_central: 1000, tva: 5327, carte_rose: 1000, prime_ttc: 33997 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 29450, accessoires: 2500, fichier_central: 1000, tva: 6343, carte_rose: 1000, prime_ttc: 40293 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 33497, accessoires: 2500, fichier_central: 1000, tva: 7122, carte_rose: 1000, prime_ttc: 45119 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 48708, accessoires: 2500, fichier_central: 1000, tva: 10050, carte_rose: 1000, prime_ttc: 63258 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 61650, accessoires: 2500, fichier_central: 1000, tva: 12541, carte_rose: 1000, prime_ttc: 78691 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 71280, accessoires: 2500, fichier_central: 1000, tva: 14395, carte_rose: 1000, prime_ttc: 90175 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 30213, accessoires: 2500, fichier_central: 1000, tva: 6490, carte_rose: 1000, prime_ttc: 41203 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 36813, accessoires: 2500, fichier_central: 1000, tva: 7760, carte_rose: 1000, prime_ttc: 49073 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 41871, accessoires: 2500, fichier_central: 1000, tva: 8734, carte_rose: 1000, prime_ttc: 55105 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 60885, accessoires: 2500, fichier_central: 1000, tva: 12394, carte_rose: 1000, prime_ttc: 77779 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 77062, accessoires: 2500, fichier_central: 1000, tva: 15508, carte_rose: 1000, prime_ttc: 97070 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 89100, accessoires: 2500, fichier_central: 1000, tva: 17826, carte_rose: 1000, prime_ttc: 111426 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: null, montant: 0 }
          ]
        },
        {
          id: "4A",
          nom: "CATEGORIE 4A",
          description: "Taxis de ville",
          durees: [
            {
              label: "3 Mois",
              jours: 90,
              tarifs: [
                { puissance_essence: "3-6CV ESSENCE / 2-4CV DIESEL", puissance_diesel: null, details_prime: { rc: 43605, dr: 500, ipt: 1650, prime_nette: 45755, accessoires: 3000, fichier_central: 0, tva: 9385, carte_rose: 1000, prime_ttc: 59140 } },
                { puissance_essence: "7-10CV ESSENCE / 5-7CV DIESEL", puissance_diesel: null, details_prime: { rc: 48576, dr: 500, ipt: 1650, prime_nette: 50726, accessoires: 3000, fichier_central: 0, tva: 10313, carte_rose: 1000, prime_ttc: 65039 } }
              ]
            },
            {
              label: "6 Mois",
              jours: 180,
              tarifs: [
                { puissance_essence: "3-6CV ESSENCE / 2-4CV DIESEL", puissance_diesel: null, details_prime: { rc: 87210, dr: 1000, ipt: 3300, prime_nette: 91510, accessoires: 3000, fichier_central: 0, tva: 18193, carte_rose: 1000, prime_ttc: 113703 } },
                { puissance_essence: "7-10CV ESSENCE / 5-7CV DIESEL", puissance_diesel: null, details_prime: { rc: 97152, dr: 1000, ipt: 3300, prime_nette: 101452, accessoires: 3000, fichier_central: 0, tva: 20051, carte_rose: 1000, prime_ttc: 125503 } }
              ]
            },
            {
              label: "12 Mois (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "3-6CV ESSENCE / 2-4CV DIESEL", puissance_diesel: null, details_prime: { rc: 174420, dr: 2000, ipt: 6600, prime_nette: 183020, accessoires: 3000, fichier_central: 0, tva: 35809, carte_rose: 1000, prime_ttc: 222829 } },
                { puissance_essence: "7-10CV ESSENCE / 5-7CV DIESEL", puissance_diesel: null, details_prime: { rc: 194304, dr: 2000, ipt: 6600, prime_nette: 202904, accessoires: 3000, fichier_central: 0, tva: 39637, carte_rose: 1000, prime_ttc: 246541 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 }
          ]
        },
        {
          id: "5A_SANS_REMORQUE",
          nom: "CATEGORIE 5A - SANS REMORQUE",
          description: "Motos et Scooters sans remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 7732, dr: 2000, ipt: 5000, prime_nette: 14732, accessoires: 2500, fichier_central: 500, tva: 3413, carte_rose: 1000, prime_ttc: 22145 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 10739, dr: 2000, ipt: 5000, prime_nette: 17739, accessoires: 2500, fichier_central: 500, tva: 3992, carte_rose: 1000, prime_ttc: 25731 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 16110, dr: 2000, ipt: 5000, prime_nette: 23110, accessoires: 2500, fichier_central: 500, tva: 5026, carte_rose: 1000, prime_ttc: 32136 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 18580, dr: 2000, ipt: 5000, prime_nette: 25580, accessoires: 2500, fichier_central: 500, tva: 5502, carte_rose: 1000, prime_ttc: 35082 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 22984, dr: 2000, ipt: 5000, prime_nette: 29984, accessoires: 2500, fichier_central: 500, tva: 6349, carte_rose: 1000, prime_ttc: 40333 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 26850, dr: 2000, ipt: 5000, prime_nette: 33850, accessoires: 2500, fichier_central: 500, tva: 7094, carte_rose: 1000, prime_ttc: 44944 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 30930, dr: 2000, ipt: 5000, prime_nette: 37930, accessoires: 2500, fichier_central: 500, tva: 7879, carte_rose: 1000, prime_ttc: 49809 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 34045, dr: 2000, ipt: 5000, prime_nette: 41045, accessoires: 2500, fichier_central: 500, tva: 8479, carte_rose: 1000, prime_ttc: 53524 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 38078, dr: 2000, ipt: 5000, prime_nette: 45078, accessoires: 2500, fichier_central: 500, tva: 9255, carte_rose: 1000, prime_ttc: 58333 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "5A_AVEC_REMORQUE",
          nom: "CATEGORIE 5A - AVEC REMORQUE",
          description: "Motos et Scooters avec remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 9277, dr: 2000, ipt: 5000, prime_nette: 16277, accessoires: 2500, fichier_central: 500, tva: 3711, carte_rose: 1000, prime_ttc: 23988 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 12886, dr: 2000, ipt: 5000, prime_nette: 19886, accessoires: 2500, fichier_central: 500, tva: 4406, carte_rose: 1000, prime_ttc: 28292 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 19332, dr: 2000, ipt: 5000, prime_nette: 26332, accessoires: 2500, fichier_central: 500, tva: 5646, carte_rose: 1000, prime_ttc: 35978 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 22295, dr: 2000, ipt: 5000, prime_nette: 29295, accessoires: 2500, fichier_central: 500, tva: 6217, carte_rose: 1000, prime_ttc: 39512 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 27580, dr: 2000, ipt: 5000, prime_nette: 34580, accessoires: 2500, fichier_central: 500, tva: 7234, carte_rose: 1000, prime_ttc: 45814 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 32220, dr: 2000, ipt: 5000, prime_nette: 39220, accessoires: 2500, fichier_central: 500, tva: 8127, carte_rose: 1000, prime_ttc: 51347 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 37116, dr: 2000, ipt: 5000, prime_nette: 44116, accessoires: 2500, fichier_central: 500, tva: 9070, carte_rose: 1000, prime_ttc: 57186 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 40854, dr: 2000, ipt: 5000, prime_nette: 47854, accessoires: 2500, fichier_central: 500, tva: 9789, carte_rose: 1000, prime_ttc: 61643 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 45694, dr: 2000, ipt: 5000, prime_nette: 52694, accessoires: 2500, fichier_central: 500, tva: 10721, carte_rose: 1000, prime_ttc: 67415 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
      ],
    },
    {
      nom: "ZONE B",
      categories: [
        {
          id: "1",
          nom: "CATEGORIE 1",
          description: "Véhicules de tourisme et de promenade",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 50311, dr: 2000, ipt: 7500, prime_nette: 11962, accessoires: 2500, fichier_central: 1000, tva: 2976, carte_rose: 1000, prime_ttc: 19439 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 61126, dr: 2000, ipt: 7500, prime_nette: 14125, accessoires: 2500, fichier_central: 1000, tva: 3393, carte_rose: 1000, prime_ttc: 22018 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 67924, dr: 2000, ipt: 7500, prime_nette: 15485, accessoires: 2500, fichier_central: 1000, tva: 3655, carte_rose: 1000, prime_ttc: 23639 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 88643, dr: 2000, ipt: 7500, prime_nette: 19629, accessoires: 2500, fichier_central: 1000, tva: 4452, carte_rose: 1000, prime_ttc: 28581 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 112858, dr: 2000, ipt: 7500, prime_nette: 24472, accessoires: 2500, fichier_central: 1000, tva: 5385, carte_rose: 1000, prime_ttc: 34356 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 133077, dr: 2000, ipt: 7500, prime_nette: 28515, accessoires: 2500, fichier_central: 1000, tva: 6163, carte_rose: 1000, prime_ttc: 39178 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 50311, dr: 2000, ipt: 7500, prime_nette: 23924, accessoires: 2500, fichier_central: 1000, tva: 5279, carte_rose: 1000, prime_ttc: 33704 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 61126, dr: 2000, ipt: 7500, prime_nette: 28250, accessoires: 2500, fichier_central: 1000, tva: 6112, carte_rose: 1000, prime_ttc: 38862 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 67924, dr: 2000, ipt: 7500, prime_nette: 30970, accessoires: 2500, fichier_central: 1000, tva: 6635, carte_rose: 1000, prime_ttc: 42105 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 88643, dr: 2000, ipt: 7500, prime_nette: 39257, accessoires: 2500, fichier_central: 1000, tva: 8231, carte_rose: 1000, prime_ttc: 51988 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 112858, dr: 2000, ipt: 7500, prime_nette: 48943, accessoires: 2500, fichier_central: 1000, tva: 10095, carte_rose: 1000, prime_ttc: 63539 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 133077, dr: 2000, ipt: 7500, prime_nette: 57031, accessoires: 2500, fichier_central: 1000, tva: 11652, carte_rose: 1000, prime_ttc: 73183 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 50311, dr: 2000, ipt: 7500, prime_nette: 35887, accessoires: 2500, fichier_central: 1000, tva: 7582, carte_rose: 1000, prime_ttc: 47969 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 61126, dr: 2000, ipt: 7500, prime_nette: 42376, accessoires: 2500, fichier_central: 1000, tva: 8831, carte_rose: 1000, prime_ttc: 55707 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 67924, dr: 2000, ipt: 7500, prime_nette: 46454, accessoires: 2500, fichier_central: 1000, tva: 9616, carte_rose: 1000, prime_ttc: 60571 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 88643, dr: 2000, ipt: 7500, prime_nette: 58886, accessoires: 2500, fichier_central: 1000, tva: 12009, carte_rose: 1000, prime_ttc: 75355 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 112858, dr: 2000, ipt: 7500, prime_nette: 73415, accessoires: 2500, fichier_central: 1000, tva: 14806, carte_rose: 1000, prime_ttc: 92721 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 133077, dr: 2000, ipt: 7500, prime_nette: 85546, accessoires: 2500, fichier_central: 1000, tva: 17141, carte_rose: 1000, prime_ttc: 107188 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 50311, dr: 2000, ipt: 7500, prime_nette: 47849, accessoires: 2500, fichier_central: 1000, tva: 9885, carte_rose: 1000, prime_ttc: 62233 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 61126, dr: 2000, ipt: 7500, prime_nette: 56501, accessoires: 2500, fichier_central: 1000, tva: 11550, carte_rose: 1000, prime_ttc: 72551 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 67924, dr: 2000, ipt: 7500, prime_nette: 61939, accessoires: 2500, fichier_central: 1000, tva: 12597, carte_rose: 1000, prime_ttc: 79036 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 88643, dr: 2000, ipt: 7500, prime_nette: 78514, accessoires: 2500, fichier_central: 1000, tva: 15788, carte_rose: 1000, prime_ttc: 98802 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 112858, dr: 2000, ipt: 7500, prime_nette: 97886, accessoires: 2500, fichier_central: 1000, tva: 19517, carte_rose: 1000, prime_ttc: 121903 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 133077, dr: 2000, ipt: 7500, prime_nette: 114062, accessoires: 2500, fichier_central: 1000, tva: 22631, carte_rose: 1000, prime_ttc: 141192 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 50311, dr: 2000, ipt: 7500, prime_nette: 59811, accessoires: 2500, fichier_central: 1000, tva: 12187, carte_rose: 1000, prime_ttc: 76498 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 61126, dr: 2000, ipt: 7500, prime_nette: 70626, accessoires: 2500, fichier_central: 1000, tva: 14269, carte_rose: 1000, prime_ttc: 89395 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 67924, dr: 2000, ipt: 7500, prime_nette: 77424, accessoires: 2500, fichier_central: 1000, tva: 15578, carte_rose: 1000, prime_ttc: 97502 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 88643, dr: 2000, ipt: 7500, prime_nette: 98143, accessoires: 2500, fichier_central: 1000, tva: 19566, carte_rose: 1000, prime_ttc: 122209 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 112858, dr: 2000, ipt: 7500, prime_nette: 122358, accessoires: 3150, fichier_central: 1000, tva: 24353, carte_rose: 1000, prime_ttc: 151861 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 133077, dr: 2000, ipt: 7500, prime_nette: 142577, accessoires: 3150, fichier_central: 1000, tva: 28245, carte_rose: 1000, prime_ttc: 175972 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2",
          nom: "CATEGORIE 2 - SANS REMORQUE",
          description: "Véhicules de transport d'objets, marchandises ou matériel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 56311, dr: 2000, ipt: 7500, prime_nette: 13162, accessoires: 2500, fichier_central: 1000, tva: 3207, carte_rose: 1000, prime_ttc: 20870 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 68217, dr: 2000, ipt: 7500, prime_nette: 15543, accessoires: 2500, fichier_central: 1000, tva: 3666, carte_rose: 1000, prime_ttc: 23709 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 77547, dr: 2000, ipt: 7500, prime_nette: 17409, accessoires: 2500, fichier_central: 1000, tva: 4025, carte_rose: 1000, prime_ttc: 25934 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 116162, dr: 2000, ipt: 7500, prime_nette: 25132, accessoires: 2500, fichier_central: 1000, tva: 5512, carte_rose: 1000, prime_ttc: 35144 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 143833, dr: 2000, ipt: 7500, prime_nette: 30667, accessoires: 2500, fichier_central: 1000, tva: 6577, carte_rose: 1000, prime_ttc: 41744 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 166358, dr: 2000, ipt: 7500, prime_nette: 35172, accessoires: 2500, fichier_central: 1000, tva: 7444, carte_rose: 1000, prime_ttc: 47116 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 56311, dr: 2000, ipt: 7500, prime_nette: 26324, accessoires: 2500, fichier_central: 1000, tva: 5741, carte_rose: 1000, prime_ttc: 36566 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 68217, dr: 2000, ipt: 7500, prime_nette: 31087, accessoires: 2500, fichier_central: 1000, tva: 6658, carte_rose: 1000, prime_ttc: 42245 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 77547, dr: 2000, ipt: 7500, prime_nette: 34819, accessoires: 2500, fichier_central: 1000, tva: 7376, carte_rose: 1000, prime_ttc: 46695 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 116162, dr: 2000, ipt: 7500, prime_nette: 50265, accessoires: 2500, fichier_central: 1000, tva: 10350, carte_rose: 1000, prime_ttc: 65115 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 143833, dr: 2000, ipt: 7500, prime_nette: 61333, accessoires: 2500, fichier_central: 1000, tva: 12480, carte_rose: 1000, prime_ttc: 78314 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 166358, dr: 2000, ipt: 7500, prime_nette: 70343, accessoires: 2500, fichier_central: 1000, tva: 14215, carte_rose: 1000, prime_ttc: 89058 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 56311, dr: 2000, ipt: 7500, prime_nette: 39487, accessoires: 2500, fichier_central: 1000, tva: 8275, carte_rose: 1000, prime_ttc: 52262 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 68217, dr: 2000, ipt: 7500, prime_nette: 46630, accessoires: 2500, fichier_central: 1000, tva: 9650, carte_rose: 1000, prime_ttc: 60780 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 77547, dr: 2000, ipt: 7500, prime_nette: 52228, accessoires: 2500, fichier_central: 1000, tva: 10728, carte_rose: 1000, prime_ttc: 67456 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 116162, dr: 2000, ipt: 7500, prime_nette: 75397, accessoires: 2500, fichier_central: 1000, tva: 15188, carte_rose: 1000, prime_ttc: 95085 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 143833, dr: 2000, ipt: 7500, prime_nette: 92000, accessoires: 2500, fichier_central: 1000, tva: 18384, carte_rose: 1000, prime_ttc: 114884 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 166358, dr: 2000, ipt: 7500, prime_nette: 105515, accessoires: 2500, fichier_central: 1000, tva: 20985, carte_rose: 1000, prime_ttc: 131000 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 56311, dr: 2000, ipt: 7500, prime_nette: 52649, accessoires: 2500, fichier_central: 1000, tva: 10809, carte_rose: 1000, prime_ttc: 67957 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 68217, dr: 2000, ipt: 7500, prime_nette: 62174, accessoires: 2500, fichier_central: 1000, tva: 12642, carte_rose: 1000, prime_ttc: 79316 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 77547, dr: 2000, ipt: 7500, prime_nette: 69638, accessoires: 2500, fichier_central: 1000, tva: 14079, carte_rose: 1000, prime_ttc: 88217 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 116162, dr: 2000, ipt: 7500, prime_nette: 100530, accessoires: 2500, fichier_central: 1000, tva: 20026, carte_rose: 1000, prime_ttc: 125055 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 143833, dr: 2000, ipt: 7500, prime_nette: 122666, accessoires: 2500, fichier_central: 1000, tva: 24287, carte_rose: 1000, prime_ttc: 151453 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 166358, dr: 2000, ipt: 7500, prime_nette: 140686, accessoires: 2500, fichier_central: 1000, tva: 27756, carte_rose: 1000, prime_ttc: 172942 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 56311, dr: 2000, ipt: 7500, prime_nette: 65811, accessoires: 2500, fichier_central: 1000, tva: 13342, carte_rose: 1000, prime_ttc: 83653 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 68217, dr: 2000, ipt: 7500, prime_nette: 77717, accessoires: 2500, fichier_central: 1000, tva: 15634, carte_rose: 1000, prime_ttc: 97851 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 77547, dr: 2000, ipt: 7500, prime_nette: 87047, accessoires: 2500, fichier_central: 1000, tva: 17430, carte_rose: 1000, prime_ttc: 108977 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 116162, dr: 2000, ipt: 7500, prime_nette: 125662, accessoires: 2500, fichier_central: 1000, tva: 24864, carte_rose: 1000, prime_ttc: 155026 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 143833, dr: 2000, ipt: 7500, prime_nette: 153333, accessoires: 2500, fichier_central: 1000, tva: 30190, carte_rose: 1000, prime_ttc: 188023 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 166358, dr: 2000, ipt: 7500, prime_nette: 175858, accessoires: 2500, fichier_central: 1000, tva: 34526, carte_rose: 1000, prime_ttc: 214884 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2_AVEC_REMORQUE",
          nom: "CATEGORIE 2 - AVEC REMORQUE",
          description: "Véhicules de transport d'objets ou de matériel avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 67566, dr: 2000, ipt: 7500, prime_nette: 15413, accessoires: 2500, fichier_central: 1000, tva: 3641, carte_rose: 1000, prime_ttc: 23554 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 81860, dr: 2000, ipt: 7500, prime_nette: 18272, accessoires: 2500, fichier_central: 1000, tva: 4191, carte_rose: 1000, prime_ttc: 26963 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 93056, dr: 2000, ipt: 7500, prime_nette: 20511, accessoires: 2500, fichier_central: 1000, tva: 4622, carte_rose: 1000, prime_ttc: 29633 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 139394, dr: 2000, ipt: 7500, prime_nette: 29779, accessoires: 2500, fichier_central: 1000, tva: 6406, carte_rose: 1000, prime_ttc: 40685 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 172599, dr: 2000, ipt: 7500, prime_nette: 36420, accessoires: 2500, fichier_central: 1000, tva: 7685, carte_rose: 1000, prime_ttc: 48604 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 199630, dr: 2000, ipt: 7500, prime_nette: 41826, accessoires: 2500, fichier_central: 1000, tva: 8725, carte_rose: 1000, prime_ttc: 55051 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 67566, dr: 2000, ipt: 7500, prime_nette: 30826, accessoires: 2500, fichier_central: 1000, tva: 6608, carte_rose: 1000, prime_ttc: 41934 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 81860, dr: 2000, ipt: 7500, prime_nette: 36544, accessoires: 2500, fichier_central: 1000, tva: 7708, carte_rose: 1000, prime_ttc: 48752 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 93056, dr: 2000, ipt: 7500, prime_nette: 41022, accessoires: 2500, fichier_central: 1000, tva: 8571, carte_rose: 1000, prime_ttc: 54093 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 139394, dr: 2000, ipt: 7500, prime_nette: 59558, accessoires: 2500, fichier_central: 1000, tva: 12139, carte_rose: 1000, prime_ttc: 76196 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 172599, dr: 2000, ipt: 7500, prime_nette: 72840, accessoires: 2500, fichier_central: 1000, tva: 14695, carte_rose: 1000, prime_ttc: 92035 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 199630, dr: 2000, ipt: 7500, prime_nette: 83652, accessoires: 2500, fichier_central: 1000, tva: 16777, carte_rose: 1000, prime_ttc: 104929 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 67566, dr: 2000, ipt: 7500, prime_nette: 46240, accessoires: 2500, fichier_central: 1000, tva: 9575, carte_rose: 1000, prime_ttc: 60314 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 81860, dr: 2000, ipt: 7500, prime_nette: 54816, accessoires: 2500, fichier_central: 1000, tva: 11226, carte_rose: 1000, prime_ttc: 70542 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 93056, dr: 2000, ipt: 7500, prime_nette: 61534, accessoires: 2500, fichier_central: 1000, tva: 12519, carte_rose: 1000, prime_ttc: 78553 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 139394, dr: 2000, ipt: 7500, prime_nette: 89336, accessoires: 2500, fichier_central: 1000, tva: 17871, carte_rose: 1000, prime_ttc: 111707 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 172599, dr: 2000, ipt: 7500, prime_nette: 109259, accessoires: 2500, fichier_central: 1000, tva: 21706, carte_rose: 1000, prime_ttc: 135466 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 199630, dr: 2000, ipt: 7500, prime_nette: 125478, accessoires: 2500, fichier_central: 1000, tva: 24828, carte_rose: 1000, prime_ttc: 154806 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 67566, dr: 2000, ipt: 7500, prime_nette: 61653, accessoires: 2500, fichier_central: 1000, tva: 12542, carte_rose: 1000, prime_ttc: 78695 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 81860, dr: 2000, ipt: 7500, prime_nette: 73088, accessoires: 2500, fichier_central: 1000, tva: 14743, carte_rose: 1000, prime_ttc: 92331 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 93056, dr: 2000, ipt: 7500, prime_nette: 82045, accessoires: 2500, fichier_central: 1000, tva: 16467, carte_rose: 1000, prime_ttc: 103012 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 139394, dr: 2000, ipt: 7500, prime_nette: 119115, accessoires: 2500, fichier_central: 1000, tva: 23603, carte_rose: 1000, prime_ttc: 147219 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 172599, dr: 2000, ipt: 7500, prime_nette: 145679, accessoires: 2500, fichier_central: 1000, tva: 28717, carte_rose: 1000, prime_ttc: 178896 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 199630, dr: 2000, ipt: 7500, prime_nette: 167304, accessoires: 2500, fichier_central: 1000, tva: 32880, carte_rose: 1000, prime_ttc: 204684 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 67566, dr: 2000, ipt: 7500, prime_nette: 77066, accessoires: 2500, fichier_central: 1000, tva: 15509, carte_rose: 1000, prime_ttc: 97075 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 81860, dr: 2000, ipt: 7500, prime_nette: 91360, accessoires: 2500, fichier_central: 1000, tva: 18261, carte_rose: 1000, prime_ttc: 114121 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 93056, dr: 2000, ipt: 7500, prime_nette: 102556, accessoires: 2500, fichier_central: 1000, tva: 20416, carte_rose: 1000, prime_ttc: 127472 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 139394, dr: 2000, ipt: 7500, prime_nette: 148894, accessoires: 2500, fichier_central: 1000, tva: 29336, carte_rose: 1000, prime_ttc: 182730 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 172599, dr: 2000, ipt: 7500, prime_nette: 182099, accessoires: 2500, fichier_central: 1000, tva: 35728, carte_rose: 1000, prime_ttc: 222327 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 199630, dr: 2000, ipt: 7500, prime_nette: 209130, accessoires: 2500, fichier_central: 1000, tva: 40931, carte_rose: 1000, prime_ttc: 254561 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "3",
          nom: "CATEGORIE 3 - SANS REMORQUE",
          description: "Véhicules de transport public de voyageurs, transport de personnel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 90126, dr: 2000, ipt: 5000, prime_nette: 19425, accessoires: 2500, fichier_central: 1000, tva: 4413, carte_rose: 1000, prime_ttc: 28338 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 111210, dr: 2000, ipt: 5000, prime_nette: 23642, accessoires: 2500, fichier_central: 1000, tva: 5225, carte_rose: 1000, prime_ttc: 33367 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 127363, dr: 2000, ipt: 5000, prime_nette: 26873, accessoires: 2500, fichier_central: 1000, tva: 5847, carte_rose: 1000, prime_ttc: 37219 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 188103, dr: 2000, ipt: 5000, prime_nette: 39021, accessoires: 2500, fichier_central: 1000, tva: 8185, carte_rose: 1000, prime_ttc: 51706 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 239784, dr: 2000, ipt: 5000, prime_nette: 49357, accessoires: 2500, fichier_central: 1000, tva: 10175, carte_rose: 1000, prime_ttc: 64032 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 278229, dr: 2000, ipt: 5000, prime_nette: 57046, accessoires: 2500, fichier_central: 1000, tva: 11655, carte_rose: 1000, prime_ttc: 73201 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 90126, dr: 2000, ipt: 5000, prime_nette: 38850, accessoires: 2500, fichier_central: 1000, tva: 8152, carte_rose: 1000, prime_ttc: 51503 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 111210, dr: 2000, ipt: 5000, prime_nette: 47284, accessoires: 2500, fichier_central: 1000, tva: 9776, carte_rose: 1000, prime_ttc: 61560 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 127363, dr: 2000, ipt: 7500, prime_nette: 53745, accessoires: 2500, fichier_central: 1000, tva: 11020, carte_rose: 1000, prime_ttc: 69265 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 188103, dr: 2000, ipt: 7500, prime_nette: 78041, accessoires: 2500, fichier_central: 1000, tva: 15697, carte_rose: 1000, prime_ttc: 98238 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 239784, dr: 2000, ipt: 7500, prime_nette: 98714, accessoires: 2500, fichier_central: 1000, tva: 19676, carte_rose: 1000, prime_ttc: 122890 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 278229, dr: 2000, ipt: 7500, prime_nette: 114092, accessoires: 2500, fichier_central: 1000, tva: 22636, carte_rose: 1000, prime_ttc: 141228 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 90126, dr: 2000, ipt: 5000, prime_nette: 58276, accessoires: 2500, fichier_central: 1000, tva: 11892, carte_rose: 1000, prime_ttc: 74667 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 111210, dr: 2000, ipt: 5000, prime_nette: 70926, accessoires: 2500, fichier_central: 1000, tva: 14327, carte_rose: 1000, prime_ttc: 89753 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 127363, dr: 2000, ipt: 5000, prime_nette: 80618, accessoires: 2500, fichier_central: 1000, tva: 16193, carte_rose: 1000, prime_ttc: 101310 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 188103, dr: 2000, ipt: 5000, prime_nette: 117062, accessoires: 2500, fichier_central: 1000, tva: 23208, carte_rose: 1000, prime_ttc: 144770 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 239784, dr: 2000, ipt: 5000, prime_nette: 148070, accessoires: 2500, fichier_central: 1000, tva: 29177, carte_rose: 1000, prime_ttc: 181748 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 278229, dr: 2000, ipt: 5000, prime_nette: 171137, accessoires: 2500, fichier_central: 1000, tva: 33618, carte_rose: 1000, prime_ttc: 209255 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 90126, dr: 2000, ipt: 5000, prime_nette: 77701, accessoires: 2500, fichier_central: 1000, tva: 15631, carte_rose: 1000, prime_ttc: 97832 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 111210, dr: 2000, ipt: 5000, prime_nette: 94568, accessoires: 2500, fichier_central: 1000, tva: 18878, carte_rose: 1000, prime_ttc: 117946 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 127363, dr: 2000, ipt: 5000, prime_nette: 107490, accessoires: 2500, fichier_central: 1000, tva: 21366, carte_rose: 1000, prime_ttc: 133356 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 188103, dr: 2000, ipt: 5000, prime_nette: 156082, accessoires: 2500, fichier_central: 1000, tva: 30720, carte_rose: 1000, prime_ttc: 191302 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 239784, dr: 2000, ipt: 5000, prime_nette: 197427, accessoires: 2500, fichier_central: 1000, tva: 38678, carte_rose: 1000, prime_ttc: 240606 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 278229, dr: 2000, ipt: 5000, prime_nette: 228183, accessoires: 2500, fichier_central: 1000, tva: 44599, carte_rose: 1000, prime_ttc: 277282 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 90126, dr: 2000, ipt: 5000, prime_nette: 97126, accessoires: 2500, fichier_central: 1000, tva: 19371, carte_rose: 1000, prime_ttc: 120997 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 111210, dr: 2000, ipt: 5000, prime_nette: 118210, accessoires: 2500, fichier_central: 1000, tva: 23429, carte_rose: 1000, prime_ttc: 146139 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 127363, dr: 2000, ipt: 5000, prime_nette: 134363, accessoires: 2500, fichier_central: 1000, tva: 26539, carte_rose: 1000, prime_ttc: 165402 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 188103, dr: 2000, ipt: 5000, prime_nette: 195103, accessoires: 2500, fichier_central: 1000, tva: 38231, carte_rose: 1000, prime_ttc: 237834 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 239784, dr: 2000, ipt: 5000, prime_nette: 246784, accessoires: 2500, fichier_central: 1000, tva: 48180, carte_rose: 1000, prime_ttc: 299464 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 278229, dr: 2000, ipt: 5000, prime_nette: 285229, accessoires: 2500, fichier_central: 1000, tva: 55580, carte_rose: 1000, prime_ttc: 345309 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: 99, montant: 150000 }
          ]
        },
        {
          id: "3_AVEC_REMORQUE",
          nom: "CATEGORIE 3 - AVEC REMORQUE",
          description: "Véhicules de transport public de voyageurs avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 117163, dr: 2000, ipt: 5000, prime_nette: 24833, accessoires: 2500, fichier_central: 1000, tva: 5454, carte_rose: 1000, prime_ttc: 34787 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 144572, dr: 2000, ipt: 5000, prime_nette: 30314, accessoires: 2500, fichier_central: 1000, tva: 6509, carte_rose: 1000, prime_ttc: 41324 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 165572, dr: 2000, ipt: 5000, prime_nette: 34514, accessoires: 2500, fichier_central: 1000, tva: 7318, carte_rose: 1000, prime_ttc: 46332 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 244535, dr: 2000, ipt: 5000, prime_nette: 50307, accessoires: 2500, fichier_central: 1000, tva: 10358, carte_rose: 1000, prime_ttc: 65165 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 311719, dr: 2000, ipt: 5000, prime_nette: 63744, accessoires: 2500, fichier_central: 1000, tva: 12944, carte_rose: 1000, prime_ttc: 81188 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 361700, dr: 2000, ipt: 5000, prime_nette: 73740, accessoires: 2500, fichier_central: 1000, tva: 14869, carte_rose: 1000, prime_ttc: 93109 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 117163, dr: 2000, ipt: 5000, prime_nette: 49665, accessoires: 2500, fichier_central: 1000, tva: 10234, carte_rose: 1000, prime_ttc: 64400 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 144572, dr: 2000, ipt: 5000, prime_nette: 60629, accessoires: 2500, fichier_central: 1000, tva: 12345, carte_rose: 1000, prime_ttc: 77474 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 165572, dr: 2000, ipt: 5000, prime_nette: 69029, accessoires: 2500, fichier_central: 1000, tva: 13962, carte_rose: 1000, prime_ttc: 87491 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 244535, dr: 2000, ipt: 5000, prime_nette: 100614, accessoires: 2500, fichier_central: 1000, tva: 20042, carte_rose: 1000, prime_ttc: 125156 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 311719, dr: 2000, ipt: 5000, prime_nette: 127488, accessoires: 2500, fichier_central: 1000, tva: 25215, carte_rose: 1000, prime_ttc: 157203 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 361700, dr: 2000, ipt: 5000, prime_nette: 147480, accessoires: 2500, fichier_central: 1000, tva: 29064, carte_rose: 1000, prime_ttc: 181044 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 117163, dr: 2000, ipt: 5000, prime_nette: 74498, accessoires: 2500, fichier_central: 1000, tva: 15015, carte_rose: 1000, prime_ttc: 94012 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 144572, dr: 2000, ipt: 5000, prime_nette: 90943, accessoires: 2500, fichier_central: 1000, tva: 18180, carte_rose: 1000, prime_ttc: 113624 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 165572, dr: 2000, ipt: 5000, prime_nette: 103543, accessoires: 2500, fichier_central: 1000, tva: 20606, carte_rose: 1000, prime_ttc: 128649 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 244535, dr: 2000, ipt: 5000, prime_nette: 150921, accessoires: 2500, fichier_central: 1000, tva: 29726, carte_rose: 1000, prime_ttc: 185147 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 311719, dr: 2000, ipt: 5000, prime_nette: 191231, accessoires: 2500, fichier_central: 1000, tva: 37486, carte_rose: 1000, prime_ttc: 233217 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 361700, dr: 2000, ipt: 5000, prime_nette: 221220, accessoires: 2500, fichier_central: 1000, tva: 43259, carte_rose: 1000, prime_ttc: 268979 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 117163, dr: 2000, ipt: 5000, prime_nette: 99330, accessoires: 2500, fichier_central: 1000, tva: 19795, carte_rose: 1000, prime_ttc: 123625 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 144572, dr: 2000, ipt: 5000, prime_nette: 121258, accessoires: 2500, fichier_central: 1000, tva: 24016, carte_rose: 1000, prime_ttc: 149773 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 165572, dr: 2000, ipt: 5000, prime_nette: 138058, accessoires: 2500, fichier_central: 1000, tva: 27250, carte_rose: 1000, prime_ttc: 169807 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 244535, dr: 2000, ipt: 5000, prime_nette: 201228, accessoires: 2500, fichier_central: 1000, tva: 39410, carte_rose: 1000, prime_ttc: 245138 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 311719, dr: 2000, ipt: 5000, prime_nette: 254975, accessoires: 2500, fichier_central: 1000, tva: 49756, carte_rose: 1000, prime_ttc: 309232 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 361700, dr: 2000, ipt: 5000, prime_nette: 294960, accessoires: 2500, fichier_central: 1000, tva: 57454, carte_rose: 1000, prime_ttc: 356914 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 117163, dr: 2000, ipt: 5000, prime_nette: 124163, accessoires: 2500, fichier_central: 1000, tva: 24575, carte_rose: 1000, prime_ttc: 153238 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 144572, dr: 2000, ipt: 5000, prime_nette: 151572, accessoires: 2500, fichier_central: 1000, tva: 29851, carte_rose: 1000, prime_ttc: 185923 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 165572, dr: 2000, ipt: 5000, prime_nette: 172572, accessoires: 2500, fichier_central: 1000, tva: 33894, carte_rose: 1000, prime_ttc: 210966 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 244535, dr: 2000, ipt: 5000, prime_nette: 251535, accessoires: 2500, fichier_central: 1000, tva: 49094, carte_rose: 1000, prime_ttc: 305129 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 311719, dr: 2000, ipt: 5000, prime_nette: 318719, accessoires: 2500, fichier_central: 1000, tva: 62027, carte_rose: 1000, prime_ttc: 385246 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 361700, dr: 2000, ipt: 5000, prime_nette: 368700, accessoires: 2500, fichier_central: 1000, tva: 71649, carte_rose: 1000, prime_ttc: 444849 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: 150000, montant: 150000 }
          ]
        },
        {
          id: "3_REMORQUE_SIMPLE",
          nom: "CATEGORIE 3 - REMORQUE SIMPLE",
          description: "Remorques simples rattachées à la catégorie 3",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 27037, dr: 2000, ipt: null, prime_nette: 5807, accessoires: 2500, fichier_central: 1000, tva: 1792, carte_rose: 1000, prime_ttc: 12099 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 33362, dr: 2000, ipt: null, prime_nette: 7072, accessoires: 2500, fichier_central: 1000, tva: 2035, carte_rose: 1000, prime_ttc: 13608 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 38209, dr: 2000, ipt: null, prime_nette: 8042, accessoires: 2500, fichier_central: 1000, tva: 2222, carte_rose: 1000, prime_ttc: 14764 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 56432, dr: 2000, ipt: null, prime_nette: 11686, accessoires: 2500, fichier_central: 1000, tva: 2923, carte_rose: 1000, prime_ttc: 19110 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 71935, dr: 2000, ipt: null, prime_nette: 14787, accessoires: 2500, fichier_central: 1000, tva: 3520, carte_rose: 1000, prime_ttc: 22807 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 83471, dr: 2000, ipt: null, prime_nette: 17094, accessoires: 2500, fichier_central: 1000, tva: 3964, carte_rose: 1000, prime_ttc: 25559 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 122257, dr: 2000, ipt: null, prime_nette: 49703, accessoires: 2500, fichier_central: 1000, tva: 10242, carte_rose: 1000, prime_ttc: 64444 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 150858, dr: 2000, ipt: null, prime_nette: 61143, accessoires: 2500, fichier_central: 1000, tva: 12444, carte_rose: 1000, prime_ttc: 78087 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 172771, dr: 2000, ipt: null, prime_nette: 69908, accessoires: 2500, fichier_central: 1000, tva: 14131, carte_rose: 1000, prime_ttc: 88540 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 255167, dr: 2000, ipt: null, prime_nette: 102867, accessoires: 2500, fichier_central: 1000, tva: 20476, carte_rose: 1000, prime_ttc: 127842 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 325272, dr: 2000, ipt: null, prime_nette: 130909, accessoires: 2500, fichier_central: 1000, tva: 25874, carte_rose: 1000, prime_ttc: 161282 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 377426, dr: 2000, ipt: null, prime_nette: 151770, accessoires: 2500, fichier_central: 1000, tva: 29890, carte_rose: 1000, prime_ttc: 186160 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 18128, accessoires: 2500, fichier_central: 1000, tva: 4163, carte_rose: 1000, prime_ttc: 26791 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 22088, accessoires: 2500, fichier_central: 1000, tva: 4926, carte_rose: 1000, prime_ttc: 31513 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 25123, accessoires: 2500, fichier_central: 1000, tva: 5510, carte_rose: 1000, prime_ttc: 35132 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 36531, accessoires: 2500, fichier_central: 1000, tva: 7706, carte_rose: 1000, prime_ttc: 48737 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 46237, accessoires: 2500, fichier_central: 1000, tva: 9574, carte_rose: 1000, prime_ttc: 60312 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 53460, accessoires: 2500, fichier_central: 1000, tva: 10965, carte_rose: 1000, prime_ttc: 68925 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 24170, accessoires: 2500, fichier_central: 1000, tva: 5327, carte_rose: 1000, prime_ttc: 33997 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 29450, accessoires: 2500, fichier_central: 1000, tva: 6343, carte_rose: 1000, prime_ttc: 40293 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 33497, accessoires: 2500, fichier_central: 1000, tva: 7122, carte_rose: 1000, prime_ttc: 45119 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 48708, accessoires: 2500, fichier_central: 1000, tva: 10050, carte_rose: 1000, prime_ttc: 63258 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 61650, accessoires: 2500, fichier_central: 1000, tva: 12541, carte_rose: 1000, prime_ttc: 78691 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 71280, accessoires: 2500, fichier_central: 1000, tva: 14395, carte_rose: 1000, prime_ttc: 90175 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 28213, dr: 2000, ipt: null, prime_nette: 30213, accessoires: 2500, fichier_central: 1000, tva: 6490, carte_rose: 1000, prime_ttc: 41203 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 34813, dr: 2000, ipt: null, prime_nette: 36813, accessoires: 2500, fichier_central: 1000, tva: 7760, carte_rose: 1000, prime_ttc: 49073 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 39871, dr: 2000, ipt: null, prime_nette: 41871, accessoires: 2500, fichier_central: 1000, tva: 8734, carte_rose: 1000, prime_ttc: 55105 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 58885, dr: 2000, ipt: null, prime_nette: 60885, accessoires: 2500, fichier_central: 1000, tva: 12394, carte_rose: 1000, prime_ttc: 77779 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 75062, dr: 2000, ipt: null, prime_nette: 77062, accessoires: 2500, fichier_central: 1000, tva: 15508, carte_rose: 1000, prime_ttc: 97070 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 87100, dr: 2000, ipt: null, prime_nette: 89100, accessoires: 2500, fichier_central: 1000, tva: 17826, carte_rose: 1000, prime_ttc: 111426 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: null, montant: 0 }
          ]
        },
        {
          id: "5A_SANS_REMORQUE",
          nom: "CATEGORIE 5A - SANS REMORQUE",
          description: "Motos et Scooters sans remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 7409, dr: 2000, ipt: 5000, prime_nette: 14409, accessoires: 2500, fichier_central: 500, tva: 3351, carte_rose: 1000, prime_ttc: 21760 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 10291, dr: 2000, ipt: 5000, prime_nette: 17291, accessoires: 2500, fichier_central: 500, tva: 3906, carte_rose: 1000, prime_ttc: 25197 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 15439, dr: 2000, ipt: 5000, prime_nette: 22439, accessoires: 2500, fichier_central: 500, tva: 4897, carte_rose: 1000, prime_ttc: 31336 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 17805, dr: 2000, ipt: 5000, prime_nette: 24805, accessoires: 2500, fichier_central: 500, tva: 5352, carte_rose: 1000, prime_ttc: 34157 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 22026, dr: 2000, ipt: 5000, prime_nette: 29026, accessoires: 2500, fichier_central: 500, tva: 6165, carte_rose: 1000, prime_ttc: 39191 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 25731, dr: 2000, ipt: 5000, prime_nette: 32731, accessoires: 2500, fichier_central: 500, tva: 6878, carte_rose: 1000, prime_ttc: 43609 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 29641, dr: 2000, ipt: 5000, prime_nette: 36641, accessoires: 2500, fichier_central: 500, tva: 7631, carte_rose: 1000, prime_ttc: 48272 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 32627, dr: 2000, ipt: 5000, prime_nette: 39627, accessoires: 2500, fichier_central: 500, tva: 8206, carte_rose: 1000, prime_ttc: 51833 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 36492, dr: 2000, ipt: 5000, prime_nette: 43492, accessoires: 2500, fichier_central: 500, tva: 8950, carte_rose: 1000, prime_ttc: 56442 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "5A_AVEC_REMORQUE",
          nom: "CATEGORIE 5A - AVEC REMORQUE",
          description: "Motos et Scooters avec remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 8891, dr: 2000, ipt: 5000, prime_nette: 15891, accessoires: 2500, fichier_central: 500, tva: 3637, carte_rose: 1000, prime_ttc: 23528 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 12349, dr: 2000, ipt: 5000, prime_nette: 19349, accessoires: 2500, fichier_central: 500, tva: 4302, carte_rose: 1000, prime_ttc: 27651 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 18527, dr: 2000, ipt: 5000, prime_nette: 25527, accessoires: 2500, fichier_central: 500, tva: 5491, carte_rose: 1000, prime_ttc: 35018 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 21366, dr: 2000, ipt: 5000, prime_nette: 28366, accessoires: 2500, fichier_central: 500, tva: 6038, carte_rose: 1000, prime_ttc: 38404 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 26430, dr: 2000, ipt: 5000, prime_nette: 33430, accessoires: 2500, fichier_central: 500, tva: 7013, carte_rose: 1000, prime_ttc: 44443 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 30878, dr: 2000, ipt: 5000, prime_nette: 37878, accessoires: 2500, fichier_central: 500, tva: 7869, carte_rose: 1000, prime_ttc: 49747 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 35570, dr: 2000, ipt: 5000, prime_nette: 42570, accessoires: 2500, fichier_central: 500, tva: 8772, carte_rose: 1000, prime_ttc: 55342 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 39152, dr: 2000, ipt: 5000, prime_nette: 46152, accessoires: 2500, fichier_central: 500, tva: 9462, carte_rose: 1000, prime_ttc: 59614 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 43790, dr: 2000, ipt: 5000, prime_nette: 50790, accessoires: 2500, fichier_central: 500, tva: 10355, carte_rose: 1000, prime_ttc: 65145 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
      ]
    },
    {
      nom: "ZONE C",
      categories: [
        {
          id: "1",
          nom: "CATEGORIE 1",
          description: "Véhicules de tourisme et de promenade",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 48124, dr: 2000, ipt: 7500, prime_nette: 11525, accessoires: 2500, fichier_central: 1000, tva: 2892, carte_rose: 1000, prime_ttc: 18917 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 58468, dr: 2000, ipt: 7500, prime_nette: 13594, accessoires: 2500, fichier_central: 1000, tva: 3291, carte_rose: 1000, prime_ttc: 21384 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 64970, dr: 2000, ipt: 7500, prime_nette: 14894, accessoires: 2500, fichier_central: 1000, tva: 3541, carte_rose: 1000, prime_ttc: 22935 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 84789, dr: 2000, ipt: 7500, prime_nette: 18858, accessoires: 2500, fichier_central: 1000, tva: 4304, carte_rose: 1000, prime_ttc: 27662 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 107951, dr: 2000, ipt: 7500, prime_nette: 23490, accessoires: 2500, fichier_central: 1000, tva: 5196, carte_rose: 1000, prime_ttc: 33186 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 127291, dr: 2000, ipt: 7500, prime_nette: 27358, accessoires: 2500, fichier_central: 1000, tva: 5940, carte_rose: 1000, prime_ttc: 37798 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 48124, dr: 2000, ipt: 7500, prime_nette: 23050, accessoires: 2500, fichier_central: 1000, tva: 5111, carte_rose: 1000, prime_ttc: 32660 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 58468, dr: 2000, ipt: 7500, prime_nette: 27187, accessoires: 2500, fichier_central: 1000, tva: 5907, carte_rose: 1000, prime_ttc: 37594 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 64970, dr: 2000, ipt: 7500, prime_nette: 29788, accessoires: 2500, fichier_central: 1000, tva: 6408, carte_rose: 1000, prime_ttc: 40696 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 84789, dr: 2000, ipt: 7500, prime_nette: 37716, accessoires: 2500, fichier_central: 1000, tva: 7934, carte_rose: 1000, prime_ttc: 50150 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 107951, dr: 2000, ipt: 7500, prime_nette: 46980, accessoires: 2500, fichier_central: 1000, tva: 9717, carte_rose: 1000, prime_ttc: 61198 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 127291, dr: 2000, ipt: 7500, prime_nette: 54716, accessoires: 2500, fichier_central: 1000, tva: 11207, carte_rose: 1000, prime_ttc: 70423 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 48124, dr: 2000, ipt: 7500, prime_nette: 34574, accessoires: 2500, fichier_central: 1000, tva: 7329, carte_rose: 1000, prime_ttc: 46404 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 58468, dr: 2000, ipt: 7500, prime_nette: 40781, accessoires: 2500, fichier_central: 1000, tva: 8524, carte_rose: 1000, prime_ttc: 53805 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 64970, dr: 2000, ipt: 7500, prime_nette: 44682, accessoires: 2500, fichier_central: 1000, tva: 9275, carte_rose: 1000, prime_ttc: 58457 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 84789, dr: 2000, ipt: 7500, prime_nette: 56573, accessoires: 2500, fichier_central: 1000, tva: 11564, carte_rose: 1000, prime_ttc: 72638 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 107951, dr: 2000, ipt: 7500, prime_nette: 70471, accessoires: 2500, fichier_central: 1000, tva: 14239, carte_rose: 1000, prime_ttc: 89210 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 127291, dr: 2000, ipt: 7500, prime_nette: 82075, accessoires: 2500, fichier_central: 1000, tva: 16473, carte_rose: 1000, prime_ttc: 103048 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 48124, dr: 2000, ipt: 7500, prime_nette: 46099, accessoires: 2500, fichier_central: 1000, tva: 9548, carte_rose: 1000, prime_ttc: 60147 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 58468, dr: 2000, ipt: 7500, prime_nette: 54374, accessoires: 2500, fichier_central: 1000, tva: 11141, carte_rose: 1000, prime_ttc: 70015 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 64970, dr: 2000, ipt: 7500, prime_nette: 59576, accessoires: 2500, fichier_central: 1000, tva: 12142, carte_rose: 1000, prime_ttc: 76218 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 84789, dr: 2000, ipt: 7500, prime_nette: 75431, accessoires: 2500, fichier_central: 1000, tva: 15194, carte_rose: 1000, prime_ttc: 95125 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 107951, dr: 2000, ipt: 7500, prime_nette: 93961, accessoires: 2500, fichier_central: 1000, tva: 18761, carte_rose: 1000, prime_ttc: 117222 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 127291, dr: 2000, ipt: 7500, prime_nette: 109433, accessoires: 2500, fichier_central: 1000, tva: 21740, carte_rose: 1000, prime_ttc: 135672 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 48124, dr: 2000, ipt: 7500, prime_nette: 57624, accessoires: 2500, fichier_central: 1000, tva: 11766, carte_rose: 1000, prime_ttc: 73890 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 58468, dr: 2000, ipt: 7500, prime_nette: 67968, accessoires: 2500, fichier_central: 1000, tva: 13758, carte_rose: 1000, prime_ttc: 86226 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 64970, dr: 2000, ipt: 7500, prime_nette: 74470, accessoires: 2500, fichier_central: 1000, tva: 15009, carte_rose: 1000, prime_ttc: 93979 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 84789, dr: 2000, ipt: 7500, prime_nette: 94289, accessoires: 2500, fichier_central: 1000, tva: 18824, carte_rose: 1000, prime_ttc: 117613 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 107951, dr: 2000, ipt: 7500, prime_nette: 117451, accessoires: 3150, fichier_central: 1000, tva: 23408, carte_rose: 1000, prime_ttc: 146009 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 127291, dr: 2000, ipt: 7500, prime_nette: 136791, accessoires: 3150, fichier_central: 1000, tva: 27131, carte_rose: 1000, prime_ttc: 169072 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2",
          nom: "CATEGORIE 2 - SANS REMORQUE",
          description: "Véhicules de transport d'objets, marchandises ou matériel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 53863, dr: 2000, ipt: 7500, prime_nette: 12673, accessoires: 2500, fichier_central: 1000, tva: 3113, carte_rose: 1000, prime_ttc: 20286 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 65251, dr: 2000, ipt: 7500, prime_nette: 14950, accessoires: 2500, fichier_central: 1000, tva: 3552, carte_rose: 1000, prime_ttc: 23002 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 74175, dr: 2000, ipt: 7500, prime_nette: 16735, accessoires: 2500, fichier_central: 1000, tva: 3895, carte_rose: 1000, prime_ttc: 25130 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 111111, dr: 2000, ipt: 7500, prime_nette: 24122, accessoires: 2500, fichier_central: 1000, tva: 5317, carte_rose: 1000, prime_ttc: 33939 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 137579, dr: 2000, ipt: 7500, prime_nette: 29416, accessoires: 2500, fichier_central: 1000, tva: 6336, carte_rose: 1000, prime_ttc: 40252 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 159125, dr: 2000, ipt: 7500, prime_nette: 33725, accessoires: 2500, fichier_central: 1000, tva: 7166, carte_rose: 1000, prime_ttc: 45391 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 53863, dr: 2000, ipt: 7500, prime_nette: 25345, accessoires: 2500, fichier_central: 1000, tva: 5553, carte_rose: 1000, prime_ttc: 35398 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 65251, dr: 2000, ipt: 7500, prime_nette: 29900, accessoires: 2500, fichier_central: 1000, tva: 6430, carte_rose: 1000, prime_ttc: 40830 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 74175, dr: 2000, ipt: 7500, prime_nette: 33470, accessoires: 2500, fichier_central: 1000, tva: 7117, carte_rose: 1000, prime_ttc: 45087 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 111111, dr: 2000, ipt: 7500, prime_nette: 48244, accessoires: 2500, fichier_central: 1000, tva: 9961, carte_rose: 1000, prime_ttc: 62705 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 137579, dr: 2000, ipt: 7500, prime_nette: 58832, accessoires: 2500, fichier_central: 1000, tva: 11999, carte_rose: 1000, prime_ttc: 75330 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 159125, dr: 2000, ipt: 7500, prime_nette: 67450, accessoires: 2500, fichier_central: 1000, tva: 13658, carte_rose: 1000, prime_ttc: 85608 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 53863, dr: 2000, ipt: 7500, prime_nette: 38018, accessoires: 2500, fichier_central: 1000, tva: 7992, carte_rose: 1000, prime_ttc: 50510 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 65251, dr: 2000, ipt: 7500, prime_nette: 44851, accessoires: 2500, fichier_central: 1000, tva: 9307, carte_rose: 1000, prime_ttc: 58658 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 74175, dr: 2000, ipt: 7500, prime_nette: 50205, accessoires: 2500, fichier_central: 1000, tva: 10338, carte_rose: 1000, prime_ttc: 65043 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 111111, dr: 2000, ipt: 7500, prime_nette: 72367, accessoires: 2500, fichier_central: 1000, tva: 14604, carte_rose: 1000, prime_ttc: 91471 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 137579, dr: 2000, ipt: 7500, prime_nette: 88247, accessoires: 2500, fichier_central: 1000, tva: 17661, carte_rose: 1000, prime_ttc: 110409 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 159125, dr: 2000, ipt: 7500, prime_nette: 101175, accessoires: 2500, fichier_central: 1000, tva: 20150, carte_rose: 1000, prime_ttc: 125825 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 53863, dr: 2000, ipt: 7500, prime_nette: 50690, accessoires: 2500, fichier_central: 1000, tva: 10432, carte_rose: 1000, prime_ttc: 65622 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 65251, dr: 2000, ipt: 7500, prime_nette: 59801, accessoires: 2500, fichier_central: 1000, tva: 12185, carte_rose: 1000, prime_ttc: 76468 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 74175, dr: 2000, ipt: 7500, prime_nette: 66940, accessoires: 2500, fichier_central: 1000, tva: 13560, carte_rose: 1000, prime_ttc: 85000 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 111111, dr: 2000, ipt: 7500, prime_nette: 96489, accessoires: 2500, fichier_central: 1000, tva: 19248, carte_rose: 1000, prime_ttc: 120237 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 137579, dr: 2000, ipt: 7500, prime_nette: 117663, accessoires: 2500, fichier_central: 1000, tva: 23324, carte_rose: 1000, prime_ttc: 145487 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 159125, dr: 2000, ipt: 7500, prime_nette: 134900, accessoires: 2500, fichier_central: 1000, tva: 26642, carte_rose: 1000, prime_ttc: 166042 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 53863, dr: 2000, ipt: 7500, prime_nette: 63363, accessoires: 2500, fichier_central: 1000, tva: 12871, carte_rose: 1000, prime_ttc: 80734 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 65251, dr: 2000, ipt: 7500, prime_nette: 74751, accessoires: 2500, fichier_central: 1000, tva: 15063, carte_rose: 1000, prime_ttc: 94314 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 74175, dr: 2000, ipt: 7500, prime_nette: 83675, accessoires: 2500, fichier_central: 1000, tva: 16781, carte_rose: 1000, prime_ttc: 104956 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 111111, dr: 2000, ipt: 7500, prime_nette: 120611, accessoires: 2500, fichier_central: 1000, tva: 23891, carte_rose: 1000, prime_ttc: 149002 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 137579, dr: 2000, ipt: 7500, prime_nette: 147079, accessoires: 2500, fichier_central: 1000, tva: 28986, carte_rose: 1000, prime_ttc: 180565 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 159125, dr: 2000, ipt: 7500, prime_nette: 168625, accessoires: 2500, fichier_central: 1000, tva: 33134, carte_rose: 1000, prime_ttc: 206259 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "2_AVEC_REMORQUE",
          nom: "CATEGORIE 2 - AVEC REMORQUE",
          description: "Véhicules de transport d'objets ou de matériel avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 64628, dr: 2000, ipt: 7500, prime_nette: 14826, accessoires: 2500, fichier_central: 1000, tva: 3528, carte_rose: 1000, prime_ttc: 22853 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 78301, dr: 2000, ipt: 7500, prime_nette: 17560, accessoires: 2500, fichier_central: 1000, tva: 4054, carte_rose: 1000, prime_ttc: 26114 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 89010, dr: 2000, ipt: 7500, prime_nette: 19702, accessoires: 2500, fichier_central: 1000, tva: 4466, carte_rose: 1000, prime_ttc: 28668 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 133333, dr: 2000, ipt: 7500, prime_nette: 28567, accessoires: 2500, fichier_central: 1000, tva: 6173, carte_rose: 1000, prime_ttc: 39239 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 165095, dr: 2000, ipt: 7500, prime_nette: 34919, accessoires: 2500, fichier_central: 1000, tva: 7396, carte_rose: 1000, prime_ttc: 46815 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 190950, dr: 2000, ipt: 7500, prime_nette: 40090, accessoires: 2500, fichier_central: 1000, tva: 8391, carte_rose: 1000, prime_ttc: 52981 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 64628, dr: 2000, ipt: 7500, prime_nette: 29651, accessoires: 2500, fichier_central: 1000, tva: 6382, carte_rose: 1000, prime_ttc: 40533 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 78301, dr: 2000, ipt: 7500, prime_nette: 35120, accessoires: 2500, fichier_central: 1000, tva: 7434, carte_rose: 1000, prime_ttc: 47055 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 89010, dr: 2000, ipt: 7500, prime_nette: 39404, accessoires: 2500, fichier_central: 1000, tva: 8259, carte_rose: 1000, prime_ttc: 52163 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 133333, dr: 2000, ipt: 7500, prime_nette: 57133, accessoires: 2500, fichier_central: 1000, tva: 11672, carte_rose: 1000, prime_ttc: 73305 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 165095, dr: 2000, ipt: 7500, prime_nette: 69838, accessoires: 2500, fichier_central: 1000, tva: 14118, carte_rose: 1000, prime_ttc: 88456 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 190950, dr: 2000, ipt: 7500, prime_nette: 80180, accessoires: 2500, fichier_central: 1000, tva: 16108, carte_rose: 1000, prime_ttc: 100788 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 64628, dr: 2000, ipt: 7500, prime_nette: 44477, accessoires: 2500, fichier_central: 1000, tva: 9236, carte_rose: 1000, prime_ttc: 58212 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 78301, dr: 2000, ipt: 7500, prime_nette: 52681, accessoires: 2500, fichier_central: 1000, tva: 10815, carte_rose: 1000, prime_ttc: 67995 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 89010, dr: 2000, ipt: 7500, prime_nette: 59106, accessoires: 2500, fichier_central: 1000, tva: 12052, carte_rose: 1000, prime_ttc: 75658 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 133333, dr: 2000, ipt: 7500, prime_nette: 85700, accessoires: 2500, fichier_central: 1000, tva: 17171, carte_rose: 1000, prime_ttc: 107371 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 165095, dr: 2000, ipt: 7500, prime_nette: 104757, accessoires: 2500, fichier_central: 1000, tva: 20839, carte_rose: 1000, prime_ttc: 130096 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 190950, dr: 2000, ipt: 7500, prime_nette: 120270, accessoires: 2500, fichier_central: 1000, tva: 23826, carte_rose: 1000, prime_ttc: 148596 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 64628, dr: 2000, ipt: 7500, prime_nette: 59302, accessoires: 2500, fichier_central: 1000, tva: 12089, carte_rose: 1000, prime_ttc: 75892 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 78301, dr: 2000, ipt: 7500, prime_nette: 70241, accessoires: 2500, fichier_central: 1000, tva: 14195, carte_rose: 1000, prime_ttc: 88936 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 89010, dr: 2000, ipt: 7500, prime_nette: 78808, accessoires: 2500, fichier_central: 1000, tva: 15844, carte_rose: 1000, prime_ttc: 99152 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 133333, dr: 2000, ipt: 7500, prime_nette: 114266, accessoires: 2500, fichier_central: 1000, tva: 22670, carte_rose: 1000, prime_ttc: 141436 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 165095, dr: 2000, ipt: 7500, prime_nette: 139676, accessoires: 2500, fichier_central: 1000, tva: 27561, carte_rose: 1000, prime_ttc: 171737 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 190950, dr: 2000, ipt: 7500, prime_nette: 160360, accessoires: 2500, fichier_central: 1000, tva: 31543, carte_rose: 1000, prime_ttc: 196403 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 64628, dr: 2000, ipt: 7500, prime_nette: 74128, accessoires: 2500, fichier_central: 1000, tva: 14943, carte_rose: 1000, prime_ttc: 93571 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 78301, dr: 2000, ipt: 7500, prime_nette: 87801, accessoires: 2500, fichier_central: 1000, tva: 17575, carte_rose: 1000, prime_ttc: 109876 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 89010, dr: 2000, ipt: 7500, prime_nette: 98510, accessoires: 2500, fichier_central: 1000, tva: 19637, carte_rose: 1000, prime_ttc: 122647 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 133333, dr: 2000, ipt: 7500, prime_nette: 142833, accessoires: 2500, fichier_central: 1000, tva: 28169, carte_rose: 1000, prime_ttc: 175502 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 165095, dr: 2000, ipt: 7500, prime_nette: 174595, accessoires: 2500, fichier_central: 1000, tva: 34283, carte_rose: 1000, prime_ttc: 213378 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 190950, dr: 2000, ipt: 7500, prime_nette: 200450, accessoires: 2500, fichier_central: 1000, tva: 39260, carte_rose: 1000, prime_ttc: 244210 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "3",
          nom: "CATEGORIE 3 - SANS REMORQUE",
          description: "Véhicules de transport public de voyageurs, transport de personnel",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 86207, dr: 2000, ipt: 5000, prime_nette: 18641, accessoires: 2500, fichier_central: 1000, tva: 4262, carte_rose: 1000, prime_ttc: 27404 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 106374, dr: 2000, ipt: 5000, prime_nette: 22675, accessoires: 2500, fichier_central: 1000, tva: 5039, carte_rose: 1000, prime_ttc: 32213 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 121825, dr: 2000, ipt: 5000, prime_nette: 25765, accessoires: 2500, fichier_central: 1000, tva: 5634, carte_rose: 1000, prime_ttc: 35899 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 179925, dr: 2000, ipt: 5000, prime_nette: 37385, accessoires: 2500, fichier_central: 1000, tva: 7870, carte_rose: 1000, prime_ttc: 49755 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 229359, dr: 2000, ipt: 5000, prime_nette: 47272, accessoires: 2500, fichier_central: 1000, tva: 9774, carte_rose: 1000, prime_ttc: 61545 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 266132, dr: 2000, ipt: 5000, prime_nette: 54626, accessoires: 2500, fichier_central: 1000, tva: 11189, carte_rose: 1000, prime_ttc: 70316 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 86207, dr: 2000, ipt: 5000, prime_nette: 37283, accessoires: 2500, fichier_central: 1000, tva: 7851, carte_rose: 1000, prime_ttc: 49633 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 106374, dr: 2000, ipt: 5000, prime_nette: 45350, accessoires: 2500, fichier_central: 1000, tva: 9404, carte_rose: 1000, prime_ttc: 59253 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 121825, dr: 2000, ipt: 5000, prime_nette: 51530, accessoires: 2500, fichier_central: 1000, tva: 10593, carte_rose: 1000, prime_ttc: 66623 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 179925, dr: 2000, ipt: 5000, prime_nette: 74770, accessoires: 2500, fichier_central: 1000, tva: 15067, carte_rose: 1000, prime_ttc: 94337 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 229359, dr: 2000, ipt: 5000, prime_nette: 94544, accessoires: 2500, fichier_central: 1000, tva: 18873, carte_rose: 1000, prime_ttc: 117917 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 266132, dr: 2000, ipt: 5000, prime_nette: 109253, accessoires: 2500, fichier_central: 1000, tva: 21705, carte_rose: 1000, prime_ttc: 135458 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 86207, dr: 2000, ipt: 5000, prime_nette: 55924, accessoires: 2500, fichier_central: 1000, tva: 11439, carte_rose: 1000, prime_ttc: 71863 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 106374, dr: 2000, ipt: 5000, prime_nette: 68024, accessoires: 2500, fichier_central: 1000, tva: 13768, carte_rose: 1000, prime_ttc: 86293 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 121825, dr: 2000, ipt: 5000, prime_nette: 77295, accessoires: 2500, fichier_central: 1000, tva: 15553, carte_rose: 1000, prime_ttc: 97348 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 179925, dr: 2000, ipt: 5000, prime_nette: 112155, accessoires: 2500, fichier_central: 1000, tva: 22264, carte_rose: 1000, prime_ttc: 138919 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 229359, dr: 2000, ipt: 5000, prime_nette: 141815, accessoires: 2500, fichier_central: 1000, tva: 27973, carte_rose: 1000, prime_ttc: 174289 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 266132, dr: 2000, ipt: 5000, prime_nette: 163879, accessoires: 2500, fichier_central: 1000, tva: 32220, carte_rose: 1000, prime_ttc: 200600 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 86207, dr: 2000, ipt: 5000, prime_nette: 74566, accessoires: 2500, fichier_central: 1000, tva: 15028, carte_rose: 1000, prime_ttc: 94093 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 106374, dr: 2000, ipt: 5000, prime_nette: 90699, accessoires: 2500, fichier_central: 1000, tva: 18133, carte_rose: 1000, prime_ttc: 113333 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 121825, dr: 2000, ipt: 5000, prime_nette: 103060, accessoires: 2500, fichier_central: 1000, tva: 20513, carte_rose: 1000, prime_ttc: 128073 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 179925, dr: 2000, ipt: 5000, prime_nette: 149540, accessoires: 2500, fichier_central: 1000, tva: 29460, carte_rose: 1000, prime_ttc: 183500 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 229359, dr: 2000, ipt: 5000, prime_nette: 189087, accessoires: 2500, fichier_central: 1000, tva: 37073, carte_rose: 1000, prime_ttc: 230660 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 266132, dr: 2000, ipt: 5000, prime_nette: 218506, accessoires: 2500, fichier_central: 1000, tva: 42736, carte_rose: 1000, prime_ttc: 265742 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 86207, dr: 2000, ipt: 5000, prime_nette: 93207, accessoires: 2500, fichier_central: 1000, tva: 18616, carte_rose: 1000, prime_ttc: 116323 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 106374, dr: 2000, ipt: 5000, prime_nette: 113374, accessoires: 2500, fichier_central: 1000, tva: 22498, carte_rose: 1000, prime_ttc: 140372 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 121825, dr: 2000, ipt: 5000, prime_nette: 128825, accessoires: 2500, fichier_central: 1000, tva: 25473, carte_rose: 1000, prime_ttc: 158798 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 179925, dr: 2000, ipt: 5000, prime_nette: 186925, accessoires: 2500, fichier_central: 1000, tva: 36657, carte_rose: 1000, prime_ttc: 228082 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 229359, dr: 2000, ipt: 5000, prime_nette: 236359, accessoires: 2500, fichier_central: 1000, tva: 46173, carte_rose: 1000, prime_ttc: 287032 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 266132, dr: 2000, ipt: 5000, prime_nette: 273132, accessoires: 2500, fichier_central: 1000, tva: 53252, carte_rose: 1000, prime_ttc: 330884 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: null, montant: 150000 }
          ]
        },
        {
          id: "3_AVEC_REMORQUE",
          nom: "CATEGORIE 3 - AVEC REMORQUE",
          description: "Véhicules de transport public de voyageurs avec remorque",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 112069, dr: 2000, ipt: 5000, prime_nette: 23814, accessoires: 2500, fichier_central: 1000, tva: 5258, carte_rose: 1000, prime_ttc: 33572 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 138287, dr: 2000, ipt: 5000, prime_nette: 29057, accessoires: 2500, fichier_central: 1000, tva: 6267, carte_rose: 1000, prime_ttc: 39825 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 158374, dr: 2000, ipt: 5000, prime_nette: 33075, accessoires: 2500, fichier_central: 1000, tva: 7041, carte_rose: 1000, prime_ttc: 44615 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 233903, dr: 2000, ipt: 5000, prime_nette: 48181, accessoires: 2500, fichier_central: 1000, tva: 9949, carte_rose: 1000, prime_ttc: 62629 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 298166, dr: 2000, ipt: 5000, prime_nette: 61033, accessoires: 2500, fichier_central: 1000, tva: 12423, carte_rose: 1000, prime_ttc: 77956 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 345974, dr: 2000, ipt: 5000, prime_nette: 70595, accessoires: 2500, fichier_central: 1000, tva: 14263, carte_rose: 1000, prime_ttc: 89358 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 112069, dr: 2000, ipt: 5000, prime_nette: 47628, accessoires: 2500, fichier_central: 1000, tva: 9842, carte_rose: 1000, prime_ttc: 61970 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 138287, dr: 2000, ipt: 5000, prime_nette: 58115, accessoires: 2500, fichier_central: 1000, tva: 11861, carte_rose: 1000, prime_ttc: 74476 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 158374, dr: 2000, ipt: 5000, prime_nette: 66150, accessoires: 2500, fichier_central: 1000, tva: 13408, carte_rose: 1000, prime_ttc: 84057 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 233903, dr: 2000, ipt: 5000, prime_nette: 96361, accessoires: 2500, fichier_central: 1000, tva: 19223, carte_rose: 1000, prime_ttc: 120084 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 298166, dr: 2000, ipt: 5000, prime_nette: 122066, accessoires: 2500, fichier_central: 1000, tva: 24172, carte_rose: 1000, prime_ttc: 150738 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 345974, dr: 2000, ipt: 5000, prime_nette: 141190, accessoires: 2500, fichier_central: 1000, tva: 27853, carte_rose: 1000, prime_ttc: 173542 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 112069, dr: 2000, ipt: 5000, prime_nette: 71441, accessoires: 2500, fichier_central: 1000, tva: 14426, carte_rose: 1000, prime_ttc: 90368 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 138287, dr: 2000, ipt: 5000, prime_nette: 87172, accessoires: 2500, fichier_central: 1000, tva: 17454, carte_rose: 1000, prime_ttc: 109127 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 158374, dr: 2000, ipt: 5000, prime_nette: 99224, accessoires: 2500, fichier_central: 1000, tva: 19774, carte_rose: 1000, prime_ttc: 123499 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 233903, dr: 2000, ipt: 5000, prime_nette: 144542, accessoires: 2500, fichier_central: 1000, tva: 28498, carte_rose: 1000, prime_ttc: 177540 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 298166, dr: 2000, ipt: 5000, prime_nette: 183100, accessoires: 2500, fichier_central: 1000, tva: 35920, carte_rose: 1000, prime_ttc: 223520 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 345974, dr: 2000, ipt: 5000, prime_nette: 211784, accessoires: 2500, fichier_central: 1000, tva: 41442, carte_rose: 1000, prime_ttc: 257727 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 112069, dr: 2000, ipt: 5000, prime_nette: 95255, accessoires: 2500, fichier_central: 1000, tva: 19010, carte_rose: 1000, prime_ttc: 118766 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 138287, dr: 2000, ipt: 5000, prime_nette: 116230, accessoires: 2500, fichier_central: 1000, tva: 23048, carte_rose: 1000, prime_ttc: 143778 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 158374, dr: 2000, ipt: 5000, prime_nette: 132299, accessoires: 2500, fichier_central: 1000, tva: 26141, carte_rose: 1000, prime_ttc: 162941 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 233903, dr: 2000, ipt: 5000, prime_nette: 192722, accessoires: 2500, fichier_central: 1000, tva: 37773, carte_rose: 1000, prime_ttc: 234995 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 298166, dr: 2000, ipt: 5000, prime_nette: 244133, accessoires: 2500, fichier_central: 1000, tva: 47669, carte_rose: 1000, prime_ttc: 296302 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 345974, dr: 2000, ipt: 5000, prime_nette: 282379, accessoires: 2500, fichier_central: 1000, tva: 55032, carte_rose: 1000, prime_ttc: 341911 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 112069, dr: 2000, ipt: 5000, prime_nette: 119069, accessoires: 2500, fichier_central: 1000, tva: 23595, carte_rose: 1000, prime_ttc: 147164 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 138287, dr: 2000, ipt: 5000, prime_nette: 145287, accessoires: 2500, fichier_central: 1000, tva: 28641, carte_rose: 1000, prime_ttc: 178428 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 158374, dr: 2000, ipt: 5000, prime_nette: 165374, accessoires: 2500, fichier_central: 1000, tva: 32508, carte_rose: 1000, prime_ttc: 202382 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 233903, dr: 2000, ipt: 5000, prime_nette: 240903, accessoires: 2500, fichier_central: 1000, tva: 47048, carte_rose: 1000, prime_ttc: 292451 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 298166, dr: 2000, ipt: 5000, prime_nette: 305166, accessoires: 2500, fichier_central: 1000, tva: 59418, carte_rose: 1000, prime_ttc: 369084 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 345974, dr: 2000, ipt: 5000, prime_nette: 352974, accessoires: 2500, fichier_central: 1000, tva: 68621, carte_rose: 1000, prime_ttc: 426095 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 15000 },
            { min_cv: 8, max_cv: 13, montant: 25000 },
            { min_cv: 14, max_cv: 20, montant: 50000 },
            { min_cv: 21, max_cv: 99, montant: 150000 }
          ]
        },
        {
          id: "3_REMORQUE_SIMPLE",
          nom: "CATEGORIE 3 - REMORQUE SIMPLE",
          description: "Remorques simples rattachées à la catégorie 3",
          durees: [
            {
              label: "60 Jrs (2 mois)",
              jours: 60,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 25862, dr: 2000, ipt: null, prime_nette: 5572, accessoires: 2500, fichier_central: 1000, tva: 1746, carte_rose: 1000, prime_ttc: 11811 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 31913, dr: 2000, ipt: null, prime_nette: 6783, accessoires: 2500, fichier_central: 1000, tva: 1979, carte_rose: 1000, prime_ttc: 13262 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 36549, dr: 2000, ipt: null, prime_nette: 7710, accessoires: 2500, fichier_central: 1000, tva: 2158, carte_rose: 1000, prime_ttc: 14368 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 53978, dr: 2000, ipt: null, prime_nette: 11196, accessoires: 2500, fichier_central: 1000, tva: 2829, carte_rose: 1000, prime_ttc: 18525 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 68807, dr: 2000, ipt: null, prime_nette: 14161, accessoires: 2500, fichier_central: 1000, tva: 3400, carte_rose: 1000, prime_ttc: 22061 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 79842, dr: 2000, ipt: null, prime_nette: 16368, accessoires: 2500, fichier_central: 1000, tva: 3825, carte_rose: 1000, prime_ttc: 24693 } }
              ]
            },
            {
              label: "120 Jrs (4 mois)",
              jours: 120,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 25862, dr: 2000, ipt: null, prime_nette: 11145, accessoires: 2500, fichier_central: 1000, tva: 2819, carte_rose: 1000, prime_ttc: 18464 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 31913, dr: 2000, ipt: null, prime_nette: 13565, accessoires: 2500, fichier_central: 1000, tva: 3285, carte_rose: 1000, prime_ttc: 21350 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 36549, dr: 2000, ipt: null, prime_nette: 15420, accessoires: 2500, fichier_central: 1000, tva: 3642, carte_rose: 1000, prime_ttc: 23562 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 53978, dr: 2000, ipt: null, prime_nette: 22391, accessoires: 2500, fichier_central: 1000, tva: 4984, carte_rose: 1000, prime_ttc: 31875 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 68807, dr: 2000, ipt: null, prime_nette: 28323, accessoires: 2500, fichier_central: 1000, tva: 6126, carte_rose: 1000, prime_ttc: 38949 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 79842, dr: 2000, ipt: null, prime_nette: 32737, accessoires: 2500, fichier_central: 1000, tva: 6976, carte_rose: 1000, prime_ttc: 44212 } }
              ]
            },
            {
              label: "180 Jrs (6 mois)",
              jours: 180,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 25862, dr: 2000, ipt: null, prime_nette: 16717, accessoires: 2500, fichier_central: 1000, tva: 3892, carte_rose: 1000, prime_ttc: 25109 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 31913, dr: 2000, ipt: null, prime_nette: 20348, accessoires: 2500, fichier_central: 1000, tva: 4591, carte_rose: 1000, prime_ttc: 29439 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 36549, dr: 2000, ipt: null, prime_nette: 23129, accessoires: 2500, fichier_central: 1000, tva: 5126, carte_rose: 1000, prime_ttc: 32756 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 53978, dr: 2000, ipt: null, prime_nette: 33587, accessoires: 2500, fichier_central: 1000, tva: 7139, carte_rose: 1000, prime_ttc: 45226 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 68807, dr: 2000, ipt: null, prime_nette: 42484, accessoires: 2500, fichier_central: 1000, tva: 8852, carte_rose: 1000, prime_ttc: 55836 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 79842, dr: 2000, ipt: null, prime_nette: 49105, accessoires: 2500, fichier_central: 1000, tva: 10127, carte_rose: 1000, prime_ttc: 63732 } }
              ]
            },
            {
              label: "240 Jrs (8 mois)",
              jours: 240,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 25862, dr: 2000, ipt: null, prime_nette: 22290, accessoires: 2500, fichier_central: 1000, tva: 4964, carte_rose: 1000, prime_ttc: 31754 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 31913, dr: 2000, ipt: null, prime_nette: 27130, accessoires: 2500, fichier_central: 1000, tva: 5896, carte_rose: 1000, prime_ttc: 37527 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 36549, dr: 2000, ipt: null, prime_nette: 30839, accessoires: 2500, fichier_central: 1000, tva: 6610, carte_rose: 1000, prime_ttc: 41949 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 53978, dr: 2000, ipt: null, prime_nette: 44782, accessoires: 2500, fichier_central: 1000, tva: 9294, carte_rose: 1000, prime_ttc: 58577 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 68807, dr: 2000, ipt: null, prime_nette: 56646, accessoires: 2500, fichier_central: 1000, tva: 11578, carte_rose: 1000, prime_ttc: 72724 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 79842, dr: 2000, ipt: null, prime_nette: 65474, accessoires: 2500, fichier_central: 1000, tva: 13277, carte_rose: 1000, prime_ttc: 83251 } }
              ]
            },
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Jusqu'à 2 CV", puissance_diesel: null, details_prime: { rc: 25862, dr: 2000, ipt: null, prime_nette: 27862, accessoires: 2500, fichier_central: 1000, tva: 6037, carte_rose: 1000, prime_ttc: 38399 } },
                { puissance_essence: "3 à 6 CV", puissance_diesel: "2 à 4 CV", details_prime: { rc: 31913, dr: 2000, ipt: null, prime_nette: 33913, accessoires: 2500, fichier_central: 1000, tva: 7202, carte_rose: 1000, prime_ttc: 45615 } },
                { puissance_essence: "7 à 10 CV", puissance_diesel: "5 à 7 CV", details_prime: { rc: 36549, dr: 2000, ipt: null, prime_nette: 38549, accessoires: 2500, fichier_central: 1000, tva: 8094, carte_rose: 1000, prime_ttc: 51143 } },
                { puissance_essence: "11 à 14 CV", puissance_diesel: "8 à 10 CV", details_prime: { rc: 53978, dr: 2000, ipt: null, prime_nette: 55978, accessoires: 2500, fichier_central: 1000, tva: 11450, carte_rose: 1000, prime_ttc: 71928 } },
                { puissance_essence: "15 à 23 CV", puissance_diesel: "11 à 16 CV", details_prime: { rc: 68807, dr: 2000, ipt: null, prime_nette: 70807, accessoires: 2500, fichier_central: 1000, tva: 14304, carte_rose: 1000, prime_ttc: 89611 } },
                { puissance_essence: "24 CV ET +", puissance_diesel: "17 CV et +", details_prime: { rc: 79842, dr: 2000, ipt: null, prime_nette: 81842, accessoires: 2500, fichier_central: 1000, tva: 16428, carte_rose: 1000, prime_ttc: 102770 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: null, montant: 0 }
          ]
        },
        {
          id: "5A_SANS_REMORQUE",
          nom: "CATEGORIE 5A - SANS REMORQUE",
          description: "Motos et Scooters sans remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 7087, dr: 2000, ipt: 5000, prime_nette: 14087, accessoires: 2500, fichier_central: 500, tva: 3289, carte_rose: 1000, prime_ttc: 21376 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 9844, dr: 2000, ipt: 5000, prime_nette: 16844, accessoires: 2500, fichier_central: 500, tva: 3820, carte_rose: 1000, prime_ttc: 24664 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 14768, dr: 2000, ipt: 5000, prime_nette: 21768, accessoires: 2500, fichier_central: 500, tva: 4768, carte_rose: 1000, prime_ttc: 30536 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 17031, dr: 2000, ipt: 5000, prime_nette: 24031, accessoires: 2500, fichier_central: 500, tva: 5203, carte_rose: 1000, prime_ttc: 33234 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 21068, dr: 2000, ipt: 5000, prime_nette: 28068, accessoires: 2500, fichier_central: 500, tva: 5981, carte_rose: 1000, prime_ttc: 38049 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 24613, dr: 2000, ipt: 5000, prime_nette: 31613, accessoires: 2500, fichier_central: 500, tva: 6663, carte_rose: 1000, prime_ttc: 42276 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 28353, dr: 2000, ipt: 5000, prime_nette: 35353, accessoires: 2500, fichier_central: 500, tva: 7383, carte_rose: 1000, prime_ttc: 46736 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 31208, dr: 2000, ipt: 5000, prime_nette: 38208, accessoires: 2500, fichier_central: 500, tva: 7933, carte_rose: 1000, prime_ttc: 50141 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 34905, dr: 2000, ipt: 5000, prime_nette: 41905, accessoires: 2500, fichier_central: 500, tva: 8644, carte_rose: 1000, prime_ttc: 54549 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
        {
          id: "5A_AVEC_REMORQUE",
          nom: "CATEGORIE 5A - AVEC REMORQUE",
          description: "Motos et Scooters avec remorque",
          durees: [
            {
              label: "365 Jrs (1 an)",
              jours: 365,
              tarifs: [
                { puissance_essence: "Inférieur à < 50 cm3", puissance_diesel: null, details_prime: { rc: 8504, dr: 2000, ipt: 5000, prime_nette: 15504, accessoires: 2500, fichier_central: 500, tva: 3562, carte_rose: 1000, prime_ttc: 23066 } },
                { puissance_essence: "51 cm3 à 125 cm3 (1CV)", puissance_diesel: null, details_prime: { rc: 11812, dr: 2000, ipt: 5000, prime_nette: 18812, accessoires: 2500, fichier_central: 500, tva: 4199, carte_rose: 1000, prime_ttc: 27011 } },
                { puissance_essence: "Scooter", puissance_diesel: null, details_prime: { rc: 17721, dr: 2000, ipt: 5000, prime_nette: 24721, accessoires: 2500, fichier_central: 500, tva: 5336, carte_rose: 1000, prime_ttc: 34057 } },
                { puissance_essence: "126cm3 à 175cm3 (2CV)", puissance_diesel: null, details_prime: { rc: 20437, dr: 2000, ipt: 5000, prime_nette: 27437, accessoires: 2500, fichier_central: 500, tva: 5859, carte_rose: 1000, prime_ttc: 37296 } },
                { puissance_essence: "176cm3 à 250cm3", puissance_diesel: null, details_prime: { rc: 25281, dr: 2000, ipt: 5000, prime_nette: 3281, accessoires: 2500, fichier_central: 500, tva: 6792, carte_rose: 1000, prime_ttc: 43073 } },
                { puissance_essence: "251cm3 à 350cm3", puissance_diesel: null, details_prime: { rc: 29535, dr: 2000, ipt: 5000, prime_nette: 36535, accessoires: 2500, fichier_central: 500, tva: 7610, carte_rose: 1000, prime_ttc: 48145 } },
                { puissance_essence: "352cm3 à 500cm3", puissance_diesel: null, details_prime: { rc: 34023, dr: 2000, ipt: 5000, prime_nette: 41023, accessoires: 2500, fichier_central: 500, tva: 8474, carte_rose: 1000, prime_ttc: 53497 } },
                { puissance_essence: "501cm3 à 625cm3", puissance_diesel: null, details_prime: { rc: 37450, dr: 2000, ipt: 5000, prime_nette: 44450, accessoires: 2500, fichier_central: 500, tva: 9134, carte_rose: 1000, prime_ttc: 57584 } },
                { puissance_essence: "Supérieur à 625cm3", puissance_diesel: null, details_prime: { rc: 41886, dr: 2000, ipt: 5000, prime_nette: 48886, accessoires: 2500, fichier_central: 500, tva: 9988, carte_rose: 1000, prime_ttc: 62874 } }
              ]
            }
          ],
          dta_table: [
            { min_cv: 2, max_cv: 7, montant: 30000 },
            { min_cv: 8, max_cv: 13, montant: 50000 },
            { min_cv: 14, max_cv: 20, montant: 75000 },
            { min_cv: 21, max_cv: null, montant: 200000 }
          ]
        },
      ]
    }
  ],
};