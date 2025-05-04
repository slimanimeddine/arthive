import Following from '@/components/following'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Following', 'View the users you are following on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <Following token={token} />
}
