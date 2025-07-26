import ArtistProfile from "@/components/artist-profile";
import {
  prefetchListUserReceivedLikesCountByTag,
  prefetchShowUserReceivedLikesCount,
} from "@/hooks/endpoints/artwork-likes";
import { prefetchListUserPublishedArtworks } from "@/hooks/endpoints/artworks";
import { prefetchShowUser, showUser } from "@/hooks/endpoints/users";
import seo from "@/lib/seo";
import { parseData } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

type Props = {
  params: Promise<{ username: string }>;
};

const paramsSchema = z.object({
  username: z.string().regex(/^[\p{L}\p{M}\p{N}_-]+$/u),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = parseData(await params, paramsSchema);

  const artist = await showUser(username);

  return {
    ...seo(artist.data.username, artist.data.bio ?? ""),
  };
}

export default async function Page({ params }: Props) {
  const { username } = parseData(await params, paramsSchema);

  const queryClient = new QueryClient();

  await prefetchShowUser(queryClient, username);

  await prefetchListUserPublishedArtworks(queryClient, username);

  await prefetchListUserReceivedLikesCountByTag(queryClient, username);

  await prefetchShowUserReceivedLikesCount(queryClient, username);

  return <ArtistProfile />;
}
