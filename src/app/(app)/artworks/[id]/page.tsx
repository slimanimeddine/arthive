import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import ArtworkPost from "@/components/artwork-post/post";
import InvalidParams from "@/components/invalid-params";
import {
  prefetchShowPublishedArtwork,
  showPublishedArtwork,
} from "@/hooks/endpoints/artworks";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";

const paramsSchema = z.object({
  id: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data, success } = parseParams(await params, paramsSchema);

  if (!success) {
    return {
      ...seo("Artwork Not Found", "The requested artwork does not exist."),
    };
  }

  const { id } = data;

  const artwork = await showPublishedArtwork(id);

  return {
    ...seo(artwork.data.title, artwork.data.description),
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

  const { id } = data;
  const queryClient = new QueryClient();

  await prefetchShowPublishedArtwork(queryClient, id);

  return <ArtworkPost />;
}
