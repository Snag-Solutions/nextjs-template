'use client'

import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'
import { Table } from '@/components/ui/Table'
import { getLoyaltyAccount } from '@/lib/actions/getLoyaltyAccount'
import { getLoyaltyTransactionEntries } from '@/lib/actions/getLoyaltyTransactionEntries'
import { getProfileDetails } from '@/lib/actions/getProfileDetails'
import { AccountListResponse } from '@snagsolutions/sdk/resources/loyalty/accounts.mjs'
import { TransactionGetTransactionEntriesResponse } from '@snagsolutions/sdk/resources/loyalty/transactions.mjs'
import { MetadataListResponse } from '@snagsolutions/sdk/resources/users/metadatas.mjs'
import { useEffect, useState } from 'react'

interface UserProfileProps {
  userId: string
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Array<MetadataListResponse.Data>>([])
  const [account, setAccount] = useState<Array<AccountListResponse.Data>>([])
  const [history, setHistory] = useState<
    Array<TransactionGetTransactionEntriesResponse.Data>
  >([])

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      const profileData = await getProfileDetails(userId)
      setProfile(profileData.data)
      const accountData = await getLoyaltyAccount(userId)
      setAccount(accountData.data)
      const historyData = await getLoyaltyTransactionEntries({
        userId,
        limit: 100,
      })
      setHistory(historyData.data)
      setIsLoading(false)
    }
    fetchInitialData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 w-full items-start justify-start">
      <Header as="h1">Profile</Header>
      <Header as="h4">Profile Details</Header>
      <Code data={profile} />
      <Header as="h4">Loyalty Account</Header>
      <Code data={account} />
      <Header as="h4">Loyalty Account History</Header>
      <Table<
        TransactionGetTransactionEntriesResponse.Data & {
          loyaltyTransaction?: {
            description?: string
          }
          loyaltyAccountEndAmount?: string
        }
      >
        data={history}
        getRowKey={(i) => i.id}
        columns={[
          {
            key: 'direction',
            label: 'Type',
            render: (i) => (i.direction === 'credit' ? 'Credit' : 'Debit'),
          },
          {
            key: 'loyaltyTransaction',
            label: 'Description',
            render: (i) =>
              i?.loyaltyTransaction?.loyaltyRule?.name ??
              (i.loyaltyTransaction?.description || ''),
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (i) => Number(i.amount || 0),
          },
          {
            key: 'loyaltyAccountEndAmount',
            label: 'End amount',
            render: (i) => Number(i.loyaltyAccountEndAmount || 0),
          },
          {
            key: 'createdAt',
            label: 'Date',
            render: (i) => {
              const date = new Date(i.createdAt || '')
              return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
            },
          },
        ]}
      />
    </div>
  )
}
