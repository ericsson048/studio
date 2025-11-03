// navigation.ts
import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
 
export const locales = ['en', 'fr'] as const;
export const localePrefix = 'always'; // Default
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/dashboard': '/dashboard'
} satisfies Pathnames<typeof locales>;

// Export routing configuration for middleware
export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix,
  pathnames
});
 
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames
  });