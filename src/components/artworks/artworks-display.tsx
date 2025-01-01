import { ArtworkCard } from '../artwork-card'
import { ArtworkPostModal } from '../artwork-post/post-modal'

const artworks = Array.from(Array(30).keys()).map((i) => ({
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

export function ArtworksDisplay() {
  return (
    <div className="bg-white">
      <ArtworkPostModal />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          role="list"
          className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {artworks.map((work) => (
            <li key={work.id}>
              <ArtworkCard {...work} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
