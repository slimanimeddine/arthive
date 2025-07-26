import ArtistsDisplay from "@/components/artists/artists-display";
import { prefetchListUsers } from "@/hooks/endpoints/users";
import { ARTIST_SORT_VALUES, COUNTRIES, TAGS } from "@/lib/constants";
import { getAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseData } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = {
  ...seo(
    "Artists",
    "Discover a diverse range of talented artists from around the world. Explore their unique styles, connect with their work, and find inspiration in the art community.",
  ),
};

const searchParamsSchema = z.object({
  country: z.enum(COUNTRIES).optional(),
  category: z.enum(TAGS).optional(),
  artistSort: z.enum(ARTIST_SORT_VALUES).optional(),
  page: z.int().default(1),
  searchQuery: z.string().optional(),
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
    category?: string;
    artistSort?: string;
    page: number;
    searchQuery?: string;
  }>;
}) {
  const queryClient = new QueryClient();

  const { token } = await getAuth();
  const { country, category, artistSort, page, searchQuery } = parseData(
    await searchParams,
    searchParamsSchema,
  );

  const queryParams: Record<string, string | number> = {
    perPage: 12,
    ...(country && { "filter[country]": country }),
    ...(category && { "filter[tag]": category }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  await prefetchListUsers(queryClient, queryParams);

  return <ArtistsDisplay token={token} />;
}
