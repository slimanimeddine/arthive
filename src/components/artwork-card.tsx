import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export type ArtworkCardProps = {
  id: number
  title: string
  image: string
  likes: number
  comments: number
  artistName: string
  artistImage: string
}

export function ArtworkCard({
  id,
  title,
  image,
  likes,
  comments,
  artistName,
  artistImage,
}: ArtworkCardProps) {
  return (
    <Link href={`/artworks/${id}`}>
      <div className="relative">
        <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            alt=""
            src={image}
            className="object-cover"
            width={280}
            height={196}
          />
          <button
            type="button"
            className="absolute inset-0 focus:outline-none"
          >
            <span className="sr-only">View details for {title}</span>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">
            {title}
          </p>
          <div className="flex items-center justify-end gap-x-2">
            <div className="flex items-center gap-x-[1px]">
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm ">{likes}</span>
            </div>
            <div className="flex items-center gap-x-[1px]">
              <ChatBubbleOvalLeftIcon className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex-shrink-0">
            <Image
              alt=""
              src={artistImage}
              className="h-7 w-7 rounded-full"
              width={28}
              height={28}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{artistName}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
