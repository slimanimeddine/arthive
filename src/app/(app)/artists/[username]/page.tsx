import ArtistProfile from "@/components/artist-profile";
import {
  prefetchListUserReceivedLikesCountByTag,
  prefetchShowUserReceivedLikesCount,
} from "@/hooks/artwork-likes";
import { prefetchListUserPublishedArtworks } from "@/hooks/artworks";
import { prefetchShowUser, showUser } from "@/hooks/users";
import { getAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const artist = await showUser(username);

  return {
    ...seo(artist.data.username, artist.data.bio ?? ""),
  };
}

export default async function Page({ params }: Props) {
  const username = (await params).username;
  const { token } = await getAuth();

  const queryClient = new QueryClient();

  await prefetchShowUser(queryClient, username);

  await prefetchListUserPublishedArtworks(queryClient, username);

  await prefetchListUserReceivedLikesCountByTag(queryClient, username);

  await prefetchShowUserReceivedLikesCount(queryClient, username);

  return <ArtistProfile token={token} username={username} />;
}
