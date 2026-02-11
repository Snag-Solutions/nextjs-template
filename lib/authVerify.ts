import { AuthType } from "./loyalty"

/**
 * Decode state JWT and return the code to show in the modal.
 * Use this when starting the connect-verify flow so the UI can show the code and collect profile URL.
 */
export const getCodeFromState = (stateJwt: string): string => {
  return decodeCustomAuthStateJwt(stateJwt)
}

/**
 * Complete the connect-verify flow: build redirect URL with profile URL and navigate.
 * Call this when the user submits the modal with their profile URL.
 */
export const completeConnectWithProfileUrl = (
  state: string,
  authType: AuthType,
  profileUrl: string
) => {
  const trimmed = profileUrl?.trim()
  if (!trimmed) return

  const url = new URL(`https://admin.snagsolutions.io/api/${authType}/auth/connect`)
  url.searchParams.set('state', state)
  url.searchParams.set(getProfileUrlParam(authType), trimmed)
  url.searchParams.set('responseType', 'redirect')

  window.location.href = url.toString()
}

/**
 * Legacy flow: kept for compatibility. Prefer showing ConnectVerifyModal and using
 * getCodeFromState + completeConnectWithProfileUrl instead.
 */
export const ConnectVerifyFlow = async (state: string, authType: AuthType): Promise<{ code: string }> => {
  const code = getCodeFromState(state)
  return { code }
}

  const getProfileUrlParam = (authType: AuthType) => {

    switch (authType) {
      case 'tiktok':
        return 'tiktokProfileUrl'
      case 'reddit':
        return 'redditProfileUrl'
      case 'instagram':
        return 'instagramProfileUrl'
      default:
        return ''
    }
  }


/**
 * Decode state JWT and return the 8-digit code.
 */
const decodeCustomAuthStateJwt = (stateJwt: string): string => {
    if (!stateJwt || typeof stateJwt !== 'string') {
        throw new Error('Invalid state JWT')
    }
    const parts = stateJwt.split('.')
    if (parts.length !== 3) {
        throw new Error('Invalid state JWT')
    }
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '='
    )
    const decoded = JSON.parse(atob(padded)) as Record<string, unknown>
    if (
        decoded &&
        typeof decoded === 'object' &&
        'generatedCode' in decoded
    ) {
        return String(decoded.generatedCode)
    }
    throw new Error('generatedCode not found in JWT')
}