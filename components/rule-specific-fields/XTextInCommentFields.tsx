'use client'

import { RuleSpecificFieldProps } from './types'

const MAX_LENGTH = 32

export function XTextInCommentFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const checkTexts = (metadata.checkTexts as { text: string }[] | undefined)
  const text = Array.isArray(checkTexts) && checkTexts[0] ? checkTexts[0].text : ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Comment on an X Post with Text</h3>
      <p className="text-sm text-gray-600">
        Reward users for adding specific text to their X comment.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Text to check in X Comment *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={text}
          onChange={(e) =>
            updateMetadata({ checkTexts: [{ text: e.target.value.slice(0, MAX_LENGTH) }] })
          }
          placeholder="Text to check in Twitter Comment"
          maxLength={MAX_LENGTH}
        />
      </label>
    </div>
  )
}
