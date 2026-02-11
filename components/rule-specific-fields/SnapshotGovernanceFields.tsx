'use client'

import { RuleSpecificFieldProps } from './types'

/**
 * Specific fields for "Participate in Governance Vote" (snapshot_governance) rule type.
 */
export function SnapshotGovernanceFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const snapshotProposals = (metadata.snapshotProposals as { space?: string; id?: string }[]) ?? [
    { space: '', id: '' },
  ]
  const proposal = snapshotProposals[0] ?? { space: '', id: '' }

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setProposal = (field: 'space' | 'id', val: string) =>
    updateMetadata({
      snapshotProposals: [{ ...proposal, [field]: val }],
    })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Participate in Governance Vote</h3>
      <p className="text-sm text-gray-600">
        Reward users for participating in governance votes on Snapshot.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Snapshot Space *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={proposal.space ?? ''}
          onChange={(e) => setProposal('space', e.target.value)}
          placeholder="e.g. snapshot.org"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Proposal ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
          value={proposal.id ?? ''}
          onChange={(e) => setProposal('id', e.target.value)}
          placeholder="e.g. 0x..."
        />
      </label>
    </div>
  )
}
