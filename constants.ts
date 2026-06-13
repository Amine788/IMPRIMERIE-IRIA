
import {
  Language,
  ProductCategory,
  Dimension,
  PaperType,
  FinishType,
  PrintSide,
  Product,
  Translations,
} from './types';

// --- General Constants ---
export const CURRENCY = 'MAD';
export const DELIVERY_COST = 0; // Free delivery
export const DEFAULT_LANGUAGE = Language.FR;
export const SUPPORTED_LANGUAGES = [Language.FR, Language.AR, Language.EN];

// --- Routes ---
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PROMOTIONS: '/promotions',
  ABOUT: '/about',
  FAQ: '/faq',
  MACHINES: '/machines',
  BLOG: '/blog',
  CONTACT: '/contact',
  // ACCOUNT: '/account', // Removed
  CART: '/cart',
  CHECKOUT: '/checkout',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  PRODUITS: '/produits',
};

// --- Product Data Mockup ---

const DIMENSIONS: { [key: string]: Dimension } = {
  // Flyers & Dépliants
  A7: { id: 'A7', name: 'A7', width: 74, height: 105 },
  A6: { id: 'A6', name: 'A6', width: 105, height: 148 },
  A5: { id: 'A5', name: 'A5', width: 148, height: 210 },
  DL: { id: 'DL', name: 'DL', width: 100, height: 210 },
  A4: { id: 'A4', name: 'A4', width: 210, height: 297 },
  A3: { id: 'A3', name: 'A3', width: 297, height: 420 },
  ROUND_CUSTOM: { id: 'ROUND_CUSTOM', name: 'Rond (sur mesure)', width: null, height: null, isCustom: true },
  DEPLIANT_2V_A4: { id: 'DEPLIANT_2V_A4', name: 'Dépliant 2 volets A4', width: 210, height: 297 },
  DEPLIANT_2V_A5: { id: 'DEPLIANT_2V_A5', name: 'Dépliant 2 volets A5', width: 148, height: 210 },
  DEPLIANT_2V_A6: { id: 'DEPLIANT_2V_A6', name: 'Dépliant 2 volets A6', width: 105, height: 148 },
  DEPLIANT_3V_A4: { id: 'DEPLIANT_3V_A4', name: 'Dépliant 3 volets A4', width: 210, height: 297 },
  DEPLIANT_3V_A5: { id: 'DEPLIANT_3V_A5', name: 'Dépliant 3 volets A5', width: 148, height: 210 },
  DEPLIANT_3V_A6: { id: 'DEPLIANT_3V_A6', name: 'Dépliant 3 volets A6', width: 105, height: 148 },
  DEPLIANT_3V_14X14: { id: 'DEPLIANT_3V_14X14', name: 'Dépliant 3 volets 14x14 cm', width: 140, height: 140 },
  DEPLIANT_4V_10X21: { id: 'DEPLIANT_4V_10X21', name: 'Dépliant 4 volets 10x21 cm', width: 100, height: 210 },

  // Cartes
  STANDARD_CARD: { id: 'STANDARD_CARD', name: 'Standard', width: 85, height: 54 },
  SQUARE_CARD: { id: 'SQUARE_CARD', name: 'Carrée', width: 65, height: 65 },
  CUSTOM_CARD: { id: 'CUSTOM_CARD', name: 'Sur mesure', width: null, height: null, isCustom: true },

  // Affiches & Grand Format
  A0: { id: 'A0', name: 'A0', width: 841, height: 1190 },
  A1: { id: 'A1', name: 'A1', width: 594, height: 841 },
  A2: { id: 'A2', name: 'A2', width: 420, height: 594 },
  CUSTOM_POSTER: { id: 'CUSTOM_POSTER', name: 'Sur mesure', width: null, height: null, isCustom: true },

  // Catalogues & Brochures
  CATALOGUE_A4: { id: 'CATALOGUE_A4', name: 'A4', width: 210, height: 297 },
  CATALOGUE_A5: { id: 'CATALOGUE_A5', name: 'A5', width: 148, height: 210 },
  CATALOGUE_CARRE: { id: 'CATALOGUE_CARRE', name: 'Carré', width: 210, height: 210 },
  CATALOGUE_16X24: { id: 'CATALOGUE_16X24', name: '16x24 cm', width: 160, height: 240 },
  CUSTOM_CATALOGUE: { id: 'CUSTOM_CATALOGUE', name: 'Sur mesure', width: null, height: null, isCustom: true },

  // Packaging
  CARTON_BOX: { id: 'CARTON_BOX', name: 'Boîte Carton', width: null, height: null, isCustom: true },
  RIGID_BOX: { id: 'RIGID_BOX', name: 'Boîte Rigide', width: null, height: null, isCustom: true },
  LUXE_BOX: { id: 'LUXE_BOX', name: 'Coffret Luxe', width: null, height: null, isCustom: true },
  MAGNETIC_BOX: { id: 'MAGNETIC_BOX', name: 'Boîte Aimantée', width: null, height: null, isCustom: true },
  CUSTOM_PACKAGING: { id: 'CUSTOM_PACKAGING', name: 'Sur mesure', width: null, height: null, isCustom: true },

  // Papeterie
  ENVELOPPE_US: { id: 'ENVELOPPE_US', name: 'Enveloppe US', width: 110, height: 220 },
  ENVELOPPE_C6: { id: 'ENVELOPPE_C6', name: 'Enveloppe C6', width: 114, height: 162 },
  ENVELOPPE_A5: { id: 'ENVELOPPE_A5', name: 'Enveloppe A5', width: 162, height: 229 },
  ENVELOPPE_A4: { id: 'ENVELOPPE_A4', name: 'Enveloppe A4', width: 220, height: 330 },
  ENVELOPPE_RADIO_26X36: { id: 'ENVELOPPE_RADIO_26X36', name: 'Enveloppe Radiologie 26x36', width: 260, height: 360 },
  ENVELOPPE_RADIO_31X41: { id: 'ENVELOPPE_RADIO_31X41', name: 'Enveloppe Radiologie 31x41', width: 310, height: 410 },
  PAPER_HEADER: { id: 'PAPER_HEADER', name: 'Papier en-tête', width: 210, height: 297 },
  FOLDER: { id: 'FOLDER', name: 'Chemise à rabat', width: 215, height: 300 }, // Example size
  NOTEPAD: { id: 'NOTEPAD', name: 'Bloc-notes', width: 148, height: 210 }, // A5 default

  // Objets & PLV
  ROLLUP_85X200: { id: 'ROLLUP_85X200', name: 'Roll-up 85x200 cm', width: 850, height: 2000 },
  ROLLUP_120X200: { id: 'ROLLUP_120X200', name: 'Roll-up 120x200 cm', width: 1200, height: 2000 },
  KAKEMONO: { id: 'KAKEMONO', name: 'Kakemono', width: 600, height: 1600 }, // Example size
  BACHE: { id: 'BACHE', name: 'Bâche', width: null, height: null, isCustom: true },
  STICKERS_CUSTOM: { id: 'STICKERS_CUSTOM', name: 'Stickers (sur mesure)', width: null, height: null, isCustom: true },
  LABELS_CUSTOM: { id: 'LABELS_CUSTOM', name: 'Étiquettes Adhésives (sur mesure)', width: null, height: null, isCustom: true },
  MUG: { id: 'MUG', name: 'Mug', width: 80, height: 95 }, // Diameter x Height
  TOTEBAG: { id: 'TOTEBAG', name: 'Tote bag', width: 380, height: 420 }, // Example size
  PENS: { id: 'PENS', name: 'Stylos', width: 140, height: 10 }, // Example size
  BADGES_PVC: { id: 'BADGES_PVC', name: 'Badges PVC', width: 85, height: 54 },
};

const PAPER_TYPES: { [key: string]: PaperType } = {
  COATED_MATT_135: { id: 'COATED_MATT_135', name: 'Couché Mat 135g', grammage: 135, priceMultiplier: 1.0 },
  COATED_MATT_170: { id: 'COATED_MATT_170', name: 'Couché Mat 170g', grammage: 170, priceMultiplier: 1.1 },
  COATED_GLOSS_135: { id: 'COATED_GLOSS_135', name: 'Couché Brillant 135g', grammage: 135, priceMultiplier: 1.05 },
  COATED_GLOSS_170: { id: 'COATED_GLOSS_170', name: 'Couché Brillant 170g', grammage: 170, priceMultiplier: 1.15 },
  OFFSET_90: { id: 'OFFSET_90', name: 'Offset 90g', grammage: 90, priceMultiplier: 0.95 },
  RECYCLED_80: { id: 'RECYCLED_80', name: 'Recyclé 80g', grammage: 80, priceMultiplier: 0.9 },
  KRAFT_300: { id: 'KRAFT_300', name: 'Kraft Recyclé 300g', grammage: 300, priceMultiplier: 1.5 },
  PVC_CARD: { id: 'PVC_CARD', name: 'PVC 760µ', grammage: 760, priceMultiplier: 2.5 },
  NA_PAPER: { id: 'NA_PAPER', name: 'N/A', grammage: 0, priceMultiplier: 1.0 }, // Added N/A paper type
  NCR_2_SOUCHES: { id: 'NCR_2_SOUCHES', name: '2 Souches (Dupli)', grammage: 60, priceMultiplier: 1.0 },
  NCR_3_SOUCHES: { id: 'NCR_3_SOUCHES', name: '3 Souches (Tripli)', grammage: 60, priceMultiplier: 1.45 },
  NCR_4_SOUCHES: { id: 'NCR_4_SOUCHES', name: '4 Souches (Quadrupli)', grammage: 60, priceMultiplier: 1.8 },
  NCR_5_SOUCHES: { id: 'NCR_5_SOUCHES', name: '5 Souches (Quintupli)', grammage: 60, priceMultiplier: 2.2 },
};

const FINISH_TYPES: { [key: string]: FinishType } = {
  NONE: { id: 'NONE', name: 'Aucune', priceMultiplier: 1.0 },
  MATT_LAMINATION: { id: 'MATT_LAMINATION', name: 'Pelliculage Mat', priceMultiplier: 1.2 },
  GLOSS_LAMINATION: { id: 'GLOSS_LAMINATION', name: 'Pelliculage Brillant', priceMultiplier: 1.25 },
  SOFT_TOUCH_LAMINATION: { id: 'SOFT_TOUCH_LAMINATION', name: 'Pelliculage Soft Touch', priceMultiplier: 1.35 },
  SELECTIVE_VARNISH_3D: { id: 'SELECTIVE_VARNISH_3D', name: 'Vernis Sélectif 3D', priceMultiplier: 1.8, is3D: true },
  ROUNDED_CORNERS: { id: 'ROUNDED_CORNERS', name: 'Coins Arrondis', priceMultiplier: 1.1 }, // Additive per unit
  EDGE_COLORED: { id: 'EDGE_COLORED', name: 'Tranche Colorée', priceMultiplier: 1.7 },
  EDGE_METALLIC: { id: 'EDGE_METALLIC', name: 'Tranche Métallisée', priceMultiplier: 2.0 },
  NA_FINISH: { id: 'NA_FINISH', name: 'N/A', priceMultiplier: 1.0 }, // Added N/A finish type
};

const COMMON_QUANTITY_STEPS = [50, 100, 250, 500, 1000, 2500, 5000];

export const PRODUCT_DATA: Product[] = [
  // Flyers & Dépliants
  {
    id: 'flyer-standard',
    name: 'Flyers A5',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Flyers A5 (15×21 cm) offset haute qualité. Recto ou Recto/Verso.',
    image: '/assets/flyers_a5.png',
    basePricePerUnit: 0.65, // 650 dh / 1000 ex (135g Couché Recto)
    availableDimensions: [DIMENSIONS.A5],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_135, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.GLOSS_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D, FINISH_TYPES.ROUNDED_CORNERS],
    minQuantity: 1000,
    quantitySteps: [1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000, 200000],
    defaultOptions: {
      dimensionId: DIMENSIONS.A5.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 5000,
    },
  },
  {
    id: 'flyer-round',
    name: 'Flyer Rond',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Flyers originaux de forme ronde, sur mesure.',
    image: '/assets/flyer_rond.png', // Relevant image: Custom shaped sticker/label
    basePricePerUnit: 1.5,
    availableDimensions: [DIMENSIONS.ROUND_CUSTOM],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION],
    minQuantity: 100,
    quantitySteps: [100, 250, 500, 1000],
    defaultOptions: {
      dimensionId: DIMENSIONS.ROUND_CUSTOM.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_170.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 250,
    },
  },
  {
    id: 'depliant-2volets',
    name: 'Dépliants A4',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Dépliants A4 (21×29.7 cm ouvert) avec 2, 3 ou 4 volets. Impression offset haute qualité.',
    image: '/assets/depliant_a4.png',
    basePricePerUnit: 1.79, // 1790 dh / 1000 ex (135g Couché Plié R/V)
    availableDimensions: [DIMENSIONS.DEPLIANT_2V_A4, DIMENSIONS.DEPLIANT_3V_A4, DIMENSIONS.DEPLIANT_4V_10X21],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.GLOSS_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D],
    minQuantity: 1000,
    quantitySteps: [1000, 2000, 3000, 5000, 10000, 20000, 50000],
    defaultOptions: {
      dimensionId: DIMENSIONS.DEPLIANT_2V_A4.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 1000,
    },
  },
  // Cartes
  {
    id: 'carte-visite-standard',
    name: 'Carte de Visite Standard',
    category: ProductCategory.CARTES,
    description: 'Votre carte de visite professionnelle classique.',
    image: '/assets/carte_de_visite_standard.png', // Relevant image: Stack of business cards with a hand
    basePricePerUnit: 1.0,
    availableDimensions: [DIMENSIONS.STANDARD_CARD],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_170, PAPER_TYPES.OFFSET_90, PAPER_TYPES.KRAFT_300],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D, FINISH_TYPES.ROUNDED_CORNERS],
    minQuantity: 100,
    quantitySteps: COMMON_QUANTITY_STEPS,
    defaultOptions: {
      dimensionId: DIMENSIONS.STANDARD_CARD.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_170.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 250,
    },
  },
  {
    id: 'carte-visite-luxe',
    name: 'Carte de Visite Luxe',
    category: ProductCategory.CARTES,
    description: 'Cartes de visite haut de gamme avec finitions spéciales.',
    image: '/assets/carte_de_visite_luxe.png', // Relevant image: Elegant business cards with subtle texture
    basePricePerUnit: 2.5,
    availableDimensions: [DIMENSIONS.STANDARD_CARD, DIMENSIONS.SQUARE_CARD],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_170], // Simulate thicker paper
    availableFinishTypes: [FINISH_TYPES.SOFT_TOUCH_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D, FINISH_TYPES.EDGE_COLORED, FINISH_TYPES.EDGE_METALLIC],
    minQuantity: 100,
    quantitySteps: [100, 250, 500, 1000],
    defaultOptions: {
      dimensionId: DIMENSIONS.STANDARD_CARD.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_170.id,
      finishTypeId: FINISH_TYPES.SELECTIVE_VARNISH_3D.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 100,
    },
  },
  {
    id: 'carte-pvc',
    name: 'Carte PVC',
    category: ProductCategory.CARTES,
    description: 'Cartes en PVC résistantes, idéales pour cartes de fidélité.',
    image: '/assets/carte_pvc.png', // Relevant image: Generic plastic card (loyalty/gift)
    basePricePerUnit: 3.5,
    availableDimensions: [DIMENSIONS.STANDARD_CARD],
    availablePaperTypes: [PAPER_TYPES.PVC_CARD],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 50,
    quantitySteps: [50, 100, 250, 500],
    defaultOptions: {
      dimensionId: DIMENSIONS.STANDARD_CARD.id,
      paperTypeId: PAPER_TYPES.PVC_CARD.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 100,
    },
  },
  // Affiches & Grand Format
  {
    id: 'affiche-standard',
    name: 'Affiche Standard',
    category: ProductCategory.AFFICHES_GRAND_FORMAT,
    description: 'Affiches pour votre communication grand format.',
    image: '/assets/fiche.png', // Relevant image: Person looking at a large poster
    basePricePerUnit: 20.0, // A3 base price
    availableDimensions: [DIMENSIONS.A3, DIMENSIONS.A2, DIMENSIONS.A1, DIMENSIONS.A0, DIMENSIONS.CUSTOM_POSTER],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.OFFSET_90],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 1,
    quantitySteps: [1, 5, 10, 20, 50, 100],
    defaultOptions: {
      dimensionId: DIMENSIONS.A2.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 10,
    },
  },
  // Catalogues & Brochures
  {
    id: 'catalogue-agraphe',
    name: 'Catalogue Agrafé',
    category: ProductCategory.CATALOGUES_BROCHURES,
    description: 'Catalogues agrafés pour une présentation économique et efficace.',
    image: '/assets/catalogue_agrafe.png', // Relevant image: Open catalog/magazine
    basePricePerUnit: 15.0, // A5 base price for ~8 pages
    availableDimensions: [DIMENSIONS.CATALOGUE_A4, DIMENSIONS.CATALOGUE_A5, DIMENSIONS.CATALOGUE_CARRE],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.OFFSET_90],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION],
    minQuantity: 20,
    quantitySteps: [20, 50, 100, 250, 500],
    defaultOptions: {
      dimensionId: DIMENSIONS.CATALOGUE_A5.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 50,
    },
  },
  // Packaging
  {
    id: 'boite-carton',
    name: 'Boîte Carton Personnalisée',
    category: ProductCategory.PACKAGING,
    description: 'Packaging sur mesure pour vos produits.',
    image: '/assets/boite_carton_personnalisee.png', // Relevant image: Various custom printed boxes
    basePricePerUnit: 10.0, // Base for small carton box
    availableDimensions: [DIMENSIONS.CUSTOM_PACKAGING], // Custom dimensions required
    availablePaperTypes: [PAPER_TYPES.KRAFT_300, PAPER_TYPES.COATED_MATT_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION],
    minQuantity: 50,
    quantitySteps: [50, 100, 250, 500],
    defaultOptions: {
      dimensionId: DIMENSIONS.CUSTOM_PACKAGING.id,
      paperTypeId: PAPER_TYPES.KRAFT_300.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO, // Most packaging is single sided print
      quantity: 100,
    },
  },
  // Papeterie
  {
    id: 'enveloppe-us',
    name: 'Enveloppe US',
    category: ProductCategory.PAPETERIE,
    description: 'Enveloppes personnalisées pour votre correspondance.',
    image: '/assets/enveloppe_us.png', // Relevant image: Stack of white envelopes
    basePricePerUnit: 1.0,
    availableDimensions: [DIMENSIONS.ENVELOPPE_US, DIMENSIONS.ENVELOPPE_C6, DIMENSIONS.ENVELOPPE_A5, DIMENSIONS.ENVELOPPE_A4],
    availablePaperTypes: [PAPER_TYPES.OFFSET_90],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 100,
    quantitySteps: COMMON_QUANTITY_STEPS,
    defaultOptions: {
      dimensionId: DIMENSIONS.ENVELOPPE_US.id,
      paperTypeId: PAPER_TYPES.OFFSET_90.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 500,
    },
  },
  {
    id: 'papier-entete',
    name: 'Papier en-tête',
    category: ProductCategory.PAPETERIE,
    description: 'Papier en-tête personnalisé pour un usage professionnel.',
    image: '/assets/papier_en_tete.png', // Relevant image: Branded notepad/letterhead
    basePricePerUnit: 0.5,
    availableDimensions: [DIMENSIONS.PAPER_HEADER],
    availablePaperTypes: [PAPER_TYPES.OFFSET_90, PAPER_TYPES.RECYCLED_80],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 100,
    quantitySteps: COMMON_QUANTITY_STEPS,
    defaultOptions: {
      dimensionId: DIMENSIONS.PAPER_HEADER.id,
      paperTypeId: PAPER_TYPES.OFFSET_90.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 1000,
    },
  },
  // Objets & PLV
  {
    id: 'rollup-standard',
    name: 'Roll-up Publicitaire',
    category: ProductCategory.OBJETS_PLV,
    description: 'Roll-up pour vos présentations et salons.',
    image: '/assets/roll_up_publicitaire.png', // Relevant image: Roll-up banner at an exhibition
    basePricePerUnit: 250.0,
    availableDimensions: [DIMENSIONS.ROLLUP_85X200, DIMENSIONS.ROLLUP_120X200],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_170], // Simulate durable material
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 1,
    quantitySteps: [1, 2, 5, 10],
    defaultOptions: {
      dimensionId: DIMENSIONS.ROLLUP_85X200.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_170.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 1,
    },
  },
  {
    id: 'mug-personnalise',
    name: 'Mug Personnalisé',
    category: ProductCategory.OBJETS_PLV,
    description: 'Mugs personnalisés avec votre logo ou design.',
    image: '/assets/mug_personnalise.png', // Relevant image: White mug with a custom design
    basePricePerUnit: 35.0,
    availableDimensions: [DIMENSIONS.MUG],
    availablePaperTypes: [PAPER_TYPES.NA_PAPER], // Use N/A paper type
    availableFinishTypes: [FINISH_TYPES.NA_FINISH], // Use N/A finish type
    minQuantity: 1,
    quantitySteps: [1, 6, 12, 24, 50, 100],
    defaultOptions: {
      dimensionId: DIMENSIONS.MUG.id,
      paperTypeId: PAPER_TYPES.NA_PAPER.id, // Set default to N/A
      finishTypeId: FINISH_TYPES.NA_FINISH.id, // Set default to N/A
      printSide: PrintSide.RECTO, // Single print for mug
      quantity: 6,
    },
  },
  {
    id: 'tote-bag-personnalise',
    name: 'Tote Bag Personnalisé',
    category: ProductCategory.OBJETS_PLV,
    description: 'Tote bags écologiques personnalisés pour votre marque.',
    image: '/assets/tote_bag_personnalise.png', // Relevant image: Tote bag with a logo
    basePricePerUnit: 45.0,
    availableDimensions: [DIMENSIONS.TOTEBAG],
    availablePaperTypes: [PAPER_TYPES.NA_PAPER], // Use N/A paper type
    availableFinishTypes: [FINISH_TYPES.NA_FINISH], // Use N/A finish type
    minQuantity: 10,
    quantitySteps: [10, 25, 50, 100, 250],
    defaultOptions: {
      dimensionId: DIMENSIONS.TOTEBAG.id,
      paperTypeId: PAPER_TYPES.NA_PAPER.id, // Set default to N/A
      finishTypeId: FINISH_TYPES.NA_FINISH.id, // Set default to N/A
      printSide: PrintSide.RECTO,
      quantity: 25,
    },
  },
  {
    id: 'pens-personnalise',
    name: 'Stylos Personnalisés',
    category: ProductCategory.OBJETS_PLV,
    description: 'Stylos personnalisés avec votre logo.',
    image: '/assets/stylos_personnalises.png',
    basePricePerUnit: 5.0,
    availableDimensions: [DIMENSIONS.PENS],
    availablePaperTypes: [PAPER_TYPES.NA_PAPER],
    availableFinishTypes: [FINISH_TYPES.NA_FINISH],
    minQuantity: 50,
    quantitySteps: [50, 100, 250, 500, 1000],
    defaultOptions: {
      dimensionId: DIMENSIONS.PENS.id,
      paperTypeId: PAPER_TYPES.NA_PAPER.id,
      finishTypeId: FINISH_TYPES.NA_FINISH.id,
      printSide: PrintSide.RECTO,
      quantity: 100,
    },
  },

  // ─── Nouveaux produits avec photos réelles Imprimerie Aria ───────────────────

  {
    id: 'flyer-a6',
    name: 'Flyers A6',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Flyers A6 (10.5×14.8 cm). Idéal pour prospectus et petites annonces.',
    image: '/assets/flyers_a6.png',
    basePricePerUnit: 0.45, // 450 dh / 1000 ex (135g Couché Recto)
    availableDimensions: [DIMENSIONS.A6],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_135, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.GLOSS_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D, FINISH_TYPES.ROUNDED_CORNERS],
    minQuantity: 1000,
    quantitySteps: [1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000, 200000],
    defaultOptions: {
      dimensionId: DIMENSIONS.A6.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 5000,
    },
  },

  {
    id: 'flyer-dl',
    name: 'Flyers DL 10×21',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Flyers format DL (10×21 cm). Parfait pour menus, offres et cartes postales.',
    image: '/assets/flyers_a6.png',
    basePricePerUnit: 0.55, // 550 dh / 1000 ex (135g Couché Recto)
    availableDimensions: [DIMENSIONS.DL],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_135, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.GLOSS_LAMINATION],
    minQuantity: 1000,
    quantitySteps: [1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000, 200000],
    defaultOptions: {
      dimensionId: DIMENSIONS.DL.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 5000,
    },
  },

  {
    id: 'depliant-a3',
    name: 'Dépliants A3',
    category: ProductCategory.FLYERS_DEPLIANTS,
    description: 'Dépliants A3 (29.7×42 cm ouvert). Grand format avec 2, 3 ou 4 volets, finitions premium.',
    image: '/assets/depliant_a3.png',
    basePricePerUnit: 3.99, // 3990 dh / 1000 ex (135g Couché Plié R/V)
    availableDimensions: [DIMENSIONS.A3],
    availablePaperTypes: [PAPER_TYPES.COATED_MATT_135, PAPER_TYPES.COATED_MATT_170, PAPER_TYPES.COATED_GLOSS_170],
    availableFinishTypes: [FINISH_TYPES.NONE, FINISH_TYPES.MATT_LAMINATION, FINISH_TYPES.GLOSS_LAMINATION, FINISH_TYPES.SELECTIVE_VARNISH_3D],
    minQuantity: 500,
    quantitySteps: [500, 1000, 2000, 3000, 5000, 10000, 20000, 50000],
    defaultOptions: {
      dimensionId: DIMENSIONS.A3.id,
      paperTypeId: PAPER_TYPES.COATED_MATT_135.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 1000,
    },
  },

  {
    id: 'carnets-ncr-a5',
    name: 'Carnets NCR A5',
    category: ProductCategory.PAPETERIE,
    description: 'Carnets autocopiants NCR A5 (15×21 cm). 2 à 5 souches. Avec ou sans numérotation.',
    image: '/assets/carnets_ncr_a5.png',
    basePricePerUnit: 30.8, // 308 dh / 10 carnets (2 souches Blanc/Jaune)
    availableDimensions: [DIMENSIONS.CATALOGUE_A5],
    availablePaperTypes: [PAPER_TYPES.NCR_2_SOUCHES, PAPER_TYPES.NCR_3_SOUCHES, PAPER_TYPES.NCR_4_SOUCHES, PAPER_TYPES.NCR_5_SOUCHES],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 10,
    quantitySteps: [10, 20, 30, 40, 50, 100, 200, 500],
    defaultOptions: {
      dimensionId: DIMENSIONS.CATALOGUE_A5.id,
      paperTypeId: PAPER_TYPES.NCR_2_SOUCHES.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 50,
    },
  },

  {
    id: 'carnets-ncr-a4',
    name: 'Carnets NCR A4',
    category: ProductCategory.PAPETERIE,
    description: 'Carnets autocopiants NCR A4 (29.7×21 cm). Factures, bons de commande, devis. 2 à 5 souches.',
    image: '/assets/carnets_ncr_a4.png',
    basePricePerUnit: 45.0, // 450 dh / 10 carnets (2 souches Blanc/Jaune)
    availableDimensions: [DIMENSIONS.CATALOGUE_A4],
    availablePaperTypes: [PAPER_TYPES.NCR_2_SOUCHES, PAPER_TYPES.NCR_3_SOUCHES, PAPER_TYPES.NCR_4_SOUCHES, PAPER_TYPES.NCR_5_SOUCHES],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 10,
    quantitySteps: [10, 20, 30, 40, 50, 100, 200],
    defaultOptions: {
      dimensionId: DIMENSIONS.CATALOGUE_A4.id,
      paperTypeId: PAPER_TYPES.NCR_2_SOUCHES.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO,
      quantity: 50,
    },
  },
  {
    id: 'carnets-ncr-a4-rv',
    name: 'Carnets NCR A4 R/V',
    category: ProductCategory.PAPETERIE,
    description: 'Carnets NCR A4 (29.7×21 cm) imprimés en Recto/Verso (Contrats de location, etc.). Feuillets radars fixes dispos (4 souches).',
    image: '/assets/carnets_ncr_a4_rv.png',
    basePricePerUnit: 55.0, // 550 dh / 10 carnets
    availableDimensions: [DIMENSIONS.CATALOGUE_A4],
    availablePaperTypes: [PAPER_TYPES.NCR_2_SOUCHES, PAPER_TYPES.NCR_3_SOUCHES, PAPER_TYPES.NCR_4_SOUCHES],
    availableFinishTypes: [FINISH_TYPES.NONE],
    minQuantity: 10,
    quantitySteps: [10, 20, 30, 40, 50, 100, 200],
    defaultOptions: {
      dimensionId: DIMENSIONS.CATALOGUE_A4.id,
      paperTypeId: PAPER_TYPES.NCR_2_SOUCHES.id,
      finishTypeId: FINISH_TYPES.NONE.id,
      printSide: PrintSide.RECTO_VERSO,
      quantity: 50,
    },
  },
];

// --- Translations ---
export const TRANSLATIONS: Translations = {
  [Language.FR]: {
    // Header
    'app.name': 'Imprimerie Aria',
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.promotions': 'Promotions',
    'nav.about': 'À propos',
    'nav.faq': 'FAQ',
    'nav.machines': 'Parc machines',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    // 'nav.account': 'Mon compte', // Removed
    // 'nav.login': 'Connexion', // Removed
    // 'nav.register': 'Inscription', // Removed
    'nav.cart': 'Panier',
    'nav.admin': 'Administration',


    // Footer
    'footer.cgv': 'Conditions Générales de Vente',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.paymentMethods': 'Méthodes de Paiement',
    'footer.delivery': 'Livraison',
    'footer.socialNetworks': 'Réseaux Sociaux',
    'footer.contactInfo': 'Coordonnées',
    'footer.allRightsReserved': 'Tous droits réservés.',

    // Homepage
    'hero.title': 'Imprimerie en ligne – Livraison gratuite partout au Maroc',
    'hero.subtitle': 'Cartes, Flyers, Affiches, Packaging, PLV',
    'hero.cta': 'Commander maintenant',
    'advantages.title': 'Nos Avantages',
    'advantage.freeDelivery': 'Livraison gratuite',
    'advantage.freeDelivery.description': 'Partout au Maroc, sans frais supplémentaires.',
    'advantage.instantPrice': 'Prix instantané',
    'advantage.instantPrice.description': 'Calculez votre prix en temps réel.',
    'advantage.securePayment': 'Paiement sécurisé',
    'advantage.securePayment.description': 'Vos transactions en toute confiance.',
    'advantage.customerSupport': 'Support client',
    'advantage.customerSupport.description': 'Une équipe à votre écoute.',
    'popularProducts.title': 'Nos Produits Populaires',
    'promotions.title': 'Nos Promotions Actuelles',
    'customerReviews.title': 'Ce que nos clients disent',
    'productCard.startingFrom': 'À partir de',

    // Product Listing Page
    'productListing.title': 'Découvrez nos produits d\'impression',
    'productListing.allCategories': 'Toutes les catégories',

    // Product Categories
    'category.FLYERS_DEPLIANTS': 'Flyers & Dépliants',
    'category.CARTES': 'Cartes',
    'category.AFFICHES_GRAND_FORMAT': 'Affiches & Grand Format',
    'category.CATALOGUES_BROCHURES': 'Catalogues & Brochures',
    'category.PACKAGING': 'Packaging',
    'category.PAPETERIE': 'Papeterie',
    'category.OBJETS_PLV': 'Objets & PLV',

    // Product Detail Page
    'productDetail.selectDimensions': 'Sélectionnez les dimensions',
    'productDetail.customDimensions': 'Dimensions personnalisées',
    'productDetail.width': 'Largeur (mm)',
    'productDetail.height': 'Hauteur (mm)',
    'productDetail.selectPaper': 'Sélectionnez le papier',
    'productDetail.selectFinish': 'Sélectionnez la finition',
    'productDetail.printSide': 'Impression',
    'productDetail.RECTO': 'Recto seul',
    'productDetail.RECTO_VERSO': 'Recto / Verso',
    'productDetail.quantity': 'Quantité',
    'productDetail.estimatedPrice': 'Prix estimé',
    'productDetail.deliveryTime': 'Délai de production',
    'productDetail.deliveryDays': 'jours ouvrables',
    'productDetail.uploadFile': 'Uploader votre fichier',
    'productDetail.uploadFileInstructions': 'Formats acceptés : PDF CMJN 300 DPI (max 25MB)',
    'productDetail.addToCart': 'Ajouter au panier',
    'productDetail.buyNow': 'Commander maintenant', // Added translation
    'productDetail.fileUploaded': 'Fichier téléchargé :',
    'productDetail.changeFile': 'Changer de fichier',
    'productDetail.noFileSelected': 'Aucun fichier sélectionné',
    'productDetail.selectOption': 'Sélectionnez une option',
    'productDetail.customDimensionPlaceholder': 'Entrez la taille',
    'productDetail.NA_PAPER': 'N/A', // Translate N/A for Paper Type
    'productDetail.NA_FINISH': 'N/A', // Translate N/A for Finish Type
    'productDetail.grams': 'g',


    // Cart Page
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide.',
    'cart.product': 'Produit',
    'cart.options': 'Options',
    'cart.unitPrice': 'Prix Unitaire',
    'cart.quantity': 'Quantité',
    'cart.total': 'Total',
    'cart.subtotal': 'Sous-total',
    'cart.delivery': 'Livraison',
    'cart.totalToPay': 'Total à payer',
    'cart.continueShopping': 'Continuer mes achats',
    'cart.proceedToCheckout': 'Passer la commande',
    'cart.remove': 'Supprimer',

    // Checkout Page
    'checkout.title': 'Passer la commande',
    'checkout.orderSummary': 'Résumé de la commande',
    'checkout.shippingAddress': 'Adresse de livraison',
    'checkout.name': 'Nom',
    'checkout.address': 'Adresse',
    'checkout.city': 'Ville',
    'checkout.phone': 'Téléphone',
    'checkout.email': 'Email',
    'checkout.paymentMethod': 'Méthode de paiement',
    'checkout.placeOrder': 'Confirmer la commande',
    'checkout.paymentMethod.CARTE_BANCAIRE': 'Carte bancaire',
    'checkout.paymentMethod.VIREMENT': 'Virement bancaire',
    'checkout.paymentMethod.ESPECES_LIVRAISON': 'Espèces à la livraison',
    'checkout.thankYou': 'Merci pour votre commande !',
    'checkout.orderNumber': 'Votre numéro de commande est :',
    'checkout.orderStatus': 'Statut de la commande',
    'orderStatus.EN_ATTENTE': 'En attente',
    'orderStatus.EN_PRODUCTION': 'En production',
    'orderStatus.EXPEDIEE': 'Expédiée',
    'orderStatus.LIVREE': 'Livrée',

    // Admin
    'admin.login.title': 'Connexion Administration',
    'admin.login.username': 'Nom d\'utilisateur',
    'admin.login.password': 'Mot de passe',
    'admin.login.button': 'Se connecter',
    'admin.login.error': 'Nom d\'utilisateur ou mot de passe incorrect.',
    'admin.dashboard.title': 'Tableau de Bord Administration',
    'admin.dashboard.welcome': 'Bienvenue, Administrateur !',
    'admin.dashboard.manageContent': 'Gerez votre contenu, vos produits et vos commandes ci-dessous.',
    'admin.dashboard.manageProducts': 'Gérer les Produits',
    'admin.dashboard.manageOrders': 'Gérer les Commandes',
    'admin.dashboard.manageUsers': 'Gérer les Utilisateurs',
    'admin.dashboard.managePromos': 'Gérer les Promotions',
    'admin.dashboard.uploadClientFiles': 'Uploader Fichiers Clients',
    'admin.dashboard.kpiDashboard': 'Tableau de Bord KPI',
    'admin.logout': 'Déconnexion',
    'admin.card.manageProducts.description': 'Ajouter, modifier ou supprimer des produits du catalogue.',
    'admin.card.manageOrders.description': 'Gérer les commandes clients, leurs statuts et factures.',
    'admin.card.manageUsers.description': 'Gérer les comptes utilisateurs et leurs informations.',
    'admin.card.managePromos.description': 'Créer, éditer et activer des promotions et des réductions.',
    'admin.card.uploadClientFiles.description': 'Accéder et gérer les fichiers d\'impression téléchargés par les clients.',
    'admin.card.kpiDashboard.description': 'Visualiser les indicateurs clés de performance du site.',


    // Other Pages (placeholders)
    'faq.title': 'Foire Aux Questions',
    'about.title': 'À Propos de Nous',
    'contact.title': 'Contactez-nous',
    'blog.title': 'Notre Blog',
    'machines.title': 'Notre Parc Machines',
    // 'account.title': 'Mon Compte', // Removed
    'notFound.title': 'Page non trouvée',
    'notFound.message': 'Désolé, la page que vous recherchez n\'existe pas.',
    'notFound.backHome': 'Retour à l\'accueil',
  },
  [Language.AR]: {
    // Header
    'app.name': 'مطبعة آريا',
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.promotions': 'العروض',
    'nav.about': 'عنا',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.machines': 'أسطول الآلات',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    // 'nav.account': 'حسابي', // Removed
    // 'nav.login': 'تسجيل الدخول', // Removed
    // 'nav.register': 'تسجيل', // Removed
    'nav.cart': 'عربة التسوق',
    'nav.admin': 'الإدارة',


    // Footer
    'footer.cgv': 'شروط البيع العامة',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.paymentMethods': 'طرق الدفع',
    'footer.delivery': 'التوصيل',
    'footer.socialNetworks': 'شبكات التواصل الاجتماعي',
    'footer.contactInfo': 'معلومات الاتصال',
    'footer.allRightsReserved': 'جميع الحقوق محفوظة.',

    // Homepage
    'hero.title': 'مطبعة على الإنترنت – توصيل مجاني في جميع أنحاء المغرب',
    'hero.subtitle': 'بطاقات، منشورات، ملصقات، تغليف، لافتات نقطة البيع',
    'hero.cta': 'اطلب الآن',
    'advantages.title': 'مميزاتنا',
    'advantage.freeDelivery': 'توصيل مجاني',
    'advantage.freeDelivery.description': 'في جميع أنحاء المغرب، بدون رسوم إضافية.',
    'advantage.instantPrice': 'سعر فوري',
    'advantage.instantPrice.description': 'احسب سعرك في الوقت الفعلي.',
    'advantage.securePayment': 'دفع آمن',
    'advantage.securePayment.description': 'معاملاتك بثقة تامة.',
    'advantage.customerSupport': 'دعم العملاء',
    'advantage.customerSupport.description': 'فريق في خدمتك.',
    'popularProducts.title': 'منتجاتنا الأكثر شعبية',
    'promotions.title': 'عروضنا الحالية',
    'customerReviews.title': 'ماذا يقول عملاؤنا',
    'productCard.startingFrom': 'ابتداءً من',

    // Product Listing Page
    'productListing.title': 'اكتشف منتجات الطباعة لدينا',
    'productListing.allCategories': 'جميع الفئات',

    // Product Categories
    'category.FLYERS_DEPLIANTS': 'منشورات و مطويات',
    'category.CARTES': 'بطاقات',
    'category.AFFICHES_GRAND_FORMAT': 'ملصقات و تنسيقات كبيرة',
    'category.CATALOGUES_BROCHURES': 'كتيبات و نشرات',
    'category.PACKAGING': 'تغليف',
    'category.PAPETERIE': 'قرطاسية',
    'category.OBJETS_PLV': 'أشياء و لافتات نقطة بيع',

    // Product Detail Page
    'productDetail.selectDimensions': 'اختر الأبعاد',
    'productDetail.customDimensions': 'أبعاد مخصصة',
    'productDetail.width': 'العرض (مم)',
    'productDetail.height': 'الارتفاع (مم)',
    'productDetail.selectPaper': 'اختر الورق',
    'productDetail.selectFinish': 'اختر اللمسة النهائية',
    'productDetail.printSide': 'الطباعة',
    'productDetail.RECTO': 'وجه واحد',
    'productDetail.RECTO_VERSO': 'وجهين',
    'productDetail.quantity': 'الكمية',
    'productDetail.estimatedPrice': 'السعر التقديري',
    'productDetail.deliveryTime': 'وقت الإنتاج',
    'productDetail.deliveryDays': 'أيام عمل',
    'productDetail.uploadFile': 'رفع ملفك',
    'productDetail.uploadFileInstructions': 'التنسيقات المقبولة: PDF CMJN 300 DPI (كحد أقصى 25 ميغابايت)',
    'productDetail.addToCart': 'أضف إلى العربة',
    'productDetail.buyNow': 'اطلب الآن', // Added translation
    'productDetail.fileUploaded': 'تم رفع الملف:',
    'productDetail.changeFile': 'تغيير الملف',
    'productDetail.noFileSelected': 'لم يتم اختيار أي ملف',
    'productDetail.selectOption': 'اختر خيارا',
    'productDetail.customDimensionPlaceholder': 'أدخل الحجم',
    'productDetail.NA_PAPER': 'غير متوفر', // Translate N/A for Paper Type
    'productDetail.NA_FINISH': 'غير متوفر', // Translate N/A for Finish Type
    'productDetail.grams': 'غ',

    // Cart Page
    'cart.title': 'عربة التسوق الخاصة بك',
    'cart.empty': 'عربة التسوق فارغة.',
    'cart.product': 'المنتج',
    'cart.options': 'الخيارات',
    'cart.unitPrice': 'سعر الوحدة',
    'cart.quantity': 'الكمية',
    'cart.total': 'المجموع',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.delivery': 'التوصيل',
    'cart.totalToPay': 'المجموع الكلي',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.proceedToCheckout': 'إتمام الطلب',
    'cart.remove': 'إزالة',

    // Checkout Page
    'checkout.title': 'إتمام الطلب',
    'checkout.orderSummary': 'ملخص الطلب',
    'checkout.shippingAddress': 'عنوان الشحن',
    'checkout.name': 'الاسم',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.phone': 'الهاتف',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.paymentMethod.CARTE_BANCAIRE': 'بطاقة بنكية',
    'checkout.paymentMethod.VIREMENT': 'تحويل بنكي',
    'checkout.paymentMethod.ESPECES_LIVRAISON': 'الدفع عند الاستلام',
    'checkout.thankYou': 'شكرا لطلبك!',
    'checkout.orderNumber': 'رقم طلبك هو:',
    'checkout.orderStatus': 'حالة الطلب',
    'orderStatus.EN_ATTENTE': 'في انتظار',
    'orderStatus.EN_PRODUCTION': 'قيد الإنتاج',
    'orderStatus.EXPEDIEE': 'تم الشحن',
    'orderStatus.LIVREE': 'تم التسليم',

    // Admin
    'admin.login.title': 'تسجيل الدخول للإدارة',
    'admin.login.username': 'اسم المستخدم',
    'admin.login.password': 'كلمة المرور',
    'admin.login.button': 'تسجيل الدخول',
    'admin.login.error': 'اسم المستخدم أو كلمة المرور غير صحيحة.',
    'admin.dashboard.title': 'لوحة التحكم الإدارية',
    'admin.dashboard.welcome': 'مرحبا بك، المدير!',
    'admin.dashboard.manageContent': 'إدارة المحتوى والمنتجات والطلبات الخاصة بك أدناه.',
    'admin.dashboard.manageProducts': 'إدارة المنتجات',
    'admin.dashboard.manageOrders': 'إدارة الطلبات',
    'admin.dashboard.manageUsers': 'إدارة المستخدمين',
    'admin.dashboard.managePromos': 'إدارة العروض الترويجية',
    'admin.dashboard.uploadClientFiles': 'رفع ملفات العملاء',
    'admin.dashboard.kpiDashboard': 'لوحة تحكم مؤشرات الأداء الرئيسية',
    'admin.logout': 'تسجيل الخروج',
    'admin.card.manageProducts.description': 'إضافة أو تعديل أو حذف المنتجات من الكتالوج.',
    'admin.card.manageOrders.description': 'إدارة طلبات العملاء، حالاتها وفواتيرها.',
    'admin.card.manageUsers.description': 'إدارة حسابات المستخدمين ومعلوماتهم.',
    'admin.card.managePromos.description': 'إنشاء وتعديل وتفعيل العروض الترويجية والخصومات.',
    'admin.card.uploadClientFiles.description': 'الوصول إلى ملفات الطباعة التي تم تحميلها من قبل العملاء وإدارتها.',
    'admin.card.kpiDashboard.description': 'عرض مؤشرات الأداء الرئيسية للموقع.',

    // Other Pages (placeholders)
    'faq.title': 'الأسئلة المتكررة',
    'about.title': 'عن الشركة',
    'contact.title': 'اتصل بنا',
    'blog.title': 'مدونتنا',
    'machines.title': 'أسطول آلاتنا',
    // 'account.title': 'حسابي', // Removed
    'notFound.title': 'الصفحة غير موجودة',
    'notFound.message': 'عذرا، الصفحة التي تبحث عنها غير موجودة.',
    'notFound.backHome': 'العودة إلى الرئيسية',
  },
  [Language.EN]: {
    // Header
    'app.name': 'Aria Printing',
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.promotions': 'Promotions',
    'nav.about': 'About Us',
    'nav.faq': 'FAQ',
    'nav.machines': 'Our Machines',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    // 'nav.account': 'My Account', // Removed
    // 'nav.login': 'Login', // Removed
    // 'nav.register': 'Register', // Removed
    'nav.cart': 'Cart',
    'nav.admin': 'Administration',


    // Footer
    'footer.cgv': 'Terms and Conditions',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.paymentMethods': 'Payment Methods',
    'footer.delivery': 'Delivery',
    'footer.socialNetworks': 'Social Networks',
    'footer.contactInfo': 'Contact Information',
    'footer.allRightsReserved': 'All Rights Reserved.',

    // Homepage
    'hero.title': 'Online Printing – Free Delivery Everywhere in Morocco',
    'hero.subtitle': 'Cards, Flyers, Posters, Packaging, POS Materials',
    'hero.cta': 'Order Now',
    'advantages.title': 'Our Advantages',
    'advantage.freeDelivery': 'Free Delivery',
    'advantage.freeDelivery.description': 'Throughout Morocco, no extra charge.',
    'advantage.instantPrice': 'Instant Price',
    'advantage.instantPrice.description': 'Calculate your price in real-time.',
    'advantage.securePayment': 'Secure Payment',
    'advantage.securePayment.description': 'Your transactions with confidence.',
    'advantage.customerSupport': 'Customer Support',
    'advantage.customerSupport.description': 'A team ready to help you.',
    'popularProducts.title': 'Our Popular Products',
    'promotions.title': 'Our Current Promotions',
    'customerReviews.title': 'What our customers say',
    'productCard.startingFrom': 'Starting from',

    // Product Listing Page
    'productListing.title': 'Discover our printing products',
    'productListing.allCategories': 'All Categories',

    // Product Categories
    'category.FLYERS_DEPLIANTS': 'Flyers & Brochures',
    'category.CARTES': 'Cards',
    'category.AFFICHES_GRAND_FORMAT': 'Posters & Large Format',
    'category.CATALOGUES_BROCHURES': 'Catalogs & Brochures',
    'category.PACKAGING': 'Packaging',
    'category.PAPETERIE': 'Stationery',
    'category.OBJETS_PLV': 'Objects & POS',

    // Product Detail Page
    'productDetail.selectDimensions': 'Select dimensions',
    'productDetail.customDimensions': 'Custom dimensions',
    'productDetail.width': 'Width (mm)',
    'productDetail.height': 'Height (mm)',
    'productDetail.selectPaper': 'Select paper type',
    'productDetail.selectFinish': 'Select finish',
    'productDetail.printSide': 'Printing Side',
    'productDetail.RECTO': 'Front only',
    'productDetail.RECTO_VERSO': 'Front / Back',
    'productDetail.quantity': 'Quantity',
    'productDetail.estimatedPrice': 'Estimated Price',
    'productDetail.deliveryTime': 'Production Time',
    'productDetail.deliveryDays': 'working days',
    'productDetail.uploadFile': 'Upload your file',
    'productDetail.uploadFileInstructions': 'Accepted formats: PDF CMJN 300 DPI (max 25MB)',
    'productDetail.addToCart': 'Add to Cart',
    'productDetail.buyNow': 'Buy Now', // Added translation
    'productDetail.fileUploaded': 'File uploaded:',
    'productDetail.changeFile': 'Change file',
    'productDetail.noFileSelected': 'No file selected',
    'productDetail.selectOption': 'Select an option',
    'productDetail.customDimensionPlaceholder': 'Enter size',
    'productDetail.NA_PAPER': 'N/A', // Translate N/A for Paper Type
    'productDetail.NA_FINISH': 'N/A', // Translate N/A for Finish Type
    'productDetail.grams': 'g',

    // Cart Page
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.product': 'Product',
    'cart.options': 'Options',
    'cart.unitPrice': 'Unit Price',
    'cart.quantity': 'Quantity',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery',
    'cart.totalToPay': 'Total to pay',
    'cart.continueShopping': 'Continue shopping',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.remove': 'Remove',

    // Checkout Page
    'checkout.title': 'Checkout',
    'checkout.orderSummary': 'Order Summary',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.name': 'Name',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.phone': 'Phone',
    'checkout.email': 'Email',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.placeOrder': 'Place Order',
    'checkout.paymentMethod.CARTE_BANCAIRE': 'Credit Card',
    'checkout.paymentMethod.VIREMENT': 'Bank Transfer',
    'checkout.paymentMethod.ESPECES_LIVRAISON': 'Cash on Delivery',
    'checkout.thankYou': 'Thank you for your order!',
    'checkout.orderNumber': 'Your order number is:',
    'checkout.orderStatus': 'Order Status',
    'orderStatus.EN_ATTENTE': 'Pending',
    'orderStatus.EN_PRODUCTION': 'In Production',
    'orderStatus.EXPEDIEE': 'Shipped',
    'orderStatus.LIVREE': 'Delivered',

    // Admin
    'admin.login.title': 'Administration Login',
    'admin.login.username': 'Username',
    'admin.login.password': 'Password',
    'admin.login.button': 'Login',
    'admin.login.error': 'Invalid username or password.',
    'admin.dashboard.title': 'Administration Dashboard',
    'admin.dashboard.welcome': 'Welcome, Admin!',
    'admin.dashboard.manageContent': 'Manage your content, products, and orders below.',
    'admin.dashboard.manageProducts': 'Manage Products',
    'admin.dashboard.manageOrders': 'Manage Orders',
    'admin.dashboard.manageUsers': 'Manage Users',
    'admin.dashboard.managePromos': 'Manage Promotions',
    'admin.dashboard.uploadClientFiles': 'Upload Client Files',
    'admin.dashboard.kpiDashboard': 'KPI Dashboard',
    'admin.logout': 'Logout',
    'admin.card.manageProducts.description': 'Add, modify, or delete products from the catalog.',
    'admin.card.manageOrders.description': 'Manage customer orders, their statuses, and invoices.',
    'admin.card.manageUsers.description': 'Manage user accounts and their information.',
    'admin.card.managePromos.description': 'Create, edit, and activate promotions and discounts.',
    'admin.card.uploadClientFiles.description': 'Access and manage print files uploaded by clients.',
    'admin.card.kpiDashboard.description': 'Visualize key performance indicators for the website.',


    // Other Pages (placeholders)
    'faq.title': 'Frequently Asked Questions',
    'about.title': 'About Us',
    'contact.title': 'Contact Us',
    'blog.title': 'Our Blog',
    'machines.title': 'Our Machine Park',
    // 'account.title': 'My Account', // Removed
    'notFound.title': 'Page Not Found',
    'notFound.message': 'Sorry, the page you are looking for does not exist.',
    'notFound.backHome': 'Back to Home',
  },
};

// Pricing factors - how different options influence the base price.
// These are illustrative and simplify complex printing pricing models.
export const PRICING_FACTORS = {
  dimensionAreaMultiplier: 0.00005, // Price increases with surface area (mm^2)
  quantityDiscountFactor: (quantity: number) => {
    if (quantity >= 5000) return 0.6;
    if (quantity >= 2500) return 0.7;
    if (quantity >= 1000) return 0.8;
    if (quantity >= 500) return 0.9;
    return 1.0;
  },
  printSideMultiplier: {
    [PrintSide.RECTO]: 1.0,
    [PrintSide.RECTO_VERSO]: 1.8, // Printing on both sides is not double the cost
  },
  // Paper and finish types have their multipliers defined directly in their objects.
};