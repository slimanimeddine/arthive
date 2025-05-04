import ArtistsSection from '@/components/main/artists-section'
import ArtworksSection from '@/components/main/artworks-section'
import Introduction from '@/components/main/introduction'
import { prefetchListPublishedArtworks } from '@/hooks/artworks'
import { prefetchListUsers } from '@/hooks/users'
import seo from '@/lib/seo'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Welcome',
    'Welcome to ArtHive, the platform for traditional artists and art lovers.'
  ),
}

export default async function Page() {
  const queryClient = new QueryClient()

  await prefetchListPublishedArtworks(queryClient, {
    sort: 'trending',
    perPage: 4,
  })

  await prefetchListPublishedArtworks(queryClient, {
    sort: 'new',
    perPage: 4,
  })

  await prefetchListUsers(queryClient, {
    'filter[verified]': true,
  })

  return (
    <>
      <Introduction />
      <ArtworksSection
        title={'Trending'}
        viewMoreLink={'/artworks?artworkSort=trending'}
        sort={'trending'}
      />
      <ArtworksSection
        title={'New & Rising'}
        viewMoreLink={'/artworks?artworkSort=new'}
        sort={'new'}
      />
      <ArtistsSection
        title={'Verified Artists'}
        viewMoreLink={'/artists'}
      />
    </>
  )
}
