'use client'
import { ArtistsSection } from '@/components/main/artists-section'
import { Introduction } from '@/components/main/introduction'
import { ArtworksSection } from '@/components/main/artworks-section'

const artists = Array.from(Array(6).keys()).map((i) => ({
  id: i,
  name: 'Leslie Alexander',
  country: 'Ukraine',
  imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}))

export default function Page() {
  return (
    <>
      <Introduction />
      <ArtworksSection
        title={'Trending'}
        viewMoreLink={'/artworks?filter=trending'}
        sort={'trending'}
      />
      <ArtworksSection
        title={'New & Rising'}
        viewMoreLink={'/artworks?filter=new'}
        sort={'new'}
      />
      <ArtistsSection
        title={'Verified Artists'}
        viewMoreLink={'/artists?filter=verified'}
        artists={artists}
      />
    </>
  )
}
