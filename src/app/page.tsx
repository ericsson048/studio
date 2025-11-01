import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">ArcSubscription</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary"
            href="#"
          >
            Support
          </Link>
          <Link href="/login">
            <Button variant="outline" className="hover:bg-secondary">
              Connect Wallet
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Privacy-Preserving Recurring Payments
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Subscribe to services with USDC on the Arc blockchain. Your privacy, secured by Zero-Knowledge Proofs and AI.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ArcSubscription. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
