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