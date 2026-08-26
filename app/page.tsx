import Link from 'next/link';
import Hero from '@/components/Hero';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest2 text-wine">What we do</p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          Three ways we come to your table.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            { title: 'Private events', d: 'Birthdays, anniversaries, intimate dinners for 8 to 60.' },
            { title: 'Corporate', d: 'Board lunches, offsites, and standing weekly catering.' },
            { title: 'Weddings', d: 'From rehearsal dinner through the last dessert course.' },
          ].map((s) => (
            <div key={s.title} className="border-t border-olive pt-4">
              <h3 className="font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{s.d}</p>
              <Link href="/services" className="mt-3 inline-block text-sm text-wine hover:underline">
                See packages →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment-dim/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Kind words</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            From people who&rsquo;ve had us in the kitchen.
          </h2>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </div>
      </section>
    </>
  );
          }
