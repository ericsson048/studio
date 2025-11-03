export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;  // en USDC
  icon: string;
  frequency: 'monthly' | 'yearly';
  chainId: string;
}

export const subscriptions: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'Premium Plan - Automated USDC Payments',
    price: 19.99,
    icon: 'https://picsum.photos/seed/netflix-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Individual Plan - Automated USDC Payments',
    price: 10.99,
    icon: 'https://picsum.photos/seed/spotify-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
  {
    id: 'youtube_premium',
    name: 'YouTube Premium',
    description: 'Family Plan - Automated USDC Payments',
    price: 22.99,
    icon: 'https://picsum.photos/seed/youtube-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
];
