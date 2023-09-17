const X_DNS_PREFETCH_CONTROL = {
  key: 'X-DNS-Prefetch-Control',
  value: 'on'
};

const STRICT_TRANSPORT_SECURITY = {
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
};

const X_FRAME_OPTIONS = {
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
};

const X_CONTENT_TYPE_OPTIONS = {
  key: 'X-Content-Type-Options',
  value: 'nosniff'
};

const REFERRER_POLICY = {
  key: 'Referrer-Policy',
  value: 'origin-when-cross-origin'
};

const X_XSS_PROTECTION = {
  key: 'X-XSS-Protection',
  value: '1; mode=block'
};

const CONTENT_SECURITY_POLICY = {
  key: 'Content-Security-Policy',
  value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';`
};

const ACCEPT = {
  key: 'Accept',
  value: 'application/json; charset=utf-8'
}

const globalHeaders = [
  X_DNS_PREFETCH_CONTROL,
  STRICT_TRANSPORT_SECURITY,
  X_FRAME_OPTIONS,
  X_CONTENT_TYPE_OPTIONS,
  REFERRER_POLICY,
  X_XSS_PROTECTION,
  CONTENT_SECURITY_POLICY,
  ACCEPT,
];

async function headers() {
  return [
    { 
      source: '/:path*',
      headers: globalHeaders,
    }
  ]
}

module.exports =  headers;