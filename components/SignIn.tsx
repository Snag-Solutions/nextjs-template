import { Button } from '@/components/ui/Button'
import { truncateAddress } from '@/lib/truncateAddress'
import { useAuthAccount } from '@/lib/useAuthAccount'

export default function SignInWithEthereum() {
  const { connect, disconnect, isAuthenticated, walletAddress } =
    useAuthAccount()

  return (
    <div className="flex items-stretch justify-stretch">
      {isAuthenticated && walletAddress ? (
        <Button onClick={disconnect}>{truncateAddress(walletAddress)}</Button>
      ) : (
        <Button onClick={connect}>Sign In</Button>
      )}
    </div>
  )
}
