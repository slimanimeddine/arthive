import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceholder from "./avatar-placeholder";

type ArtworkCardProps = {
  id: string;
  title: string;
  mainPhotoUrl: string;
  likesCount: number;
  commentsCount: number;
  artistUsername: string;
  artistFullName: string;
  artistProfilePictureUrl: string | undefined;
};

export function ArtworkCard({
  id,
  title,
  mainPhotoUrl,
  likesCount,
  commentsCount,
  artistUsername,
  artistFullName,
  artistProfilePictureUrl,
}: ArtworkCardProps) {
  return (
    <div className="relative hover:cursor-pointer">
      <Link
        href={`/artworks/${id}`}
        className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
      >
        <Image
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
      <Link
        href={`/artists/${artistUsername}`}
        className="mt-2 flex items-center space-x-3"
      >
        <div className="shrink-0">
          {artistProfilePictureUrl ? (
            <Image
              alt=""
              src={artistProfilePictureUrl}
              className="h-8 w-8 rounded-full"
              width={28}
              height={28}
            />
          ) : (
            <AvatarPlaceholder size={8} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 hover:underline">
            {artistFullName}
          </p>
        </div>
      </Link>
    </div>
  );
}
