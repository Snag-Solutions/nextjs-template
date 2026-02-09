'use server'

import { snag } from '@/lib/snag'

export type CreateLoyaltyRuleParams = {
  loyaltyRuleGroupId: string
  name: string
  description: string
  type: string
  amount: string
  rewardType: 'points' | 'multiplier'
  interval: string
  frequency: string
  startTime: string
  endTime: string | null
  effectiveStartTime: string | null
  effectiveEndTime: string | null
  isRequired?: boolean
  hideInUi?: boolean
  showBeforeStart?: boolean
  collectionAddress?: string
  network?: string
  metadata?: Record<string, unknown>
}

export async function createLoyaltyRule(params: CreateLoyaltyRuleParams) {
  const {
    loyaltyRuleGroupId,
    name,
    description,
    type,
    amount,
    rewardType,
    interval,
    frequency,
    startTime,
    endTime,
    effectiveStartTime,
    effectiveEndTime,
    isRequired = false,
    hideInUi = false,
    showBeforeStart = false,
    collectionAddress = '',
    network = 'mainnet',
    metadata = {},
  } = params

  return snag.loyalty.rules.create({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    loyaltyCurrencyId: process.env.LOYALTY_CURRENCY_ID!,
    loyaltyRuleGroupId,
    name,
    description,
    type,
    amount,
    rewardType,
    interval,
    frequency,
    startTime,
    endTime,
    effectiveStartTime,
    effectiveEndTime,
    isRequired,
    hideInUi,
    showBeforeStart,
    collectionAddress,
    network,
    metadata,
  })
}
