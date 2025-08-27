"use client";

import EmptyUI from "@/components/empty-ui";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListPublishedArtworks } from "@/hooks/endpoints/artworks";
import { useSearchQuery } from "@/hooks/params/search-query";
import Link from "next/link";

export default function ArtworksSection() {
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string> = {
    ...(searchQuery && { searchQuery }),
  };

  const { isPending, isError, data, error } =
    useListPublishedArtworks(queryParams);

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <EmptyUI message={"No artwork was found"} />;
  }

  const artworks = data.data;

  const showArtworksViewAll = artworks.length > 4;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Artworks</h3>
        {showArtworksViewAll && (
          <Link
            href={`/artworks?searchQuery=${searchQuery}`}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all {artworks.length} artworks
          </Link>
        )}
      </div>
      <ul className="space-y-2">
        {artworks.slice(0, 4).map((artist) => (
          <li key={artist.id}>
            <Link
              href={`/artworks/${artist.id}`}
              className="block rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {artist.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
