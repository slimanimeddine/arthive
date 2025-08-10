"use client";

import { useListPublishedArtworks } from "@/hooks/endpoints/artworks";
import { fileUrl } from "@/lib/utils";
import { ArtworkCard } from "../artwork-card";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import ArtworksDisplaySkeleton from "./artworks-display-skeleton";
import { usePage } from "@/hooks/params/page";
import { useArtworkSort } from "@/hooks/params/artwork-sort";
import { useTag } from "@/hooks/params/tag";
import { useSearchQuery } from "@/hooks/params/search-query";
import NoData from "../no-data";

export default function ArtworksDisplayInner() {
  const { page } = usePage();
  const { artworkSort } = useArtworkSort();
  const { tag } = useTag();
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string | number> = {
    perPage: "12",
    ...(tag && { "filter[tag]": tag }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  const { isPending, isError, data, error } =
    useListPublishedArtworks(queryParams);

  if (isPending) {
    return <ArtworksDisplaySkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (data === undefined || data.data.length === 0) {
    return (
      <div className="flex min-h-[50px] items-center justify-center lg:col-span-3">
        <NoData
          title="No Artworks to Display"
          message="No artworks were found matching your criteria. Try adjusting your filters or search query."
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
    artistUsername: artwork.user.username,
    artistFullName: `${artwork.user.first_name} ${artwork.user.last_name}`,
    artistProfilePictureUrl: fileUrl(artwork.user.photo),
  }));
  const links = data.links;
  const meta = data.meta;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <ul
        role="list"
        className="mt-6 mb-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {artworks.map((work) => (
          <li key={work.id}>
            <ArtworkCard {...work} />
          </li>
        ))}
      </ul>
      {meta.total > 12 && (
        <div className="py-8">
          <Pagination links={links} meta={meta} />
        </div>
      )}
    </div>
  );
}
