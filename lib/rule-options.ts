import { RuleOptions as RuleOptionsData } from './rule-options-data'
import {
  LoyaltyRuleType,
  type RuleOptionConfig,
} from './rule-options-const'

export {
  LoyaltyRuleType,
  LoyaltyRuleClaimType,
  LoyaltyRuleRewardLifetime,
  LoyaltyRuleInterval,
  LoyaltyRuleFrequency,
  LoyaltyRuleFrequencyOptions,
  type LoyaltyRuleIntervalFormOption,
  type LoyaltyRuleFrequencyFormOption,
  type RuleOptionConfig,
  type RuleOptionsMap,
} from './rule-options-const'

export const RuleOptions = RuleOptionsData

/** Get options for a rule type; returns null if type has no config or is unknown */
export function getRuleOptions(ruleType: string): RuleOptionConfig | null {
  return (RuleOptions as Record<string, RuleOptionConfig | null>)[ruleType] ?? null
}

export const ALL_LOYALTY_RULE_TYPES = (
  Object.values(LoyaltyRuleType) as string[]
).sort((a, b) => a.localeCompare(b))
