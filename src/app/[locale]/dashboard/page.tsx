'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  QrCode, 
  ArrowRightLeft, 
  ChevronDown,
  Bitcoin,
  CircleDollarSign,
  Droplets,
  LogOut
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {useTranslations} from 'next-intl';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { signOut } from 'firebase/auth';
import { useRouter } from '../../../../navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

const chartData = [
  { name: 'Jan', value: 20 }, { name: 'Fev', value: 45 }, { name: 'Mar', value: 30 },
  { name: 'Avr', value: 60 }, { name: 'Mai', value: 40 }, { name: 'Jui', value: 75 },
  { name: 'Jui', value: 50 }, { name: 'Aou', value: 80 }, { name: 'Sep', value: 65 },
  { name: 'Oct', value: 90 }, { name: 'Nov', value: 55 }, { name: 'Dec', value: 70 },
];

function AssetRow({ icon, name, shortName, amount, value }: { icon: React.ReactNode, name: string, shortName: string, amount: number, value: number }) {
  const t = useTranslations('Dashboard');
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div className="bg-secondary rounded-full p-3">
          {icon}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{shortName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{amount}</p>
        <p className="text-sm text-muted-foreground">${value.toLocaleString(t('locale'))}</p>
      </div>
    </div>
  )
}

function DashboardContent() {
  const t = useTranslations('Dashboard');
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  const userDocRef = user ? doc(firestore, 'users', user.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc(userDocRef);

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const loading = userLoading || profileLoading;
  const walletData = userProfile?.data();

  const assets = [
    { icon: <Bitcoin className="text-primary" />, name: "ADA", shortName: "Cardano", amount: 67.5, value: 2760.75 },
    { icon: <CircleDollarSign className="text-primary" />, name: "HEX", shortName: "Hex Token", amount: 7.8, value: 4053 },
    { icon: <Droplets className="text-primary" />, name: "Ocean", shortName: "Protocol", amount: 3.9, value: 2198 },
  ];

  return (
     <div className="p-6 md:p-8">
        <header className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleSignOut}><LogOut /></Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <QrCode />
            </Button>
            {loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : (
              <Image src={user?.photoURL ?? "https://picsum.photos/seed/user-avatar/32/32"} alt="User" width={32} height={32} className="rounded-full" data-ai-hint="person" />
            )}
          </div>
        </header>

        <main>
          <div className="text-left mb-8">
            <p className="text-sm text-muted-foreground">{t('yourWallet')}</p>
            {loading ? (
              <Skeleton className="h-10 w-64 mt-1" />
            ) : (
              <h1 className="text-4xl font-bold">
                {(walletData?.balance ?? 0).toLocaleString(t('locale'), { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl text-muted-foreground align-middle">USDT</span>
              </h1>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-start gap-4 mb-8">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">{t('withdraw')}</Button>
            <Button variant="secondary" className="flex-1">{t('deposit')}</Button>
            <Button variant="secondary" size="icon"><ArrowRightLeft className="h-4 w-4" /></Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-transparent border-none p-0">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
                <CardTitle className="text-lg">{t('stakingAndTokens')}</CardTitle>
                <Button variant="link" className="text-primary pr-0">{t('seeAll')}</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-32 -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide domain={[0, 'dataMax + 10']}/>
                      <Tooltip 
                        cursor={{fill: 'hsla(var(--primary), 0.1)'}}
                        contentStyle={{
                          background: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                 <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{t('tokens')} <span className="text-white font-medium">$32.7k</span></span>
                  <span>{t('staking')} <span className="text-white font-medium">$52.7k</span></span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 md:mt-0">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{t('assets')}</h2>
                <Button variant="ghost" size="sm">{t('buy')} <ChevronDown className="w-4 h-4 ml-1" /></Button>
              </div>
              <div className="divide-y divide-border">
                {loading ? (
                  <>
                    <Skeleton className="h-16 w-full my-2" />
                    <Skeleton className="h-16 w-full my-2" />
                    <Skeleton className="h-16 w-full my-2" />
                  </>
                ) : (
                  (walletData?.assets ?? assets).map((asset: any) => (
                    <AssetRow key={asset.name} {...asset} />
                  ))
                )}
              </div>
              <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-white">{t('plus12Tokens')}</Button>
            </div>
          </div>
        </main>
      </div>
  )
}


export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }
  
  return (
    <div className="flex justify-center items-start md:items-center min-h-screen bg-black py-8 px-4 md:py-0 md:px-0">
      <div className="w-full max-w-4xl mx-auto bg-card rounded-3xl shadow-2xl shadow-primary/10 text-white font-sans overflow-hidden">
        <DashboardContent />
      </div>
    </div>
  );
}
