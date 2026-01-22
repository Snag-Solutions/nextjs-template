'use server'

import { snag } from '@/lib/snag'
import { ContractMintResponse } from '@snagsolutions/sdk/resources/minting/contracts.mjs'

interface MintMintingContractAssetParams {
  assetId: string
  contractId: string
  walletAddress: string
  quantity?: number
}

export async function mintMintingContractAsset({
  assetId,
  contractId,
  walletAddress,
  quantity = 1,
}: MintMintingContractAssetParams): Promise<ContractMintResponse> {
  return snag.minting.contracts.mint({
    assetId,
    contractId,
    walletAddress,
    quantity,
  })
}