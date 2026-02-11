import { ultra } from "viem/chains"

export type AuthType = 'twitter' | 'discord' | 'telegram' | 'epic' | 'steam' | 'ultra' | 'google' | 'email' | 'tiktok' | 'reddit' | 'instagram' | 'github'

export const ClaimableRuleTypes = [
  'code_entry',
  'text_input',
  'link_click',
  'connect_wallet',
  'connected_steam',
  'connected_epic',
  'connected_email',
  'connected_telegram',
  'check_in',
  'external_rule',
  'drip_x_follow',
  'drip_x_new_tweet',
  'drip_x_text_in_bio',
  'drip_x_text_in_name',
  'drip_x_text_in_comment',
  'drip_x_tweet',
  'telegram_join',
  'telegram_messages',
  'DiscordMessages',
  'discord_member',
  'steam_wishlist',
  // 'post_impressions',
  // 'twitter_followers',
  // 'tiktok_follow',
  // 'tiktok_post',
  // 'instagram_post',
  // 'github_repo_star',
  // 'github_repo_fork',
  // 'github_repo_collaborator',
  // 'github_merge_PR',
  // 'youtube_subscribers',
  // 'youtube_comment',
  // 'reddit_comment',
  // 'BoughtOn',
  // 'SoldOn',
  // 'token_hold_erc20',
  // 'quiz',
  // 'poll',
  // 'shopify_spend',
  // 'snapshot_governance',
  // 'create_partner_account',
]

export const OtherRuleTypes = [
  'text_input',
  'code_entry',
  'link_click',
  'quiz',
  'poll',
  'shopify_spend',
  'snapshot_governance',
  'create_partner_account',
  'external_rule',
]

export const TokenActivityRuleTypes = [
  'TokenHold',
  'BoughtOn',
  'SoldOn',
  'MintOn',
  'token_hold_erc20',
]

export const TwitterRuleTypes = [
  'connected_twitter',
  'twitter_follow',
  'drip_x_follow',
  'drip_x_new_tweet',
  'drip_x_text_in_bio',
  'drip_x_text_in_name',
  'drip_x_text_in_comment',
  'drip_x_tweet',
  'tweet_liked_by_project',
  'twitter_comment',
  'twitter_follow',
  'twitter_followers',
  'post_impressions',
  'twitter_like',
  'twitter_post_hashtag',
]

export const DiscordRuleTypes = [
  'connected_discord',
  'discord_member',
  'discord_join',
  'DiscordMessages',
  'discord_role_grant',
]

export const TelegramRuleTypes = [
  'connected_telegram',
  'telegram_join',
  'telegram_messages',
]

export const SteamRuleTypes = ['connected_steam', 'steam_wishlist']

export const EpicRuleTypes = ['connected_epic']

export const TiktokRuleTypes = ['connected_tiktok', 'tiktok_follow', 'tiktok_post']

export const RedditRuleTypes = ['connected_reddit', 'reddit_comment']

export const InstagramRuleTypes = ['connected_instagram', 'instagram_post']

export const GithubRuleTypes = ['connected_github', 'github_repo_star', 'github_repo_fork', 'github_repo_collaborator', 'github_merge_PR']