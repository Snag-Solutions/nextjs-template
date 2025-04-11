'use server'
import { snag } from '@/lib/snag'
import {
  TransactionGetTransactionEntriesResponse,
  TransactionGetTransactionEntriesParams,
} from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { objectToSearchParams } from '@/lib/utils'
import axios from 'axios'

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
  const response = await axios.get<TransactionGetTransactionEntriesResponse>(
    `${snag.baseURL}/api/loyalty/transaction_entries?${searchParams.toString()}`,
    {
      headers: {
        'x-api-key': snag.apiKey,
      },
    }
  )

  return response.data

  //   // userCompletedLoyaltyRuleId can be a string or an array of strings
  //   // we need to convert it to use URLSearchParams
  //   const query = new URLSearchParams()
  //   if (Array.isArray(userCompletedLoyaltyRuleId)) {
  //     userCompletedLoyaltyRuleId.forEach((id) => {
  //       query.append('userCompletedLoyaltyRuleId', id)
  //     })
  //   } else if (typeof userCompletedLoyaltyRuleId === 'string') {
  //     query.append('userCompletedLoyaltyRuleId', userCompletedLoyaltyRuleId)
  //   }

  //   const path = `/api/loyalty/transaction_entries?${query.toString()}`
  //   console.log(path)
  //   return snag.loyalty.transactions.getTransactionEntries(
  //     {
  //       organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
  //       websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
  //       ...params,
  //     },
  //     {
  //       path,
  //       query,
  //     }
  //   )
}
