# NS Luxe Thread

A premium couture and editorial fashion boutique specializing in bespoke handcrafted Indian handloom apparel. Built with a modern tech stack focused on high performance, luxury aesthetics, and seamless user experiences.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: GSAP (ScrollTrigger, quickTo), Framer Motion
- **Icons**: Lucide React
- **Smooth Scrolling**: Lenis

## Features

- **Luxury UI/UX**: Immersive digital experience with custom cursor trails, magnetic buttons, parallax scrolling, and high-end typography (Inter & Cormorant Garamond).
- **Bespoke Digital Experiences**:
  - **Clothing Bouquet**: An interactive, step-by-step customizer for assembling a bespoke ensemble with dynamic pricing.
  - **Digital Atelier**: A virtual sizing interface that simulates an AI-driven anatomical scan for precise measurements.
  - **Digital Product Passport (DPP)**: A provenance modal that details the garment lifecycle, fabric sourcing, and artisan craftsmanship hours with an authentic NS emblem.
- **Localized Payments**: Display of India-specific payment methods including Credit Card, Debit Card, EMI, UPI, and Net Banking.
- **SEO Optimized**: Fully integrated with Next.js dynamic `generateMetadata`, auto-generated XML sitemap, `robots.txt`, and rich structured data schemas (JSON-LD) for Products, Breadcrumbs, and Organization.
- **Server/Client Architecture**: Optimized component splitting for maximum performance, with interactive elements isolated in Client Components (`'use client'`) and heavy lifting done by Server Components.
- **Responsive Design**: Flawlessly adapts across all device sizes.
- **State Management**: React Context API for global cart state.

## Recent Updates

- **Integrated Checkout Experience**: Added a dedicated `/checkout` route allowing users to view their cart and simulate checkout using localized payment gateways (Cards, UPI, EMI, Net Banking).
- **Checkout & Footer Enhancements**: Added display of comprehensive payment options (EMI, UPI, Net Banking, Cards).
- **Bespoke Feature Suite**: Added modular `ClothingBouquet`, `DigitalPassport`, and `DigitalAtelier` components. Added `/bespoke` showcase route.
- **Bug Fixes**: 
  - Fixed a major UI bug where the Cart Drawer would not open on pages other than the homepage by elevating the `CartDrawer` component to the global `layout.tsx`.
  - Resolved unused variable warnings (`notFound`), replaced `<img>` tags with Next.js `<Image />` component for better core web vitals, and fixed explicit `any` types in `Magnetic.tsx`.
- **SEO Improvements**: Improved structural elements for search engines by optimizing Next.js `Image` component which prevents layout shifts and improves LCP.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
```

---

*Craftsmanship that honors heritage, silhouette designed for the digital avant-garde.*
