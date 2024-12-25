'use client'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
