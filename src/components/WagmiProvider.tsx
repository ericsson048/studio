'use client';

import { WagmiProvider as WagmiProviderBase, createConfig, http } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ARC_CONFIG } from '@/lib/arc-config';

const arcTestnet = {
  ...arbitrumSepolia, // We can base it on a well-known chain
  id: parseInt(ARC_CONFIG.chainId),
  name: 'Arc Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [ARC_CONFIG.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Arc Explorer', url: 'https://testnet.arcalabs.network' },
  },
};


const config = createConfig({
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(ARC_CONFIG.rpcUrl),
  },
})

const queryClient = new QueryClient()

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderBase>
  )
}
