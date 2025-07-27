"use client";
import {
  type ListPublishedArtworksParams,
  useListPublishedArtworks,
} from "@/hooks/endpoints/artworks";
import { fileUrl, matchQueryStatus } from "@/lib/utils";
import Link from "next/link";
import ErrorUI from "../error-ui";
import ArtworksSectionSkeleton from "./artworks-section-skeleton";
import NoData from "../no-data";
import { ArtworkCard } from "../artwork-card";

type ArtworksSectionProps = {
  title: string;
  viewMoreLink: string;
  sort: ListPublishedArtworksParams["sort"];
};

export default function ArtworksSection({
  title,
  viewMoreLink,
  sort,
}: ArtworksSectionProps) {
  const listPublishedArtworksQuery = useListPublishedArtworks({
    sort,
    perPage: 4,
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <Link
            className="ml-6 text-sm font-semibold whitespace-nowrap text-indigo-500 hover:text-indigo-600"
            href={viewMoreLink}
          >
            View more <span aria-hidden="true">→</span>
          </Link>
        </div>

        {matchQueryStatus(listPublishedArtworksQuery, {
          Loading: <ArtworksSectionSkeleton />,
          Errored: <ErrorUI />,
          Empty: (
            <NoData
              title="No Artworks to Display"
              message="No artworks were found matching this criteria. Please check back later."
            />
          ),
          Success: ({ data }) => {
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
          },
        })}
      </div>
    </div>
  );
}
