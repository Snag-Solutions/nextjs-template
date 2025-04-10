import { Leaderboard } from '@/components/pages'
import { getLeaderboardAccounts } from '@/lib/actions/getLeaderboardAccounts'

export default async function LeaderboardPage() {
  const initialData = await getLeaderboardAccounts()

  return <Leaderboard initialData={initialData} />
}
