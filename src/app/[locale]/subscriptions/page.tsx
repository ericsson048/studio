// src/app/[locale]/subscriptions/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { useRouter, Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Image from 'next/image';
import { subscriptions } from '@/lib/subscriptions';
import { ArrowLeft } from 'lucide-react';

export default function SubscriptionsPage() {
  const t = useTranslations('Subscriptions');
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/dashboard" className="flex items-center justify-center">
          <ArrowLeft className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">{t('backToDashboard')}</span>
        </Link>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptions.map((sub) => (
            <Card key={sub.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Image src={sub.icon} alt={`${sub.name} logo`} width={48} height={48} className='rounded-lg' data-ai-hint={`${sub.name} logo`} />
                <div>
                  <CardTitle>{sub.name}</CardTitle>
                  <CardDescription>{sub.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-3xl font-bold">${sub.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">{t('subscribeButton')}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
