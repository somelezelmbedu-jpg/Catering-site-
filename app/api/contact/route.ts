import { NextRequest, NextResponse } from 'next/server';
import { safeParseContactForm } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'edge';

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? '127.0.0.1';
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 });
  }

  const ip = getClientIp(request);
  const { success, remaining, usingRedis } = await checkRateLimit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again in an hour.' },
      {
        status: 429,
        headers: {
          'Retry-After': '3600',
          'X-RateLimit-Backend': usingRedis ? 'redis' : 'memory',
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const parsed = safeParseContactForm(body);
  if (!parsed.success) {
    const honeypotTripped = parsed.error.issues.some((i) => i.path[0] === 'companyWebsite');
    if (honeypotTripped) {
      console.warn(
        JSON.stringify({ event: 'honeypot_triggered', ip, ts: new Date().toISOString() })
      );
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json(
      {
        error: 'Please check the form for errors.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, phone, eventType, message } = parsed.data;

  // Hand off to your email/CRM provider here. Example with Resend:
  //
  //   const resendApiKey = process.env.RESEND_API_KEY;
  //   if (!resendApiKey) throw new Error('RESEND_API_KEY is not configured');
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${resendApiKey}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'inquiries@yourdomain.com',
  //       to: 'you@yourdomain.com',
  //       subject: `New catering inquiry: ${eventType}`,
  //       text: `From: ${name} <${email}>\nPhone: ${phone || 'n/a'}\n\n${message}`,
  //     }),
  //   });

  console.info(
    JSON.stringify({
      event: 'contact_form_submission',
      eventType,
      ts: new Date().toISOString(),
      remainingQuota: remaining,
    })
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
}
