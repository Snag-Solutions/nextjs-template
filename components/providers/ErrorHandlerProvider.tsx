import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { MAXIMUM_ACCOUNT_LINKED_CODE } from 'lib/errors'
import { useEffect } from 'react'
import { decodeJWT } from 'lib/jwt'
import { userVerficationConfirmation } from '@/lib/actions/userVerficationConfirmation'
import { useSession } from 'next-auth/react'
import { useAuthAccount } from '@/lib/useAuthAccount'
export const ErrorHandlerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const error = searchParams.get('error')
  const accountLinkData = searchParams.get('accountLinkData')
  const { userId } = useAuthAccount()

  const checkUserVerification = async () => {
    if (!userId) return
    if (error === MAXIMUM_ACCOUNT_LINKED_CODE && !!accountLinkData) {
      // need to open confirmation modal here
      // parse accountLinkData as jwt token
      // can we decode this without using lib

      const decoded = decodeJWT<{
        socialMethod?: string
        walletAddress?: string
      }>(accountLinkData)

      const confirmed = confirm(
        `It looks like this ${decoded?.data?.socialMethod ?? (!!decoded?.data?.walletAddress ? decoded?.data?.walletAddress : '')} account is already connected to another profile. Would you like to disconnect it from the other profile and link it to your current account instead?`
      )

      try {
        if (confirmed) {
          await userVerficationConfirmation({
            accountLinkData,
            userId,
          })
        }
      } catch (e: any) {
        alert(e?.message || 'Something went wrong')
      } finally {
        // remove accountLinkData from url
        const params = new URLSearchParams(searchParams)
        params.delete('accountLinkData')
        params.delete('error')

        // Create the new URL with remaining parameters
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname

        // Update the URL
        router.push(newUrl)
      }
    }
  }

  useEffect(() => {
    checkUserVerification()
  }, [error, accountLinkData, userId])

  return <>{children}</>
}
