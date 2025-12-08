import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import InvalidParams from "@/components/invalid-params";
import MyArtworks from "@/components/my-artworks";
import { prefetchListAuthenticatedUserArtworks } from "@/hooks/endpoints/artworks";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("My Artworks", "View your artworks on ArtHive"),
};

const searchParamsSchema = z.object({
  page: z.int().default(1),
});

type Props = {
  searchParams: Promise<z.infer<typeof searchParamsSchema>>;
};

export default async function Page({ searchParams }: Props) {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  const { data, success, error } = parseParams(
    await searchParams,
    searchParamsSchema,
  );

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { page } = data;

  const queryParams: Record<string, number> = {
    perPage: 10,
    ...(page && { page }),
  };

  await prefetchListAuthenticatedUserArtworks(
    queryClient,
    queryParams,
    authHeader(token),
  );

  return <MyArtworks />;
}
