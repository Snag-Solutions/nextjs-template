'use server'

import { snag } from '@/lib/snag'
import { ContractListResponse } from '@snagsolutions/sdk/resources/minting/contracts.mjs'

const PAGE_SIZE = 50

export async function getMintingContracts(): Promise<
  ContractListResponse['data']
> {
  const contracts: ContractListResponse['data'] = []
  let startingAfter: string | undefined
  let hasNextPage = true

  while (hasNextPage) {
    const response = await snag.minting.contracts.list({
      organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
      limit: PAGE_SIZE,
      ...(startingAfter ? { startingAfter } : {}),
    })

    contracts.push(...response.data)
    hasNextPage = response.hasNextPage
    startingAfter = response.data[response.data.length - 1]?.id

    if (!startingAfter) {
      break
    }
  }

  return contracts
}