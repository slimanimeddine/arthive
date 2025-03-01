'use client'
import { ArtistsSection } from '@/components/main/artists-section'
import { Introduction } from '@/components/main/introduction'
import { ArtworksSection } from '@/components/main/artworks-section'

export default function Page() {
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
