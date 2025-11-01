import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">PrivacyPay</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
           <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profil</span>
           </Button>
           <Link href="/">
            <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Déconnexion</span>
            </Button>
           </Link>
        </nav>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification d'éligibilité</CardTitle>
                        <CardDescription>
                            Pour activer vos abonnements, veuillez prouver votre éligibilité.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Notre IA vérifiera votre document pour confirmer votre éligibilité sans jamais stocker vos données personnelles.
                        </p>
                        <Button>
                            Uploader un document
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Mes Abonnements</CardTitle>
                        <CardDescription>
                            Gérez vos paiements récurrents.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center text-muted-foreground py-8">
                            <p>Vous n'avez aucun abonnement actif.</p>
                            <Button variant="link" className="mt-2">Créer un nouvel abonnement</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
