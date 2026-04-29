'use server'

import { snag } from '@/lib/snag'

export async function submitLoyaltyQuestionResponse(params: {
  loyaltyQuestionChoiceId: string
  userId: string
}) {
  return await snag.loyalty.questionsResponses.submit({
    loyaltyQuestionChoiceId: params.loyaltyQuestionChoiceId,
    userId: params.userId,
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
  })
}
