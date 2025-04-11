'use server'
import { snag } from '@/lib/snag'
import { objectToSearchParams } from '@/lib/utils'
import axios from 'axios'

// TODO: Fix the sdk to export the type
export type LoyaltyRuleProgressResponse = {
  data: {
    id: string
    websiteId: string
    organizationId: string
    userId: string
    loyaltyRuleId: string
    progress: number
    createdAt: string
    updatedAt: string
  }[]
  hasNextPage: boolean
}

/**
 * Fetches the loyalty transaction entries for the specified organization.
 *
 * @param params - The parameters for the transaction entries.
 * @returns A promise that resolves to the loyalty transaction entries.
 * @throws An error if the request fails.
 */
export async function getLoyaltyRuleProgress(params: {
  loyaltyRuleId: string | string[]
  userId: string
  limit?: number
  startingAfter?: string
}): Promise<LoyaltyRuleProgressResponse> {
  // TODO: Fix the sdk to support to this endpoint
  const searchParams = objectToSearchParams({
    ...params,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
  })
  const response = await axios.get<LoyaltyRuleProgressResponse>(
    `${snag.baseURL}/api/loyalty/rule_statuses?${searchParams.toString()}`,
    {
      headers: {
        'x-api-key': snag.apiKey,
      },
    }
  )

  return response.data
}
