import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Sovereign Senator',
    slug: 'sovereign-senator',
    description: 'A masterfully crafted navy blue senator outfit adorned with intricate gold embroidery. Each stitch tells a story of heritage, power, and unyielding elegance. Hand-finished by our master tailors using the finest imported Italian silk blend.',
    price: 185000,
    category: 'senator',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [product1],
    fabric: 'Italian Silk Blend with Gold Thread Embroidery',
    collection: 'Heritage Collection',
    featured: true,
    stock: 15,
  },
  {
    id: '2',
    name: 'The Royal Agbada',
    slug: 'royal-agbada',
    description: 'A flowing masterpiece in pristine white with hand-embroidered gold motifs. This agbada commands attention and respect — designed for the man who leads with grace. Premium Egyptian cotton with custom gold-thread detailing.',
    price: 320000,
    category: 'agbada',
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [product2],
    fabric: 'Premium Egyptian Cotton with Gold Embroidery',
    collection: 'Royal Line',
    featured: true,
    stock: 8,
  },
  {
    id: '3',
    name: 'The Obsidian Three-Piece',
    slug: 'obsidian-three-piece',
    description: 'Impeccable tailoring meets absolute authority. This jet-black three-piece suit features satin lapels and a silhouette that speaks before you do. Italian wool blend with hand-stitched buttonholes and Bemberg lining.',
    price: 275000,
    category: 'suit',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [product3],
    fabric: 'Italian Super 150s Wool with Satin Trim',
    collection: 'Power Collection',
    featured: true,
    stock: 12,
  },
  {
    id: '4',
    name: 'The Bordeaux Senator',
    slug: 'bordeaux-senator',
    description: 'Deep burgundy senator wear that embodies the spirit of Nigerian royalty. Rich, commanding, and unforgettable. Crafted from premium Turkish cotton with subtle self-pattern embroidery.',
    price: 165000,
    category: 'senator',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [product4],
    fabric: 'Premium Turkish Cotton with Self-Pattern Embroidery',
    collection: 'Heritage Collection',
    stock: 20,
  },
  {
    id: '5',
    name: 'The Golden Kaftan',
    slug: 'golden-kaftan',
    description: 'A celebration of African opulence. This cream kaftan features elaborate gold embroidery that cascades like liquid gold. Each piece takes over 72 hours of meticulous handwork to complete.',
    price: 295000,
    category: 'agbada',
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [product5],
    fabric: 'Silk-Cotton Blend with Hand-Embroidered Gold Detail',
    collection: 'Royal Line',
    featured: true,
    stock: 6,
  },
  {
    id: '6',
    name: 'The Diplomat Pinstripe',
    slug: 'diplomat-pinstripe',
    description: 'For the man who negotiates destiny. This charcoal double-breasted pinstripe suit merges old-world sophistication with contemporary power. Peak lapels, surgeon cuffs, and a fit that commands boardrooms.',
    price: 310000,
    category: 'suit',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [product6],
    fabric: 'English Wool Pinstripe with Full Canvas Construction',
    collection: 'Power Collection',
    stock: 10,
  },
];

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
