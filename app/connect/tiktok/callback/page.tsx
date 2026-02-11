import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ error?: string; state?: string; code?: string }>
}

/**
 * Handles redirect from TikTok OAuth flow.
 * Snag redirects here with ?error=...&state=...&code=...
 */
export default async function TiktokCallbackPage({ searchParams }: Props) {
  const params = await searchParams
  const { error } = params

  if (error === 'INVALID_TIKTOK_CODE') {
    redirect('/rules?error=INVALID_TIKTOK_CODE')
  }

  redirect('/rules?tiktok=success')
}
