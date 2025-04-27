'use client'
import Link from 'next/link'
import ArtistCard from './artist-card'
import { useListUsers } from '@/hooks/users'
import { matchQueryStatus } from '@/lib/utils'
import EmptyUI from '../empty-ui'
import ErrorUI from '../error-ui'
import LoadingUI from '../loading-ui'

type ArtistsSectionProps = {
  title: string
  viewMoreLink: string
}

export default function ArtistsSection({
  title,
  viewMoreLink,
}: ArtistsSectionProps) {
  const artistsQuery = useListUsers({
    'filter[verified]': true,
  })

  return matchQueryStatus(artistsQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const artists = data.data.map((artist) => ({
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
          </div>
        </div>
      )
    },
  })
}
