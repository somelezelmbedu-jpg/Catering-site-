import { z } from 'zod';

const NAME_PATTERN = /^[\p{L}\p{M} '.\-]{1,80}$/u;
const PHONE_PATTERN = /^[0-9+()\-.\s]{7,20}$/;

const DANGEROUS_CONTENT = /<[^>]*>|`|\$\{|\bSELECT\b|\bUNION\b|\bDROP\b|--|\/\*/i;

const safeText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((val) => !DANGEROUS_CONTENT.test(val), {
      message: 'Message contains characters that are not permitted.',
    });

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(80, 'Name is too long.')
    .regex(NAME_PATTERN, 'Name contains invalid characters.'),

  email: z
    .string()
    .trim()
    .min(5)
    .max(254)
    .email('Enter a valid email address.'),

  phone: z
    .string()
    .trim()
    .regex(PHONE_PATTERN, 'Enter a valid phone number.')
    .optional()
    .or(z.literal('')),

  eventType: z.enum(['private', 'corporate', 'wedding', 'other'], {
    errorMap: () => ({ message: 'Select a valid event type.' }),
  }),

  message: safeText(10, 2000),

  companyWebsite: z.string().max(0, 'Bot detected.').optional().or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function safeParseContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}
