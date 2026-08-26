import { NextRequest, NextResponse } from 'next/server';

const SQLI_PATTERNS: RegExp[] = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  /\b(union|select|insert|update|delete|drop|alter|exec|execute|declare|cast)\b.{0,40}\b(from|into|table|database|where)\b/i,
  /\bor\b\s+\d+\s*=\s*\d+/i,
  /\bwaitfor\b\s+\bdelay\b/i,
  /\bsleep\s*\(\s*\d+\s*\)/i,
];

const XSS_PATTERNS: RegExp[] = [
  /<\s*script[^>]*>/i,
  /<\s*\/\s*script\s*>/i,
  /on(error|load|click|mouseover|focus|input)\s*=/i,
  /javascript\s*:/i,
  /<\s*iframe/i,
  /<\s*svg[^>]*on\w+/i,
  /document\.(cookie|domain|write)/i,
  /\bexpression\s*\(/i,
];

const PATH_TRAVERSAL_PATTERNS: RegExp[] = [
  /\.\.\//,
  /\.\.\\/,
  /%2e%2e%2f/i,
  /%2e%2e\//i,
  /\/etc\/passwd/i,
  /\/proc\/self\/environ/i,
  /win\.ini/i,
];

const RCE_LFI_PATTERNS: RegExp[] = [
  /\b(system|exec|shell_exec|passthru|popen|proc_open)\s*\(/i,
  /;\s*(cat|ls|whoami|curl|wget|nc|bash|sh)\s/i,
  /\$\{jndi:/i,
  /php:\/\/(filter|input)/i,
  /data:text\/html/i,
];

const POLYGLOT_PATTERNS: RegExp[] = [
  /jaVasCript:\/\*.*?\*\/\(/i,
  /['"`]\s*;\s*alert\(/i,
];

const ALL_PATTERNS: { name: string; patterns: RegExp[] }[] = [
  { name: 'sqli', patterns: SQLI_PATTERNS },
  { name: 'xss', patterns: XSS_PATTERNS },
  { name: 'path_traversal', patterns: PATH_TRAVERSAL_PATTERNS },
  { name: 'rce_lfi', patterns: RCE_LFI_PATTERNS },
  { name: 'polyglot', patterns: POLYGLOT_PATTERNS },
];

const HEADER_INJECTION_PATTERN = /[\r\n]|%0d|%0a/i;

const BLOCKED_UA_PATTERNS: RegExp[] = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /acunetix/i,
  /\bmasscan\b/i,
  /\bnmap\b/i,
  /dirbuster/i,
  /wpscan/i,
];

function matchesAny(value: string, patterns: RegExp[]): string | null {
  for (const p of patterns) {
    if (p.test(value)) return p.source;
  }
  return null;
}

function inspectString(value: string): { blocked: boolean; category?: string } {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // malformed encoding — fall through and check the raw value
  }

  for (const { name, patterns } of ALL_PATTERNS) {
    const hit = matchesAny(decoded, patterns) || matchesAny(value, patterns);
    if (hit) return { blocked: true, category: name };
  }
  return { blocked: false };
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullUrl = pathname + search;

  const urlCheck = inspectString(decodeURIComponent(fullUrl));
  if (urlCheck.blocked) {
    return blockResponse(request, `url:${urlCheck.category}`);
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  if (BLOCKED_UA_PATTERNS.some((p) => p.test(userAgent))) {
    return blockResponse(request, 'blocked_user_agent');
  }

  for (const [key, value] of request.headers.entries()) {
    if (HEADER_INJECTION_PATTERN.test(value)) {
      return blockResponse(request, `header_injection:${key}`);
    }
  }

  let headerBytes = 0;
  for (const [key, value] of request.headers.entries()) {
    headerBytes += key.length + value.length;
  }
  if (headerBytes > 16_000) {
    return blockResponse(request, 'oversized_headers');
  }

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin) {
      let originHost: string;
      try {
        originHost = new URL(origin).host;
      } catch {
        return blockResponse(request, 'malformed_origin');
      }
      if (originHost !== host) {
        return blockResponse(request, 'cross_origin_state_change');
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Request-Inspected', '1');
  return response;
}

function blockResponse(request: NextRequest, reason: string) {
  console.warn(
    JSON.stringify({
      event: 'waf_block',
      reason,
      path: request.nextUrl.pathname,
      ip: request.headers.get('x-forwarded-for') ?? 'unknown',
      ts: new Date().toISOString(),
    })
  );

  return new NextResponse('Request blocked.', {
    status: 403,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
