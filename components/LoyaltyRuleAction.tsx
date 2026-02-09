import { RuleListResponseFull } from '@/lib/actions/getLoyaltyRules'
import {
  DiscordRuleTypes,
  EpicRuleTypes,
  SteamRuleTypes,
  TelegramRuleTypes,
  TwitterRuleTypes,
  ClaimableRuleTypes,
  TiktokRuleTypes,
  RedditRuleTypes,
} from '@/lib/loyalty'
import { UserListResponse } from '@snagsolutions/sdk/resources/users/index'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { Button } from './ui/Button'
import { claimLoyaltyRule } from '@/lib/actions/claimLoyaltyRule'
import { connectUserSocialAuth } from '@/lib/actions/connectUserSocialAuth'
import { LoyaltyMultiplier } from '@/lib/actions/getLoyaltyMultipliers'
import { RuleGetStatusResponse } from '@snagsolutions/sdk/resources/loyalty/rules.mjs'
import {
  tiktokConnect,
  redditConnect
} from '@/lib/custom-auth'
export const LoyaltyRuleAction = ({
  user,
  rule,
  latestTransaction,
  loyaltyMultiplier,
  processingStatus,
  onClaim,
}: {
  user: UserListResponse['data'][number]
  rule: RuleListResponseFull['data'][number]
  latestTransaction?: TransactionGetTransactionEntriesResponse.Data
  loyaltyMultiplier?: LoyaltyMultiplier
  processingStatus?: RuleGetStatusResponse['data'][number]
  onClaim?: ({ message }: { message: string }) => void
}) => {
  const isTwitterRule = TwitterRuleTypes.includes(rule.type)
  const isDiscordRule = DiscordRuleTypes.includes(rule.type)
  const isTelegramRule = TelegramRuleTypes.includes(rule.type)
  const isSteamRule = SteamRuleTypes.includes(rule.type)
  const isEpicRule = EpicRuleTypes.includes(rule.type)
  const isTiktokRule = TiktokRuleTypes.includes(rule.type)
  const isRedditRule = RedditRuleTypes.includes(rule.type)

  const isCustomFlow = isTiktokRule || isRedditRule

  const connectSocial = async (
    authType: 'twitter' | 'discord' | 'telegram' | 'epic' | 'steam' | 'tiktok' | 'reddit'
  ) => {
    
    const resp = await connectUserSocialAuth(authType, {
      userId: user.id,
      responseType: 'json',
      redirect: window.location.href,
    })

    if (!isCustomFlow){
      window.location.href = resp.url
    }

    if (authType === 'tiktok') {
      const state = (resp as { state?: string }).state
      if (!state || typeof state !== 'string') {
        throw new Error('TikTok auth state not returned')
      }
      await tiktokConnect(state)
    }

    if (authType === 'reddit') {
      const state = (resp as { state?: string }).state
      if (!state || typeof state !== 'string') {
        throw new Error('Reddit auth state not returned')
      }
      await redditConnect(state)
    }

  }

  if (isTwitterRule && !user.userMetadata?.[0]?.twitterUser) {
    return (
      <Button onClick={() => connectSocial('twitter')}>Connect Twitter</Button>
    )
  }

  if (isDiscordRule && !user.userMetadata?.[0]?.discordUser) {
    return (
      <Button onClick={() => connectSocial('discord')}>Connect Discord</Button>
    )
  }

  if (isTelegramRule && !user.userMetadata?.[0]?.telegramUserId) {
    return (
      <Button onClick={() => connectSocial('telegram')}>
        Connect Telegram
      </Button>
    )
  }

  if (isSteamRule && !user.userMetadata?.[0]?.steamUserId) {
    return <Button onClick={() => connectSocial('steam')}>Connect Steam</Button>
  }

  if (isEpicRule && !user.userMetadata?.[0]?.epicAccountIdentifier) {
    return <Button onClick={() => connectSocial('epic')}>Connect Epic</Button>
  }

  if (isTiktokRule && !user.userMetadata?.[0]?.tiktokUserId) {
    return <Button onClick={() => connectSocial('tiktok')}>Connect Tiktok</Button>
  }

  if (isRedditRule && !user.userMetadata?.[0]?.redditUserId) {
    return <Button onClick={() => connectSocial('reddit')}>Connect Reddit</Button>
  }

  const isCompleted = !!latestTransaction || !!loyaltyMultiplier
  const isClaimable =
    ClaimableRuleTypes.includes(rule.type) && rule.type === 'TokenHold'
      ? rule.rewardType === 'multiplier'
      : true

  const isProcessing =
    processingStatus?.status === 'pending' ||
    processingStatus?.status === 'processing'

  // TODO: Categories based on rule type and open up input forms depending on each rule type
  // e.g for twitter comment on any post we need to as for comment link
  // e.g for quiz and poll rule we need to to show the questions and answers and then submit the answer to the complete endpoint

  if (isClaimable && !isCompleted) {
    return (
      <Button
        onClick={async () => {
          const message = await claimLoyaltyRule(rule?.id, {
            userId: user.id,
          })
          onClaim?.({ message })
        }}
      >
        {isProcessing ? `${processingStatus?.status}...` : 'Claim'}
      </Button>
    )
  }
}
