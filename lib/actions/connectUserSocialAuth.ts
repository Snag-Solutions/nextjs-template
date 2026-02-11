'use server'

import { AuthConnectAuthParams } from '@snagsolutions/sdk/resources/auth'
import { snag } from '@/lib/snag'
import { AuthType } from '@/lib/loyalty'

export const connectUserSocialAuth = async (
  authType: AuthType,
  params: AuthConnectAuthParams
) => {
  return await snag.auth.connectAuth(authType, {
    ...params,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID,
  })
}
