"use client";

import { useListAuthenticatedUserFavoriteArtworks } from "@/hooks/endpoints/favorites";
import { authHeader, fileUrl, matchQueryStatus } from "@/lib/utils";
import ErrorUI from "../error-ui";
import EmptyUI from "../empty-ui";
import ArtworkCard from "../artist-profile/artwork-card";
import FavoritesSkeleton from "./favorites-skeleton";
import { useSession } from "@/hooks/session";

export default function Favorites() {
  const { token } = useSession()!;
  const artworksQuery = useListAuthenticatedUserFavoriteArtworks(
    authHeader(token),
  );

  return matchQueryStatus(artworksQuery, {
    Loading: <FavoritesSkeleton />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={"You have no bookmarked artworks"} />,
    Success: ({ data }) => {
      const artworks = data.data.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
        likesCount: artwork.artwork_likes_count,
        commentsCount: artwork.artwork_comments_count,
      }));

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
                Favorites |{" "}
                <span className="text-lg">
                  {artworks.length} saved artworks
                </span>
              </h2>
            </div>

            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
            >
              {artworks.map((work) => (
                <li key={work.id}>
                  <ArtworkCard {...work} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    },
  });
}
