import type { Metadata } from 'next';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = { title: 'Testimonials' };

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Testimonials</p>
      <h1 className="mt-3 font-display text-4xl text-ink">
        From people who&rsquo;ve had us in the kitchen.
      </h1>
      <div className="mt-10">
        <TestimonialCarousel />
      </div>
    </div>
  );
}
