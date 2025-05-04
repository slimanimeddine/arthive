import ArtistsDisplay from '@/components/artists/artists-display'
import { getAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Artists',
    'Discover a diverse range of talented artists from around the world. Explore their unique styles, connect with their work, and find inspiration in the art community.'
  ),
}

export default async function Page() {
  const { token } = await getAuth()

  return <ArtistsDisplay token={token} />
}
