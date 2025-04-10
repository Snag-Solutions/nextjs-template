'use server'

import { snag } from '@/lib/snag'
import { AccountListResponse } from '@snagsolutions/sdk/resources/loyalty/accounts.mjs'

/**
 * Fetches the loyalty account for a specific user.
 *
 * @param userId - The ID of the user whose loyalty account is to be fetched.
 * @returns A promise that resolves to the user's loyalty account.
 * @throws An error if the request fails.
 */
export async function getLoyaltyAccount(
  userId: string
): Promise<AccountListResponse> {
  return snag.loyalty.accounts.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    userId,
  })
}
