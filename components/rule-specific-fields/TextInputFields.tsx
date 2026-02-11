'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Submit Text Input" (text_input) rule type.
 */
export function TextInputFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const verifyPlaceHolderText = (metadata.verifyPlaceHolderText as string) ?? ''
  const verificationTextMinimumLength = (metadata.verificationTextMinimumLength as number | string) ?? ''
  const checkText = Array.isArray(metadata.checkText)
    ? (metadata.checkText[0] as string) ?? ''
    : (metadata.checkText as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Submit Text Input</h3>
      <p className="text-sm text-gray-600">
        Reward users for submitting custom input requested by your project.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Verification placeholder</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={verifyPlaceHolderText}
          onChange={(e) => updateMetadata({ verifyPlaceHolderText: e.target.value })}
          placeholder="e.g. Enter your answer"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Minimum verification text length</span>
        <input
          type="number"
          className="rounded-lg border border-gray-300 px-3 py-2 w-32"
          value={verificationTextMinimumLength}
          onChange={(e) =>
            updateMetadata({
              verificationTextMinimumLength: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          placeholder="0"
          min={0}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Text to verify (optional)</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={checkText}
          onChange={(e) => updateMetadata({ checkText: e.target.value ? [e.target.value] : undefined })}
          placeholder="Exact text to match, or leave empty"
        />
      </label>
    </div>
  )
}
