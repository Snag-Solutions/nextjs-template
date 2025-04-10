'use client'

import { isSupportedChain } from '@/lib/chains'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'
import { Chain, Hex } from 'viem'
import { useAccount, useDisconnect } from 'wagmi'

interface WalletAccountContextType {
  address: Hex
  chainId?: number | string
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  isReconnecting: boolean
  status: 'connected' | 'reconnecting' | 'connecting' | 'disconnected'
  switchNetwork: ({
    networkChainId,
  }: {
    networkChainId?: string | number
  }) => Promise<void>
  disconnectWallet: () => Promise<void>
}

const WalletAccountContext = createContext<
  WalletAccountContextType | undefined
>(undefined)

export const WalletAccountProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const account = useAccount()
  const { disconnectAsync } = useDisconnect()

  useEffect(() => {
    if (account?.chainId) {
      let chainId = account?.chainId
      if (!isSupportedChain(chainId)) chainId = 1

      switchNetwork({ networkChainId: chainId })
    }
  }, [account?.chainId])

  const switchNetwork = async ({
    networkChainId,
    networkChain,
  }: {
    networkChainId?: string | number
    networkChain?: Chain
  }) => {
    try {
      if (!isSupportedChain(networkChainId)) {
        const chainName = networkChain?.name || 'Unknown Chain'
        alert(`${chainName} is not supported in this demo.`)
        return
      }
      if (account?.connector && account.chainId != networkChainId) {
        await account?.connector?.switchChain?.({
          chainId: +(networkChainId ?? 1),
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnectAsync?.()
    } catch (e) {}
  }

  const value: WalletAccountContextType = {
    address: account?.address as Hex,
    chainId: account?.chainId,
    isConnected: account?.isConnected,
    isConnecting: account?.isConnecting,
    isDisconnected: account?.isDisconnected,
    isReconnecting: account?.isReconnecting,
    status: account?.status as
      | 'connected'
      | 'reconnecting'
      | 'connecting'
      | 'disconnected',
    switchNetwork,
    disconnectWallet,
  }

  return (
    <WalletAccountContext.Provider value={value}>
      {children}
    </WalletAccountContext.Provider>
  )
}

export const useWalletAccount = (): WalletAccountContextType => {
  const context = useContext(WalletAccountContext)
  if (context === undefined) {
    throw new Error(
      'useWalletAccount must be used within a WalletAccountProvider'
    )
  }
  return context
}
