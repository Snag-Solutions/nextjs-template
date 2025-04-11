'use server'
import { snag } from '@/lib/snag'
import {
  RuleListParams,
  RuleListResponse,
} from '@snagsolutions/sdk/resources/loyalty/rules'

// TODO: Fix the sdk to export the full response type
export type RuleListResponseFull = {
  data: Array<
    NonNullable<RuleListResponse['data']>[0] & {
      name: string
      description: string
      endTime: string
      startTime: string
      rewardType: 'points' | 'multiplier'
    }
  >
  hasNextPage: boolean
}

/**
 * Fetches the loyalty rules for the specified organization.
 *
 * @returns A promise that resolves to the loyalty rules.
 * @throws An error if the request fails.
 */
export async function getLoyaltyRules(params?: RuleListParams) {
  return (await snag.loyalty.rules.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    ...(params || {}),
  })) as RuleListResponseFull
}
