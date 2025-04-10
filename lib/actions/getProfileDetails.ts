'use server'

import { snag } from '@/lib/snag'
import { MetadataListResponse } from '@snagsolutions/sdk/resources/users/metadatas.mjs'

/**
 * Fetches the profile details for a specific user.
 *
 * @param userId - The ID of the user whose profile details are to be fetched.
 * @returns A promise that resolves to the user's profile details.
 * @throws An error if the request fails.
 */
export async function getProfileDetails(
  userId: string
): Promise<MetadataListResponse> {
  return snag.users.metadatas.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    userId,
  })
}
