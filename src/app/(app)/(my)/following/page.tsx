import Following from '@/components/following'
import { prefetchListAuthenticatedUserFollowing } from '@/hooks/follows'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { authHeader } from '@/lib/utils'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Following', 'View the users you are following on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()

  await prefetchListAuthenticatedUserFollowing(queryClient, authHeader(token))

  return <Following token={token} />
}
