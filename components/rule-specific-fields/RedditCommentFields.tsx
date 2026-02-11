'use client'

import { RuleSpecificFieldProps } from './types'

export function RedditCommentFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const redditPostId = (metadata.redditPostId as string) ?? ''
  const ctaHref = (metadata.cta as { href?: string } | undefined)?.href ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCtaHref = (href: string) =>
    updateMetadata({ cta: { ...(metadata.cta as object || {}), href } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Comment on a Reddit Post</h3>
      <p className="text-sm text-gray-600">
        Reward users for commenting on a Reddit post.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Reddit post ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={redditPostId}
          onChange={(e) => updateMetadata({ redditPostId: e.target.value })}
          placeholder="Reddit post ID"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Reddit post link *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={ctaHref}
          onChange={(e) => setCtaHref(e.target.value)}
          placeholder="https://www.reddit.com/..."
        />
      </label>
    </div>
  )
}
