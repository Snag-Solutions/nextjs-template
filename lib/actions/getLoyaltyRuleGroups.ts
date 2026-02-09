'use server'

import { snag } from '@/lib/snag'
import type { RuleGroupGetRuleGroupsResponse } from '@snagsolutions/sdk/resources/loyalty'

/**
 * Fetches loyalty rule groups for the organization/website.
 * Use for dropdowns when creating or assigning rules.
 */
export async function getLoyaltyRuleGroups() {
  const response = await snag.loyalty.ruleGroups.getRuleGroups({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    limit: 100,
  })
  return response as RuleGroupGetRuleGroupsResponse
}
