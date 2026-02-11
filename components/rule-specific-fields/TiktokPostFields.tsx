'use client'

import { RuleSpecificFieldProps } from './types'

const MAX_TEXT_LENGTH = 32
type CheckTextEntry = { text: string }

export function TiktokPostFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const checkTexts = (metadata.checkTexts as CheckTextEntry[] | undefined) ?? [{ text: '' }]
  const requirePostLink = (metadata.requirePostLink as boolean) ?? true
  const requirePostMediaLink = (metadata.requirePostMediaLink as boolean) ?? false
  const rewardQualityPosts = (metadata.rewardQualityPosts as boolean) ?? false

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
      <h3 className="text-lg font-semibold">Post on TikTok</h3>
      <p className="text-sm text-gray-600">
        Reward users for creating a new post on TikTok.
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Post should include</span>
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
              <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => removeCheckText(i)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="text-sm text-blue-600 hover:underline self-start" onClick={addCheckText}>
          + Add another
        </button>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={requirePostMediaLink}
          onChange={(e) => updateMetadata({ requirePostMediaLink: e.target.checked })}
        />
        <span className="text-sm font-medium">Post must include media</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!requirePostLink}
          onChange={(e) => updateMetadata({ requirePostLink: !e.target.checked })}
        />
        <span className="text-sm font-medium">Don&apos;t require post link</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={rewardQualityPosts}
          onChange={(e) => updateMetadata({ rewardQualityPosts: e.target.checked })}
        />
        <span className="text-sm font-medium">Only reward quality posts</span>
      </label>
    </div>
  )
}
