"use client";

import { useListAuthenticatedUserFollowers } from "@/hooks/endpoints/follows";
import { authHeader, matchQueryStatus } from "@/lib/utils";
import EmptyUI from "../empty-ui";
import ErrorUI from "../error-ui";
import ArtistCard from "../main/artist-card";
import FollowersSkeleton from "./followers-skeleton";
import { useSession } from "@/hooks/session";

export default function Followers() {
  const { token } = useSession()!;
  const listAuthenticatedUserFollowersQuery = useListAuthenticatedUserFollowers(
    authHeader(token),
  );

  return matchQueryStatus(listAuthenticatedUserFollowersQuery, {
    Loading: <FollowersSkeleton />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={"You have no followers"} />,
    Success: ({ data }) => {
      const followers = data.data.map((follower) => ({
        id: follower.id,
        fullName: `${follower.first_name} ${follower.last_name}`,
        username: follower.username,
        country: follower.country,
        profilePictureUrl: follower.photo,
        verified: follower.artist_verified_at ? true : false,
      }));

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
                Followers |{" "}
                <span className="text-lg">{followers.length} people</span>
              </h2>
            </div>

            <ul role="list" className="divide-y divide-gray-100">
              {followers.map((follower) => (
                <li key={follower.id}>
                  <ArtistCard {...follower} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    },
  });
}
