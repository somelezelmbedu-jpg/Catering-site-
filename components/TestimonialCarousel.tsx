interface Testimonial {
  quote: string;
  name: string;
  event: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'They rebuilt the whole menu two weeks out when the original fish supplier fell through, and nobody at the wedding could tell anything had changed.',
    name: 'Priya R.',
    event: 'Wedding, 140 guests',
  },
  {
    quote:
      'Our all-hands lunches stopped being an afterthought once we started using them. People actually look forward to it now.',
    name: 'Daniel O.',
    event: 'Quarterly corporate offsite',
  },
  {
    quote:
      'Small dinner, big attention to detail — they asked about allergies twice and it showed in how careful the plating was.',
    name: 'Marisol T.',
    event: 'Private anniversary dinner',
  },
  {
    quote:
      'The tasting session alone was worth it. We changed three dishes after trying them and the final event was better for it.',
    name: 'Aaron K.',
    event: 'Wedding, 80 guests',
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {TESTIMONIALS.map((t) => (
        <figure
          key={t.name}
          className="rounded-sm border border-ink/10 bg-parchment-dim/40 p-6"
        >
          <blockquote className="font-display text-lg leading-snug text-ink">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest2 text-ink/50">
            {t.name} &middot; {t.event}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
