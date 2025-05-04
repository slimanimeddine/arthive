import ArtworksDisplay from '@/components/artworks/artworks-display'
import { prefetchListPublishedArtworks } from '@/hooks/artworks'
import seo from '@/lib/seo'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Artworks',
    'Explore a wide range of artworks from talented artists around the world. Discover, appreciate, and connect with art like never before.'
  ),
}

export default async function Page() {
  const queryClient = new QueryClient()

  await prefetchListPublishedArtworks(queryClient)

  return <ArtworksDisplay />
}
