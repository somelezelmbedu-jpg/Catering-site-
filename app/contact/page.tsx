import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest2 text-wine">Contact</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Let&rsquo;s talk about your event.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
        Tell us the date, headcount, and what kind of event it is — we&rsquo;ll
        follow up with next steps and, if it&rsquo;s a good fit, a tasting.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/50">Call or email</p>
            <p className="mt-2 text-sm text-ink/80">
              <a href="tel:+15551234567" className="hover:text-wine">(555) 123-4567</a>
              <br />
              <a href="mailto:hello@harvestandhearth.example" className="hover:text-wine">
                hello@harvestandhearth.example
              </a>
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/50">Kitchen</p>
            <p className="mt-2 text-sm text-ink/80">412 Milling Row, Riverton</p>
          </div>

          <div className="overflow-hidden rounded-sm border border-ink/15">
            <iframe
              title="Harvest & Hearth Catering location"
              src="https://www.google.com/maps?q=412+Milling+Row,+Riverton&output=embed"
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
