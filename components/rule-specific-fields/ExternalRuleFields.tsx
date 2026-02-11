'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "External rule" (external_rule) rule type.
 */
export function ExternalRuleFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const conditionDescription = (metadata.conditionDescription as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">External rule</h3>
      <p className="text-sm text-gray-600">
        Reward users for completing actions on an external product.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Condition description</span>
        <textarea
          className="rounded-lg border border-gray-300 px-3 py-2 min-h-[80px]"
          value={conditionDescription}
          onChange={(e) => updateMetadata({ conditionDescription: e.target.value })}
          placeholder="Describe how users complete this rule (e.g. Complete sign-up on partner site)"
          rows={3}
        />
      </label>
      <p className="text-xs text-gray-500">
        Configure custom API URL or track progress in the full rule editor.
      </p>
    </div>
  )
}
