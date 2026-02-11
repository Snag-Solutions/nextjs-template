'use client'

import { RuleSpecificFieldProps } from './types'

type ReferralRequirements = {
  achievePoints?: boolean
  points?: { amount?: number; loyaltyCurrecyId?: string }
  completeProfile?: boolean
  connectTwitter?: boolean
  connectDiscord?: boolean
  connectEmail?: boolean
  completeRuleEnabled?: boolean
  completeRuleId?: string
  achieveBadges?: boolean
  badgeIds?: string[]
}

function getReq(metadata: Record<string, unknown>): ReferralRequirements {
  const r = metadata.referralRequirements
  if (r && typeof r === 'object' && !Array.isArray(r)) return r as ReferralRequirements
  return {}
}

export function ReferredUserFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const req = getReq(metadata)

  const referrerReward = (metadata.referrerReward as number | undefined) ?? 0
  const referrerRewardLoyaltyCurrencyId = (metadata.referrerRewardLoyaltyCurrencyId as string) ?? ''
  const firstReferralReward = (metadata.firstReferralReward as number | undefined) ?? 10
  const secondReferralReward = (metadata.secondReferralReward as number | undefined) ?? 5

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const updateReq = (patch: Partial<ReferralRequirements>) =>
    updateMetadata({ referralRequirements: { ...req, ...patch } })

  const pointsAmount = req.points?.amount ?? 0
  const badgeIds = req.badgeIds ?? []
  const badgeIdsDisplay = badgeIds.join(', ')

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Referral rule options</h3>

      {/* Reward for each referral (referrer reward) */}
      <div className="flex flex-col gap-2 justify-between">
        <span className="text-sm font-medium">Reward for each referral</span>
        <p className="text-xs text-gray-500">
          X referred Y then X will get this amount as a reward.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500">Amount</span>
            <input
              type="number"
              min={0}
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={referrerReward}
              onChange={(e) =>
                updateMetadata({ referrerReward: parseFloat(e.target.value) || 0 })
              }
              placeholder="1000"
            />
          </label>
          <label className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500">Currency ID</span>
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={referrerRewardLoyaltyCurrencyId}
              onChange={(e) =>
                updateMetadata({ referrerRewardLoyaltyCurrencyId: e.target.value })
              }
              placeholder="Optional"
            />
          </label>
        </div>
      </div>

      {/* Direct / indirect referral reward share (%) */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 justify-between">
          <span className="text-sm font-medium">Direct referral reward share (%)</span>
          <p className="text-xs text-gray-500">
            X referred Y then X gets this % of daily earnings of Y.
          </p>
          <input
            type="number"
            min={0}
            step={0.01}
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={firstReferralReward}
            onChange={(e) =>
              updateMetadata({ firstReferralReward: parseFloat(e.target.value) || 0 })
            }
            placeholder="10"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Indirect referral reward share (%)</span>
          <p className="text-xs text-gray-500">
            X referred Y, Y referred Z → X gets this % of Z&apos;s daily earnings.
          </p>
          <input
            type="number"
            min={0}
            step={0.01}
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={secondReferralReward}
            onChange={(e) =>
              updateMetadata({ secondReferralReward: parseFloat(e.target.value) || 0 })
            }
            placeholder="5"
          />
        </label>
      </div>

      {/* Referrals count when (select all that apply) */}
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
        <p className="text-sm font-medium">Referrals count when (select all that apply)</p>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.achievePoints ?? false}
            onChange={(e) => updateReq({ achievePoints: e.target.checked })}
          />
          <span className="text-sm">Achieve points</span>
        </label>
        {req.achievePoints && (
          <label className="flex flex-col gap-0.5 ml-6 max-w-[200px]">
            <span className="text-xs text-gray-500">Points amount</span>
            <input
              type="number"
              min={0}
              className="rounded border border-gray-300 px-2 py-1"
              value={pointsAmount}
              onChange={(e) =>
                updateReq({
                  points: { ...req.points, amount: parseFloat(e.target.value) || 0 },
                })
              }
              placeholder="Enter amount"
            />
          </label>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.completeProfile ?? false}
            onChange={(e) => updateReq({ completeProfile: e.target.checked })}
          />
          <span className="text-sm">Complete profile details</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.connectTwitter ?? false}
            onChange={(e) => updateReq({ connectTwitter: e.target.checked })}
          />
          <span className="text-sm">Connect Twitter</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.connectDiscord ?? false}
            onChange={(e) => updateReq({ connectDiscord: e.target.checked })}
          />
          <span className="text-sm">Connect Discord</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.connectEmail ?? false}
            onChange={(e) => updateReq({ connectEmail: e.target.checked })}
          />
          <span className="text-sm">Connect Email</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.completeRuleEnabled ?? false}
            onChange={(e) => {
              const checked = e.target.checked
              updateReq({
                completeRuleEnabled: checked,
                ...(checked ? {} : { completeRuleId: undefined }),
              })
            }}
          />
          <span className="text-sm">Complete a rule</span>
        </label>
        {req.completeRuleEnabled && (
          <label className="flex flex-col gap-0.5 ml-6">
            <span className="text-xs text-gray-500">Rule ID</span>
            <input
              type="text"
              className="rounded border border-gray-300 px-2 py-1 max-w-[280px]"
              value={req.completeRuleId ?? ''}
              onChange={(e) => updateReq({ completeRuleId: e.target.value })}
              placeholder="Select a rule (enter rule ID)"
            />
          </label>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={req.achieveBadges ?? false}
            onChange={(e) => {
              const checked = e.target.checked
              updateReq({
                achieveBadges: checked,
                ...(checked ? {} : { badgeIds: undefined }),
              })
            }}
          />
          <span className="text-sm">Achieve badges</span>
        </label>
        {req.achieveBadges && (
          <label className="flex flex-col gap-0.5 ml-6">
            <span className="text-xs text-gray-500">Badge IDs (comma-separated)</span>
            <input
              type="text"
              className="rounded border border-gray-300 px-2 py-1 max-w-[280px]"
              value={badgeIdsDisplay}
              onChange={(e) =>
                updateReq({
                  badgeIds: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="id1, id2"
            />
          </label>
        )}
      </div>

    </div>
  )
}
