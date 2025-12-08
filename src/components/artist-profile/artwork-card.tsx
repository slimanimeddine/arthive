import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type ArtworkCardProps = {
  id: string;
  title: string;
  mainPhotoUrl: string;
  likesCount: number;
  commentsCount: number;
};

export default function ArtworkCard({
  id,
  title,
  mainPhotoUrl,
  likesCount,
  commentsCount,
}: ArtworkCardProps) {
  return (
    <div>
      <div className="relative">
        <Link
          href={`/artworks/${id}`}
          className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          <Image
            unoptimized
            alt=""
            src={mainPhotoUrl}
            className="object-cover"
            width={280}
            height={196}
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {title}</span>
          </button>
        </Link>
        <Link
          href={`/artworks/${id}`}
          className="mt-2 flex items-center justify-between"
        >
          <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">
            {title ?? ""}
          </p>
          <div className="flex items-center justify-end gap-x-2">
            <div className="flex items-center gap-x-px">
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm">{likesCount}</span>
            </div>
            <div className="flex items-center gap-x-px">
              <ChatBubbleOvalLeftIcon className="h-4 w-4" />
              <span className="text-sm">{commentsCount}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
