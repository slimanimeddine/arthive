import { fileUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./follow-button";

type Artwork = {
  id: string;
  mainPhotoUrl: string;
};

type ArtistCardProps = {
  token: string | undefined;
  id: string;
  fullName: string;
  username: string;
  country: string | undefined;
  profilePictureUrl: string | undefined;
  description: string | undefined;
  artworks: Artwork[];
};

export default function ArtistCard({
  token,
  id,
  fullName,
  username,
  country,
  profilePictureUrl,
  description,
  artworks,
}: ArtistCardProps) {
  return (
    <div className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <div className="flex items-start gap-4">
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
                  "inline-block h-14 w-14 overflow-hidden rounded-lg bg-gray-100"
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
                <Link href={`/artists/${username}`}>{fullName}</Link>
              </h3>
              <FollowButton token={token} userId={id} />
            </div>

            <p className="line-clamp-2 text-sm text-gray-700">{description}</p>

            <div className="mt-2 flex items-center gap-2">
              <p className="text-xs text-gray-500">@{username}</p>

              <span aria-hidden="true">&middot;</span>

              <p className="text-xs text-gray-500">{country}</p>
            </div>
          </div>
        </div>
        {artworks.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">
            {fullName} has not submitted any artworks yet.
          </p>
        )}
      </div>
      {artworks.length > 0 && (
        <div className="flex items-center justify-start gap-x-1 p-1">
          {artworks.map((artwork) => (
            <Link
              href={`/artworks/${artwork.id}`}
              key={artwork.id}
              className="group block h-32 w-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
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
      )}
    </div>
  );
}
