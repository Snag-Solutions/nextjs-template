'use server'

import { snag } from '@/lib/snag'

/**
 * Claim a loyalty rule for a user.
 *
 * @param ruleId - The ID of the loyalty rule to claim.
 * @param userId - The ID of the user to claim the rule for.
 * @returns A message indicating the result of the claim.
 * @throws An error if the claim fails.
 */
export async function claimLoyaltyRule(
  ruleId: string,
  userId: string
): Promise<string> {
  try {
    const data = await snag.loyalty.rules.complete(ruleId, {
      userId,
    })
    return data?.message
  } catch (error: unknown) {
    return error instanceof Error ? error?.message : 'Unknown error'
  }
}
