'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Click a Link" (link_click) rule type.
 */
export function LinkClickFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const linkUrl =
    (metadata.cta as { href?: string })?.href ?? (metadata.linkUrl as string) ?? ''
  const timeDelayToVerifySeconds = (metadata.timeDelayToVerifySeconds as number | string) ?? 10
  const verifyPlaceHolderText = (metadata.verifyPlaceHolderText as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Click a Link</h3>
      <p className="text-sm text-gray-600">
        Reward users for clicking on a link.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Link URL *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={linkUrl}
          onChange={(e) =>
            updateMetadata({ cta: { ...(metadata.cta as object), href: e.target.value } })
          }
          placeholder="https://..."
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Delay to verify (seconds)</span>
        <input
          type="number"
          className="rounded-lg border border-gray-300 px-3 py-2 w-32"
          value={timeDelayToVerifySeconds}
          onChange={(e) =>
            updateMetadata({
              timeDelayToVerifySeconds: e.target.value ? Number(e.target.value) : 10,
            })
          }
          min={0}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Verification input placeholder (optional)</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={verifyPlaceHolderText}
          onChange={(e) => updateMetadata({ verifyPlaceHolderText: e.target.value })}
          placeholder="e.g. Enter your game ID"
        />
      </label>
    </div>
  )
}
