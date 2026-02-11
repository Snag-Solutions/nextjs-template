'use client'

import { RuleSpecificFieldProps } from './types'


const WALLET_TYPES = ['evm', 'solana', 'sui', 'ton', 'cosmos', 'ultra', 'agw', 'flow_cadence', 'substrate'] as const

export function ConnectWalletFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const walletType = (metadata.walletType as string) ?? 'evm'

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Connect wallet options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Wallet type</span>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={walletType}
          onChange={(e) =>
            onChange({ metadata: { ...metadata, walletType: e.target.value } })
          }
        >
          {WALLET_TYPES.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
