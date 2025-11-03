// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ArcSubscription',
  description: 'Privacy-Preserving Recurring Payments',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}