'use client'

import { Button } from '@/components/ui/Button'
import { Header } from '@/components/ui/Header'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 w-full items-start justify-start">
      <Header as="h1">Page Not Found</Header>
      <Button
        onClick={() => {
          router.push('/')
        }}
      >
        Go Home
      </Button>
    </div>
  )
}
