import { RuleListResponseFull } from '@/lib/actions/getLoyaltyRules'
import {
  DiscordRuleTypes,
  EpicRuleTypes,
  SteamRuleTypes,
  TelegramRuleTypes,
  TwitterRuleTypes,
  ClaimableRuleTypes,
} from '@/lib/loyalty'
import { UserListResponse } from '@snagsolutions/sdk/resources/users/index'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { Button } from './ui/Button'
import { claimLoyaltyRule } from '@/lib/actions/claimLoyaltyRule'
import { connectUserSocialAuth } from '@/lib/actions/connectUserSocialAuth'
import { LoyaltyMultiplier } from '@/lib/actions/getLoyaltyMultipliers'
import { RuleGetStatusResponse } from '@snagsolutions/sdk/resources/loyalty/rules.mjs'
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

  const connectSocial = async (
    authType: 'twitter' | 'discord' | 'telegram' | 'epic' | 'steam'
  ) => {
    const resp = await connectUserSocialAuth(authType, {
      userId: user.id,
      responseType: 'json',
      redirect: window.location.href,
    })

    window.location.href = resp.url
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
