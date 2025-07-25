import { fileUrl } from "@/lib/utils";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceholder from "../avatar-placeholder";

type ArtistCardProps = {
  fullName: string;
  country: string | undefined;
  username: string;
  profilePictureUrl: string | undefined;
  verified: boolean;
};

export default function ArtistCard({
  fullName,
  country,
  profilePictureUrl,
  username,
  verified,
}: ArtistCardProps) {
  return (
    <div className="flex items-center justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        {profilePictureUrl ? (
          <Image
            alt=""
            src={fileUrl(profilePictureUrl)!}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            height={48}
            width={48}
          />
        ) : (
          <AvatarPlaceholder size={12} />
        )}
        <div className="min-w-0 flex-auto">
          <p className="inline-flex items-center gap-x-1 text-sm leading-6 font-semibold text-gray-900">
            {fullName}{" "}
            {verified && <CheckBadgeIcon className="h-4 w-4 text-green-500" />}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {country}
          </p>
        </div>
      </div>
      <Link
        href={`/artists/${username}`}
        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        View
      </Link>
    </div>
  );
}
