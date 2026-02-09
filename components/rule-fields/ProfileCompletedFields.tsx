'use client'

import { RuleSpecificFieldProps } from './types'

/** Required profile info options (aligned with LoyaltyRuleForm CompleteProfile / completeProfileOptions) */
const PROFILE_CONDITION_OPTIONS: { condition: string; label: string }[] = [
  { condition: 'profile_picture', label: 'Profile picture' },
  { condition: 'name', label: 'Name' },
  { condition: 'location', label: 'Location' },
  { condition: 'nft_portfolio', label: 'NFT portfolio' },
  { condition: 'about', label: 'About' },
  { condition: 'email', label: 'Email' },
  { condition: 'twitter', label: 'Twitter' },
  { condition: 'discord', label: 'Discord' },
  { condition: 'telegram', label: 'Telegram' },
  { condition: 'evm', label: 'EVM wallet' },
  { condition: 'solana', label: 'Solana wallet' },
  { condition: 'sui', label: 'Sui wallet' },
  { condition: 'ton', label: 'TON wallet' },
  { condition: 'agw', label: 'AGW wallet' },
  { condition: 'flow_cadence', label: 'Flow (Cadence) wallet' },
  { condition: 'imx', label: 'IMX (Immutable Passport)' },
]

export function ProfileCompletedFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const conditions = (metadata.completeProfileConditions as Record<string, boolean> | undefined) ?? {}

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCondition = (key: string, checked: boolean) => {
    const next = { ...conditions, [key]: checked }
    if (!checked) delete next[key]
    updateMetadata({ completeProfileConditions: next })
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Profile completed options</h3>
      <p className="text-sm text-gray-600">
        Required profile info — select which fields the user must complete to earn this reward.
      </p>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Required profile info</span>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {PROFILE_CONDITION_OPTIONS.map(({ condition, label }) => (
            <label key={condition} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={conditions[condition] ?? false}
                onChange={(e) => setCondition(condition, e.target.checked)}
              />
              <span className="text-sm whitespace-nowrap">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
