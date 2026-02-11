'use client'

import type { ComponentType } from 'react'
import type { RuleSpecificFieldProps } from './types'
import { LoyaltyRuleType } from '@/lib/rule-options'
import { DefaultRuleFields } from './DefaultRuleFields'

import { CheckInFields } from './CheckInFields'
import { ReferredUserFields } from './ReferredUserFields'
import { ProfileCompletedFields } from './ProfileCompletedFields'
import { ConnectWalletFields } from './ConnectWalletFields'
import { XTweetFields } from './XTweetFields'
import { XNewTweetFields } from './XNewTweetFields'
import { XFollowFields } from './XFollowFields'
import { XTextInBioFields } from './XTextInBioFields'
import { XTextInCommentFields } from './XTextInCommentFields'
import { XTextInNameFields } from './XTextInNameFields'
import { TwitterFollowersFields } from './TwitterFollowersFields'
import { PostImpressionsFields } from './PostImpressionsFields'
import { ConnectedDiscordFields } from './ConnectedDiscordFields'
import { DiscordMemberFields } from './DiscordMemberFields'
import { DiscordJoinFields } from './DiscordJoinFields'
import { DiscordMessagesFields } from './DiscordMessagesFields'
import { DiscordRoleGrantFields } from './DiscordRoleGrantFields'
import { TelegramJoinFields } from './TelegramJoinFields'
import { TelegramMessagesFields } from './TelegramMessagesFields'
import { TiktokFollowFields } from './TiktokFollowFields'
import { TiktokPostFields } from './TiktokPostFields'
import { InstagramPostFields } from './InstagramPostFields'
import { GithubRepoStarFields } from './GithubRepoStarFields'
import { GithubRepoForkFields } from './GithubRepoForkFields'
import { GithubRepoCollaboratorFields } from './GithubRepoCollaboratorFields'
import { GithubMergePRFields } from './GithubMergePRFields'
import { YoutubeSubscribersFields } from './YoutubeSubscribersFields'
import { YoutubeCommentFields } from './YoutubeCommentFields'
import { RedditCommentFields } from './RedditCommentFields'
import { SteamWishlistFields } from './SteamWishlistFields'
import { MintNftFields } from './MintNftFields'
import { PurchaseNftFields } from './PurchaseNftFields'
import { HoldNftFields } from './HoldNftFields'
import { SellNftFields } from './SellNftFields'
import { HoldFungibleTokenFields } from './HoldFungibleTokenFields'
import { TextInputFields } from './TextInputFields'
import { CodeEntryFields } from './CodeEntryFields'
import { LinkClickFields } from './LinkClickFields'
import { QuizFields } from './QuizFields'
import { PollFields } from './PollFields'
import { ShopifySpendFields } from './ShopifySpendFields'
import { SnapshotGovernanceFields } from './SnapshotGovernanceFields'
import { CreatePartnerAccountFields } from './CreatePartnerAccountFields'
import { ExternalRuleFields } from './ExternalRuleFields'

export type { RuleFormValues, RuleSpecificFieldProps } from './types'
export { BasicDetailsSection } from './BasicDetailsSection'
export { DefaultRuleFields } from './DefaultRuleFields'
export { CheckInFields } from './CheckInFields'
export { ReferredUserFields } from './ReferredUserFields'
export { ProfileCompletedFields } from './ProfileCompletedFields'
export { ConnectWalletFields } from './ConnectWalletFields'
export { XTweetFields } from './XTweetFields'
export { XNewTweetFields } from './XNewTweetFields'
export { XFollowFields } from './XFollowFields'
export { XTextInBioFields } from './XTextInBioFields'
export { XTextInCommentFields } from './XTextInCommentFields'
export { XTextInNameFields } from './XTextInNameFields'
export { TwitterFollowersFields } from './TwitterFollowersFields'
export { PostImpressionsFields } from './PostImpressionsFields'
export { ConnectedDiscordFields } from './ConnectedDiscordFields'
export { DiscordMemberFields } from './DiscordMemberFields'
export { DiscordJoinFields } from './DiscordJoinFields'
export { DiscordMessagesFields } from './DiscordMessagesFields'
export { DiscordRoleGrantFields } from './DiscordRoleGrantFields'
export { TelegramJoinFields } from './TelegramJoinFields'
export { TelegramMessagesFields } from './TelegramMessagesFields'
export { TiktokFollowFields } from './TiktokFollowFields'
export { TiktokPostFields } from './TiktokPostFields'
export { InstagramPostFields } from './InstagramPostFields'
export { GithubRepoStarFields } from './GithubRepoStarFields'
export { GithubRepoForkFields } from './GithubRepoForkFields'
export { GithubRepoCollaboratorFields } from './GithubRepoCollaboratorFields'
export { GithubMergePRFields } from './GithubMergePRFields'
export { YoutubeSubscribersFields } from './YoutubeSubscribersFields'
export { YoutubeCommentFields } from './YoutubeCommentFields'
export { RedditCommentFields } from './RedditCommentFields'
export { SteamWishlistFields } from './SteamWishlistFields'
export { MintNftFields } from './MintNftFields'
export { PurchaseNftFields } from './PurchaseNftFields'
export { HoldNftFields } from './HoldNftFields'
export { SellNftFields } from './SellNftFields'
export { HoldFungibleTokenFields } from './HoldFungibleTokenFields'
export { TextInputFields } from './TextInputFields'
export { CodeEntryFields } from './CodeEntryFields'
export { LinkClickFields } from './LinkClickFields'
export { QuizFields } from './QuizFields'
export { PollFields } from './PollFields'
export { ShopifySpendFields } from './ShopifySpendFields'
export { SnapshotGovernanceFields } from './SnapshotGovernanceFields'
export { CreatePartnerAccountFields } from './CreatePartnerAccountFields'
export { ExternalRuleFields } from './ExternalRuleFields'

type RuleSpecificComponent = ComponentType<RuleSpecificFieldProps>

/** Registry: rule type -> component for rule-based extra fields */
const registry: Record<string, RuleSpecificComponent> = {
  [LoyaltyRuleType.check_in]: CheckInFields,
  [LoyaltyRuleType.referred_user]: ReferredUserFields,
  [LoyaltyRuleType.profile_completed]: ProfileCompletedFields,
  [LoyaltyRuleType.connect_wallet]: ConnectWalletFields,
  [LoyaltyRuleType.drip_x_tweet]: XTweetFields,
  [LoyaltyRuleType.drip_x_new_tweet]: XNewTweetFields,
  [LoyaltyRuleType.connected_discord]: ConnectedDiscordFields,
  [LoyaltyRuleType.drip_x_follow]: XFollowFields,
  [LoyaltyRuleType.drip_x_text_in_bio]: XTextInBioFields,
  [LoyaltyRuleType.drip_x_text_in_comment]: XTextInCommentFields,
  [LoyaltyRuleType.drip_x_text_in_name]: XTextInNameFields,
  [LoyaltyRuleType.twitter_followers]: TwitterFollowersFields,
  [LoyaltyRuleType.post_impressions]: PostImpressionsFields,
  [LoyaltyRuleType.discord_member]: DiscordMemberFields,
  [LoyaltyRuleType.discord_join]: DiscordJoinFields,
  [LoyaltyRuleType.DiscordMessages]: DiscordMessagesFields,
  [LoyaltyRuleType.discord_role_grant]: DiscordRoleGrantFields,
  [LoyaltyRuleType.telegram_join]: TelegramJoinFields,
  [LoyaltyRuleType.telegram_messages]: TelegramMessagesFields,
  [LoyaltyRuleType.tiktok_follow]: TiktokFollowFields,
  [LoyaltyRuleType.tiktok_post]: TiktokPostFields,
  [LoyaltyRuleType.instagram_post]: InstagramPostFields,
  [LoyaltyRuleType.github_repo_star]: GithubRepoStarFields,
  [LoyaltyRuleType.github_repo_fork]: GithubRepoForkFields,
  [LoyaltyRuleType.github_repo_collaborator]: GithubRepoCollaboratorFields,
  [LoyaltyRuleType.github_merge_PR]: GithubMergePRFields,
  [LoyaltyRuleType.youtube_subscribers]: YoutubeSubscribersFields,
  [LoyaltyRuleType.youtube_comment]: YoutubeCommentFields,
  [LoyaltyRuleType.reddit_comment]: RedditCommentFields,
  [LoyaltyRuleType.steam_wishlist]: SteamWishlistFields,
  [LoyaltyRuleType.MintOn]: MintNftFields,
  [LoyaltyRuleType.BoughtOn]: PurchaseNftFields,
  [LoyaltyRuleType.TokenHold]: HoldNftFields,
  [LoyaltyRuleType.SoldOn]: SellNftFields,
  [LoyaltyRuleType.token_hold_erc20]: HoldFungibleTokenFields,
  [LoyaltyRuleType.text_input]: TextInputFields,
  [LoyaltyRuleType.code_entry]: CodeEntryFields,
  [LoyaltyRuleType.link_click]: LinkClickFields,
  [LoyaltyRuleType.quiz]: QuizFields,
  [LoyaltyRuleType.poll]: PollFields,
  [LoyaltyRuleType.shopify_spend]: ShopifySpendFields,
  [LoyaltyRuleType.snapshot_governance]: SnapshotGovernanceFields,
  [LoyaltyRuleType.create_partner_account]: CreatePartnerAccountFields,
  [LoyaltyRuleType.external_rule]: ExternalRuleFields,
}

export function getRuleSpecificFieldsComponent(
  ruleType: string
): RuleSpecificComponent {
  return registry[ruleType] ?? DefaultRuleFields
}
