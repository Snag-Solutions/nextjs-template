'use client'

import { RuleSpecificFieldProps } from './types'

export function CodeEntryFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const promoCode = (metadata.promoCode as string) ?? ''
  const isRestrictedToNewUsers = (metadata.isRestrictedToNewUsers as boolean) ?? false

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Code entry options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Promo code</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={promoCode}
          onChange={(e) =>
            onChange({ metadata: { ...metadata, promoCode: e.target.value } })
          }
          placeholder="e.g. COSMIC2025"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isRestrictedToNewUsers}
          onChange={(e) =>
            onChange({
              metadata: { ...metadata, isRestrictedToNewUsers: e.target.checked },
            })
          }
        />
        <span className="text-sm font-medium">Restrict to new users only</span>
      </label>
    </div>
  )
}
