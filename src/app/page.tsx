import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">PrivacyPay</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Tableau de bord
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Support
          </Link>
          <Link href="/login">
            <Button>Connexion</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Paiements Récurrents & Confidentiels
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
            Gérez vos abonnements en toute sécurité avec la puissance de la blockchain et de l'IA.
          </p>
          <Link href="/login">
            <Button size="lg">Commencer</Button>
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PrivacyPay. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
