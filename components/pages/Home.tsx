'use client'

import { useWebsiteContext } from '@/components/providers/WebsiteProvider'
import { Code } from '@/components/ui/Code'
import { Header } from '@/components/ui/Header'

export const Home = () => {
  const { website, isLoading } = useWebsiteContext()

  if (isLoading) {
    return (
      <div className="flex flex-row gap-8 w-full items-start justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 w-full items-start justify-start">
      <Header as="h1">{website?.name || 'Home'}</Header>
      <Header as="h5">{website?.id}</Header>
      <Code data={website} />
      <hr className="border-accent w-full" />
      <div className="flex flex-col gap-4 items-start justify-start">
        <Header as="h5">Collections</Header>
        <ul className="flex flex-col gap-4 items-start justify-start list-disc list-inside ">
          {(website?.collections || []).map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
