'use client'

import { RuleSpecificFieldProps } from './types'

const MAX_TEXT_LENGTH = 32

type CheckTextEntry = { text: string }

export function DripXNewTweetFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const checkTexts = (metadata.checkTexts as CheckTextEntry[] | undefined) ?? [{ text: '' }]
  const requirePostLink = (metadata.requirePostLink as boolean) ?? true
  const requirePostMediaLink = (metadata.requirePostMediaLink as boolean) ?? false
  const rewardQualityPosts = (metadata.rewardQualityPosts as boolean) ?? false
  const minimumFollowerCount = (metadata.minimumFollowerCount as number | undefined) ?? undefined
  const enablePreGeneratedPostText = (metadata.enablePreGeneratedPostText as boolean) ?? false
  const preGeneratedPostText = (metadata.preGeneratedPostText as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCheckTexts = (next: CheckTextEntry[]) => updateMetadata({ checkTexts: next })
  const updateCheckText = (index: number, text: string) => {
    const next = [...checkTexts]
    if (!next[index]) next[index] = { text: '' }
    next[index] = { text: text.slice(0, MAX_TEXT_LENGTH) }
    setCheckTexts(next)
  }
  const addCheckText = () => setCheckTexts([...checkTexts, { text: '' }])
  const removeCheckText = (index: number) =>
    setCheckTexts(checkTexts.filter((_, i) => i !== index))

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Post on X</h3>
      <p className="text-sm text-gray-600">
        Reward users for creating a new post on X. Optionally require specific text, media, or link.
      </p>

      {/* Post should include */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Post should include</span>
        <p className="text-xs text-gray-500">
          Mentions must be an exact match (e.g. &quot;#dreamersclub&quot; won&apos;t count for &quot;Dreamers Club&quot;). Max {MAX_TEXT_LENGTH} chars per entry.
        </p>
        {checkTexts.map((entry, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2 flex-1"
              value={entry.text}
              onChange={(e) => updateCheckText(i, e.target.value)}
              placeholder={i === 0 ? 'e.g. #dreamers on tour' : 'Another phrase or hashtag'}
              maxLength={MAX_TEXT_LENGTH}
            />
            {checkTexts.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() => removeCheckText(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline self-start"
          onClick={addCheckText}
        >
          + Add another
        </button>
      </div>

      {/* Post must include media */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={requirePostMediaLink}
          onChange={(e) =>
            updateMetadata({ requirePostMediaLink: e.target.checked })
          }
        />
        <span className="text-sm font-medium">Post must include media</span>
      </label>

      {/* Don't require post link */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!requirePostLink}
          onChange={(e) =>
            updateMetadata({ requirePostLink: !e.target.checked })
          }
        />
        <span className="text-sm font-medium">Don&apos;t require post link</span>
      </label>
      <p className="text-xs text-gray-500 -mt-2">
        Mostly for API use: when enabled, the system can scan the user&apos;s profile for the latest qualifying post instead of requiring a link.
      </p>

      {/* Only reward quality posts */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={rewardQualityPosts}
          onChange={(e) =>
            updateMetadata({ rewardQualityPosts: e.target.checked })
          }
        />
        <span className="text-sm font-medium">Only reward quality posts</span>
      </label>
      <p className="text-xs text-gray-500 -mt-2">
        Posts have an AI-calculated quality score; only posts with positive sentiment are rewarded.
      </p>
      {rewardQualityPosts && (
        <label className="flex flex-col gap-0.5 max-w-[200px]">
          <span className="text-sm font-medium">Minimum X followers (optional)</span>
          <input
            type="number"
            min={0}
            className="rounded border border-gray-300 px-2 py-1"
            value={minimumFollowerCount ?? ''}
            onChange={(e) =>
              updateMetadata({
                minimumFollowerCount: e.target.value
                  ? parseInt(e.target.value, 10)
                  : undefined,
              })
            }
            placeholder="0"
          />
        </label>
      )}

      {/* Pre generated post text */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enablePreGeneratedPostText}
          onChange={(e) => {
            const checked = e.target.checked
            updateMetadata({
              enablePreGeneratedPostText: checked,
              ...(checked ? {} : { preGeneratedPostText: '' }),
            })
          }}
        />
        <span className="text-sm font-medium">Pre generated post text</span>
      </label>
      {enablePreGeneratedPostText && (
        <label className="flex flex-col gap-0.5 pl-4">
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={preGeneratedPostText}
            onChange={(e) =>
              updateMetadata({ preGeneratedPostText: e.target.value })
            }
            placeholder="e.g. I'm also joining #dreamers on tour - can't wait to see what's next!"
          />
        </label>
      )}
    </div>
  )
}
