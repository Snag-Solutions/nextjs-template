'use client'

import { WalletAccountProvider } from '@/components/providers/WalletAccountProvider'
import { WebsiteProvider } from '@/components/providers/WebsiteProvider'
import { getAllSupportedChains } from '@/lib/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { createClient, http } from 'viem'
import { createConfig, WagmiProvider } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { ErrorHandlerProvider } from './ErrorHandlerProvider'

type ProvidersProps = {
  children: ReactNode
}

export const defaultWagmiConfig = () => {
  return createConfig({
    chains: getAllSupportedChains(),
    connectors: [injected()],
    ssr: true,
    client({ chain }) {
      return createClient({ chain, transport: http() })
    },
  })
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <WagmiProvider config={defaultWagmiConfig()}>
          <WebsiteProvider>
            <WalletAccountProvider>
              <ErrorHandlerProvider>{children}</ErrorHandlerProvider>
            </WalletAccountProvider>
          </WebsiteProvider>
        </WagmiProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
