'use server'

import { snag } from '@/lib/snag'
import { RuleGetStatusParams } from '@snagsolutions/sdk/resources/loyalty/rules'

export async function getLoyaltyRuleProcessingStatus(
  params: RuleGetStatusParams
) {
  return await snag.loyalty.rules.getStatus({
    ...params,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
  })
}
