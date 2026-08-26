import Link from 'next/link';

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            Harvest <span className="text-wine">&amp;</span> Hearth
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest2 text-ink/50 sm:inline">
            Catering Co.
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded px-2 py-2 font-body text-sm text-ink/80 transition-colors hover:text-wine sm:px-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
