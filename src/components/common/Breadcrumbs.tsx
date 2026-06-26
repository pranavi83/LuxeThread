'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build JSON-LD BreadcrumbList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-light mb-8 md:mb-12">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-peach/50 hover:text-gold-accent transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-peach/80' : 'text-peach/50'}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight size={10} className="text-gold-accent/40" strokeWidth={1.5} />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
