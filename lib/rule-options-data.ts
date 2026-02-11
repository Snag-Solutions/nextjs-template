import {
  LoyaltyRuleType,
  LoyaltyRuleClaimType,
  LoyaltyRuleRewardLifetime,
  LoyaltyRuleInterval,
  LoyaltyRuleFrequency,
  RuleOptionsMap,
  type RuleOptionConfig,
} from './rule-options-const'

const socialQuestOnceConfig: RuleOptionConfig = {
  claimTypeOptions: [LoyaltyRuleClaimType.manual],
  rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
  interval: {
    default: LoyaltyRuleInterval.once,
    options: [
      { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
    ],
  },
  frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
}

const tokenActivityConfig: RuleOptionConfig = {
  claimTypeOptions: [LoyaltyRuleClaimType.auto],
  rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
  interval: {
    default: LoyaltyRuleInterval.once,
    options: [
      { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      { option: 'daily', frequency: LoyaltyRuleFrequency.daily },
      { option: 'weekly', frequency: LoyaltyRuleFrequency.weekly },
      { option: 'monthly', frequency: LoyaltyRuleFrequency.monthly },
    ],
  },
  frequency: {
    default: LoyaltyRuleFrequency.daily,
    options: [LoyaltyRuleFrequency.immediately, LoyaltyRuleFrequency.daily, LoyaltyRuleFrequency.weekly, LoyaltyRuleFrequency.monthly],
  },
}

export const RuleOptions: RuleOptionsMap = {
  [LoyaltyRuleType.check_in]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.daily,
      options: [
        { option: 'daily', frequency: LoyaltyRuleFrequency.daily },
        { option: 'weekly', frequency: LoyaltyRuleFrequency.weekly },
        { option: 'monthly', frequency: LoyaltyRuleFrequency.monthly },
      ],
    },
    frequency: {
      default: LoyaltyRuleFrequency.immediately,
      options: [LoyaltyRuleFrequency.immediately],
    },
  },

  [LoyaltyRuleType.referred_user]: {
    claimTypeOptions: [LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.daily,
      options: [
        { option: 'daily', frequency: LoyaltyRuleFrequency.daily },
        { option: 'weekly', frequency: LoyaltyRuleFrequency.weekly },
        { option: 'monthly', frequency: LoyaltyRuleFrequency.monthly },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.daily, options: [LoyaltyRuleFrequency.daily, LoyaltyRuleFrequency.weekly, LoyaltyRuleFrequency.monthly] },
  },

  [LoyaltyRuleType.profile_completed]: {
    claimTypeOptions: [LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.daily,
      options: [
        { option: 'daily', frequency: LoyaltyRuleFrequency.daily },
        { option: 'weekly', frequency: LoyaltyRuleFrequency.weekly },
        { option: 'monthly', frequency: LoyaltyRuleFrequency.monthly },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.daily, options: [LoyaltyRuleFrequency.daily, LoyaltyRuleFrequency.weekly, LoyaltyRuleFrequency.monthly] },
  },


  [LoyaltyRuleType.connect_wallet]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },

  [LoyaltyRuleType.connected_email]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_twitter]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_discord]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_telegram]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_github]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_youtube]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_reddit]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_instagram]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_steam]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_epic]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
  [LoyaltyRuleType.connected_tiktok]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },

  [LoyaltyRuleType.drip_x_tweet]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },

  [LoyaltyRuleType.drip_x_new_tweet]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },

  // Follow an X Account
  [LoyaltyRuleType.drip_x_follow]: socialQuestOnceConfig,
  // Add Text to X Bio
  [LoyaltyRuleType.drip_x_text_in_bio]: socialQuestOnceConfig,
  // Comment on an X Post with Text
  [LoyaltyRuleType.drip_x_text_in_comment]: socialQuestOnceConfig,
  // Add Text to X Username
  [LoyaltyRuleType.drip_x_text_in_name]: socialQuestOnceConfig,
  // Reach X Followers
  [LoyaltyRuleType.twitter_followers]: socialQuestOnceConfig,
  // Get X post impressions
  [LoyaltyRuleType.post_impressions]: socialQuestOnceConfig,
  // Get Discord Role
  [LoyaltyRuleType.discord_member]: socialQuestOnceConfig,
  // Join Discord Server
  [LoyaltyRuleType.discord_join]: socialQuestOnceConfig,
  // Send Discord Messages
  [LoyaltyRuleType.DiscordMessages]: socialQuestOnceConfig,
  // Grant a Discord Role
  [LoyaltyRuleType.discord_role_grant]: socialQuestOnceConfig,
  // Join Telegram Group
  [LoyaltyRuleType.telegram_join]: socialQuestOnceConfig,
  // Send Telegram Messages
  [LoyaltyRuleType.telegram_messages]: socialQuestOnceConfig,
  // Follow a TikTok Account
  [LoyaltyRuleType.tiktok_follow]: socialQuestOnceConfig,
  // Post on TikTok
  [LoyaltyRuleType.tiktok_post]: socialQuestOnceConfig,
  // Post on Instagram
  [LoyaltyRuleType.instagram_post]: socialQuestOnceConfig,
  // Star a GitHub Repository
  [LoyaltyRuleType.github_repo_star]: socialQuestOnceConfig,
  // Fork a GitHub Repository
  [LoyaltyRuleType.github_repo_fork]: socialQuestOnceConfig,
  // Become a GitHub Repository Collaborator
  [LoyaltyRuleType.github_repo_collaborator]: socialQuestOnceConfig,
  // Merge a GitHub PR
  [LoyaltyRuleType.github_merge_PR]: socialQuestOnceConfig,
  // Subscribe to a YouTube Channel
  [LoyaltyRuleType.youtube_subscribers]: socialQuestOnceConfig,
  // Comment on a YouTube Video
  [LoyaltyRuleType.youtube_comment]: socialQuestOnceConfig,
  // Comment on a Reddit Post
  [LoyaltyRuleType.reddit_comment]: socialQuestOnceConfig,
  // Add an Item to Steam Wishlist
  [LoyaltyRuleType.steam_wishlist]: socialQuestOnceConfig,

  // Mint an NFT
  [LoyaltyRuleType.MintOn]: tokenActivityConfig,
  // Purchase an NFT
  [LoyaltyRuleType.BoughtOn]: tokenActivityConfig,
  // Hold an NFT
  [LoyaltyRuleType.TokenHold]: tokenActivityConfig,
  // Sell an NFT
  [LoyaltyRuleType.SoldOn]: tokenActivityConfig,
  // Hold a Fungible Token
  [LoyaltyRuleType.token_hold_erc20]: tokenActivityConfig,

  // Submit Text Input
  [LoyaltyRuleType.text_input]: socialQuestOnceConfig,
  // Enter a Code
  [LoyaltyRuleType.code_entry]: socialQuestOnceConfig,
  // Click a Link
  [LoyaltyRuleType.link_click]: socialQuestOnceConfig,
  // Answer a Quiz
  [LoyaltyRuleType.quiz]: socialQuestOnceConfig,
  // Answer a Poll
  [LoyaltyRuleType.poll]: socialQuestOnceConfig,
  // Spend in Shopify Store
  [LoyaltyRuleType.shopify_spend]: socialQuestOnceConfig,
  // Participate in Governance Vote
  [LoyaltyRuleType.snapshot_governance]: socialQuestOnceConfig,
  // Create a Partner Account
  [LoyaltyRuleType.create_partner_account]: socialQuestOnceConfig,
  // External rule
  [LoyaltyRuleType.external_rule]: {
    claimTypeOptions: [LoyaltyRuleClaimType.manual, LoyaltyRuleClaimType.auto],
    rewardLifetimeOptions: [LoyaltyRuleRewardLifetime.permanent, LoyaltyRuleRewardLifetime.dynamic],
    interval: {
      default: LoyaltyRuleInterval.once,
      options: [
        { option: 'once', frequency: LoyaltyRuleFrequency.immediately },
      ],
    },
    frequency: { default: LoyaltyRuleFrequency.immediately, options: [LoyaltyRuleFrequency.immediately] },
  },
}
