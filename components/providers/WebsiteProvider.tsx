'use client'

import { getWebsite } from '@/lib/actions/getWebsite'
import { WebsiteListResponse } from '@snagsolutions/sdk/resources/index.mjs'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface WebsiteContextType {
  website?: WebsiteListResponse.Data
  isLoading: boolean
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined)

export const WebsiteProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WebsiteListResponse.Data | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      const website = await getWebsite()
      setData(website.data?.[0])
      setIsLoading(false)
    }
    fetchInitialData()
  }, [])

  return (
    <WebsiteContext.Provider value={{ website: data, isLoading }}>
      {children}
    </WebsiteContext.Provider>
  )
}

export const useWebsiteContext = () => {
  const context = useContext(WebsiteContext)
  if (!context) {
    throw new Error('useWebsiteContext must be used within a WebsiteProvider')
  }
  return context
}
