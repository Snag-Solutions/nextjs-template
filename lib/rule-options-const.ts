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
  drip_x_new_tweet: 'drip_x_new_tweet',
  drip_x_follow: 'drip_x_follow',
  drip_x_text_in_bio: 'drip_x_text_in_bio',
  drip_x_text_in_comment: 'drip_x_text_in_comment',
  drip_x_text_in_name: 'drip_x_text_in_name',
  twitter_followers: 'twitter_followers',
  post_impressions: 'post_impressions',
  discord_member: 'discord_member',
  discord_join: 'discord_join',
  DiscordMessages: 'DiscordMessages',
  discord_role_grant: 'discord_role_grant',
  telegram_join: 'telegram_join',
  telegram_messages: 'telegram_messages',
  tiktok_follow: 'tiktok_follow',
  tiktok_post: 'tiktok_post',
  instagram_post: 'instagram_post',
  github_repo_star: 'github_repo_star',
  github_repo_fork: 'github_repo_fork',
  github_repo_collaborator: 'github_repo_collaborator',
  github_merge_PR: 'github_merge_PR',
  youtube_subscribers: 'youtube_subscribers',
  youtube_comment: 'youtube_comment',
  reddit_comment: 'reddit_comment',
  steam_wishlist: 'steam_wishlist',
  // Token / NFT activity
  TokenHold: 'TokenHold',
  BoughtOn: 'BoughtOn',
  SoldOn: 'SoldOn',
  MintOn: 'MintOn',
  token_hold_erc20: 'token_hold_erc20',
  // Other
  text_input: 'text_input',
  code_entry: 'code_entry',
  link_click: 'link_click',
  quiz: 'quiz',
  poll: 'poll',
  shopify_spend: 'shopify_spend',
  snapshot_governance: 'snapshot_governance',
  create_partner_account: 'create_partner_account',
  external_rule: 'external_rule',
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
