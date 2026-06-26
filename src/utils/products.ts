export type Product = {
  id: string;
  handle: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  gallery: string[];
  category: string;
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    handle: 'elysian-silk-dress',
    name: 'Elysian Silk Dress',
    price: 32000,
    description: '100% organic heavy mulberry silk draped with a structural high neckline. Peach tone dyed in small batches.',
    details: [
      '100% Organic Mulberry Silk (40 Momme)',
      'Hand-draped high neckline silhouette',
      'Asymmetric structural flowing hemline',
      'Naturally dyed using local organic pigments',
      'Dry clean only. Made in India'
    ],
    image: '/assets/lookbook1.jpg',
    gallery: [
      '/assets/lookbook1.jpg',
      '/assets/hero_bg.jpg'
    ],
    category: 'Summer Couture',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'prod_2',
    handle: 'imperial-blue-trench',
    name: 'Imperial Blue Trench',
    price: 48000,
    description: 'Heavyweight double-faced wool in English blue, cut with dramatic structured shoulders.',
    details: [
      '80% Virgin Wool, 20% Cashmere blend',
      'Structured padded shoulders with storm flap details',
      'Removable fabric belt with custom matte hardware',
      'Deep English Blue colorway',
      'Tailored in limited runs'
    ],
    image: '/assets/hero_bg.jpg',
    gallery: [
      '/assets/hero_bg.jpg',
      '/assets/lookbook1.jpg'
    ],
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod_3',
    handle: 'aether-tailored-blazer',
    name: 'Aether Tailored Blazer',
    price: 38000,
    description: 'A sharp, double-breasted structured blazer crafted from structured linen-silk weave with peach contrast lapels.',
    details: [
      '60% Linen, 40% Raw Silk weave',
      'Double-breasted front with hidden horn buttons',
      'Contrast peach-silk under-collar and pocket piping',
      'Internal smartphone compartment and passport pocket',
      'Tailored drape'
    ],
    image: '/assets/hero_bg.jpg', // Use hero_bg as fallback placeholder
    gallery: [
      '/assets/hero_bg.jpg'
    ],
    category: 'Tailoring',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
];

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}
