import Favorites from '@/components/favorites'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Favorite Artworks', 'View your favorite artworks on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <Favorites token={token} />
}
