import ArtistsDisplay from '@/components/artists/artists-display'
import { getAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await getAuth()

  return <ArtistsDisplay token={token} />
}
