'use server'

import { snag } from '@/lib/snag'
import {
  AccountListResponse,
  AccountListParams,
} from '@snagsolutions/sdk/resources/loyalty/accounts.mjs'

/**
 * Fetches the loyalty account for a specific user.
 *
 * @param params - The parameters for the loyalty account list request.
 * @returns A promise that resolves to the loyalty account.
 * @throws An error if the request fails.
 */
export async function getLoyaltyAccount(
  params: AccountListParams
): Promise<AccountListResponse> {
  return snag.loyalty.accounts.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    ...params,
  })
}
