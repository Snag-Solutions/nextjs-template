'use client'

import { RuleSpecificFieldProps } from './types'

export function PostImpressionsFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const rewardCriteria = (metadata.rewardCriteria as string) ?? 'impressions_count'

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Get X post impressions</h3>
      <p className="text-sm text-gray-600">
        Reward users for getting views on their eligible X posts.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Reward criteria</span>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 w-full max-w-xs"
          value={rewardCriteria}
          onChange={(e) => updateMetadata({ rewardCriteria: e.target.value })}
        >
          <option value="impressions_count">Impressions count</option>
        </select>
      </label>
    </div>
  )
}
