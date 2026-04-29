import { RuleListResponseFull } from '@/lib/actions/getLoyaltyRules'
import {
  AuthType,
  DiscordRuleTypes,
  EpicRuleTypes,
  SteamRuleTypes,
  TelegramRuleTypes,
  TwitterRuleTypes,
  ClaimableRuleTypes,
  TiktokRuleTypes,
  RedditRuleTypes,
  InstagramRuleTypes,
  GithubRuleTypes,
  YoutubeRuleTypes,
} from '@/lib/loyalty'
import { UserListResponse } from '@snagsolutions/sdk/resources/users/index'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { Button } from './ui/Button'
import { claimLoyaltyRule } from '@/lib/actions/claimLoyaltyRule'
import { connectUserSocialAuth } from '@/lib/actions/connectUserSocialAuth'
import { LoyaltyMultiplier } from '@/lib/actions/getLoyaltyMultipliers'
import {
  RuleCompleteParams,
  RuleGetStatusResponse,
} from '@snagsolutions/sdk/resources/loyalty/rules'
import { getCodeFromState, completeConnectWithProfileUrl } from '@/lib/authVerify'
import { ConnectVerifyModal } from '@/components/ConnectVerifyModal'
import { useEffect, useMemo, useState } from 'react'
import {
  getRuleCompleteFieldSpecs,
  ruleUsesQuizPollFlow,
  type RuleCompleteFieldSpec,
  type RuleCompleteInputKey,
} from '@/lib/loyaltyRuleCompleteFields'
import { getLoyaltyQuestionsForRule } from '@/lib/actions/getLoyaltyQuestionsForRule'
import { submitLoyaltyQuestionResponse } from '@/lib/actions/submitLoyaltyQuestionResponse'
import type { QuestionListResponse } from '@snagsolutions/sdk/resources/loyalty/questions'

type UserMeta = NonNullable<
  UserListResponse['data'][number]['userMetadata']
>[number] & {
  googleUserId?: string | null
}

function fieldsSatisfied(
  specs: RuleCompleteFieldSpec[],
  values: Partial<Record<RuleCompleteInputKey, string>>
): boolean {
  for (const s of specs) {
    const v = (values[s.key] ?? '').trim()
    if (s.required && !v) return false
    if (
      s.key === 'verificationCode' &&
      s.minLength &&
      v.length > 0 &&
      v.length < s.minLength
    ) {
      return false
    }
    if (s.key === 'rangeValue' && s.required) {
      const n = Number(v)
      if (v === '' || Number.isNaN(n)) return false
    }
  }
  return true
}

function toCompleteParams(
  userId: string,
  specs: RuleCompleteFieldSpec[],
  values: Partial<Record<RuleCompleteInputKey, string>>
): RuleCompleteParams {
  const params: RuleCompleteParams = { userId }
  for (const s of specs) {
    const v = (values[s.key] ?? '').trim()
    if (!v && !s.required) continue
    if (s.key === 'verificationCode') params.verificationCode = v
    if (s.key === 'contentUrl') params.contentUrl = v
    if (s.key === 'rangeValue') {
      const n = Number(v)
      if (!Number.isNaN(n)) params.rangeValue = n
    }
  }
  return params
}

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
  const isInstagramRule = InstagramRuleTypes.includes(rule.type)
  const isGithubRule = GithubRuleTypes.includes(rule.type)
  const isYoutubeRule = YoutubeRuleTypes.includes(rule.type)

  const isCustomFlow = isTiktokRule || isRedditRule || isInstagramRule

  const isCompleted = !!latestTransaction || !!loyaltyMultiplier
  const isClaimable =
    ClaimableRuleTypes.includes(rule.type) && rule.type === 'TokenHold'
      ? rule.rewardType === 'multiplier'
      : rule.type === 'external_rule' && !!rule.metadata?.trackProgress ? true : ClaimableRuleTypes.includes(rule.type)

  const isProcessing =
    processingStatus?.status === 'pending' ||
    processingStatus?.status === 'processing'

  const fieldSpecs = useMemo(
    () =>
      getRuleCompleteFieldSpecs(
        rule.type,
        rule.metadata as Record<string, unknown> | undefined
      ),
    [rule.type, rule.metadata]
  )

  const isQuizPoll = ruleUsesQuizPollFlow(rule.type)

  const [fieldValues, setFieldValues] = useState<
    Partial<Record<RuleCompleteInputKey, string>>
  >({})

  useEffect(() => {
    setFieldValues(
      Object.fromEntries(fieldSpecs.map((s) => [s.key, ''])) as Record<
        RuleCompleteInputKey,
        string
      >
    )
  }, [rule.id, fieldSpecs])

  const [questionLoading, setQuestionLoading] = useState(false)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [questionData, setQuestionData] = useState<
    QuestionListResponse['data'][number] | null
  >(null)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)

  useEffect(() => {
    if (!isQuizPoll || !isClaimable || isCompleted) return
    let cancelled = false
    ;(async () => {
      setQuestionLoading(true)
      setQuestionError(null)
      try {
        const res = await getLoyaltyQuestionsForRule(rule.id)
        if (cancelled) return
        const q = res.data?.[0]
        if (!q) {
          setQuestionError('No question configured for this rule.')
          setQuestionData(null)
        } else {
          setQuestionData(q)
          setSelectedChoiceId(null)
        }
      } catch (e) {
        if (!cancelled) {
          setQuestionError(
            e instanceof Error ? e.message : 'Failed to load question'
          )
        }
      } finally {
        if (!cancelled) setQuestionLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isQuizPoll, isClaimable, isCompleted, rule.id])

  const [verifyModal, setVerifyModal] = useState<{
    code: string
    authType: AuthType
    state: string
  } | null>(null)

  const connectSocial = async (authType: AuthType) => {
    const resp = await connectUserSocialAuth(authType, {
      userId: user.id,
      responseType: 'json',
      redirect: window.location.href,
    })

    if (!isCustomFlow) {
      window.location.href = resp.url
      return
    }

    const state = (resp as { state?: string }).state
    if (!state || typeof state !== 'string') {
      throw new Error('Auth state not returned')
    }
    const code = getCodeFromState(state)
    setVerifyModal({ code, authType, state })
  }

  const handleVerifySubmit = (profileUrl: string) => {
    if (!verifyModal) return
    completeConnectWithProfileUrl(verifyModal.state, verifyModal.authType, profileUrl)
    setVerifyModal(null)
  }

  const meta = user.userMetadata?.[0] as UserMeta | undefined
  const googleUserId = meta?.googleUserId

  const handleClaim = async () => {
    if (isQuizPoll) {
      if (!selectedChoiceId) {
        onClaim?.({ message: 'Select an answer first.' })
        return
      }
      const submitRes = await submitLoyaltyQuestionResponse({
        loyaltyQuestionChoiceId: selectedChoiceId,
        userId: user.id,
      })
      if (
        rule.type === 'quiz' &&
        !submitRes.isCorrect &&
        !submitRes.alreadySubmitted
      ) {
        onClaim?.({ message: 'Incorrect answer.' })
        return
      }
      const message = await claimLoyaltyRule(rule.id, {
        userId: user.id,
        loyaltyQuestionChoiceId: selectedChoiceId,
      })
      onClaim?.({ message })
      return
    }

    if (fieldSpecs.length > 0 && !fieldsSatisfied(fieldSpecs, fieldValues)) {
      onClaim?.({ message: 'Please fill in all required fields.' })
      return
    }

    const message = await claimLoyaltyRule(
      rule.id,
      toCompleteParams(user.id, fieldSpecs, fieldValues)
    )
    onClaim?.({ message })
  }

  const quizReady =
    !!questionData &&
    !questionLoading &&
    !questionError &&
    !!selectedChoiceId &&
    questionData.loyaltyQuestionChoices.length > 0

  const fieldsReady = fieldsSatisfied(fieldSpecs, fieldValues)

  const claimDisabled =
    isProcessing ||
    (isQuizPoll
      ? !quizReady
      : fieldSpecs.length > 0 && !fieldsReady)

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

  const verifyModalEl = verifyModal ? (
    <ConnectVerifyModal
      open
      code={verifyModal.code}
      authType={verifyModal.authType}
      onClose={() => setVerifyModal(null)}
      onSubmit={handleVerifySubmit}
    />
  ) : null

  if (isTiktokRule && !user.userMetadata?.[0]?.tiktokUserId) {
    return (
      <>
        <Button onClick={() => connectSocial('tiktok')}>Connect Tiktok</Button>
        {verifyModalEl}
      </>
    )
  }

  if (isRedditRule && !user.userMetadata?.[0]?.redditUserId) {
    return (
      <>
        <Button onClick={() => connectSocial('reddit')}>Connect Reddit</Button>
        {verifyModalEl}
      </>
    )
  }

  if (isInstagramRule && !user.userMetadata?.[0]?.instagramUser) {
    return (
      <>
        <Button onClick={() => connectSocial('instagram')}>Connect Instagram</Button>
        {verifyModalEl}
      </>
    )
  }

  if (isGithubRule && !user.userMetadata?.[0]?.githubUserId) {
    return <Button onClick={() => connectSocial('github')}>Connect Github</Button>
  }

  if (isYoutubeRule && !googleUserId) {
    return <Button onClick={() => connectSocial('google')}>Connect Google</Button>
  }

  if (isClaimable && !isCompleted) {
    return (
      <div className="flex flex-col gap-2 items-start w-full max-w-md">
        {fieldSpecs.map((spec) => (
          <label
            key={spec.key}
            className="flex flex-col gap-1 text-sm w-full text-gray-800"
          >
            <span>
              {spec.label}
              {spec.required ? ' *' : ''}
            </span>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 text-white w-full"
              placeholder={spec.placeholder}
              value={fieldValues[spec.key] ?? ''}
              onChange={(e) =>
                setFieldValues((prev) => ({ ...prev, [spec.key]: e.target.value }))
              }
            />
          </label>
        ))}
        {isQuizPoll && (
          <div className="flex flex-col gap-2 w-full">
            {questionLoading && (
              <p className="text-sm text-gray-600">Loading question…</p>
            )}
            {questionError && (
              <p className="text-sm text-red-600">{questionError}</p>
            )}
            {questionData && (
              <>
                <p className="text-sm font-medium text-white">
                  {questionData.text}
                </p>
                {[...questionData.loyaltyQuestionChoices]
                  .sort((a, b) => a.sortIdentifier - b.sortIdentifier)
                  .map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 text-sm cursor-pointer text-white"
                    >
                      <input
                        type="radio"
                        name={`loyalty-question-${rule.id}`}
                        checked={selectedChoiceId === c.id}
                        onChange={() => setSelectedChoiceId(c.id)}
                      />
                      {c.text}
                    </label>
                  ))}
              </>
            )}
          </div>
        )}
        <Button onClick={handleClaim} disabled={claimDisabled}>
          {isProcessing ? `${processingStatus?.status}...` : 'Claim'}
        </Button>
      </div>
    )
  }
}
