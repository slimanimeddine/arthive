import VerifyEmail from '@/components/verify-email'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Verify Email', 'Verify your email on ArtHive'),
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { token } = await verifyAuth()
  const { slug } = await params
  return (
    <VerifyEmail
      token={token}
      slug={slug}
    />
  )
}
