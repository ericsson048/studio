import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '../../../navigation';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">{t('appName')}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            {t('features')}
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            {t('support')}
          </Link>
          <Link href="/login">
            <Button variant="outline">
              {t('connectWallet')}
            </Button>
          </Link>
          <LanguageSwitcher />
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {t('getStarted')}
            </Button>
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          {t('footer', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
