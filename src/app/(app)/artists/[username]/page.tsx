import ArtistProfile from "@/components/artist-profile";
import InvalidParams from "@/components/invalid-params";
import {
  prefetchListUserReceivedLikesCountByTag,
  prefetchShowUserReceivedLikesCount,
} from "@/hooks/endpoints/artwork-likes";
import { prefetchListUserPublishedArtworks } from "@/hooks/endpoints/artworks";
import { prefetchShowUser, showUser } from "@/hooks/endpoints/users";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

const paramsSchema = z.object({
  username: z.string().regex(/^[\p{L}\p{M}\p{N}_-]+$/u),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data, success } = parseParams(await params, paramsSchema);

  if (!success) {
    return {
      ...seo("Artist Not Found", "The requested artist does not exist."),
    };
  }

  const { username } = data;

  const artist = await showUser(username);

  return {
    ...seo(artist.data.username, artist.data.bio ?? ""),
  };
}

export default async function Page({ params }: Props) {
  const { data, success, error } = parseParams(await params, paramsSchema);

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { username } = data;

  const queryClient = new QueryClient();

  await prefetchShowUser(queryClient, username);

  await prefetchListUserPublishedArtworks(queryClient, username);

  await prefetchListUserReceivedLikesCountByTag(queryClient, username);

  await prefetchShowUserReceivedLikesCount(queryClient, username);

  return <ArtistProfile />;
}
