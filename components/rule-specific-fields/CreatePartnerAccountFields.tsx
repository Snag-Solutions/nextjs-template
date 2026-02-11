'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Create a Partner Account" (create_partner_account) rule type.
 */
export function CreatePartnerAccountFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const cta = (metadata.cta as { href?: string; text?: string }) ?? {}
  const linkUrl = cta.href ?? ''
  const buttonText = cta.text ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCta = (field: 'href' | 'text', val: string) =>
    updateMetadata({ cta: { ...cta, [field]: val } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Create a Partner Account</h3>
      <p className="text-sm text-gray-600">
        Reward users for creating an account with your partner.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Partner sign-up link *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={linkUrl}
          onChange={(e) => setCta('href', e.target.value)}
          placeholder="https://..."
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Button text</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={buttonText}
          onChange={(e) => setCta('text', e.target.value)}
          placeholder="e.g. Create account"
        />
      </label>
    </div>
  )
}
