"use client";

import { useListUsers } from "@/hooks/endpoints/users";
import ErrorUI from "../error-ui";
import NoData from "../no-data";
import ArtistCard from "./artist-card";
import ArtistsSectionSkeleton from "./artists-section-skeleton";

export default function ArtistsSectionInner() {
  const { isPending, isError, data, error } = useListUsers({
    "filter[verified]": true,
  });

  if (isPending) {
    return <ArtistsSectionSkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <NoData
        title="No verified artists found."
        message="Please check back later."
      />
    );
  }

  const artists = data.data.map((artist) => ({
    id: artist.id,
    fullName: `${artist.first_name} ${artist.last_name}`,
    username: artist.username,
    country: artist.country,
    profilePictureUrl: artist.photo,
    verified: !!artist.artist_verified_at,
  }));

  return (
    <ul className="divide-y divide-gray-100">
      {artists.map((artist) => (
        <li key={artist.id}>
          <ArtistCard {...artist} />
        </li>
      ))}
    </ul>
  );
}
