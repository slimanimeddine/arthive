"use client";

import { useListUserPublishedArtworks } from "@/hooks/endpoints/artworks";
import { fileUrl } from "@/lib/utils";
import { notFound, useParams } from "next/navigation";
import SortFilterArtworks from "../artworks/sort-filter-artworks";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import ArtworkCard from "./artwork-card";
import ArtworksDisplaySkeleton from "./artworks-display-skeleton";
import { usePage } from "@/hooks/params/page";
import { useArtworkSort } from "@/hooks/params/artwork-sort";
import { useTag } from "@/hooks/params/tag";
import NoData from "../no-data";

export default function ArtworksDisplay() {
  const { username } = useParams<{ username: string }>();
  const { page } = usePage();
  const { artworkSort } = useArtworkSort();
  const { tag } = useTag();

  const queryParams: Record<string, string | number> = {
    perPage: "12",
    ...(tag && { "filter[tag]": tag }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  };

  const { isPending, isError, data, error } = useListUserPublishedArtworks(
    username,
    queryParams,
  );

  if (isPending) {
    return <ArtworksDisplaySkeleton />;
  }

  if (isError) {
    if (error.isAxiosError && error.response?.status === 404) {
      notFound();
    }

    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center lg:col-span-2">
        <NoData
          title="No Artworks to Display"
          message="This user has not published any artworks yet."
        />
      </div>
    );
  }

  const artworks = data.data.map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
    likesCount: artwork.artwork_likes_count,
    commentsCount: artwork.artwork_comments_count,
  }));

  const links = data.links;
  const meta = data.meta;

  return (
    <div className="sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2">
      {artworks.length > 4 && <SortFilterArtworks />}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <ul
            role="list"
            className="mt-6 mb-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
          >
            {artworks.map((work) => (
              <li key={work.id}>
                <ArtworkCard {...work} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {meta.total > 12 && (
        <div className="pt-8">
          <Pagination links={links} meta={meta} />
        </div>
      )}
    </div>
  );
}
