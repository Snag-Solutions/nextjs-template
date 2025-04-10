import { SupportedChainId, ViemChainByChainId } from '@/lib/chains'
import { snag } from '@/lib/snag'
import { Session, User } from 'next-auth'
import { type JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'
import { Hex, createPublicClient, getAddress, http } from 'viem'

/**
 * Authenticate the user with the wallet address
 *
 * @param {string} walletAddress - The wallet address of the user
 * @return {Promise<User | null>} - The authenticated user or null if not found
 * @throws {Error} - If the wallet address is invalid
 */
export async function onAuthLogin(walletAddress: string) {
  const address = getAddress(walletAddress)

  // Check if the user exists in the database
  const snagUser = (
    await snag.users.list({
      walletAddress: address,
      organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
      websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    })
  )?.data?.[0]

  // If the user does not exist, create a new user
  if (!snagUser) {
    return (
      await snag.users.metadatas.create({
        walletAddress: address,
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
        websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
      })
    )?.user
  }

  return snagUser
}

/**
 * Verify the signature of the authentication message
 */
export async function verifyAuthSignature(credentials?: {
  message?: string
  accessToken?: string
  signature?: string
}) {
  let walletAddress: string | null = null
  const message = JSON.parse(credentials?.message || '{}')
  const siwe = new SiweMessage(message)

  try {
    await siwe.verify({ signature: credentials?.signature! })
    walletAddress = siwe.address?.toLowerCase()
  } catch (e) {
    if (!siwe.chainId) throw e
    const chain = ViemChainByChainId[siwe.chainId as SupportedChainId]
    if (!chain) throw e
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })
    const valid = await publicClient.verifyMessage({
      address: getAddress(message.address),
      message: siwe.prepareMessage(),
      signature: credentials?.signature! as Hex,
    })
    if (valid) {
      walletAddress = siwe.address?.toLowerCase()
    } else {
      throw new Error('Invalid signature')
    }
  }

  return walletAddress
}

/**
 * Update the JWT token with the wallet address and user ID
 */
async function onAuthJwt(token: JWT, user: User) {
  if (user) {
    token.walletAddress = user.walletAddress
    token.userId = user.id
  }
  return token
}

/**
 * Update the session with the wallet address
 */
async function onAuthSession(session: Session, token: JWT) {
  session.address = token.walletAddress as string
  session.user.walletAddress = token.walletAddress as string
  session.user.id = token.userId as string
}

/**
 * Get the NextAuth options for authentication
 *
 * @returns {object} The NextAuth options
 */
export function getAuthOptions() {
  const providers = [
    CredentialsProvider({
      id: 'credentials',
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        walletAddress: {
          label: 'Wallet Address',
          type: 'text',
          placeholder: '0x0',
          required: false,
        },
      },
      // @ts-ignore
      async authorize(credentials: any) {
        try {
          const walletAddress = await verifyAuthSignature(credentials)
          if (!walletAddress) {
            throw new Error('Invalid signature')
          }
          const auth = await onAuthLogin(walletAddress)
          return auth
        } catch (e) {
          console.error('Error in authorize', e)
          return null
        }
      },
    }),
  ]

  return {
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn() {
        return true
      },
      async jwt({ token, user }: any) {
        return onAuthJwt(token, user)
      },
      async session({ session, token }: any) {
        onAuthSession(session, token)
        return session
      },
      async redirect({ url, baseUrl }: any) {
        return new URL(url, baseUrl).href
      },
    },
  }
}
