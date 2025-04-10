'use client'

import SignIn from '@/components/SignIn'
import { routes } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'

export const Navigation = () => {
  return (
    <header className="h-16 min-h-16 flex gap-6 flex-wrap items-center justify-start px-8 sm:px-16">
      <div className="flex flex-row gap-4 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={120} height={44} />
          </Link>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          {routes.map((r) => (
            <Link
              key={r.path}
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href={r.path}
            >
              {r.name}
            </Link>
          ))}
          <SignIn />
        </div>
      </div>
    </header>
  )
}
