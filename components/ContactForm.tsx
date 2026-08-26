'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const EVENT_TYPES = [
  { value: 'private', label: 'Private event' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      eventType: formData.get('eventType'),
      message: formData.get('message'),
      companyWebsite: formData.get('companyWebsite'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFieldErrors(data.details ?? {});
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-olive/40 bg-olive/10 p-6" role="status">
        <p className="font-display text-lg text-olive-deep">Message sent.</p>
        <p className="mt-1 text-sm text-ink/70">
          Thank you — we typically reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website (leave blank)</label>
        <input
          type="text"
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" errors={fieldErrors.name}>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" name="email" errors={fieldErrors.email}>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone (optional)" name="phone" errors={fieldErrors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={20}
            autoComplete="tel"
            className={inputClass}
          />
        </Field>

        <Field label="Event type" name="eventType" errors={fieldErrors.eventType}>
          <select id="eventType" name="eventType" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select one
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tell us about your event" name="message" errors={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-sm bg-wine px-6 py-3 font-body text-sm font-medium text-parchment transition-colors hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
      </button>

      {status === 'rate_limited' && (
        <p role="alert" className="text-sm text-wine">
          You&rsquo;ve reached the limit of 3 submissions per hour. Please try
          again later, or call us directly.
        </p>
      )}
      {status === 'error' && Object.keys(fieldErrors).length === 0 && (
        <p role="alert" className="text-sm text-wine">
          Something went wrong sending your message. Please try again.
        </p>
      )}
    </form>
  );
}

const inputClass =
  'w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-wine';

function Field({
  label,
  name,
  errors,
  children,
}: {
  label: string;
  name: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-mono text-xs uppercase tracking-widest2 text-ink/60">
        {label}
      </label>
      {children}
      {errors && errors.length > 0 && (
        <p className="mt-1 text-xs text-wine">{errors[0]}</p>
      )}
    </div>
  );
}
