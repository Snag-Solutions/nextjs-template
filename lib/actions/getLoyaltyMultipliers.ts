'use server'
import { MultiplierListParams } from '@snagsolutions/sdk/resources/loyalty/multipliers.mjs'
import { snag } from '@/lib/snag'
import { MultiplierListResponse } from '@snagsolutions/sdk/resources/loyalty/multipliers.mjs'

export type LoyaltyMultiplier = MultiplierListResponse.Data & {
  loyaltyRuleId?: string | null
}

export const getLoyaltyMultipliers = async (params: MultiplierListParams) => {
  return (await snag.loyalty.multipliers.list({
    ...params,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
  })) as {
    data: LoyaltyMultiplier[]
    hasNextPage: boolean
  }
}
