import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import SmoothScroll from '@/components/common/SmoothScroll';
import CustomCursor from '@/components/common/CustomCursor';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/common/Toast';
import JsonLd from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const instrument = Instrument_Serif({
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://luxethread.com'),
  title: {
    default: 'NS Luxe Thread — Premium Couture & Editorial Fashion Boutique',
    template: '%s | NS Luxe Thread',
  },
  description: 'Experience bespoke editorial fashion. A curated gallery of handcrafted luxury apparel using fine Indian handloom fabrics and modern silhouette design.',
  keywords: ['luxury fashion', 'couture', 'editorial clothing', 'Indian handloom', 'premium apparel', 'bespoke tailoring', 'NS Luxe Thread'],
  authors: [{ name: 'NS Luxe Thread' }],
  creator: 'NS Luxe Thread',
  openGraph: {
    title: 'NS Luxe Thread — Premium Couture & Editorial Fashion',
    description: 'Bespoke editorial fashion crafted from premium Indian handloom fabrics.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'NS Luxe Thread',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NS Luxe Thread — Premium Couture',
    description: 'Bespoke editorial fashion crafted from premium Indian handloom fabrics.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Organization JSON-LD for rich search results
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NS Luxe Thread',
  url: 'https://luxethread.com',
  logo: 'https://luxethread.com/assets/logo.png',
  description: 'Premium couture and editorial fashion boutique specializing in bespoke handcrafted Indian handloom apparel.',
  sameAs: ['https://instagram.com/nsluxethread'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Hindi'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-english-blue text-peach selection:bg-peach selection:text-english-blue overflow-x-hidden font-sans">
        <JsonLd data={organizationJsonLd} />
        <ToastProvider>
          <CartProvider>
            <SmoothScroll>
              <CustomCursor />
              <main className="flex-grow">{children}</main>
            </SmoothScroll>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
