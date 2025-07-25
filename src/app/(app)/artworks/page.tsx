import ArtworksDisplay from "@/components/artworks/artworks-display";
import {
  type ListPublishedArtworksParams,
  prefetchListPublishedArtworks,
} from "@/hooks/artworks";
import seo from "@/lib/seo";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo(
    "Artworks",
    "Explore a wide range of artworks from talented artists around the world. Discover, appreciate, and connect with art like never before.",
  ),
};

type SearchParamsValue =
  | string
  | number
  | ListPublishedArtworksParams["sort"]
  | undefined;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchParamsValue>>;
}) {
  const queryClient = new QueryClient();

  const { tag, artworkSort, page, searchQuery } = await searchParams;

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: "12",
    ...(tag && { "filter[tag]": tag }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  await prefetchListPublishedArtworks(queryClient, queryParams);

  return <ArtworksDisplay />;
}
