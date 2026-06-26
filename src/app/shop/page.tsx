import type { Metadata } from 'next';
import ShopClient from '@/components/shop/ShopClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Curated Collection',
  description: 'Browse our curated collection of premium couture, outerwear, and tailored garments. Handcrafted editorial fashion using fine Indian handloom fabrics.',
  openGraph: {
    title: 'Collections — NS Luxe Thread',
    description: 'Browse our curated collection of premium couture and editorial fashion.',
    type: 'website',
  },
};

// WebPage JSON-LD for the shop collection page
const shopJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Curated Collection — NS Luxe Thread',
  description: 'Browse our curated collection of premium couture, outerwear, and tailored garments.',
  url: 'https://luxethread.com/shop',
  isPartOf: {
    '@type': 'WebSite',
    name: 'NS Luxe Thread',
    url: 'https://luxethread.com',
  },
};

export default function ShopPage() {
  return (
    <>
      <JsonLd data={shopJsonLd} />
      <ShopClient />
    </>
  );
}
