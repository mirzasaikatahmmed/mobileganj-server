export type ProductCondition = 'Brand New' | 'Used' | 'Like New';
export type ProductTag = 'Best Deal' | 'Hot' | 'New Arrival' | 'Trending';
export type ProductCategory = 'Phone' | 'Accessories' | 'Charger' | 'Earphone' | 'Power Bank' | 'Cover' | 'Glass';
export type ProductBrand = 'Apple' | 'Samsung' | 'Google' | 'Others';
export type Region = 'USA' | 'Japan' | 'Australia' | 'UK' | 'European';

export interface ProductVariant {
  storage?: string;
  ram?: string;
  color?: string;
  region?: Region;
  price: number;
  offerPrice?: number;
  stock: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: ProductBrand;
  category: ProductCategory;
  images: string[];
  price: number;
  offerPrice?: number;
  condition: ProductCondition;
  tags?: ProductTag[];
  description?: string;
  productCode?: string;
  variants?: ProductVariant[];
  warranty?: string;
  stock: number;
  isPreOrder?: boolean;
  deliveryDays?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface EMIOption {
  duration: 3 | 6 | 9 | 12;
  downPayment: number;
  monthlyInstallment: number;
  totalPayable: number;
  interestRate: number;
}
