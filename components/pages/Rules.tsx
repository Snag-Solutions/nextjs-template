'use client'

import { Button } from '@/components/ui/Button'
import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'
import { claimLoyaltyRule } from '@/lib/actions/claimLoyaltyRule'
import {
  getLoyaltyRuleProgress,
  LoyaltyRuleProgressResponse,
} from '@/lib/actions/getLoyaltyRuleProgress'
import {
  getLoyaltyRules,
  RuleListResponseFull,
} from '@/lib/actions/getLoyaltyRules'
import { getLoyaltyTransactionEntries } from '@/lib/actions/getLoyaltyTransactionEntries'
import { getLoyaltyRuleProcessingStatus } from '@/lib/actions/getLoyaltyRuleProcessingStatus'
import { RuleGetStatusResponse } from '@snagsolutions/sdk/resources/loyalty/rules'
import { useAuthAccount } from '@/lib/useAuthAccount'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'

const LIMIT = 10
const POLLING_INTERVAL = 5000 // 5 seconds

const ClaimableRuleTypes = [
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
  'TokenHold', // ONLY for multipler and EVM chains
]

type TransactionEntry = TransactionGetTransactionEntriesResponse['data'][number]

export const Rules = () => {
  const {
    userId,
    isAuthenticated,
    isLoading: isSessionLoading,
  } = useAuthAccount()
  const [rules, setRules] = useState<RuleListResponseFull['data']>([])
  const [lastId, setLastId] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [latestRuleTransactions, setLatestRuleTransactions] = useState<
    Record<string, TransactionEntry>
  >({})
  const [processingRules, setProcessingRules] = useState<
    Record<string, RuleGetStatusResponse['data'][number]>
  >({})
  const [pollingTimeoutId, setPollingTimeoutId] =
    useState<NodeJS.Timeout | null>(null)

  const [rulesInProgress, setRulesInProgress] = useState<
    Record<string, NonNullable<LoyaltyRuleProgressResponse['data']>[0]>
  >({})

  const loadRulesInProgress = async (ruleIds: string[]) => {
    if (!isAuthenticated || !userId) return
    const data = await getLoyaltyRuleProgress({
      userId,
      limit: LIMIT,
      loyaltyRuleId: ruleIds,
    })

    const newRulesInProgress = { ...rulesInProgress }

    data.data.forEach((rule) => {
      newRulesInProgress[rule.loyaltyRuleId] = rule
    })

    setRulesInProgress(newRulesInProgress)
  }

  const loadTransactionEntries = async (ruleIds: string[]) => {
    if (!isAuthenticated || !userId || !ruleIds?.length) return

    const entries = await getLoyaltyTransactionEntries({
      userId,
      userCompletedLoyaltyRuleId: ruleIds,
      limit: LIMIT,
    })

    // Update transactions map
    const newTransactions = { ...latestRuleTransactions }
    entries.data.forEach((entry) => {
      const ruleId = entry.loyaltyTransaction?.loyaltyRule?.id
      if (ruleId) {
        newTransactions[ruleId] = entry
      }
    })
    setLatestRuleTransactions(newTransactions)
  }

  const checkProcessingStatus = useCallback(async () => {
    if (!isAuthenticated || !userId) return

    try {
      const status = await getLoyaltyRuleProcessingStatus({
        userId,
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
        websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
      })

      const newProcessingRules = { ...processingRules }
      let hasPendingRules = false

      status.data.forEach((statusData) => {
        newProcessingRules[statusData.loyaltyRuleId] = statusData
        if (
          statusData.status === 'pending' ||
          statusData.status === 'processing'
        ) {
          hasPendingRules = true
        }
      })

      setProcessingRules(newProcessingRules)

      // If there are still pending rules, continue polling
      if (hasPendingRules) {
        const timeoutId = setTimeout(() => {
          checkProcessingStatus()
        }, POLLING_INTERVAL)
        setPollingTimeoutId(timeoutId)
      }
    } catch (error) {
      console.error('Failed to check processing status:', error)
    }
  }, [isAuthenticated, userId, rules])

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingTimeoutId) {
        clearTimeout(pollingTimeoutId)
      }
    }
  }, [pollingTimeoutId])

  const loadRules = async (startingAfter?: string) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const data = await getLoyaltyRules({ limit: LIMIT, startingAfter })
      if (data?.data) {
        // Load transaction entries for the current page of rules
        const ruleIds = data.data.map((rule) => rule.id)
        await Promise.all([
          loadTransactionEntries(ruleIds),
          loadRulesInProgress(ruleIds),
          checkProcessingStatus(),
        ])

        if (startingAfter) {
          setRules((prev) => [...prev, ...data.data])
        } else {
          setRules(data.data)
        }
        setLastId(data.data[data.data.length - 1]?.id || null)
        setHasMore(data.hasNextPage)
      }
    } catch (error) {
      console.error('Failed to load rules:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load rules when auth status changes
  useEffect(() => {
    if (isSessionLoading) return
    setIsInitialLoad(true)
    loadRules().finally(() => {
      setIsInitialLoad(false)
    })
  }, [isAuthenticated, userId, isSessionLoading])

  if (isSessionLoading) {
    return <div>Checking Auth Session...</div>
  }

  if (isInitialLoad) {
    return <div>Loading Rules and User Progress...</div>
  }

  const isLoyaltyProgramConfigured = rules?.length > 0

  if (!isLoyaltyProgramConfigured) {
    return (
      <div className="flex flex-col gap-4 w-full items-start justify-start">
        <Header as="h1">Rules</Header>
        <Header as="h4">No rules found in your loyalty program.</Header>
        <Header as="p">
          You have to prepare your loyalty program first. Please go to{' '}
          <Link href="https://admin.snag-solutions.io" target="_blank">
            <b>Snag Admin</b>
          </Link>{' '}
          and create a loyalty currency first. Then you can run the script to
          create the example rules set.
        </Header>
        <Code data={`pnpm create:rules`} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full items-start justify-start">
      <div className="flex flex-col gap-4 w-full items-start justify-start">
        <Header as="h1">Rules</Header>
        <Code data={rules} />
      </div>
      <hr className="border-accent" />
      <Header as="h3">List of rules</Header>
      <div className="flex flex-col gap-4 w-full items-start justify-center">
        {rules.map((rule, ruleIndex) => {
          const transaction = latestRuleTransactions[rule.id]
          const isCompleted = !!transaction
          const progress = rulesInProgress[rule.id]
          const processingStatus = processingRules[rule.id]
          const isProcessing = processingStatus?.status === 'pending'
          const isClaimable =
            ClaimableRuleTypes.includes(rule.type) && rule.type === 'TokenHold'
              ? rule.rewardType === 'multiplier'
              : true

          return (
            <div
              key={rule?.id}
              className="flex flex-row gap-2 items-center justify-between bg-accent p-4 rounded-xl w-full"
            >
              <div className="flex flex-col gap-2">
                <Header as="h5">{rule?.name}</Header>
                <Header className="break-all" as="p">
                  {rule?.description}
                </Header>
                Rule Id: {rule.id}
                {isCompleted && (
                  <div
                    title={JSON.stringify(transaction, null, 2)}
                    className={`relative`}
                  >
                    <div className="text-sm text-green-500">
                      Completed at{' '}
                      {new Date(transaction.createdAt).toLocaleString()}
                      <br />
                      Reward: {transaction.amount}
                    </div>
                  </div>
                )}
                {processingStatus && (
                  <div
                    className={`text-sm ${
                      processingStatus.status === 'pending'
                        ? 'text-yellow-500'
                        : processingStatus.status === 'completed'
                          ? 'text-green-500'
                          : 'text-red-500'
                    }`}
                  >
                    Processing Status: {processingStatus.status}
                    <br />
                    {processingStatus.message &&
                      `Processing Message: ${processingStatus.message}`}
                  </div>
                )}
                {!!progress && (
                  <div className="text-sm text-gray-500">
                    {progress.progress}%
                  </div>
                )}
                {rule.startTime && (
                  <div className="text-sm text-gray-500">
                    Started at {new Date(rule.startTime).toLocaleString()}
                  </div>
                )}
                {rule.endTime && (
                  <div className="text-sm text-red-500">
                    Expires at {new Date(rule.endTime).toLocaleString()}
                  </div>
                )}
              </div>
              {isClaimable && !isCompleted && !isProcessing && (
                <Button
                  onClick={async () => {
                    if (!isAuthenticated || !userId) return null
                    const message = await claimLoyaltyRule(rule?.id, {
                      userId,
                    })

                    // alert(message)
                    checkProcessingStatus()
                  }}
                  disabled={!isAuthenticated || !userId}
                >
                  Claim
                </Button>
              )}
            </div>
          )
        })}
        {hasMore && (
          <div className="w-full flex justify-center mt-4">
            <Button
              onClick={() => loadRules(lastId || undefined)}
              disabled={isLoading}
              className="w-full max-w-xs"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
