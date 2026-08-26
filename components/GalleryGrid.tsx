'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

type Category = 'all' | 'weddings' | 'corporate' | 'private' | 'plating';

interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<Category, 'all'>;
}

const ITEMS: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80', alt: 'Long harvest table set for a wedding reception', category: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80', alt: 'Plated seasonal starter with herb garnish', category: 'plating' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Buffet spread at a corporate lunch event', category: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80', alt: 'Small private dinner table with candlelight', category: 'private' },
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', alt: 'Wedding cake and dessert table', category: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', alt: 'Close-up of a plated main course', category: 'plating' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', alt: 'Conference room catering setup', category: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1478144849738-2a72c1baef16?w=800&q=80', alt: 'Intimate birthday dinner catering', category: 'private' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Outdoor wedding catering tent', category: 'weddings' },
];

const FILTERS: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'private', label: 'Private events' },
  { value: 'plating', label: 'Plating detail' },
];

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>('all');

  const filtered = useMemo(
    () => (active === 'all' ? ITEMS : ITEMS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest2 transition-colors ${
              active === f.value
                ? 'border-wine bg-wine text-parchment'
                : 'border-ink/20 text-ink/70 hover:border-ink/50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filtered.map((item, i) => (
          <div key={`${item.src}-${i}`} className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink/5">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
