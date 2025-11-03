// src/app/[locale]/layout.tsx
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { notFound } from 'next/navigation';
import { locales } from '../../navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Changed to Promise
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  // Await params before using
  const { locale } = await params;
  
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <FirebaseClientProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
