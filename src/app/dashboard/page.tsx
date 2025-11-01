'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  QrCode, 
  ArrowRightLeft, 
  ChevronDown,
  Bitcoin,
  CircleDollarSign,
  Droplets
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { name: 'Jan', value: 20 }, { name: 'Fev', value: 45 }, { name: 'Mar', value: 30 },
  { name: 'Avr', value: 60 }, { name: 'Mai', value: 40 }, { name: 'Jui', value: 75 },
  { name: 'Jui', value: 50 }, { name: 'Aou', value: 80 }, { name: 'Sep', value: 65 },
  { name: 'Oct', value: 90 }, { name: 'Nov', value: 55 }, { name: 'Dec', value: 70 },
];

function AssetRow({ icon, name, shortName, amount, value }: { icon: React.ReactNode, name: string, shortName: string, amount: number, value: number }) {
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
        <p className="text-sm text-muted-foreground">${value.toLocaleString('en-US')}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-start md:items-center min-h-screen bg-black py-8 px-4 md:py-0 md:px-0">
      <div className="w-full max-w-4xl mx-auto bg-card rounded-3xl shadow-2xl shadow-primary/10 text-white font-sans overflow-hidden">
        <div className="p-6 md:p-8">
          <header className="flex justify-between items-center mb-6">
            <Link href="/login">
              <Button variant="ghost" size="icon"><ArrowLeft /></Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <QrCode />
              </Button>
              <Image src="https://picsum.photos/seed/user-avatar/32/32" alt="User" width={32} height={32} className="rounded-full" data-ai-hint="person" />
            </div>
          </header>

          <main>
            <div className="text-left mb-8">
              <p className="text-sm text-muted-foreground">Votre portefeuille</p>
              <h1 className="text-4xl font-bold">40,278.00 <span className="text-2xl text-muted-foreground align-middle">USDT</span></h1>
            </div>

            <div className="flex flex-col md:flex-row justify-start gap-4 mb-8">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Retirer</Button>
              <Button variant="secondary" className="flex-1">Déposer</Button>
              <Button variant="secondary" size="icon"><ArrowRightLeft className="h-4 w-4" /></Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-transparent border-none p-0">
                <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
                  <CardTitle className="text-lg">Jalonnement & jetons</CardTitle>
                  <Button variant="link" className="text-primary pr-0">Voir tout</Button>
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
                    <span>Jetons <span className="text-white font-medium">$32.7k</span></span>
                    <span>Jalonnement <span className="text-white font-medium">$52.7k</span></span>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 md:mt-0">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Actifs</h2>
                  <Button variant="ghost" size="sm">Acheter <ChevronDown className="w-4 h-4 ml-1" /></Button>
                </div>
                <div className="divide-y divide-border">
                  <AssetRow icon={<Bitcoin className="text-primary" />} name="ADA" shortName="Cardano" amount={67.5} value={2760.75} />
                  <AssetRow icon={<CircleDollarSign className="text-primary" />} name="HEX" shortName="Hex Token" amount={7.8} value={4053} />
                  <AssetRow icon={<Droplets className="text-primary" />} name="Ocean" shortName="Protocol" amount={3.9} value={2198} />
                </div>
                <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-white">+ 12 jetons</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
