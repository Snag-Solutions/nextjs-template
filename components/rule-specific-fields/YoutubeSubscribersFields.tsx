'use client'

import { RuleSpecificFieldProps } from './types'

export function YoutubeSubscribersFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const youtubeChannelId = (metadata.youtubeChannelId as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Subscribe to a YouTube Channel</h3>
      <p className="text-sm text-gray-600">
        Reward users for subscribing to a YouTube channel.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">YouTube Channel ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={youtubeChannelId}
          onChange={(e) => updateMetadata({ youtubeChannelId: e.target.value })}
          placeholder="YouTube Channel ID"
        />
        <span className="text-xs text-gray-500">
          Find it: YouTube → Profile → Settings → Advanced settings
        </span>
      </label>
    </div>
  )
}
