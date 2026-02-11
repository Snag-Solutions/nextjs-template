'use client'

import { RuleSpecificFieldProps } from './types'

const MAX_LENGTH = 32

export function XTextInBioFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const checkTexts = (metadata.checkTexts as { text: string }[] | undefined)
  const text = Array.isArray(checkTexts) && checkTexts[0] ? checkTexts[0].text : ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Add Text to X Bio</h3>
      <p className="text-sm text-gray-600">
        Reward users for adding specific text to their X bio.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Text to check in X Bio *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={text}
          onChange={(e) =>
            updateMetadata({ checkTexts: [{ text: e.target.value.slice(0, MAX_LENGTH) }] })
          }
          placeholder="Text to check in Twitter Bio"
          maxLength={MAX_LENGTH}
        />
      </label>
    </div>
  )
}
