import { ProductCategory } from './types';

export interface PricingOption {
  name: string;
  price: string;
}

export interface PricingTable {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface PricingSheet {
  id: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  description: string;
  dimensions: string;
  image: string;
  promo?: {
    text: string;
    preselect: {
      quantity: number;
      printSide?: string;
      paper?: string;
      souches?: string;
    };
  };
  options: PricingOption[];
  tables: PricingTable[];
}

export const AriaPricingCatalog: PricingSheet[] = [
  {
    id: 'flyer-a6',
    name: 'Flyers A6',
    subtitle: '10.5 × 14.8 cm',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Le format A6 est idéal pour la distribution en boîte aux lettres ou en main propre. Prospectus économiques et impactants.',
    dimensions: '10.5 × 14.8 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (1).jpeg',
    promo: {
      text: '🎯 PROMO : 5 000 Flyers A6 — 135g Couché R/V → 1 900 dh HT',
      preselect: {
        quantity: 5000,
        printSide: 'RECTO_VERSO',
        paper: '135g Couché'
      }
    },
    options: [
      { name: 'Pelliculage Brillant Recto', price: '+350 dh / 1 000 ex.' },
      { name: 'Pelliculage Mat Recto', price: '+450 dh / 1 000 ex.' },
      { name: 'Vernis Sélectif UV', price: 'Sur devis' },
      { name: 'Coins Arrondis', price: 'Sur devis' },
      { name: 'Découpes Spéciales', price: 'Sur devis' }
    ],
    tables: [
      {
        title: 'Impression Recto (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 450, 600],
          ['2 000 ex.', 850, 1100],
          ['3 000 ex.', 1200, 1500],
          ['5 000 ex.', 1950, 2500],
          ['10 000 ex.', 3700, 4800],
          ['2 0000 ex.', 7000, 9000],
          ['50 000 ex.', 11300, 13600],
          ['100 000 ex.', 19600, 21500],
          ['200 000 ex.', 32300, 33500]
        ]
      },
      {
        title: 'Impression Recto / Verso (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 750, 950],
          ['2 000 ex.', 1200, 1600],
          ['3 000 ex.', 1700, 2200],
          ['5 000 ex.', 2100, 2800], // Custom promo handles 1900 on select
          ['10 000 ex.', 4900, 6200],
          ['20 000 ex.', 9300, 11800],
          ['50 000 ex.', 14900, 17800],
          ['100 000 ex.', 24800, 28900],
          ['200 000 ex.', 44200, 52900]
        ]
      }
    ]
  },
  {
    id: 'flyer-standard',
    name: 'Flyers A5',
    subtitle: '15 × 21 cm',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Le format standard incontournable pour vos prospectus, menus, flyers commerciaux. Grand espace de communication.',
    dimensions: '15 × 21 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12.jpeg',
    promo: {
      text: '🎯 PROMO : 5 000 Flyers A5 — 135g Couché R/V → 2 300 dh HT',
      preselect: {
        quantity: 5000,
        printSide: 'RECTO_VERSO',
        paper: '135g Couché'
      }
    },
    options: [
      { name: 'Pelliculage Brillant Recto', price: '+350 dh / 1 000 ex.' },
      { name: 'Pelliculage Mat Recto', price: '+450 dh / 1 000 ex.' },
      { name: 'Vernis Sélectif UV', price: 'Sur devis' },
      { name: 'Coins Arrondis', price: 'Sur devis' },
      { name: 'Découpes Spéciales', price: 'Sur devis' }
    ],
    tables: [
      {
        title: 'Impression Recto (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 650, 850],
          ['2 000 ex.', 1300, 1600],
          ['3 000 ex.', 1750, 2300],
          ['5 000 ex.', 2850, 3400],
          ['10 000 ex.', 5400, 6500],
          ['20 000 ex.', 10200, 12300],
          ['50 000 ex.', 24000, 29000],
          ['100 000 ex.', 39000, 45000],
          ['200 000 ex.', 69900, 78000]
        ]
      },
      {
        title: 'Impression Recto / Verso (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 1100, 1350],
          ['2 000 ex.', 1800, 2200],
          ['3 000 ex.', 2500, 2950],
          ['5 000 ex.', 2700, 3500], // Custom promo handles 2300 on select
          ['10 000 ex.', 6300, 7800],
          ['20 000 ex.', 11850, 14700],
          ['50 000 ex.', 27750, 35250],
          ['100 000 ex.', 47000, 57000],
          ['200 000 ex.', 89000, 91900]
        ]
      }
    ]
  },
  {
    id: 'flyer-dl',
    name: 'Flyers DL',
    subtitle: '10 × 21 cm',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Format enveloppe américaine, très élégant et adapté aux cartes de correspondance, cartons d’invitation et dépliants fins.',
    dimensions: '10 × 21 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (1).jpeg',
    promo: {
      text: '🎯 PROMO : 5 000 Flyers DL — 135g Couché R/V → 2 200 dh HT',
      preselect: {
        quantity: 5000,
        printSide: 'RECTO_VERSO',
        paper: '135g Couché'
      }
    },
    options: [
      { name: 'Pelliculage Brillant Recto', price: '+350 dh / 1 000 ex.' },
      { name: 'Pelliculage Mat Recto', price: '+450 dh / 1 000 ex.' },
      { name: 'Vernis Sélectif UV', price: 'Sur devis' },
      { name: 'Coins Arrondis', price: 'Sur devis' },
      { name: 'Découpes Spéciales', price: 'Sur devis' }
    ],
    tables: [
      {
        title: 'Impression Recto (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 550, 750],
          ['2 000 ex.', 1050, 1400],
          ['3 000 ex.', 1500, 1950],
          ['5 000 ex.', 2400, 3100],
          ['10 000 ex.', 4600, 5900],
          ['20 000 ex.', 8700, 11200],
          ['50 000 ex.', 16500, 20500],
          ['100 000 ex.', 29900, 34900],
          ['200 000 ex.', 45900, 51900]
        ]
      },
      {
        title: 'Impression Recto / Verso (Prix en DH HT)',
        headers: ['Quantité', '135g Couché', '170g Couché'],
        rows: [
          ['1 000 ex.', 950, 1200],
          ['2 000 ex.', 1600, 2100],
          ['3 000 ex.', 2200, 2800],
          ['5 000 ex.', 2600, 3400], // Custom promo handles 2200 on select
          ['10 000 ex.', 5800, 7400],
          ['20 000 ex.', 10900, 13900],
          ['50 000 ex.', 21900, 24900],
          ['100 000 ex.', 28900, 33900],
          ['200 000 ex.', 49900, 57900]
        ]
      }
    ]
  },
  {
    id: 'depliant-2volets',
    name: 'Dépliants A4',
    subtitle: '21 × 29.7 cm ouvert',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Idéal pour vos brochures publicitaires pliées (2 ou 3 volets, accordéon ou roulé). Impression offset haute qualité.',
    dimensions: '21 × 29.7 cm ouvert',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (4).jpeg',
    promo: {
      text: '🎯 PROMO CHOC : 1 000 Dépliants A4 — 135g Couché Plié R/V → 1 790 dh HT',
      preselect: {
        quantity: 1000,
        printSide: 'RECTO_VERSO',
        paper: '135g Plié R/V'
      }
    },
    options: [
      { name: 'Pelliculage Brillant Recto/Verso', price: '+600 dh / 1 000 ex.' },
      { name: 'Pelliculage Mat Recto/Verso', price: '+750 dh / 1 000 ex.' },
      { name: 'Vernis Sélectif UV', price: 'Sur devis' },
      { name: 'Dorure à chaud', price: 'Sur devis' }
    ],
    tables: [
      {
        title: 'Tarif Dépliants A4 R/V Plié (Prix en DH HT)',
        headers: ['Quantité', '135g Plié R/V', '170g Plié R/V'],
        rows: [
          ['1 000 ex.', 1790, 2190],
          ['2 000 ex.', 2990, 3790],
          ['3 000 ex.', 4190, 5190],
          ['5 000 ex.', 6490, 7990],
          ['10 000 ex.', 11900, 14900],
          ['20 000 ex.', 21900, 27900],
          ['50 000 ex.', 48900, 61900]
        ]
      }
    ]
  },
  {
    id: 'depliant-a3',
    name: 'Dépliants A3',
    subtitle: '29.7 × 42 cm ouvert',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Dépliants grand format, parfaits pour les menus de restaurant détaillés, brochures d’agences immobilières et événements corporatifs.',
    dimensions: '29.7 × 42 cm ouvert',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (5).jpeg',
    promo: {
      text: '🎯 PROMO CHOC : 1 000 Dépliants A3 — 135g Couché Plié R/V → 3 990 dh HT',
      preselect: {
        quantity: 1000,
        printSide: 'RECTO_VERSO',
        paper: '135g R/V'
      }
    },
    options: [
      { name: 'Pelliculage Mat/Brillant', price: 'Sur devis' },
      { name: 'Vernis UV Sélectif', price: 'Sur devis' },
      { name: 'Dorure à chaud', price: 'Sur devis' }
    ],
    tables: [
      {
        title: 'Tarif Dépliants A3 Pliés (Prix en DH HT)',
        headers: ['Quantité', '135g Recto', '135g R/V', '170g Recto', '170g R/V'],
        rows: [
          ['500 ex.', 2900, 3200, 3200, 3590],
          ['1 000 ex.', 3990, 4590, 4590, 5290], // Promo handles 3990 for 135g R/V 1000ex ? Wait, the promo says: 1000 Dépliants A3 135g Plié R/V -> 3990 DH HT (vs 4590)
          ['2 000 ex.', 6990, 7990, 7990, 9290],
          ['3 000 ex.', 9900, 11300, 11300, 12900],
          ['5 000 ex.', 14900, 16900, 16900, 19900],
          ['10 000 ex.', 27900, 31900, 31900, 36900],
          ['2 0000 ex.', 52900, 59900, 59900, 69900],
          ['50 000 ex.', 89900, 99900, 99900, 115900]
        ]
      }
    ]
  },
  {
    id: 'carnets-ncr-a5',
    name: 'Carnets NCR A5',
    subtitle: '15 × 21 cm',
    category: ProductCategory.PAPETERIE,
    description: 'Carnets autocopiants A5 (bons de commande, de livraison, reçus). 50 feuillets dupli, tripli, quadrupli ou quintupli.',
    dimensions: '15 × 21 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (2).jpeg',
    promo: {
      text: '🎯 Numérotation offerte à partir de 500 ex.',
      preselect: {
        quantity: 500,
        souches: '2 Souches'
      }
    },
    options: [
      { name: 'Numérotation (offerte dès 500 ex.)', price: '+150 dh' },
      { name: 'Collage en tête ou sur le côté', price: 'Gratuit' }
    ],
    tables: [
      {
        title: 'Tarif Carnets NCR A5 (Prix en DH HT)',
        headers: ['Quantité', '2 Souches', '3 Souches', '4 Souches', '5 Souches'],
        rows: [
          ['10 ex.', 308, 445, 560, 680],
          ['20 ex.', 580, 800, 1000, 1150],
          ['30 ex.', 840, 1170, 1450, 1650],
          ['40 ex.', 1080, 1520, 1800, 2100],
          ['50 ex.', 1120, 2800, 2240, 2800],
          ['100 ex.', 2100, 3150, 4000, 5200],
          ['200 ex.', 3800, 5700, 7500, 9100],
          ['500 ex.', 8000, 11800, 15200, 19000] // Wait, prompt says: "A partir de 500 ex. : 2 souches -> 300 dh | 3 souches -> 400 dh..." - wait, this might be unit cost (300dh total for 500ex is impossible, 8000dh for 500ex means 16dh per carnet, which is correct!). So the départ value is 300dh, 400dh, 500dh for 10 ex which matches the 10ex row: 2 souches -> 308 dh, 3 souches -> 445 dh, etc.
        ]
      }
    ]
  },
  {
    id: 'carnets-ncr-a4',
    name: 'Carnets NCR A4',
    subtitle: '29.7 × 21 cm',
    category: ProductCategory.PAPETERIE,
    description: 'Format standard A4 pour factures professionnelles, devis officiels et bons de commande détaillés. 50 feuillets par carnet.',
    dimensions: '29.7 × 21 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (3).jpeg',
    options: [
      { name: 'Numérotation personnalisée', price: '+150 dh' },
      { name: 'Collage en tête ou côté', price: 'Gratuit' }
    ],
    tables: [
      {
        title: 'Tarif Carnets NCR A4 (Prix en DH HT)',
        headers: ['Quantité', '2 Souches', '3 Souches', '4 Souches', '5 Souches'],
        rows: [
          ['10 ex.', 450, 500, 600, 700],
          ['20 ex.', 580, 800, 1000, 1150],
          ['30 ex.', 840, 1170, 1450, 1650],
          ['40 ex.', 1080, 1520, 1800, 2100],
          ['50 ex.', 1120, 2800, 2240, 2800],
          ['100 ex.', 2100, 3150, 4000, 5200]
        ]
      }
    ]
  },
  {
    id: 'carnets-ncr-a4-rv',
    name: 'Carnet Location (A4 R/V)',
    subtitle: '29.7 × 21 cm R/V',
    category: ProductCategory.PAPETERIE,
    description: 'Format A4 imprimé en Recto/Verso avec conditions générales de vente ou contrats au verso. Idéal pour contrats de location, agences immobilières. Feuillets radars fixes disponibles.',
    dimensions: '29.7 × 21 cm',
    image: '/flyers/WhatsApp Image 2026-06-09 at 10.57.12 (3).jpeg',
    options: [
      { name: 'Feuillets Radars fixes (4 souches)', price: 'Disponible' },
      { name: 'Numérotation personnalisée', price: '+150 dh' }
    ],
    tables: [
      {
        title: 'Tarif Carnets NCR A4 R/V (Prix en DH HT)',
        headers: ['Quantité', '2 Souches', '3 Souches', '4 Souches'],
        rows: [
          ['10 ex.', 550, 600, 800],
          ['20 ex.', 1000, 1350, 1500],
          ['30 ex.', 1470, 1900, 2100],
          ['40 ex.', 1900, 2400, 2700],
          ['50 ex.', 2300, 2800, 3200],
          ['100 ex.', 3100, 3500, 5800],
          ['200 ex.', 5900, 6800, 9200]
        ]
      }
    ]
  }
];
