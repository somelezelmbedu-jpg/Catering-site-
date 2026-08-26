import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Menu' };

interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

const MENU: { category: string; items: MenuItem[] }[] = [
  {
    category: 'To start',
    items: [
      { name: 'Charred corn & basil soup', desc: 'sweet corn, torn basil, chili oil', price: '9' },
      { name: 'Heirloom tomato salad', desc: 'stone fruit, burrata, aged balsamic', price: '12' },
      { name: 'Grilled peach & prosciutto', desc: 'whipped ricotta, honey, mint', price: '11' },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Herb-roasted chicken', desc: 'pan jus, farro, charred scallion', price: '24' },
      { name: 'Seared salmon', desc: 'corn succotash, brown butter', price: '28' },
      { name: 'Braised short rib', desc: 'polenta, root vegetables', price: '31' },
      { name: 'Wild mushroom risotto (v)', desc: 'parmesan, thyme, truffle oil', price: '22' },
    ],
  },
  {
    category: 'Sides',
    items: [
      { name: 'Roasted seasonal vegetables', desc: 'market selection', price: '7' },
      { name: 'Garlic & herb potatoes', desc: 'rosemary, flaky salt', price: '6' },
      { name: 'Grain & greens salad', desc: 'farro, kale, citrus vinaigrette', price: '8' },
    ],
  },
  {
    category: 'Sweets',
    items: [
      { name: 'Stone fruit galette', desc: 'vanilla bean cream', price: '9' },
      { name: 'Dark chocolate torte', desc: 'sea salt, espresso crumb', price: '10' },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Seasonal menu</p>
      <h1 className="mt-3 font-display text-4xl text-ink">This season, on the table.</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink/65">
        Priced per person for full-service catering; a la carte and package
        pricing available on request. Menus rotate with what&rsquo;s in
        season — this reflects our current lineup.
      </p>

      <div className="mt-12 space-y-12">
        {MENU.map((section) => (
          <section key={section.category}>
            <h2 className="border-b border-ink/15 pb-2 font-display text-2xl text-olive-deep">
              {section.category}
            </h2>
            <ul className="mt-5 space-y-5">
              {section.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline">
                    <span className="font-display text-lg text-ink">{item.name}</span>
                    <span className="dot-leader" aria-hidden="true" />
                    <span className="font-mono text-sm text-ink">${item.price}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink/55">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
