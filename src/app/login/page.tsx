import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Crypto Wallet</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-gray-900/40 border-gray-800">
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
                  Connecter le Wallet
                </Button>
              </Link>
               <p className="text-center text-xs text-muted-foreground">
                En vous connectant, vous acceptez nos Termes et notre Politique de Confidentialité.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Crypto Wallet. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
