'use client'

import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'
import { Table } from '@/components/ui/Table'
import { getLeaderboardAccounts } from '@/lib/actions/getLeaderboardAccounts'
import { AccountListResponse } from '@snagsolutions/sdk/resources/loyalty/accounts.mjs'
import { useEffect, useState } from 'react'

interface LeaderboardProps {}

export const Leaderboard = ({}: LeaderboardProps) => {
  const [data, setData] = useState<Array<AccountListResponse.Data>>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      const response = await getLeaderboardAccounts()
      setData(response.data)
      setHasNextPage(response.hasNextPage)
      setIsLoading(false)
    }
    fetchInitialData()
  }, [])

  const loadMore = async () => {
    if (!hasNextPage || isLoading) return
    setIsLoading(true)

    const lastItem = data[data.length - 1]
    const nextPage = lastItem ? lastItem.id : null

    if (nextPage) {
      const nextData = await getLeaderboardAccounts(nextPage)
      setData((prevData) => [...prevData, ...nextData.data])
      setHasNextPage(nextData.hasNextPage)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-8 w-full items-start justify-start">
      <Header as="h1">Leaderboard</Header>
      <Code data={data} />
      <Header as="h4">Leaderboard Table</Header>
      {isLoading && data.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Table<AccountListResponse.Data>
          data={data}
          getRowKey={(i) => i.id}
          columns={[
            { key: 'id', label: 'Rank', render: (_i, idx) => idx + 1 },
            {
              key: 'user',
              label: 'Wallet Address',
              render: (i) => i.user?.walletAddress || '',
            },
            {
              key: 'amount',
              label: 'Amount',
              render: (i) => Number(i.amount || ''),
            },
          ]}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          loadMore={loadMore}
        />
      )}
    </div>
  )
}
