import Favorites from "@/components/favorites";
import { prefetchListAuthenticatedUserFavoriteArtworks } from "@/hooks/endpoints/favorites";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Favorite Artworks", "View your favorite artworks on ArtHive"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchListAuthenticatedUserFavoriteArtworks(
    queryClient,
    authHeader(token),
  );

  return <Favorites />;
}
