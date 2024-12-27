import { ArtistsSection } from '@/components/main/artists-section'
import { Introduction } from '@/components/main/introduction'
import { ArtworksSection } from '@/components/main/artworks-section'

const artworks = Array.from(Array(4).keys()).map((i) => ({
  id: i,
  title: 'fried eggs',
  image:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  likes: 21,
  comments: 32,
  artistName: 'hendrix',
  artistImage:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
}))

const artists = Array.from(Array(6).keys()).map((i) => ({
  id: i,
  name: 'Leslie Alexander',
  country: 'Ukraine',
  imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  href: '#',
}))

export default function Page() {
  return (
    <>
      <Introduction />
      <ArtworksSection
        title={'Trending'}
        viewMoreLink={'/artworks?filter=trending'}
        artworks={artworks}
      />
      <ArtworksSection
        title={'New & Rising'}
        viewMoreLink={'/artworks?filter=new'}
        artworks={artworks}
      />
      <ArtistsSection
        title={'Verified Artists'}
        viewMoreLink={'/artists?filter=verified'}
        artists={artists}
      />
    </>
  )
}
