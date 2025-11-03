// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(fr|en)/:path*',

    // Enable redirects that add a locale prefix
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};