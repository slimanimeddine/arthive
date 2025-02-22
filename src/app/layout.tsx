import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import TanQueryClientProvider from '@/providers/query-client-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ArtHive',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TanQueryClientProvider>
      <html
        lang="en"
        className="h-full"
      >
        <body className={`${inter.className} antialiased h-full`}>
          {children}
          <Toaster />
        </body>
      </html>
    </TanQueryClientProvider>
  )
}
