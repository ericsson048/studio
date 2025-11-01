'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, User, QrCode, ArrowRightLeft, Settings, Bell, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const chartData = [
  { name: 'Jan', value: 20 }, { name: 'Fev', value: 45 }, { name: 'Mar', value: 30 },
  { name: 'Avr', value: 60 }, { name: 'Mai', value: 40 }, { name: 'Jui', value: 75 },
  { name: 'Jui', value: 50 }, { name: 'Aou', value: 80 }, { name: 'Sep', value: 65 },
  { name: 'Oct', value: 90 }, { name: 'Nov', value: 55 }, { name: 'Dec', value: 70 },
];

function AssetRow({ icon, name, shortName, amount, value }: { icon: React.ReactNode, name: string, shortName: string, amount: number, value: number }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="bg-gray-800 rounded-full p-2">
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
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-sm mx-auto bg-[#1C1C1E] rounded-3xl shadow-lg text-white font-sans overflow-hidden">
        <div className="p-4">
          <header className="flex justify-between items-center mb-4">
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
            <div className="text-left mb-6">
              <p className="text-sm text-muted-foreground">Your Wallet</p>
              <h1 className="text-4xl font-bold">40,278.00 <span className="text-2xl text-muted-foreground">USDT</span></h1>
            </div>

            <div className="flex justify-around gap-2 mb-6">
              <Button className="flex-1 bg-white text-black hover:bg-gray-200">Withdraw</Button>
              <Button variant="secondary" className="flex-1">Deposit</Button>
              <Button variant="secondary" size="icon"><ArrowRightLeft className="h-4 w-4" /></Button>
            </div>
            
            <Card className="bg-transparent border-none">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-2">
                <CardTitle className="text-lg">Staking & tokens</CardTitle>
                <Button variant="link" className="text-white">See all</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide domain={[0, 'dataMax + 10']}/>
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={5} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                 <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tokens <span className="text-white">$32.7k</span></span>
                  <span>Staking Tokens <span className="text-white">$52.7k</span></span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Assets</h2>
                <Button variant="ghost" size="sm">Buy <ChevronDown className="w-4 h-4 ml-1" /></Button>
              </div>
              <div className="divide-y divide-gray-800">
                <AssetRow icon={<span className="text-xl">✳️</span>} name="ADA" shortName="Cardano" amount={67.5} value={2760.75} />
                <AssetRow icon={<span className="text-xl">🌀</span>} name="HEX" shortName="Hex Token" amount={7.8} value={4053} />
                <AssetRow icon={<span className="text-xl">🌐</span>} name="Ocean" shortName="Protocol" amount={3.9} value={2198} />
              </div>
              <Button variant="ghost" className="w-full mt-4 text-muted-foreground">+ 12 Tokens</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
