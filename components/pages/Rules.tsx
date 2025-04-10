'use client'

import { Button } from '@/components/ui/Button'
import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'
import { claimLoyaltyRule } from '@/lib/actions/claimLoyaltyRule'
import { useAuthAccount } from '@/lib/useAuthAccount'
import { RuleListResponse } from '@snagsolutions/sdk/resources/loyalty/rules.mjs'
import Link from 'next/link'

interface RulesProps {
  rules: RuleListResponse['data']
}

export const Rules = ({ rules }: RulesProps) => {
  const { userId, isAuthenticated } = useAuthAccount()
  const isLoyaltyProgramConfigured = rules?.length > 0

  if (!isLoyaltyProgramConfigured) {
    return (
      <div className="flex flex-col gap-4 w-full items-start justify-start">
        <Header as="h1">Rules</Header>
        <Header as="h4">No rules found in your loyalty program.</Header>
        <Header as="p">
          You have to prepare your loyalty program first. Please go to{' '}
          <Link href="https://admin.snag-solutions.io" target="_blank">
            <b>Snag Admin</b>
          </Link>{' '}
          and create a loyalty currency first. Then you can run the script to
          create the example rules set.
        </Header>
        <Code data={`pnpm create:rules`} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full items-start justify-start">
      <div className="flex flex-col gap-4 w-full items-start justify-start">
        <Header as="h1">Rules</Header>
        <Code data={rules} />
      </div>
      <hr className="border-accent" />
      <Header as="h3">List of rules</Header>
      <div className="flex flex-col gap-4 w-full items-start justify-center">
        {rules.map((rule: any) => (
          <div
            key={rule?.id}
            className="flex flex-row gap-2 items-center justify-between bg-accent p-4 rounded-xl w-full"
          >
            <div className="flex flex-col gap-2">
              <Header as="h5">{rule?.name}</Header>
              <Header as="p">{rule?.description}</Header>
            </div>
            <Button
              onClick={async () => {
                if (!isAuthenticated || !userId) return null
                const message = await claimLoyaltyRule(rule?.id, userId)
                alert(message)
              }}
              disabled={!isAuthenticated || !userId}
            >
              Claim
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
