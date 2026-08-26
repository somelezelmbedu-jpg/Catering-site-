import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Services' };

const PACKAGES = [
  {
    name: 'Private Events',
    range: '8–60 guests',
    desc: 'Birthdays, anniversaries, and intimate dinners cooked and served in your home or venue.',
    includes: ['Custom tasting menu', 'Full staff & service', 'Bar service available', 'Rental coordination'],
  },
  {
    name: 'Corporate',
    range: '10–300 guests',
    desc: 'From weekly team lunches to a full offsite — reliable, on-time, and built around your schedule.',
    includes: ['Standing weekly menus', 'Dietary tagging & labeling', 'Drop-off or full service', 'Invoiced billing'],
  },
  {
    name: 'Weddings',
    range: '40–250 guests',
    desc: 'Rehearsal dinner through late-night snacks, with a single point of contact the whole way.',
    includes: ['Tasting session included', 'Timeline coordination', 'Custom bar package', 'Day-of captain on site'],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Services</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Three ways we work.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
        Every package starts with a conversation about your event, guest
        count, and what you actually want people to remember eating.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <div key={pkg.name} className="flex flex-col rounded-sm border border-ink/15 p-7">
            <h2 className="font-display text-2xl text-ink">{pkg.name}</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest2 text-wine">
              {pkg.range}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">{pkg.desc}</p>
            <ul className="mt-5 space-y-2 text-sm text-ink/75">
              {pkg.includes.map((inc) => (
                <li key={inc} className="flex gap-2">
                  <span className="text-olive">·</span>
                  {inc}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-sm border border-ink/20 px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-wine hover:text-wine"
            >
              Request a quote
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
