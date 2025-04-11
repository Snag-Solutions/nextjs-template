'use server'
import { snag } from '@/lib/snag'
import axios from 'axios'

export const userVerficationConfirmation = async ({
  accountLinkData,
  userId,
}: {
  accountLinkData: string
  userId: string
}) => {
  const response = await axios.post<{ success: boolean; message?: string }>(
    `${snag.baseURL}/api/users/verify`,
    {
      accountLinkData,
      userId,
      websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID!,
      organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    },
    {
      headers: {
        'x-api-key': snag.apiKey,
      },
    }
  )
  return response.data
}
