'use client'
import { useSearchParams } from 'next/navigation'
import { ArtworkCard } from '../artwork-card'
import Pagination from '../pagination'
import SortFilterArtworks from './sort-filter-artworks'
import { fileUrl, matchQueryStatus } from '@/lib/utils'
import { useListPublishedArtworks } from '@/hooks/artworks'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'

export default function ArtworksDisplay() {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const artworkSort = searchParams.get('artworkSort')
  const tag = searchParams.get('tag')

  const queryParams: Record<string, string> = {
    perPage: '12',
    ...(tag && { 'filter[tag]': tag }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  }

  const listPublishedArtworksQuery = useListPublishedArtworks(queryParams)

  return matchQueryStatus(listPublishedArtworksQuery, {
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
        artistUsername: artwork.user.username,
        artistFullName: `${artwork.user.first_name} ${artwork.user.last_name}`,
        artistProfilePictureUrl: fileUrl(artwork.user.photo),
      }))
      const links = data.links
      const meta = data.meta
      return (
        <div className="flex flex-col">
          <div className="pt-8">
            <SortFilterArtworks />
          </div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <ul
                role="list"
                className="mt-6 mb-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
              >
                {artworks.map((work) => (
                  <li key={work.id}>
                    <ArtworkCard {...work} />
                  </li>
                ))}
              </ul>
              <div className="py-8">
                <Pagination
                  links={links}
                  meta={meta}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
  })
}
