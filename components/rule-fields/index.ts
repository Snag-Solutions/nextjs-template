'use client'

import type { ComponentType } from 'react'
import type { RuleSpecificFieldProps } from './types'
import { LoyaltyRuleType } from '@/lib/rule-options'
import { DefaultRuleFields } from './DefaultRuleFields'

import { CheckInFields } from './CheckInFields'
import { ReferredUserFields } from './ReferredUserFields'
import { ProfileCompletedFields } from './ProfileCompletedFields'
import { ConnectWalletFields } from './ConnectWalletFields'
import { DripXTweetFields } from './DripXTweetFields'
import { DripXNewTweetFields } from './DripXNewTweetFields'

export type { RuleFormValues, RuleSpecificFieldProps } from './types'
export { BasicDetailsSection } from './BasicDetailsSection'
export { DefaultRuleFields } from './DefaultRuleFields'
export { CheckInFields } from './CheckInFields'
export { ReferredUserFields } from './ReferredUserFields'
export { ProfileCompletedFields } from './ProfileCompletedFields'
export { ConnectWalletFields } from './ConnectWalletFields'
export { DripXTweetFields } from './DripXTweetFields'
export { DripXNewTweetFields } from './DripXNewTweetFields'

type RuleSpecificComponent = ComponentType<RuleSpecificFieldProps>

/** Registry: rule type -> component for rule-based extra fields */
const registry: Record<string, RuleSpecificComponent> = {

  [LoyaltyRuleType.check_in]: CheckInFields,
  [LoyaltyRuleType.referred_user]: ReferredUserFields,
  [LoyaltyRuleType.profile_completed]: ProfileCompletedFields,
  [LoyaltyRuleType.connect_wallet]: ConnectWalletFields,
  [LoyaltyRuleType.drip_x_tweet]: DripXTweetFields,
  [LoyaltyRuleType.drip_x_new_tweet]: DripXNewTweetFields,
}

export function getRuleSpecificFieldsComponent(
  ruleType: string
): RuleSpecificComponent {
  return registry[ruleType] ?? DefaultRuleFields
}
