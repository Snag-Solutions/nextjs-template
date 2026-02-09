'use client'

import { RuleSpecificFieldProps } from './types'

export function LinkClickFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const link = (metadata.link as string) ?? ''
  const buttonText = (metadata.buttonText as string) ?? ''
  const timeDelayToVerifySeconds = (metadata.timeDelayToVerifySeconds as number) ?? 10

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Link click options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Link</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={link}
          onChange={(e) =>
            onChange({ metadata: { ...metadata, link: e.target.value } })
          }
          placeholder="https://www.website.com"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Button text</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={buttonText}
          onChange={(e) =>
            onChange({ metadata: { ...metadata, buttonText: e.target.value } })
          }
          placeholder="e.g. Click here"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Time delay to verify (seconds)</span>
        <input
          type="number"
          min={1}
          max={600}
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={timeDelayToVerifySeconds}
          onChange={(e) =>
            onChange({
              metadata: {
                ...metadata,
                timeDelayToVerifySeconds: parseInt(e.target.value, 10) || 10,
              },
            })
          }
        />
        <span className="text-xs text-gray-500">1–600 seconds</span>
      </label>
    </div>
  )
}
