'use client'

import { RuleSpecificFieldProps } from './types'

export function SnapshotGovernanceFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const snapshotProposals = (metadata.snapshotProposals as { space: string; id: string }[]) ?? [
    { space: '', id: '' },
  ]
  const entry = snapshotProposals[0] ?? { space: '', id: '' }

  const update = (field: 'space' | 'id', val: string) => {
    const next = [{ ...entry, [field]: val }]
    onChange({ metadata: { ...metadata, snapshotProposals: next } })
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Snapshot governance options</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Snapshot space name</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={entry.space}
          onChange={(e) => update('space', e.target.value)}
          placeholder="Snapshot Space Name"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Snapshot proposal ID</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={entry.id}
          onChange={(e) => update('id', e.target.value)}
          placeholder="Snapshot Proposal Id"
        />
      </label>
    </div>
  )
}
