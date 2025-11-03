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
    price: 0.0001,
    icon: 'https://picsum.photos/seed/netflix-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Individual Plan - Automated USDC Payments',
    price: 0.00005,
    icon: 'https://picsum.photos/seed/spotify-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
  {
    id: 'youtube_premium',
    name: 'YouTube Premium',
    description: 'Family Plan - Automated USDC Payments',
    price: 0.00012,
    icon: 'https://picsum.photos/seed/youtube-logo/64/64',
    frequency: 'monthly',
    chainId: '421613' // Arc testnet
  },
];
