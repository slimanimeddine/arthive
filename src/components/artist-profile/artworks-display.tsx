'use client'
import ArtworkCard from './artwork-card'
import { useSearchParams } from 'next/navigation'
import { fileUrl, matchQueryStatus } from '@/lib/utils'
import Pagination from '../pagination'
import SortFilterArtworks from '../artworks/sort-filter-artworks'
import { useListUserPublishedArtworks } from '@/hooks/artworks'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'

type ArtworksDisplayProps = {
  username: string
}

export default function ArtworksDisplay({ username }: ArtworksDisplayProps) {
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

  const artworksQuery = useListUserPublishedArtworks(username, queryParams)

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

      const links = data.links
      const meta = data.meta

      return (
        <div className="sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2">
          {artworks.length > 4 && <SortFilterArtworks />}

          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <ul
                role="list"
                className="mt-6 mb-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
              >
                {artworks.map((work) => (
                  <li key={work.id}>
                    <ArtworkCard {...work} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {meta.total > 12 && (
            <div className="pt-8">
              <Pagination
                links={links}
                meta={meta}
              />
            </div>
          )}
        </div>
      )
    },
  })
}
