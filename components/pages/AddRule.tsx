'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui/Header'
import { Button } from '@/components/ui/Button'
import {
  BasicDetailsSection,
  getRuleSpecificFieldsComponent,
  type RuleFormValues,
} from '@/components/rule-specific-fields'
import { createLoyaltyRule } from '@/lib/actions/createLoyaltyRule'
import { getLoyaltyRuleGroups } from '@/lib/actions/getLoyaltyRuleGroups'
import { getRuleOptions } from '@/lib/rule-options'

const defaultValues: RuleFormValues = {
  loyaltyRuleGroupId: '',
  name: '',
  description: '',
  type: '',
  amount: '100',
  rewardType: 'points',
  claimType: 'manual',
  interval: 'daily',
  frequency: 'immediately',
  startTime: new Date().toISOString(),
  endTime: '',
  effectiveStartTime: '',
  effectiveEndTime: '',
  isRequired: false,
  hideInUi: false,
  showBeforeStart: false,
  collectionAddress: '',
  network: 'mainnet',
  metadata: {},
}

export function AddRule() {
  const router = useRouter()
  const [form, setForm] = useState<RuleFormValues>(defaultValues)
  const [ruleGroups, setRuleGroups] = useState<{ id: string; name: string }[]>([])
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getLoyaltyRuleGroups()
      .then((res) => setRuleGroups(res.data.map((g) => ({ id: g.id, name: g.name }))))
      .catch(() => setRuleGroups([]))
      .finally(() => setIsLoadingGroups(false))
  }, [])

  // When rule type changes, apply default interval/frequency/claimType from RuleOptions
  useEffect(() => {
    if (!form.type) return
    const opts = getRuleOptions(form.type)
    if (!opts) return
    setForm((prev) => ({
      ...prev,
      interval: opts.interval.default ?? prev.interval,
      frequency: opts.frequency.default,
      claimType: opts.claimTypeOptions?.[0] ?? prev.claimType,
    }))
  }, [form.type])

  const update = (patch: Partial<RuleFormValues>) => {
    setForm((prev) => ({ ...prev, ...patch }))
    setError(null)
  }

  const RuleSpecificFields = getRuleSpecificFieldsComponent(form.type)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.type || !form.name || !form.loyaltyRuleGroupId) {
      setError('Rule type, name and rule group ID are required.')
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await createLoyaltyRule({
        loyaltyRuleGroupId: form.loyaltyRuleGroupId,
        name: form.name,
        description: form.description,
        type: form.type,
        amount: form.amount,
        rewardType: form.rewardType,
        interval: form.interval,
        frequency: form.frequency,
        startTime: form.startTime,
        endTime: form.endTime || null,
        effectiveStartTime: form.effectiveStartTime || null,
        effectiveEndTime: form.effectiveEndTime || null,
        isRequired: form.isRequired,
        hideInUi: form.hideInUi,
        showBeforeStart: form.showBeforeStart,
        collectionAddress: form.collectionAddress,
        network: form.network,
        metadata: form.metadata,
      })
      router.push('/rules')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create rule')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Header as="h1">Add Rule</Header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 p-4 rounded-xl bg-accent/30">
          <BasicDetailsSection
            value={form}
            onChange={update}
            ruleGroups={ruleGroups}
          />
          {isLoadingGroups && (
            <p className="text-sm text-gray-500">Loading rule groups...</p>
          )}
        </section>

        {form.type && (
          <section className="flex flex-col gap-4 p-4 rounded-xl bg-accent/20">
            <Header as="h3">Rule-specific options</Header>
            <RuleSpecificFields
              value={{
                type: form.type,
                rewardType: form.rewardType,
                collectionAddress: form.collectionAddress,
                network: form.network,
                metadata: form.metadata,
              }}
              onChange={update}
            />
          </section>
        )}

        {error && (
          <div className="text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create rule'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/rules')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
