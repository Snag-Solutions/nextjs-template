import { useWalletAccount } from '@/components/providers/WalletAccountProvider'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { SiweMessage } from 'siwe'
import { useConnect, useSignMessage } from 'wagmi'

/**
 * Get the wallet authentication signature
 */
export const getWalletAuthSignature = async (
  account: ReturnType<typeof useWalletAccount>,
  signMessage: ReturnType<typeof useSignMessage>
) => {
  const message = new SiweMessage({
    domain: window.location.host,
    statement: 'Sign in to the app. Powered by Snag Solutions.',
    uri: window.location.origin,
    version: '1',
    chainId: Number(account.chainId ?? 1),
    nonce: await getCsrfToken(),
    address: account.address,
  })

  const signatureOrToken = await signMessage.signMessageAsync({
    message: message.prepareMessage(),
  })

  return {
    signatureOrToken,
    message,
    walletAddress: account.address,
  }
}

/**
 * Sign in the user with the wallet address and signature
 */
export const signInWallet = async (
  account: ReturnType<typeof useWalletAccount>,
  signMessage: ReturnType<typeof useSignMessage>
) => {
  const { signatureOrToken, message, walletAddress } =
    await getWalletAuthSignature(account, signMessage)

  const token = await signIn('credentials', {
    message: !!message ? JSON.stringify(message) : message,
    accessToken: signatureOrToken,
    signature: signatureOrToken,
    walletAddress: walletAddress,
    redirect: false,
    callbackUrl: '/protected',
  })
  return token
}

/**
 * Hook to get the authentication account
 *
 * @returns {object} The authentication account
 */
export const useAuthAccount = () => {
  const session = useSession()
  const account = useWalletAccount()
  const signMessageWagmi = useSignMessage()
  const { connectors, connect } = useConnect()
  const isAuthenticated = useMemo(
    () => !!session.data?.user,
    [session.data?.user]
  )

  useEffect(() => {
    async function connectWallet() {
      await signInWallet(account, signMessageWagmi)
    }
    if (account.address && session.status === 'unauthenticated') connectWallet()
  }, [account.address, session.status])

  return {
    isAuthenticated,
    userId: session.data?.user?.id,
    walletAddress: session?.data?.address,
    account,
    isLoading: session.status === 'loading',
    connect: async () => {
      try {
        await connect({
          connector: connectors?.[0],
        })
      } catch (err: unknown) {
        console.error(err instanceof Error ? err?.message : 'Unknown error')
      }
    },
    disconnect: async () => {
      try {
        await signOut({
          redirect: false,
        })
        await account.disconnectWallet()
      } catch (err: unknown) {
        console.error(err instanceof Error ? err?.message : 'Unknown error')
      }
    },
  }
}
