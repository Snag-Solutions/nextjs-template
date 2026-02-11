export type RuleFormValues = {
  loyaltyRuleGroupId: string
  name: string
  description: string
  type: string
  amount: string
  rewardType: 'points' | 'multiplier'
  /** Claim type: manual or auto (from RuleOptions.claimTypeOptions) */
  claimType: string
  interval: string
  frequency: string
  startTime: string
  endTime: string
  effectiveStartTime: string
  effectiveEndTime: string
  isRequired: boolean
  hideInUi: boolean
  showBeforeStart: boolean
  collectionAddress: string
  network: string
  metadata: Record<string, unknown>
}

export type RuleSpecificFieldProps = {
  value: Pick<
    RuleFormValues,
    'type' | 'rewardType' | 'collectionAddress' | 'network' | 'metadata'
  >
  onChange: (patch: Partial<RuleFormValues>) => void
}
