'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Enter a Code" (code_entry) rule type.
 */
export function CodeEntryFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const promoCode = (metadata.promoCode as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Enter a Code</h3>
      <p className="text-sm text-gray-600">
        Reward users for entering a specific code provided by your project.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Default / example code (optional)</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
          value={promoCode}
          onChange={(e) => updateMetadata({ promoCode: e.target.value || undefined })}
          placeholder="e.g. WELCOME2024"
        />
      </label>
      <p className="text-xs text-gray-500">
        Codes can be managed via promo code lists or CSV upload in the full rule editor.
      </p>
    </div>
  )
}
