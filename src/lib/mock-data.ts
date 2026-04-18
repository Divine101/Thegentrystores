import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import type { Product } from '@/types';



export const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString()}`;
};

export const categories = [
  { value: 'all', label: 'All Pieces' },
  { value: 'senator', label: 'Senator Wear' },
  { value: 'suit', label: 'Suits' },
  { value: 'agbada', label: 'Agbada' },
  { value: 'accessories', label: 'Accessories' },
];

export const collections = [
  'Heritage Collection',
  'Royal Line',
  'Power Collection',
];
