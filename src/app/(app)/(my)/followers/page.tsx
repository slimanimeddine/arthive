import Followers from '@/components/followers'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Followers', 'View your followers on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <Followers token={token} />
}
