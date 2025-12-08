import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import Following from "@/components/following";
import { prefetchListAuthenticatedUserFollowing } from "@/hooks/endpoints/follows";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Following", "View the users you are following on ArtHive"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchListAuthenticatedUserFollowing(queryClient, authHeader(token));

  return <Following />;
}
