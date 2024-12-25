import Link from 'next/link'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export type ArtistCardProps = {
  name: string
  country: string
  imageUrl: string
  href: string
}

export function ArtistCard({ name, country, imageUrl, href }: ArtistCardProps) {
  return (
    <div className="flex items-center justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <Image
          alt=""
          src={imageUrl}
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          height={48}
          width={48}
        />
        <div className="min-w-0 flex-auto">
          <p className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            {name} <CheckBadgeIcon className="h-4 w-4 text-green-500" />
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {country}
          </p>
        </div>
      </div>
      <Link
        href={href}
        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        View
      </Link>
    </div>
  )
}
