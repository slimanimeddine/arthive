import EditArtwork from "@/components/edit-work/edit-artwork";
import {
  prefetchShowAuthenticatedUserArtwork,
  showAuthenticatedUserArtwork,
} from "@/hooks/endpoints/artworks";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseData } from "@/lib/utils";
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

  const artwork = await showAuthenticatedUserArtwork(id);

  return {
    ...seo(artwork.data.title, artwork.data.description),
  };
}

export default async function Page({ params }: Props) {
  const { id } = parseData(await params, paramsSchema);

  const { token } = await verifyAuth();

  const queryClient = new QueryClient();

  await prefetchShowAuthenticatedUserArtwork(
    queryClient,
    id,
    authHeader(token),
  );

  return <EditArtwork />;
}
