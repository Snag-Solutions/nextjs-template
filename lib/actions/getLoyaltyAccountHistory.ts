'use server'

import { snag } from '@/lib/snag'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'

/**
 * Fetches the loyalty account history for a specific user.
 *
 * @param userId - The ID of the user whose loyalty account history is to be fetched.
 * @returns A promise that resolves to the user's loyalty account history.
 * @throws An error if the request fails.
 */
export async function getLoyaltyAccountHistory(
  userId: string
): Promise<TransactionGetTransactionEntriesResponse> {
  return snag.loyalty.transactions.getTransactionEntries({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    userId,
    limit: 10,
  })
}
