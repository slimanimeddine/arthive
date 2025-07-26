"use client";

import EmptyUI from "@/components/empty-ui";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListPublishedArtworks } from "@/hooks/endpoints/artworks";
import { useSearchQuery } from "@/hooks/params/search-query";
import { matchQueryStatus } from "@/lib/utils";
import Link from "next/link";

export default function ArtworksSection() {
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string> = {
    ...(searchQuery && { searchQuery }),
  };

  const listPublishedArtworksQuery = useListPublishedArtworks(queryParams);

  return matchQueryStatus(listPublishedArtworksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={"No artwork was found"} />,
    Success: ({ data }) => {
      const artworks = data.data;

      const showArtworksViewAll = artworks.length > 4;

      const displayedArtworks = showArtworksViewAll
        ? artworks.slice(0, 4)
        : artworks;

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
          {displayedArtworks.length > 0 ? (
            <ul className="space-y-2">
              {displayedArtworks.map((artist) => (
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
          ) : (
            <EmptyUI message={"No artwork was found"} />
          )}
        </div>
      );
    },
  });
}
