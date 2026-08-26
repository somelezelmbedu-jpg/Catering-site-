import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = { title: 'Gallery' };

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Gallery</p>
      <h1 className="mt-3 font-display text-4xl text-ink">From the last few events.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
        A mix of weddings, corporate lunches, private dinners, and the
        occasional plating close-up.
      </p>

      <div className="mt-10">
        <GalleryGrid />
      </div>
    </div>
  );
}
