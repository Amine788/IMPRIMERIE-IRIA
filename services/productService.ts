
import {
  Product,
  PrintSide,
  ProductOptionValues,
} from '../types';
import { PRODUCT_DATA } from '../constants';
import { calculatorData } from '../calculatorData';

export const getProducts = (): Product[] => {
  return PRODUCT_DATA;
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCT_DATA.find((product) => product.id === id);
};

// ─── Mapping helpers ──────────────────────────────────────────────────────────

/**
 * Maps a product ID from PRODUCT_DATA to the matching ID in calculatorData.
 * Some products have different IDs between the two systems.
 */
const PRODUCT_ID_MAP: Record<string, string> = {
  'flyer-standard':     'flyer-a5',
  'flyer-a6':           'flyer-a6',
  'flyer-dl':           'flyer-dl',
  'depliant-2volets':   'depliant-a4',
  'depliant-a3':        'depliant-a3',
  'carnets-ncr-a5':     'carnet-ncr-a5',
  'carnets-ncr-a4':     'carnet-ncr-a4',
  'carnets-ncr-a4-rv':  'carnet-location-a4',
};

/**
 * Maps a paper type ID (from constants.ts PAPER_TYPES) to the grammage label
 * used as key inside calculatorData.tarifs[mode][grammage].
 */
const PAPER_ID_TO_GRAMMAGE: Record<string, string> = {
  // Flyers / dépliants
  'COATED_MATT_135':  '135g Couché',
  'COATED_GLOSS_135': '135g Couché',   // same tier for calculator
  'COATED_MATT_170':  '170g Couché',
  'COATED_GLOSS_170': '170g Couché',
  // Dépliants pliés (A4)
  'COATED_MATT_135_PLIE':  '135g Plié',
  'COATED_MATT_170_PLIE':  '170g Plié',
  // Dépliants pliés (A3)
  'COATED_MATT_135_PLIE_A3':  '135g Couché Plié',
  'COATED_MATT_170_PLIE_A3':  '170g Couché Plié',
  // NCR
  'NCR_2_SOUCHES': '2 Souches',
  'NCR_3_SOUCHES': '3 Souches',
  'NCR_4_SOUCHES': '4 Souches',
  'NCR_5_SOUCHES': '5 Souches',
};

/**
 * For dépliants, the grammage key depends on the product (A4 vs A3).
 * We override here per product.
 */
const DEPLIANT_GRAMMAGE_OVERRIDE: Record<string, Record<string, string>> = {
  'depliant-a4': {
    'COATED_MATT_135': '135g Plié',
    'COATED_GLOSS_135': '135g Plié',
    'COATED_MATT_170': '170g Plié',
    'COATED_GLOSS_170': '170g Plié',
  },
  'depliant-a3': {
    'COATED_MATT_135': '135g Couché Plié',
    'COATED_GLOSS_135': '135g Couché Plié',
    'COATED_MATT_170': '170g Couché Plié',
    'COATED_GLOSS_170': '170g Couché Plié',
  },
};

/** Maps PrintSide enum to the mode key in calculatorData */
function printSideToMode(side: PrintSide): string {
  return side === PrintSide.RECTO_VERSO ? 'Recto/Verso' : 'Recto';
}

// ─── Main price function ──────────────────────────────────────────────────────

export const calculatePrice = (
  product: Product,
  options: ProductOptionValues,
  _customWidth: number | null,
  _customHeight: number | null,
): number => {
  const calcId = PRODUCT_ID_MAP[product.id];

  // If there's no mapping, fall back to 0 (sur devis / not in catalog)
  if (!calcId) return 0;

  const calcProduct = calculatorData.produits.find(p => p.id === calcId);
  if (!calcProduct) return 0;

  const qty = options.quantity;
  const qtyKey = String(qty);

  // ── Carnets NCR ────────────────────────────────────────────────────────────
  if (calcProduct.type === 'carnet') {
    const souche = PAPER_ID_TO_GRAMMAGE[options.paperTypeId] || '2 Souches';
    const tarifSouche = calcProduct.tarifsCarnets?.[souche];
    if (!tarifSouche) return 0;
    return tarifSouche[qtyKey] ?? 0;
  }

  // ── Flyers / Dépliants ────────────────────────────────────────────────────
  const mode = printSideToMode(options.printSide);

  // Resolve grammage label (use product-specific override if available)
  const overrideMap = DEPLIANT_GRAMMAGE_OVERRIDE[calcId];
  const grammage = overrideMap
    ? (overrideMap[options.paperTypeId] ?? PAPER_ID_TO_GRAMMAGE[options.paperTypeId] ?? '')
    : (PAPER_ID_TO_GRAMMAGE[options.paperTypeId] ?? '');

  if (!grammage) return 0;

  // Check promo first
  const promo = calcProduct.promo;
  if (
    promo &&
    qty === promo.quantite &&
    grammage === promo.grammage &&
    mode === promo.mode
  ) {
    return promo.prix;
  }

  // Table lookup
  const tarifMode = calcProduct.tarifs?.[mode];
  if (!tarifMode) return 0;
  const tarifGrammage = tarifMode[grammage];
  if (!tarifGrammage) return 0;

  return tarifGrammage[qtyKey] ?? 0;
};

// ─── Delivery estimate ────────────────────────────────────────────────────────

export const getDeliveryEstimateDays = (product: Product, quantity: number): number => {
  let days = 2;
  if (quantity >= 10000) days = 5;
  else if (quantity >= 5000) days = 4;
  else if (quantity >= 1000) days = 3;
  return days;
};
