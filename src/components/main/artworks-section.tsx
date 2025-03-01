import Link from 'next/link'
import { ArtworkCard } from '../artwork-card'
import { useListPublishedArtworks } from '@/api/artworks/artworks'
import { fileUrl } from '@/lib/utils'
import { ListPublishedArtworksSort } from '@/api/model'
import { ArtworkCardSkeleton } from '../ui-skeletons/artwork-card-skeleton'

type ArtworksSectionProps = {
  title: string
  viewMoreLink: string
  sort: ListPublishedArtworksSort
}

export function ArtworksSection({
  title,
  viewMoreLink,
  sort,
}: ArtworksSectionProps) {
  const artworksQuery = useListPublishedArtworks({
    sort,
    perPage: 4,
  })

  const artworksQueryData = artworksQuery.data?.data?.data

  const artworks =
    artworksQueryData?.map((artwork) => ({
      id: artwork.id!,
      title: artwork.title,
      mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
      likesCount: artwork.artwork_likes_count!,
      commentsCount: artwork.artwork_comments_count!,
      artistUsername: artwork.user!.username!,
      artistFullName: `${artwork.user?.first_name} ${artwork.user?.last_name}`,
      artistProfilePictureUrl: fileUrl(artwork.user?.photo),
    })) ?? []

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <Link
            className="ml-6 text-sm font-semibold whitespace-nowrap text-indigo-500 hover:text-indigo-600"
            href={viewMoreLink}
          >
            View more <span aria-hidden="true">→</span>
          </Link>
        </div>
        {artworksQuery.isError && (
          <p className="mt-2 text-sm text-red-700">
            We&apos;re sorry, something went wrong.
          </p>
        )}

        {artworksQuery.isPending && (
          <ul
            role="list"
            className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {[...Array(10)].map((_, index) => (
              <li key={index}>
                <ArtworkCardSkeleton />
              </li>
            ))}
          </ul>
        )}

        {artworksQuery.isSuccess && artworks.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">No artworks were found</p>
        )}

        {artworksQuery.isSuccess && artworks.length > 0 && (
          <ul
            role="list"
            className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {artworks?.map((artwork) => (
              <li key={artwork.id}>
                <ArtworkCard {...artwork} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
