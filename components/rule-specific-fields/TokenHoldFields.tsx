'use client'

import { RuleSpecificFieldProps } from './types'

type RangeEntry = {
  startRange: number
  endRange: number
  amount: number
}

export function TokenHoldFields({ value, onChange }: RuleSpecificFieldProps) {
  const isMultiplier = value.rewardType === 'multiplier'
  const range = (value.metadata?.range as RangeEntry[] | undefined) ?? [
    { startRange: 1, endRange: 9007199254740991, amount: 1 },
  ]

  const updateRange = (index: number, field: keyof RangeEntry, val: number) => {
    const next = [...range]
    if (!next[index]) next[index] = { startRange: 1, endRange: 9007199254740991, amount: 1 }
    ;(next[index] as Record<string, number>)[field] = val
    onChange({ metadata: { ...value.metadata, range: next } })
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">TokenHold options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Collection address</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={value.collectionAddress}
          onChange={(e) => onChange({ collectionAddress: e.target.value })}
          placeholder="0x..."
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Network</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.network}
          onChange={(e) => onChange({ network: e.target.value })}
          placeholder="mainnet"
        />
      </label>

      {isMultiplier && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Multiplier range</span>
          {range.map((r, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 rounded-lg border p-2">
              <input
                type="number"
                className="rounded border px-2 py-1"
                placeholder="Start"
                value={r.startRange}
                onChange={(e) =>
                  updateRange(i, 'startRange', parseInt(e.target.value, 10) || 0)
                }
              />
              <input
                type="number"
                className="rounded border px-2 py-1"
                placeholder="End"
                value={r.endRange}
                onChange={(e) =>
                  updateRange(i, 'endRange', parseInt(e.target.value, 10) || 0)
                }
              />
              <input
                type="number"
                className="rounded border px-2 py-1"
                placeholder="Amount"
                value={r.amount}
                onChange={(e) =>
                  updateRange(i, 'amount', parseInt(e.target.value, 10) || 0)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
