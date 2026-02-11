'use client'

import { RuleSpecificFieldProps } from './types'

const X_ACCOUNT_URL_PATTERN = /^https:\/\/x\.com\/.+/

export function XFollowFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const twitterAccountUrl = (metadata.twitterAccountUrl as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Follow an X Account</h3>
      <p className="text-sm text-gray-600">
        Reward users for following a specific account on X.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Account URL *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={twitterAccountUrl}
          onChange={(e) => updateMetadata({ twitterAccountUrl: e.target.value })}
          placeholder="e.g. https://x.com/Snag_Solutions"
        />
        {twitterAccountUrl && !X_ACCOUNT_URL_PATTERN.test(twitterAccountUrl) && (
          <span className="text-xs text-amber-600">Please use a valid X.com account URL.</span>
        )}
      </label>
    </div>
  )
}
