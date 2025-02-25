import { fileUrl } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

type Artwork = {
  id: number
  mainPhotoUrl: string
}

type ArtistCardProps = {
  id: number
  fullName: string
  starsCount: number
  username: string
  country: string | undefined
  profilePictureUrl: string | undefined
  description: string | undefined
  artworks: Artwork[]
}

export function ArtistCard({
  id,
  fullName,
  starsCount,
  username,
  country,
  profilePictureUrl,
  description,
  artworks,
}: ArtistCardProps) {
  return (
    <div className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <span className="block shrink-0">
          {profilePictureUrl ? (
            <Image
              alt=""
              src={fileUrl(profilePictureUrl)!}
              className="size-14 w-14 rounded-lg object-cover"
              width={56}
              height={56}
            />
          ) : (
            <span
              className={
                'inline-block overflow-hidden rounded-lg bg-gray-100 w-14 h-14 '
              }
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-full w-full text-gray-300"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
        </span>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium sm:text-lg">
              <Link href={`/artists/${id}`}>{fullName}</Link>
            </h3>

            <button className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Follow
            </button>
          </div>

          <p className="line-clamp-2 text-sm text-gray-700">{description}</p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <p className="text-xs">{starsCount} stars</p>
            </div>

            <span aria-hidden="true">&middot;</span>

            <p className="text-xs text-gray-500">@{username}</p>

            <span aria-hidden="true">&middot;</span>

            <p className="text-xs text-gray-500">{country}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-x-1 p-1">
        {artworks.map((artwork) => (
          <Link
            href={`/artworks/${artwork.id}`}
            key={artwork.id}
            className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
          >
            <Image
              alt=""
              src={fileUrl(artwork.mainPhotoUrl)!}
              className="object-cover"
              width={128}
              height={128}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
