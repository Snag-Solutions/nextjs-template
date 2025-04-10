import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'
import Providers from '@/components/providers/Providers'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Snag Solutions | Demo Template',
  description: 'Web3 Loyalty Program Template Application from Snag Solutions',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
            <Navigation />
            <main className="flex flex-1 flex-col gap-8 p-8 sm:p-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
