/**
 * Rule option types and constants. Kept in a separate file so rule-options-data
 * can import them without creating a circular dependency with rule-options.
 */
export const LoyaltyRuleType = {
  check_in: 'check_in',
  referred_user: 'referred_user',
  profile_completed: 'profile_completed',
  connect_wallet: 'connect_wallet',
  connected_email: 'connected_email',
  connected_twitter: 'connected_twitter',
  connected_discord: 'connected_discord',
  connected_telegram: 'connected_telegram',
  connected_github: 'connected_github',
  connected_youtube: 'connected_youtube',
  connected_reddit: 'connected_reddit',
  connected_instagram: 'connected_instagram',
  connected_steam: 'connected_steam',
  connected_epic: 'connected_epic',
  connected_tiktok: 'connected_tiktok',
  drip_x_tweet: 'drip_x_tweet',
  drip_x_new_tweet:'drip_x_new_tweet'

} as const


export const LoyaltyRuleClaimType = {
  manual: 'manual',
  auto: 'auto',
} as const

export type LoyaltyRuleClaimType =
  (typeof LoyaltyRuleClaimType)[keyof typeof LoyaltyRuleClaimType]

export const LoyaltyRuleRewardLifetime = {
  permanent: 'permanent',
  dynamic: 'dynamic',
} as const

export type LoyaltyRuleRewardLifetime =
  (typeof LoyaltyRuleRewardLifetime)[keyof typeof LoyaltyRuleRewardLifetime]

export const LoyaltyRuleInterval = {
  once: 'once',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  hourly: 'hourly',
  unlimited: 'unlimited',
  custom: 'custom',
} as const

export type LoyaltyRuleInterval =
  (typeof LoyaltyRuleInterval)[keyof typeof LoyaltyRuleInterval]

export const LoyaltyRuleFrequency = {
  immediately: 'immediately',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  hourly: 'hourly',
  none: 'none',
  once: 'once',
} as const

export type LoyaltyRuleFrequency =
  (typeof LoyaltyRuleFrequency)[keyof typeof LoyaltyRuleFrequency]

export type LoyaltyRuleIntervalFormOption = LoyaltyRuleInterval

export const LoyaltyRuleFrequencyOptions = { ...LoyaltyRuleFrequency } as const
export type LoyaltyRuleFrequencyFormOption = LoyaltyRuleFrequency

type NonEmptyArray<T> = [T, ...T[]]

export type RuleOptionConfig = {
  claimTypeOptions?: LoyaltyRuleClaimType[]
  rewardLifetimeOptions: LoyaltyRuleRewardLifetime[]
  interval: {
    default: LoyaltyRuleInterval | null
    options: {
      option: LoyaltyRuleIntervalFormOption
      frequency: LoyaltyRuleFrequency
    }[]
  }
  frequency: {
    default: LoyaltyRuleFrequency
    options: NonEmptyArray<LoyaltyRuleFrequencyFormOption>
  }
}

/** Rule type -> options for interval, frequency, claim type, etc. null = not configurable in UI */
export type RuleOptionsMap = {
  [K in typeof LoyaltyRuleType[keyof typeof LoyaltyRuleType]]: RuleOptionConfig | null
}
