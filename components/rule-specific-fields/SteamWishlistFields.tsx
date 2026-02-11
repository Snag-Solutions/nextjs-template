'use client'

import { RuleSpecificFieldProps } from './types'

export function SteamWishlistFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const steamAppId = (metadata.steamAppId as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Add an Item to Steam Wishlist</h3>
      <p className="text-sm text-gray-600">
        Reward users for adding items to their Steam wishlist.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Steam App ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 w-40"
          value={steamAppId}
          onChange={(e) => updateMetadata({ steamAppId: e.target.value })}
          placeholder="Steam App ID"
        />
      </label>
    </div>
  )
}
