
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
}

export enum MaterialType {
  WOOD = 'Wood Veneer',
  PAINT = 'Painted Cabinetry',
  STONE = 'Natural Stone'
}

export interface MaterialOption {
  type: MaterialType;
  priceMultiplier: number; // Applied per linear foot
  description: string;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  videoThumbnail: string;
  quote: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  content: string;
  details?: string;
}

export interface Model {
  id: string;
  name: string;
  category: string; // 'media-wall' | 'fireplaces' | 'consoles' | 'high-ceiling'
  basePrice: number;
  image: string;
  gallery?: string[];
  description: string;
}

export interface Option {
  id: string;
  label: string;
  price: number;
}

export interface OptionGroup {
  label: string;
  description: string;
  options: Option[];
}

export interface ConfiguratorData {
  models: Model[];
  basePrices: Record<string, number>; // Legacy support
  groups: Record<string, OptionGroup>;
}
