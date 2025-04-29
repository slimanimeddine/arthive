'use client'

import { useListAuthenticatedUserFavoriteArtworks } from '@/hooks/favorites'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import ArtworkCard from '../artist-profile/artwork-card'
import EmptyUI from '../empty-ui'
import ErrorUI from '../error-ui'
import LoadingUI from '../loading-ui'

type IndexProps = {
  token: string
}

export default function Index({ token }: IndexProps) {
  const artworksQuery = useListAuthenticatedUserFavoriteArtworks(
    authHeader(token)
  )

  return matchQueryStatus(artworksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const artworks = data.data.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
        likesCount: artwork.artwork_likes_count,
        commentsCount: artwork.artwork_comments_count,
      }))

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
                Favorites |{' '}
                <span className="text-lg">
                  {artworks.length} saved artworks
                </span>
              </h2>
            </div>

            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
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
    },
  })
}
