'use client'

import { RuleSpecificFieldProps } from './types'

const X_POST_URL_PATTERN = /^https:\/\/x\.com\/.+/

export function XTweetFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const twitterPostUrl = (metadata.twitterPostUrl as string) ?? ''
  const checkLike = (metadata.checkLike as boolean) ?? false
  const checkRepost = (metadata.checkRepost as boolean) ?? false
  const checkComment = (metadata.checkComment as boolean) ?? false
  const rewardQualityPosts = (metadata.rewardQualityPosts as boolean) ?? false

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const hasAtLeastOne =
    checkLike || checkRepost || checkComment
  const showQualityPosts = checkComment

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">React to an X Post</h3>
      <p className="text-sm text-gray-600">
        Reward users for reacting to a post on X. Set the post URL and choose at least one required action.
      </p>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Post URL *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={twitterPostUrl}
          onChange={(e) => updateMetadata({ twitterPostUrl: e.target.value })}
          placeholder="e.g. https://x.com/Snag_Solutions/status/1735407428093522314"
        />
        {twitterPostUrl && !X_POST_URL_PATTERN.test(twitterPostUrl) && (
          <span className="text-xs text-amber-600">Please use a valid X.com post URL.</span>
        )}
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Required actions *</span>
        <p className="text-xs text-gray-500">Select at least one: Like, Repost, or Comment.</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkLike}
              onChange={(e) => updateMetadata({ checkLike: e.target.checked })}
            />
            <span className="text-sm">Like</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkRepost}
              onChange={(e) => updateMetadata({ checkRepost: e.target.checked })}
            />
            <span className="text-sm">Repost</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkComment}
              onChange={(e) => updateMetadata({ checkComment: e.target.checked })}
            />
            <span className="text-sm">Comment</span>
          </label>
        </div>
        {!hasAtLeastOne && (
          <span className="text-xs text-amber-600">
            Select at least one required action for post engagement.
          </span>
        )}
      </div>

      {showQualityPosts && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rewardQualityPosts}
            onChange={(e) =>
              updateMetadata({ rewardQualityPosts: e.target.checked })
            }
          />
          <span className="text-sm">Reward quality posts (when Comment is required)</span>
        </label>
      )}
    </div>
  )
}
