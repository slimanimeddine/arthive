"use client";

import Link from "next/link";
import EmptyUI from "@/components/empty-ui";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListUsers } from "@/hooks/endpoints/users";
import { useSearchQuery } from "@/hooks/params/search-query";

export default function ArtistsSection() {
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string> = {
    ...(searchQuery && { searchQuery }),
  };

  const { isPending, isError, data, error } = useListUsers(queryParams);

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <EmptyUI message="No artist was found" />;
  }

  const artists = data.data;

  const showArtistsViewAll = artists.length > 4;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Artists</h3>
        {showArtistsViewAll && (
          <Link
            href={`/artists?searchQuery=${searchQuery}`}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all {artists.length} artists
          </Link>
        )}
      </div>
      <ul className="space-y-2">
        {artists.slice(0, 4).map((artist) => (
          <li key={artist.id}>
            <Link
              href={`/artists/${artist.username}`}
              className="block rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {artist.first_name} {artist.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
