import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import {useTranslations} from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const t = useTranslations('Login');

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link className="flex items-center justify-center" href="/">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">{t('header')}</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
            href="#"
          >
            {t('signUp')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {t('connectButton')}
                </Button>
              </Link>
               <p className="text-center text-xs text-muted-foreground">
                {t('terms')}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {t('footer', {year: new Date().getFullYear()})}
        </p>
      </footer>
    </div>
  );
}
