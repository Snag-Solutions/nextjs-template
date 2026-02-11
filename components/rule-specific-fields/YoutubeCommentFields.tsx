'use client'

import { RuleSpecificFieldProps } from './types'

export function YoutubeCommentFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const youtubeVideoId = (metadata.youtubeVideoId as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Comment on a YouTube Video</h3>
      <p className="text-sm text-gray-600">
        Reward users for commenting on a YouTube video.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">YouTube Video ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={youtubeVideoId}
          onChange={(e) => updateMetadata({ youtubeVideoId: e.target.value })}
          placeholder="YouTube Video ID"
        />
      </label>
    </div>
  )
}
