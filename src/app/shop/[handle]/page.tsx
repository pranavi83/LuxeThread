import type { Metadata } from 'next';
import { getProductByHandle, PRODUCTS } from '@/utils/products';
import ProductDetailClient from '@/components/shop/ProductDetailClient';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
type Props = {
  params: Promise<{ handle: string }>;
};

// Generate static params for all product handles (SSG)
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    handle: product.handle,
  }));
}

// Dynamic SEO metadata based on the product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — NS Luxe Thread`,
      description: product.description,
      type: 'website',
      images: [
        {
          url: product.image,
          width: 800,
          height: 1200,
          alt: `${product.name} — ${product.category}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — NS Luxe Thread`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-english-blue flex flex-col items-center justify-center text-center p-6">
        <span className="font-serif text-3xl italic text-peach/60 mb-6">Garment Not Found</span>
        <p className="text-peach/50 text-xs tracking-wider mb-8 font-light">The requested editorial pattern does not exist in our catalog.</p>
        <Link 
          href="/shop" 
          className="px-8 py-4 border border-peach/30 text-peach rounded-full text-[10px] tracking-[0.25em] uppercase hover:bg-peach hover:text-english-blue transition-colors duration-300"
        >
          Return to Atelier
        </Link>
      </div>
    );
  }

  // Product JSON-LD structured data for rich search results
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://luxethread.com${product.image}`,
    url: `https://luxethread.com/shop/${product.handle}`,
    brand: {
      '@type': 'Brand',
      name: 'NS Luxe Thread',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'NS Luxe Thread',
      },
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <ProductDetailClient product={product} />
    </>
  );
}
