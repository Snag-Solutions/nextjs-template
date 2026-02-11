'use client'

import { RuleSpecificFieldProps } from './types'

export function TwitterFollowersFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const minFollowers = (metadata.minimumFollowerCount as number | undefined) ?? 0

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Reach X Followers</h3>
      <p className="text-sm text-gray-600">
        Reward users based on the number of their X followers.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Minimum follower count</span>
        <input
          type="number"
          min={0}
          className="rounded-lg border border-gray-300 px-3 py-2 w-40"
          value={minFollowers}
          onChange={(e) =>
            updateMetadata({ minimumFollowerCount: parseInt(e.target.value, 10) || 0 })
          }
          placeholder="0"
        />
      </label>
    </div>
  )
}
