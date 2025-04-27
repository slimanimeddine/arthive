import ArtworksDisplay from '@/components/artworks/artworks-display'
import { prefetchListPublishedArtworks } from '@/hooks/artworks'
import { QueryClient } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await prefetchListPublishedArtworks(queryClient)

  return <ArtworksDisplay />
}
