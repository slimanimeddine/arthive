import ArtworksDisplay from "@/components/artworks/artworks-display";
import { prefetchListPublishedArtworks } from "@/hooks/endpoints/artworks";
import { ARTWORK_SORT_VALUES, TAGS } from "@/lib/constants";
import seo from "@/lib/seo";
import { parseData } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = {
  ...seo(
    "Artworks",
    "Explore a wide range of artworks from talented artists around the world. Discover, appreciate, and connect with art like never before.",
  ),
};

const searchParamsSchema = z.object({
  page: z.int().default(1),
  tag: z.enum(TAGS).optional(),
  artworkSort: z.enum(ARTWORK_SORT_VALUES).optional(),
  searchQuery: z.string().optional(),
});

type Props = {
  searchParams: Promise<{
    page: number;
    tag?: string;
    artworkSort?: string;
    searchQuery?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const queryClient = new QueryClient();

  const { tag, artworkSort, page, searchQuery } = parseData(
    await searchParams,
    searchParamsSchema,
  );

  const queryParams: Record<string, string | number> = {
    perPage: 12,
    ...(tag && { "filter[tag]": tag }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  await prefetchListPublishedArtworks(queryClient, queryParams);

  return <ArtworksDisplay />;
}
