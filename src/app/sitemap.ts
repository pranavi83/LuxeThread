import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/utils/products';

const BASE_URL = 'https://luxethread.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/shop/${product.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productUrls,
  ];
}
