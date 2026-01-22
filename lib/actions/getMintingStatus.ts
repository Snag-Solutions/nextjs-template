'use server'

import { snag } from '@/lib/snag'
import { StatusRetrieveResponse } from '@snagsolutions/sdk/resources/minting/status.mjs'

export async function getMintingStatus(
  id: string
): Promise<StatusRetrieveResponse> {
  return snag.minting.status.retrieve(id)
}