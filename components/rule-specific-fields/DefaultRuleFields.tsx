'use client'

import { RuleSpecificFieldProps } from './types'

export function DefaultRuleFields(_props: RuleSpecificFieldProps) {
  return (
    <div className="text-sm text-gray-500">
      No extra fields for this rule type.
    </div>
  )
}
