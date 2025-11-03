'use client';

import { useRouter } from '../../../navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Link } from '../../../navigation';

const defaultUserData = {
  balance: 40278.00,
  assets: [
    { icon: 'Bitcoin', name: "ADA", shortName: "Cardano", amount: 67.5, value: 2760.75 },
    { icon: 'CircleDollarSign', name: "HEX", shortName: "Hex Token", amount: 7.8, value: 4053 },
    { icon: 'Droplets', name: "Ocean", shortName: "Protocol", amount: 3.9, value: 2198 },
  ],
  displayName: "Anonymous User",
  email: "anon@example.com",
  photoURL: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};


export default function LoginPage() {
  const t = useTranslations('Login');
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, userLoading, router]);

  const handleConnect = async () => {
    if (!auth || !firestore) {
        toast({
            title: "Firebase Not Initialized",
            description: "Please check your Firebase configuration or wait a moment.",
            variant: "destructive",
        });
        return;
    }

    setIsConnecting(true);
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // This is a new user, let's create their profile with default data
        await setDoc(userDocRef, {
            ...defaultUserData,
            displayName: user.displayName || 'Anonymous User',
            email: user.email || `anon_${user.uid}@example.com`,
            photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/150/150`
        });
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error("Anonymous sign-in failed:", error);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (userLoading || user) {
     return null;
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link className="flex items-center justify-center" href="/">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">{t('header')}</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <p className="text-sm font-medium text-muted-foreground">{t('signUp')}</p>
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
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleConnect}
                disabled={isConnecting || !auth}
              >
                {isConnecting ? 'Connecting...' : t('connectButton')}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t('terms')}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {t('footer', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
