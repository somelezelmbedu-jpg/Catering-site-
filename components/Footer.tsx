export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg">Harvest &amp; Hearth</p>
          <p className="mt-2 max-w-xs text-sm text-parchment/70">
            Seasonal, ingredient-led catering for weddings, corporate events,
            and private gatherings.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-parchment/50">
            Reach us
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="tel:+15551234567" className="hover:text-gold">
                (555) 123-4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@harvestandhearth.example" className="hover:text-gold">
                hello@harvestandhearth.example
              </a>
            </li>
            <li className="text-parchment/70">412 Milling Row, Riverton</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-parchment/50">
            Hours
          </p>
          <ul className="mt-3 space-y-1 text-sm text-parchment/70">
            <li>Tue&ndash;Sat, 9am&ndash;6pm</li>
            <li>Events by appointment</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-parchment/10 py-5 text-center font-mono text-[11px] text-parchment/40">
        &copy; {new Date().getFullYear()} Harvest &amp; Hearth Catering Co.
      </div>
    </footer>
  );
}
