import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

type ArtistCardProps = {
  id: number
  name: string
  stars: number
  username: string
  country: string
  image: string
  description: string
}

export function ArtistCard({
  id,
  name,
  stars,
  username,
  country,
  image,
  description,
}: ArtistCardProps) {
  return (
    <div className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <span className="block shrink-0">
          <Image
            alt=""
            src={image}
            className="size-14 rounded-lg object-cover"
            width={56}
            height={56}
          />
        </span>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium sm:text-lg">
              <Link href={`/artists/${id}`}>{name}</Link>
            </h3>

            <button className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Follow
            </button>
          </div>

          <p className="line-clamp-2 text-sm text-gray-700">{description}</p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <p className="text-xs">{stars} stars</p>
            </div>

            <span aria-hidden="true">&middot;</span>

            <p className="text-xs text-gray-500">@{username}</p>

            <span aria-hidden="true">&middot;</span>

            <p className="text-xs text-gray-500">{country}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-x-1 p-1">
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            alt=""
            src={image}
            className="object-cover"
            width={128}
            height={128}
          />
        </div>
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            alt=""
            src={image}
            className="object-cover"
            width={128}
            height={128}
          />
        </div>
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            alt=""
            src={image}
            className="object-cover"
            width={128}
            height={128}
          />
        </div>
      </div>
    </div>
  )
}
