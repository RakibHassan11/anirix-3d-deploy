import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en'],
  defaultLocale: 'en'
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_proxy (Proxy internals)
  // - /static, /favicon.ico, etc.
  matcher: ['/((?!api|_next|_proxy|_vercel|.*\\..*).*)']
};