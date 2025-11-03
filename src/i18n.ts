// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
 
const locales = ['en', 'fr'];
 
export default getRequestConfig(async ({ requestLocale }) => {
  // Await headers to fix the sync API warning
  await headers();
  
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});