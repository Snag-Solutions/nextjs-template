'use client'

import { getMintingStatus } from '@/lib/actions/getMintingStatus'
import { getWalletClient } from 'wagmi/actions'

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const toBigInt = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  try {
    return BigInt(value as any)
  } catch {
    return undefined
  }
}

export const waitForMintSignature = async (statusId: string) => {
  const maxAttempts = 30
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const status = await getMintingStatus(statusId)
    if (status.status === 'failed') {
      throw new Error(status.errorMessage || 'Minting failed.')
    }
    if (status.signature) {
      const signatureData =
        typeof status.signature === 'string'
          ? JSON.parse(status.signature)
          : status.signature
      if (!signatureData?.signature || !signatureData?.payload) {
        throw new Error('Invalid mint signature payload.')
      }
      return {
        signature: signatureData.signature,
        payload: signatureData.payload,
      }
    }
    await sleep(2000)
  }
  throw new Error('Mint signature not ready yet. Please try again.')
}

export const getReadyWalletClient = async (
  wagmiConfig: Parameters<typeof getWalletClient>[0],
  chainId: number
) => {
  const maxAttempts = 10
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const walletClient = await getWalletClient(wagmiConfig, { chainId })
      if (walletClient) return walletClient
    } catch {
      // keep retrying until the wallet client is ready
    }
    await sleep(500)
  }
  return null
}