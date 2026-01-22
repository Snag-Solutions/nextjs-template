'use server'

import { snag } from '@/lib/snag'
import { StatusUpdateParams } from '@snagsolutions/sdk/resources/minting/status.mjs'

export async function updateMintingStatus(
  id: string,
  body: StatusUpdateParams
) {
  return snag.minting.status.update(id, body)
}