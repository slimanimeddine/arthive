"use client";

import { useListUsers } from "@/hooks/endpoints/users";
import { useArtistSort } from "@/hooks/params/artist-sort";
import { useCategory } from "@/hooks/params/category";
import { useCountry } from "@/hooks/params/country";
import { usePage } from "@/hooks/params/page";
import { useSearchQuery } from "@/hooks/params/search-query";
import ArtistsDisplaySkeleton from "./artists-display-skeleton";
import ErrorUI from "../error-ui";
import NoData from "../no-data";
import ArtistCard from "./artist-card";
import Pagination from "../pagination";

export default function ArtistsDisplayInner() {
  const { page } = usePage();
  const { artistSort } = useArtistSort();
  const { category } = useCategory();
  const { country } = useCountry();
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string | number> = {
    include: "publishedArtworks",
    ...(country && { "filter[country]": country }),
    ...(category && { "filter[tag]": category }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  const { isPending, isError, data, error } = useListUsers(queryParams);

  if (isPending) {
    return <ArtistsDisplaySkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex min-h-[50px] items-center justify-center lg:col-span-3">
        <NoData
          title="No Artists to Display"
          message="No artists were found matching your criteria. Try adjusting your filters or search query."
        />
      </div>
    );
  }

  const artists = data.data.map((artist) => ({
    id: artist.id,
    fullName: `${artist.first_name} ${artist.last_name}`,
    username: artist.username,
    country: artist.country,
    profilePictureUrl: artist.photo,
    description: artist.bio,
    artworks: artist.published_artworks.slice(0, 3).map((artwork) => ({
      id: artwork.id,
      mainPhotoUrl: artwork.artwork_main_photo_path,
    })),
  }));

  const links = data.links;
  const meta = data.meta;

  return (
    <div className="lg:col-span-3">
      <ul className="mb-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {artists.map((artist) => (
          <li key={artist.id}>
            <ArtistCard {...artist} />
          </li>
        ))}
      </ul>
      {meta.total > 10 && (
        <div className="pt-8">
          <Pagination links={links} meta={meta} />
        </div>
      )}
    </div>
  );
}
