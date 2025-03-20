'use client'

import { useListAuthenticatedUserFavoriteArtworks } from '@/api/favorites/favorites'
import { fileUrl } from '@/lib/utils'
import { ArtworkCard } from '../artist-profile/artwork-card'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'

export function Index() {
  const token = useGetAuthenticatedUserToken()
  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const artworksQuery = useListAuthenticatedUserFavoriteArtworks(axiosConfig)

  if (artworksQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (artworksQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        {artworksQuery.error?.response?.data.message}
      </p>
    )
  }

  const artworksQueryData = artworksQuery.data!.data.data!

  const artworks = artworksQueryData.map((artwork) => ({
    id: artwork.id!,
    title: artwork.title!,
    mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path!)!,
    likesCount: artwork.artwork_likes_count!,
    commentsCount: artwork.artwork_comments_count!,
  }))

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Favorites |{' '}
            <span className="text-xl">{artworks.length} artworks</span>
          </h2>
        </div>

        {artworksQuery.isSuccess && artworks.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">No artworks were found</p>
        )}

        {artworksQuery.isSuccess && artworks.length > 0 && (
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
        )}
      </div>
    </div>
  )
}
