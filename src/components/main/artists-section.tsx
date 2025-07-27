"use client";
import { useListUsers } from "@/hooks/endpoints/users";
import { matchQueryStatus } from "@/lib/utils";
import Link from "next/link";
import ErrorUI from "../error-ui";
import ArtistCard from "./artist-card";
import ArtistsSectionSkeleton from "./artists-section-skeleton";
import NoData from "../no-data";

type ArtistsSectionProps = {
  title: string;
  viewMoreLink: string;
};

export default function ArtistsSection({
  title,
  viewMoreLink,
}: ArtistsSectionProps) {
  const listUsersQuery = useListUsers({
    "filter[verified]": true,
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

        {matchQueryStatus(listUsersQuery, {
          Loading: <ArtistsSectionSkeleton />,
          Errored: <ErrorUI />,
          Empty: (
            <NoData
              title="No verified artists found."
              message="Please check back later."
            />
          ),
          Success: ({ data }) => {
            const artists = data.data.map((artist) => ({
              id: artist.id,
              fullName: `${artist.first_name} ${artist.last_name}`,
              username: artist.username,
              country: artist.country,
              profilePictureUrl: artist.photo,
              verified: artist.artist_verified_at ? true : false,
            }));

            return (
              <ul role="list" className="divide-y divide-gray-100">
                {artists.map((artist) => (
                  <li key={artist.id}>
                    <ArtistCard {...artist} />
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
