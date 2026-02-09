export const tiktokConnect = async (state: string) => {
    const code = decodeCustomAuthStateJwt(state)
    
    const confirmed = window.confirm(
      `Add this code to your TikTok bio: ${code}\n\nClick OK once you have updated your bio.`
    )
    if (!confirmed) return
    
    const tiktokProfileUrl = window.prompt(
      'Enter your TikTok profile URL (e.g. https://www.tiktok.com/@username):'
    )
    if (!tiktokProfileUrl?.trim()) return

    const url = new URL(`https://admin.snagsolutions.io/api/tiktok/auth/connect`)
    url.searchParams.set('state', state)
    url.searchParams.set('tiktokProfileUrl', tiktokProfileUrl)
    url.searchParams.set('responseType', 'redirect')
    
    window.location.href = url.toString()
  }


  export const redditConnect = async (state: string) => {
    const code = decodeCustomAuthStateJwt(state)
    
    const confirmed = window.confirm(
      `Add this code to your Reddit description bio: ${code}\n\nClick OK once you have updated your profile.`
    )
    if (!confirmed) return
    
    const redditProfileUrl = window.prompt(
      'Enter your Reddit profile URL (e.g. https://www.reddit.com/user/username):'
    )
    if (!redditProfileUrl?.trim()) return

    const url = new URL(`https://admin.snagsolutions.io/api/reddit/auth/connect`)
    url.searchParams.set('state', state)
    url.searchParams.set('redditProfileUrl', redditProfileUrl)
    url.searchParams.set('responseType', 'redirect')
    
    window.location.href = url.toString()
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