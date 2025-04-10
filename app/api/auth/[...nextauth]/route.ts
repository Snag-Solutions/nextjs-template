import { getAuthOptions } from '@/lib/auth'
import NextAuth from 'next-auth'

export const { auth, handlers, signIn, signOut } = await NextAuth({
  ...getAuthOptions(),
})

export const { GET, POST } = handlers
