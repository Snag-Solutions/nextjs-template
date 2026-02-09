import {
  LoyaltyRuleType,
  LoyaltyRuleClaimType,
  LoyaltyRuleRewardLifetime,
  LoyaltyRuleInterval,
  LoyaltyRuleFrequency,
  RuleOptionsMap
} from './rule-options-const'

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
}
