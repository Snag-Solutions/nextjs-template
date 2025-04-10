'use client'

import { UserProfile } from '@/components/pages/UserProfile'
import SignInWithEthereum from '@/components/SignIn'
import { Header } from '@/components/ui/Header'
import { useAuthAccount } from '@/lib/useAuthAccount'

export const Profile = () => {
  const { isAuthenticated, userId } = useAuthAccount()

  if (!isAuthenticated || !userId) {
    return (
      <div className="flex flex-col gap-8 w-full items-start justify-start">
        <Header as="h1">Profile</Header>
        <Header as="h4">Please sign in to view your profile</Header>
        <SignInWithEthereum />
      </div>
    )
  }

  return <UserProfile userId={userId} />
}
