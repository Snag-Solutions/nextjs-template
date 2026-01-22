'use server'

import { snag } from '@/lib/snag'
import { MintingGetAssetsResponse } from '@snagsolutions/sdk/resources/minting/minting.mjs'

interface GetMintingContractAssetsParams {
  contractId: string
  websiteId: string
}

export async function getMintingContractAssets({
  contractId,
  websiteId,
}: GetMintingContractAssetsParams): Promise<MintingGetAssetsResponse['data']> {
  const response = await snag.minting.getAssets({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId,
    mintingContractIds: contractId,
    includeMetadata: true,
    includeDeleted: false,
    isListed: true,
  })

  return response.data.filter((asset: any) => asset?.isListed === true)
}