'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Sell an NFT" (SoldOn) rule type.
 */
export function SellNftFields({ value, onChange }: RuleSpecificFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Sell an NFT</h3>
      <p className="text-sm text-gray-600">
        Reward users for selling a specific NFT from the collection.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Collection address *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={value.collectionAddress ?? ''}
          onChange={(e) => onChange({ collectionAddress: e.target.value })}
          placeholder="0x..."
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Network *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.network ?? ''}
          onChange={(e) => onChange({ network: e.target.value })}
          placeholder="e.g. mainnet, polygon, solana"
        />
      </label>
    </div>
  )
}
