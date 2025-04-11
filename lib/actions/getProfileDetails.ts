'use server'

import { snag } from '@/lib/snag'
import { UserListParams } from '@snagsolutions/sdk/resources/users/index'

/**
 * Fetches the profile details for a specific user.
 *
 * @param params - The parameters for the user list request.
 * @returns A promise that resolves to the user's profile details.
 * @throws An error if the request fails.
 */
export async function getProfileDetails(params: UserListParams) {
  return await snag.users.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
    ...params,
  })
}
