'use server'
import { snag } from '@/lib/snag'
import {
  TransactionGetTransactionEntriesResponse,
  TransactionGetTransactionEntriesParams,
} from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { objectToSearchParams } from '@/lib/utils'
import axios, { AxiosError } from 'axios'

/**
 * Fetches the loyalty transaction entries for the specified organization.
 *
 * @param params - The parameters for the transaction entries.
 * @returns A promise that resolves to the loyalty transaction entries.
 * @throws An error if the request fails.
 */
export async function getLoyaltyTransactionEntries(
  params: TransactionGetTransactionEntriesParams
): Promise<TransactionGetTransactionEntriesResponse> {
  // TODO: Fix the sdk to support array params and use that instead
  const searchParams = objectToSearchParams({
    ...params,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
  })
  try {
    const response = await axios.get<TransactionGetTransactionEntriesResponse>(
      `${snag.baseURL}/api/loyalty/transaction_entries?${searchParams.toString()}`,
      {
        headers: {
          'x-api-key': snag.apiKey,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error((error as AxiosError<TransactionGetTransactionEntriesResponse>)?.response?.data)
    throw error
  }
}
