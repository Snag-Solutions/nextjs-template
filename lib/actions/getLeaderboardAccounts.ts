'use server'

import { snag } from '@/lib/snag'
import { AccountListResponse } from '@snagsolutions/sdk/resources/loyalty/accounts.mjs'

/**
 * Fetches a list of leaderboard accounts for the specified organization.
 *
 * @param startingAfter - Optional parameter to paginate through the accounts.
 * @returns A promise that resolves to the list of leaderboard accounts.
 * @throws An error if the request fails.
 */

export async function getLeaderboardAccounts(
  startingAfter?: string
): Promise<AccountListResponse> {
  return snag.loyalty.accounts.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    limit: 20,
    ...(startingAfter ? { startingAfter } : {}),
  })
}
