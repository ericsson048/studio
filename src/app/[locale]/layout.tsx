// src/app/[locale]/layout.tsx
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { notFound } from 'next/navigation';
import { locales } from '../../../navigation';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
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
