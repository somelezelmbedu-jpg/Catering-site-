import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-wine">
            Est. — Seasonal Catering
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Food that tastes like the season it&rsquo;s served in.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            We build every menu from what&rsquo;s at the market that week —
            then cook it, plate it, and serve it at your table, whether
            that&rsquo;s a boardroom for twelve or a tent for two hundred.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-sm bg-wine px-6 py-3 font-body text-sm font-medium text-parchment transition-colors hover:bg-wine-deep"
            >
              Request a quote
            </Link>
            <Link
              href="/menu"
              className="rounded-sm border border-ink/20 px-6 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-ink/50"
            >
              See the menu
            </Link>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              n: 'Sourced weekly',
              d: 'Menus rebuilt around what local farms actually have on hand.',
            },
            {
              n: 'Cooked on site',
              d: 'A working kitchen travels with us — nothing reheated from a van.',
            },
            {
              n: 'Sized to you',
              d: 'From a twelve-person dinner to a two-hundred-guest reception.',
            },
          ].map((item) => (
            <li key={item.n} className="border-l-2 border-olive py-1 pl-4">
              <p className="font-display text-lg text-ink">{item.n}</p>
              <p className="mt-1 text-sm text-ink/60">{item.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
