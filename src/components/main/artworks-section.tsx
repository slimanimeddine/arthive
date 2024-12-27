import Link from 'next/link'
import { ArtworkCard, ArtworkCardProps } from '../artwork-card'

type ArtWork = { id: number } & ArtworkCardProps

type ArtworksSectionProps = {
  title: string
  viewMoreLink: string
  artworks: ArtWork[]
}

export function ArtworksSection({
  title,
  viewMoreLink,
  artworks,
}: ArtworksSectionProps) {
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
