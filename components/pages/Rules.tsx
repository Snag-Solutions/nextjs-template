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

import { RuleCreateResponse } from '@snagsolutions/sdk/resources/loyalty/rules'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import {
  getLoyaltyMultipliers,
  LoyaltyMultiplier,
} from '@/lib/actions/getLoyaltyMultipliers'
import { UserListResponse } from '@snagsolutions/sdk/resources/users/index'
import { getProfileDetails } from '@/lib/actions/getProfileDetails'
import { ClaimableRuleTypes } from '@/lib/loyalty'
import { LoyaltyRuleAction } from '../LoyaltyRuleAction'

const LIMIT = 10
const POLLING_INTERVAL = 5000 // 5 seconds

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

  const [multipliers, setMultipliers] = useState<LoyaltyMultiplier[]>([])

  const [profile, setProfile] = useState<UserListResponse['data']>([])

  const getProfile = async () => {
    if (!isAuthenticated || !userId) return
    const profile = await getProfileDetails({ userId })
    setProfile(profile.data)
  }

  // MULTIPLIERS
  const getUserFinalMultipliers = (multipliers: LoyaltyMultiplier[]) => {
    const uniqueMultipliers: Record<string, LoyaltyMultiplier> = {}

    for (const multiplier of multipliers) {
      const multiplierIdf = multiplier.loyaltyRuleId ?? multiplier.id
      if (!uniqueMultipliers[multiplierIdf]) {
        uniqueMultipliers[multiplierIdf] = multiplier
      } else {
        if (
          Number(multiplier.multiplier) >
          Number(uniqueMultipliers[multiplierIdf].multiplier)
        ) {
          uniqueMultipliers[multiplierIdf] = multiplier
        }
      }
    }

    const finalMultipliers = Object.values(uniqueMultipliers)
    return finalMultipliers
  }

  const calcUserTotalMultiplier = () => {
    const toalMultipler =
      multipliers.reduce((acc, curr) => {
        return acc + Number(curr.multiplier || 0)
      }, 0) -
      (multipliers.length - 1)

    return toalMultipler.toFixed(2)
  }

  const getMultipliers = async () => {
    if (!isAuthenticated || !userId) return

    // THIS is only required if multiple wallet profiles is enabled in the loyalty program
    // otherwise this can be ignored
    const userGroupId =
      profile?.[0]?.userMetadata?.[0]?.userGroupId ?? undefined

    // if user has a group id, use it to get the multipliers and do not pass the userId
    // this is only required if user group is required
    const multipliers = await getLoyaltyMultipliers({
      ...(!!userGroupId ? {} : { userId }),
      ...(!!userGroupId && { userGroupId }),
      limit: 1000, // using large limit to get all multipliers for now
    })
    setMultipliers(getUserFinalMultipliers(multipliers.data))
  }
  // MULTIPLIERS

  // IN PROGRESS RULES
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
  // IN PROGRESS RULES

  // COMPLETED RULES
  const loadTransactionEntries = async (ruleIds: string[]) => {
    if (!isAuthenticated || !userId || !ruleIds?.length) return

    const userGroupId =
      profile?.[0]?.userMetadata?.[0]?.userGroupId ?? undefined

    const entries = await getLoyaltyTransactionEntries({
      ...(!!userGroupId ? { userGroupId } : { userId }),
      userCompletedLoyaltyRuleId: ruleIds,
      limit: ruleIds.length,
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
  // COMPLETED RULES

  // PROCESSING/ENQUEUED RULES
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
      } else {
        const ruleIds = status.data.map((s) => s.loyaltyRuleId)
        !!ruleIds?.length && loadTransactionEntries(ruleIds)
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
  // PROCESSING/ENQUEUED RULES

  // LOAD RULES
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
  // LOAD RULES

  // Load rules when auth status changes
  useEffect(() => {
    if (isSessionLoading) return
    setIsInitialLoad(true)
    loadRules().finally(() => {
      setIsInitialLoad(false)
    })

    getProfile()
  }, [isAuthenticated, userId, isSessionLoading])

  useEffect(() => {
    if (!!profile?.length) {
      getMultipliers()

      // This is added here to re load transactions against the user group
      // if user is attached to a group.
      loadTransactionEntries(rules.map((r) => r.id))
    }
  }, [profile])

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
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 flex-1 items-start justify-start">
          <Header as="h1">All Rules</Header>
          <Code data={rules} />
        </div>
        <div className="flex flex-col gap-4 flex-1 items-start justify-start">
          <Header as="h1">Multipliers of User</Header>
          <Code data={multipliers} />
        </div>
      </div>
      <hr className="border-accent" />
      <div className="flex justify-between w-full">
        <Header as="h3">List of rules</Header>

        {multipliers?.length && (
          <div>
            <Header as="h3">
              Total Multipler of user: {calcUserTotalMultiplier()}
            </Header>
            <a
              className="text-sm text-gray-500 underline"
              target="_blank"
              href="https://docs.snagsolutions.io/loyalty/multipliers"
            >
              Docs here for how this number is calculated
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full items-start justify-center">
        {rules.map((rule, ruleIndex) => {
          const transaction = latestRuleTransactions[rule.id]
          const progress = rulesInProgress[rule.id]
          const processingStatus = processingRules[rule.id]

          const loyaltyMultiplier = multipliers.find(
            (m) => m.loyaltyRuleId === rule.id
          )

          const completedAt =
            transaction?.createdAt || loyaltyMultiplier?.createdAt

          const ruleMetadata = rule?.metadata as
            | RuleCreateResponse.Metadata
            | undefined

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
                {completedAt && (
                  <div
                    title={JSON.stringify(transaction, null, 2)}
                    className={`relative`}
                  >
                    <div className="text-sm text-green-500">
                      Completed at {new Date(completedAt).toLocaleString()}
                      <br />
                      {!!transaction
                        ? `Last Reward Amount: ${transaction.amount}`
                        : !!loyaltyMultiplier
                          ? `Rewarded Multiplier: ${loyaltyMultiplier.multiplier}`
                          : ''}
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

              {!!ruleMetadata?.cta?.href && (
                <a
                  href={ruleMetadata?.cta?.href}
                  target="_blank"
                  className="text-sm text-blue-500 underline"
                >
                  {ruleMetadata?.cta?.label ?? ruleMetadata?.cta.href}
                </a>
              )}

              {!!profile?.[0] && (
                <LoyaltyRuleAction
                  user={profile?.[0]}
                  rule={rule}
                  latestTransaction={transaction}
                  loyaltyMultiplier={loyaltyMultiplier}
                  processingStatus={processingStatus}
                  onClaim={({ message }) => {
                    alert(message)
                    checkProcessingStatus()
                  }}
                />
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
