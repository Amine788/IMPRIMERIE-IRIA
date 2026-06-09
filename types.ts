
export enum Language {
  FR = 'fr',
  AR = 'ar',
  EN = 'en',
}

export enum ProductCategory {
  FLYERS_DEPLIANTS = 'FLYERS_DEPLIANTS',
  CARTES = 'CARTES',
  AFFICHES_GRAND_FORMAT = 'AFFICHES_GRAND_FORMAT',
  CATALOGUES_BROCHURES = 'CATALOGUES_BROCHURES',
  PACKAGING = 'PACKAGING',
  PAPETERIE = 'PAPETERIE',
  OBJETS_PLV = 'OBJETS_PLV',
}

export interface Dimension {
  id: string;
  name: string;
  width: number | null; // in mm
  height: number | null; // in mm
  isCustom?: boolean;
}

export interface PaperType {
  id: string;
  name: string;
  grammage: number; // in gsm
  priceMultiplier: number;
}

export interface FinishType {
  id: string;
  name: string;
  priceMultiplier: number; // or fixed add-on
  is3D?: boolean;
}

export enum PrintSide {
  RECTO = 'RECTO',
  RECTO_VERSO = 'RECTO_VERSO',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string; // URL to placeholder image
  basePricePerUnit: number; // Base price for the smallest/standard config
  availableDimensions: Dimension[];
  availablePaperTypes: PaperType[];
  availableFinishTypes: FinishType[];
  minQuantity: number;
  quantitySteps: number[]; // Example: [50, 100, 250, 500, 1000]
  defaultOptions: {
    dimensionId: string;
    paperTypeId: string;
    finishTypeId: string;
    printSide: PrintSide;
    quantity: number;
  };
}

export interface CartItem {
  productId: string;
  productName: string;
  image: string;
  selectedDimension: Dimension;
  selectedPaperType: PaperType;
  selectedFinishType: FinishType;
  selectedPrintSide: PrintSide;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  fileUrl?: string; // URL of the uploaded file
}

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string;
  translate: (key: string, lang?: Language) => string;
  isAdminLoggedIn: boolean;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, optionsHash: string) => void;
  updateCartItemQuantity: (productId: string, optionsHash: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export interface TranslationKeys {
  [key: string]: string;
}

// Fixed type declaration: A mapped type may not declare properties or methods.
export type Translations = Record<Language, TranslationKeys>;

export interface ProductOptionValues {
  dimensionId: string;
  paperTypeId: string;
  finishTypeId: string;
  printSide: PrintSide;
  quantity: number;
}

export enum PaymentMethod {
  CARTE_BANCAIRE = 'CARTE_BANCAIRE',
  VIREMENT = 'VIREMENT',
  ESPECES_LIVRAISON = 'ESPECES_LIVRAISON',
}

export enum OrderStatus {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_PRODUCTION = 'EN_PRODUCTION',
  EXPEDIEE = 'EXPEDIEE',
  LIVREE = 'LIVREE',
}
