'use server'

import { snag } from '@/lib/snag'
import { WebsiteListResponse } from '@snagsolutions/sdk/resources/index.mjs'

/**
 * Fetches the website details for the specified organization.
 *
 * @returns A promise that resolves to the website details.
 * @throws An error if the request fails.
 */
export async function getWebsite(): Promise<WebsiteListResponse> {
  return snag.websites.list({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    limit: 1,
  })
}
