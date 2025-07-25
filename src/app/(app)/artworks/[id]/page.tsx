import ArtworkPost from "@/components/artwork-post/post";
import {
  prefetchShowPublishedArtwork,
  showPublishedArtwork,
} from "@/hooks/artworks";
import { getAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const artwork = await showPublishedArtwork(id);

  return {
    ...seo(artwork.data.title, artwork.data.description),
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const { token } = await getAuth();
  const queryClient = new QueryClient();

  await prefetchShowPublishedArtwork(queryClient, id);

  return <ArtworkPost token={token} id={id} />;
}
