'use server'

import { AuthConnectAuthParams } from '@snagsolutions/sdk/resources/auth'
import { snag } from '@/lib/snag'

export const connectUserSocialAuth = async (
  authType: 'twitter' | 'discord' | 'telegram' | 'epic' | 'steam' | 'tiktok' | 'reddit',
  params: AuthConnectAuthParams
) => {
  return await snag.auth.connectAuth(authType, {
    ...params,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID,
  })
}
