import MyArtworks from '@/components/my-artworks'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('My Artworks', 'View your artworks on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <MyArtworks token={token} />
}
