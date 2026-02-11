'use client'

import { ALL_LOYALTY_RULE_TYPES, getRuleOptions } from '@/lib/rule-options'
import { RuleFormValues } from './types'

/** Format an ISO UTC string for datetime-local input (shows user's local time) */
function toDateTimeLocalValue(isoUtc: string): string {
  if (!isoUtc) return ''
  const d = new Date(isoUtc)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export type RuleGroupOption = { id: string; name: string }

export type BasicDetailsSectionProps = {
  value: RuleFormValues
  onChange: (patch: Partial<RuleFormValues>) => void
  /** Rule groups from getLoyaltyRuleGroups(); when provided, shows dropdown instead of text input */
  ruleGroups?: RuleGroupOption[]
}

const FALLBACK_INTERVALS = ['once', 'daily', 'weekly', 'monthly'] as const
const FALLBACK_FREQUENCIES = ['immediately', 'daily', 'weekly', 'monthly'] as const

export function BasicDetailsSection({
  value,
  onChange,
  ruleGroups = [],
}: BasicDetailsSectionProps) {
  const ruleOptions = value.type ? getRuleOptions(value.type) : null

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Basic details</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Rule group</span>
        {ruleGroups.length > 0 ? (
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.loyaltyRuleGroupId}
            onChange={(e) => onChange({ loyaltyRuleGroupId: e.target.value })}
          >
            <option value="">Select rule group</option>
            {ruleGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.loyaltyRuleGroupId}
            onChange={(e) => onChange({ loyaltyRuleGroupId: e.target.value })}
            placeholder="e.g. rgrp_..."
          />
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Rule type</span>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.type}
          onChange={(e) => onChange({ type: e.target.value })}
        >
          <option value="">Select rule type</option>
          {ALL_LOYALTY_RULE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Rule name"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Description</span>
        <textarea
          className="rounded-lg border border-gray-300 px-3 py-2 min-h-[80px]"
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Rule description"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Reward type</span>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.rewardType}
          onChange={(e) =>
            onChange({
              rewardType: e.target.value as 'points' | 'multiplier',
            })
          }
        >
          <option value="points">Points</option>
          <option value="multiplier">Multiplier</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Amount</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.amount}
          onChange={(e) => onChange({ amount: e.target.value })}
          placeholder={value.rewardType === 'multiplier' ? '0' : '100'}
        />
      </label>

      {ruleOptions?.claimTypeOptions && ruleOptions.claimTypeOptions.length > 0 && (
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Claim type</span>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.claimType}
            onChange={(e) => onChange({ claimType: e.target.value })}
          >
            {ruleOptions.claimTypeOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Interval</span>
        {ruleOptions?.interval.options ? (
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.interval}
            onChange={(e) => onChange({ interval: e.target.value })}
          >
            {[...new Set(ruleOptions.interval.options.map((i) => i.option))].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.interval}
            onChange={(e) => onChange({ interval: e.target.value })}
          >
            {FALLBACK_INTERVALS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Frequency</span>
        {ruleOptions ? (
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.frequency}
            onChange={(e) => onChange({ frequency: e.target.value })}
          >
            {ruleOptions.frequency.options.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        ) : (
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={value.frequency}
            onChange={(e) => onChange({ frequency: e.target.value })}
          >
            {FALLBACK_FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Start time</span>
        <input
          type="datetime-local"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={toDateTimeLocalValue(value.startTime)}
          onChange={(e) =>
            onChange({
              startTime: e.target.value ? new Date(e.target.value).toISOString() : '',
            })
          }
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">End time (optional)</span>
        <input
          type="datetime-local"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={toDateTimeLocalValue(value.endTime)}
          onChange={(e) =>
            onChange({
              endTime: e.target.value ? new Date(e.target.value).toISOString() : '',
            })
          }
        />
      </label>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.isRequired}
            onChange={(e) => onChange({ isRequired: e.target.checked })}
          />
          <span className="text-sm font-medium">Required rule</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.hideInUi}
            onChange={(e) => onChange({ hideInUi: e.target.checked })}
          />
          <span className="text-sm font-medium">Hide from UI</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.showBeforeStart}
            onChange={(e) => onChange({ showBeforeStart: e.target.checked })}
          />
          <span className="text-sm font-medium">Show before start date</span>
        </label>
      </div>
    </div>
  )
}
