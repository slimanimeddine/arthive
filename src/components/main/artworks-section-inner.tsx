"use client";
import {
  type ListPublishedArtworksParams,
  useListPublishedArtworks,
} from "@/hooks/endpoints/artworks";
import { fileUrl } from "@/lib/utils";
import ErrorUI from "../error-ui";
import ArtworksSectionSkeleton from "./artworks-section-skeleton";
import NoData from "../no-data";
import { ArtworkCard } from "../artwork-card";

type ArtworksSectionProps = {
  sort: ListPublishedArtworksParams["sort"];
};

export default function ArtworksSectionInner({ sort }: ArtworksSectionProps) {
  const { isPending, isError, data, error } = useListPublishedArtworks({
    sort,
    perPage: 4,
  });

  if (isPending) {
    return <ArtworksSectionSkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <NoData
        title="No Artworks to Display"
        message="No artworks were found matching this criteria. Please check back later."
      />
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

  return (
    <ul
      role="list"
      className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <ArtworkCard {...artwork} />
        </li>
      ))}
    </ul>
  );
}
