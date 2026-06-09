// ============================================================
// calculatorData.ts — Données tarifaires pour le calculateur
// Imprimerie Aria — Tous les prix sont en DH HT
// ============================================================

export interface PromoConfig {
  quantite: number;
  grammage: string;
  mode?: string;
  prix: number;
  label: string;
}

export interface FinitionOption {
  prix_par_1000: number | null;
  label?: string;
  applicable_a?: string[];
}

export interface CalcProduit {
  id: string;
  nom: string;
  format: string;
  type: 'flyer' | 'depliant' | 'carnet';
  // For flyers & dépliants: mode -> grammage -> qty -> price
  tarifs?: Record<string, Record<string, Record<string, number>>>;
  // For carnets: souche -> qty -> price
  tarifsCarnets?: Record<string, Record<string, number>>;
  grammages?: string[];
  modes?: string[];
  souches?: string[];
  promo?: PromoConfig;
  numerotation?: { offerte_a_partir_de: number };
}

export interface CalcData {
  produits: CalcProduit[];
  options_finitions: Record<string, FinitionOption>;
}

export const calculatorData: CalcData = {
  produits: [
    {
      id: 'flyer-a6',
      nom: 'Flyers A6',
      format: '10.5 × 14.8 cm',
      type: 'flyer',
      modes: ['Recto', 'Recto/Verso'],
      grammages: ['135g Couché', '170g Couché'],
      tarifs: {
        'Recto': {
          '135g Couché': {
            '1000': 450, '2000': 850, '3000': 1200,
            '5000': 1950, '10000': 3700, '20000': 7000,
            '50000': 11300, '100000': 19600, '200000': 32300
          },
          '170g Couché': {
            '1000': 600, '2000': 1100, '3000': 1500,
            '5000': 2500, '10000': 4800, '20000': 9000,
            '50000': 13600, '100000': 21500, '200000': 33500
          }
        },
        'Recto/Verso': {
          '135g Couché': {
            '1000': 750, '2000': 1200, '3000': 1700,
            '5000': 2100, '10000': 4900, '20000': 9300,
            '50000': 14900, '100000': 24800, '200000': 44200
          },
          '170g Couché': {
            '1000': 950, '2000': 1600, '3000': 2200,
            '5000': 2800, '10000': 6200, '20000': 11800,
            '50000': 17800, '100000': 28900, '200000': 52900
          }
        }
      },
      promo: {
        quantite: 5000,
        mode: 'Recto/Verso',
        grammage: '135g Couché',
        prix: 1900,
        label: '🎯 PROMO : 5 000 Flyers A6 R/V 135g → 1 900 dh HT'
      }
    },
    {
      id: 'flyer-a5',
      nom: 'Flyers A5',
      format: '15 × 21 cm',
      type: 'flyer',
      modes: ['Recto', 'Recto/Verso'],
      grammages: ['135g Couché', '170g Couché'],
      tarifs: {
        'Recto': {
          '135g Couché': {
            '1000': 650, '2000': 1300, '3000': 1750,
            '5000': 2850, '10000': 5400, '20000': 10200,
            '50000': 24000, '100000': 39000, '200000': 69900
          },
          '170g Couché': {
            '1000': 850, '2000': 1600, '3000': 2300,
            '5000': 3400, '10000': 6500, '20000': 12300,
            '50000': 29000, '100000': 45000, '200000': 78000
          }
        },
        'Recto/Verso': {
          '135g Couché': {
            '1000': 1100, '2000': 1800, '3000': 2500,
            '5000': 2700, '10000': 6300, '20000': 11850,
            '50000': 27750, '100000': 47000, '200000': 89000
          },
          '170g Couché': {
            '1000': 1350, '2000': 2200, '3000': 2950,
            '5000': 3500, '10000': 7800, '20000': 14700,
            '50000': 35250, '100000': 57000, '200000': 91900
          }
        }
      },
      promo: {
        quantite: 5000,
        mode: 'Recto/Verso',
        grammage: '135g Couché',
        prix: 2300,
        label: '🎯 PROMO : 5 000 Flyers A5 R/V 135g → 2 300 dh HT'
      }
    },
    {
      id: 'flyer-dl',
      nom: 'Flyers DL',
      format: '10 × 21 cm',
      type: 'flyer',
      modes: ['Recto', 'Recto/Verso'],
      grammages: ['135g Couché', '170g Couché'],
      tarifs: {
        'Recto': {
          '135g Couché': {
            '1000': 550, '2000': 1050, '3000': 1500,
            '5000': 2400, '10000': 4600, '20000': 8700,
            '50000': 16500, '100000': 29900, '200000': 45900
          },
          '170g Couché': {
            '1000': 750, '2000': 1400, '3000': 1950,
            '5000': 3100, '10000': 5900, '20000': 11200,
            '50000': 20500, '100000': 34900, '200000': 51900
          }
        },
        'Recto/Verso': {
          '135g Couché': {
            '1000': 950, '2000': 1600, '3000': 2200,
            '5000': 2600, '10000': 5800, '20000': 10900,
            '50000': 21900, '100000': 28900, '200000': 49900
          },
          '170g Couché': {
            '1000': 1200, '2000': 2100, '3000': 2800,
            '5000': 3400, '10000': 7400, '20000': 13900,
            '50000': 24900, '100000': 33900, '200000': 57900
          }
        }
      },
      promo: {
        quantite: 5000,
        mode: 'Recto/Verso',
        grammage: '135g Couché',
        prix: 2200,
        label: '🎯 PROMO : 5 000 Flyers DL R/V 135g → 2 200 dh HT'
      }
    },
    {
      id: 'depliant-a4',
      nom: 'Dépliants A4',
      format: '21 × 29.7 cm ouvert',
      type: 'depliant',
      modes: ['Recto/Verso'],
      grammages: ['135g Plié', '170g Plié'],
      tarifs: {
        'Recto/Verso': {
          '135g Plié': {
            '1000': 1790, '2000': 2990, '3000': 4190,
            '5000': 6490, '10000': 11900,
            '20000': 21900, '50000': 48900
          },
          '170g Plié': {
            '1000': 2190, '2000': 3790, '3000': 5190,
            '5000': 7990, '10000': 14900,
            '20000': 27900, '50000': 61900
          }
        }
      },
      promo: {
        quantite: 1000,
        mode: 'Recto/Verso',
        grammage: '135g Plié',
        prix: 1790,
        label: '🎯 PROMO CHOC : 1 000 Dépliants A4 R/V → 1 790 dh HT'
      }
    },
    {
      id: 'depliant-a3',
      nom: 'Dépliants A3',
      format: '29.7 × 42 cm ouvert',
      type: 'depliant',
      modes: ['Recto', 'Recto/Verso'],
      grammages: ['135g Couché Plié', '170g Couché Plié'],
      tarifs: {
        'Recto': {
          '135g Couché Plié': {
            '500': 2900, '1000': 3990, '2000': 6990,
            '3000': 9900, '5000': 14900, '10000': 27900,
            '20000': 52900, '50000': 89900
          },
          '170g Couché Plié': {
            '500': 3200, '1000': 4590, '2000': 7990,
            '3000': 11300, '5000': 16900, '10000': 31900,
            '20000': 59900, '50000': 99900
          }
        },
        'Recto/Verso': {
          '135g Couché Plié': {
            '500': 3200, '1000': 4590, '2000': 7990,
            '3000': 11300, '5000': 16900, '10000': 31900,
            '20000': 59900, '50000': 99900
          },
          '170g Couché Plié': {
            '500': 3590, '1000': 5290, '2000': 9290,
            '3000': 12900, '5000': 19900, '10000': 36900,
            '20000': 69900, '50000': 115900
          }
        }
      },
      promo: {
        quantite: 1000,
        mode: 'Recto/Verso',
        grammage: '135g Couché Plié',
        prix: 3990,
        label: '🎯 PROMO CHOC : 1 000 Dépliants A3 R/V 135g → 3 990 dh HT'
      }
    },
    {
      id: 'carnet-ncr-a5',
      nom: 'Carnets NCR A5',
      format: '15 × 21 cm — 50 feuilles',
      type: 'carnet',
      souches: ['2 Souches', '3 Souches', '4 Souches', '5 Souches'],
      tarifsCarnets: {
        '2 Souches': {
          '10': 308, '20': 580, '30': 840, '40': 1080,
          '50': 1120, '100': 2100, '200': 3800, '500': 8000
        },
        '3 Souches': {
          '10': 445, '20': 800, '30': 1170, '40': 1520,
          '50': 2800, '100': 3150, '200': 5700, '500': 11800
        },
        '4 Souches': {
          '10': 560, '20': 1000, '30': 1450, '40': 1800,
          '50': 2240, '100': 4000, '200': 7500, '500': 15200
        },
        '5 Souches': {
          '10': 680, '20': 1150, '30': 1650, '40': 2100,
          '50': 2800, '100': 5200, '200': 9100, '500': 19000
        }
      },
      numerotation: { offerte_a_partir_de: 500 }
    },
    {
      id: 'carnet-ncr-a4',
      nom: 'Carnets NCR A4',
      format: '29.7 × 21 cm — 50 feuilles',
      type: 'carnet',
      souches: ['2 Souches', '3 Souches', '4 Souches', '5 Souches'],
      tarifsCarnets: {
        '2 Souches': {
          '10': 450, '20': 580, '30': 840,
          '40': 1080, '50': 1120, '100': 2100
        },
        '3 Souches': {
          '10': 500, '20': 800, '30': 1170,
          '40': 1520, '50': 2800, '100': 3150
        },
        '4 Souches': {
          '10': 600, '20': 1000, '30': 1450,
          '40': 1800, '50': 2240, '100': 4000
        },
        '5 Souches': {
          '10': 700, '20': 1150, '30': 1650,
          '40': 2100, '50': 2800, '100': 5200
        }
      }
    },
    {
      id: 'carnet-location-a4',
      nom: 'Carnets Location A4 R/V',
      format: '29.7 × 21 cm — 50 feuilles',
      type: 'carnet',
      souches: ['2 Souches', '3 Souches', '4 Souches'],
      tarifsCarnets: {
        '2 Souches': {
          '10': 550, '20': 1000, '30': 1470,
          '40': 1900, '50': 2300, '100': 3100, '200': 5900
        },
        '3 Souches': {
          '10': 600, '20': 1350, '30': 1900,
          '40': 2400, '50': 2800, '100': 3500, '200': 6800
        },
        '4 Souches': {
          '10': 800, '20': 1500, '30': 2100,
          '40': 2700, '50': 3200, '100': 5800, '200': 9200
        }
      }
    }
  ],

  options_finitions: {
    'Pelliculage Brillant Recto': {
      prix_par_1000: 350,
      applicable_a: ['flyer-a6', 'flyer-a5', 'flyer-dl', 'depliant-a4', 'depliant-a3']
    },
    'Pelliculage Mat Recto': {
      prix_par_1000: 450,
      applicable_a: ['flyer-a6', 'flyer-a5', 'flyer-dl', 'depliant-a4', 'depliant-a3']
    },
    'Vernis Sélectif UV': {
      prix_par_1000: null,
      label: 'Sur devis'
    },
    'Coins Arrondis': {
      prix_par_1000: null,
      label: 'Sur devis'
    },
    'Découpes Spéciales': {
      prix_par_1000: null,
      label: 'Sur devis'
    },
    'Dorure à chaud': {
      prix_par_1000: null,
      label: 'Sur devis',
      applicable_a: ['depliant-a4', 'depliant-a3']
    }
  }
};

// ============================================================
// Fonction de calcul du prix
// ============================================================

export interface CalcResult {
  prixBase: number;
  prixOptions: number;
  prixHT: number;
  TVA: number;
  prixTTC: number;
  estPromo: boolean;
  promoLabel?: string;
  surDevis: string[];
  erreur?: string;
}

export function calculerPrix(
  produitId: string,
  quantiteStr: string,
  grammage: string,
  mode: string,
  souche: string,
  options: string[]
): CalcResult {
  const produit = calculatorData.produits.find(p => p.id === produitId);
  if (!produit) {
    return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Produit introuvable.' };
  }

  let prixBase = 0;
  let estPromo = false;
  let promoLabel: string | undefined;
  const quantite = parseInt(quantiteStr, 10);

  if (produit.type === 'carnet') {
    // Logique carnets
    const tarifSouche = produit.tarifsCarnets?.[souche];
    if (!tarifSouche) {
      return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Combinaison non disponible.' };
    }
    const prix = tarifSouche[quantiteStr];
    if (prix === undefined) {
      return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Quantité non disponible pour ce produit.' };
    }
    prixBase = prix;
  } else {
    // Logique flyers & dépliants
    const promo = produit.promo;
    if (
      promo &&
      quantite === promo.quantite &&
      grammage === promo.grammage &&
      mode === promo.mode
    ) {
      estPromo = true;
      promoLabel = promo.label;
      prixBase = promo.prix;
    } else {
      const tarifMode = produit.tarifs?.[mode];
      if (!tarifMode) {
        return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Mode d\'impression non disponible.' };
      }
      const tarifGrammage = tarifMode[grammage];
      if (!tarifGrammage) {
        return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Grammage non disponible pour ce mode.' };
      }
      const prix = tarifGrammage[quantiteStr];
      if (prix === undefined) {
        return { prixBase: 0, prixOptions: 0, prixHT: 0, TVA: 0, prixTTC: 0, estPromo: false, surDevis: [], erreur: 'Quantité non disponible pour cette combinaison.' };
      }
      prixBase = prix;
    }
  }

  // Calcul des options
  let prixOptions = 0;
  const surDevis: string[] = [];

  options.forEach(optionNom => {
    const opt = calculatorData.options_finitions[optionNom];
    if (!opt) return;

    // Vérifier applicabilité
    if (opt.applicable_a && !opt.applicable_a.includes(produitId)) return;

    if (opt.prix_par_1000 !== null) {
      prixOptions += (quantite / 1000) * opt.prix_par_1000;
    } else {
      surDevis.push(optionNom);
    }
  });

  const prixHT = prixBase + prixOptions;
  const TVA = prixHT * 0.20;
  const prixTTC = prixHT + TVA;

  return {
    prixBase,
    prixOptions,
    prixHT,
    TVA,
    prixTTC,
    estPromo,
    promoLabel,
    surDevis
  };
}
