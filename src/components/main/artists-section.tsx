import Link from 'next/link'
import { ArtistCard, ArtistCardProps } from './artist-card'

type Artist = { id: number } & ArtistCardProps

type ArtistsSectionProps = {
  title: string
  viewMoreLink: string
  artists: Artist[]
}

export function ArtistsSection({
  title,
  viewMoreLink,
  artists,
}: ArtistsSectionProps) {
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
}
