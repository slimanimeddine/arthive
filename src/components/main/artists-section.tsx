import Link from 'next/link'
import { ArtistCard } from './artist-card'
import { useListUsers } from '@/api/users/users'

type ArtistsSectionProps = {
  title: string
  viewMoreLink: string
}

export function ArtistsSection({ title, viewMoreLink }: ArtistsSectionProps) {
  const artistsQuery = useListUsers({
    'filter[verified]': true,
  })

  if (artistsQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (artistsQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const artistsQueryData = artistsQuery.data!.data.data!

  const artists = artistsQueryData.map((artist) => ({
    id: artist.id!,
    fullName: `${artist.first_name} ${artist.last_name}`,
    username: artist.username!,
    country: artist.country,
    profilePictureUrl: artist.photo,
    verified: artist.artist_verified_at ? true : false,
  }))

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

        {artistsQuery.isSuccess && artists.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">No artists were found</p>
        )}

        {artistsQuery.isSuccess && artists.length > 0 && (
          <ul
            role="list"
            className="divide-y divide-gray-100"
          >
            {artists.map((artist) => (
              <li key={artist.id}>
                <ArtistCard {...artist} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
