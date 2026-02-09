'use client'

import { RuleSpecificFieldProps } from './types'

export function TextInputFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const verifyPlaceHolderText = (metadata.verifyPlaceHolderText as string) ?? ''
  const verificationTextMinimumLength = (metadata.verificationTextMinimumLength as number) ?? 0

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Text input options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Verification placeholder</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={verifyPlaceHolderText}
          onChange={(e) =>
            onChange({
              metadata: { ...metadata, verifyPlaceHolderText: e.target.value },
            })
          }
          placeholder="e.g. Enter your game ID"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Minimum verification text length</span>
        <input
          type="number"
          min={0}
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={verificationTextMinimumLength}
          onChange={(e) =>
            onChange({
              metadata: {
                ...metadata,
                verificationTextMinimumLength: parseInt(e.target.value, 10) || 0,
              },
            })
          }
        />
      </label>
    </div>
  )
}
