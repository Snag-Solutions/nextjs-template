'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Hold a Fungible Token" (token_hold_erc20) rule type.
 */
export function HoldFungibleTokenFields({ value, onChange }: RuleSpecificFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Hold a Fungible Token</h3>
      <p className="text-sm text-gray-600">
        Reward users for holding a set amount of ERC-20 tokens or native currency. Configure the minimum amount in the reward section.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Token contract address *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={value.collectionAddress ?? ''}
          onChange={(e) => onChange({ collectionAddress: e.target.value })}
          placeholder="0x... or leave empty for native currency"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Network *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={value.network ?? ''}
          onChange={(e) => onChange({ network: e.target.value })}
          placeholder="e.g. mainnet, polygon"
        />
      </label>
    </div>
  )
}
