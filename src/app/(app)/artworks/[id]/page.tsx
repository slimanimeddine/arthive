import ArtworkPost from "@/components/artwork-post/post";
import {
  prefetchShowPublishedArtwork,
  showPublishedArtwork,
} from "@/hooks/endpoints/artworks";
import seo from "@/lib/seo";
import { parseData } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

type Props = {
  params: Promise<{ id: string }>;
};

const paramsSchema = z.object({
  id: z.uuid(),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = parseData(await params, paramsSchema);

  const artwork = await showPublishedArtwork(id);

  return {
    ...seo(artwork.data.title, artwork.data.description),
  };
}

export default async function Page({ params }: Props) {
  const { id } = parseData(await params, paramsSchema);

  const queryClient = new QueryClient();

  await prefetchShowPublishedArtwork(queryClient, id);

  return <ArtworkPost />;
}
