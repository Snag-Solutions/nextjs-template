'use server'

import { snag } from '@/lib/snag'

export async function getLoyaltyQuestionsForRule(loyaltyRuleId: string) {
  return await snag.loyalty.questions.list({
    loyaltyRuleIds: loyaltyRuleId,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    limit: 10,
  })
}
