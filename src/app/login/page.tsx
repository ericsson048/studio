import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">PrivacyPay</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connectez votre Wallet</CardTitle>
            <CardDescription>
              Utilisez votre wallet pour vous connecter de manière sécurisée.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full">
                  Connecter le Wallet (Simulation)
                </Button>
              </Link>
               <p className="text-center text-xs text-muted-foreground">
                En vous connectant, vous acceptez nos Termes et notre Politique de Confidentialité.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PrivacyPay. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
