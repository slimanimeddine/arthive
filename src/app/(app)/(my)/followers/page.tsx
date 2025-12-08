import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import Followers from "@/components/followers";
import { prefetchListAuthenticatedUserFollowers } from "@/hooks/endpoints/follows";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Followers", "View your followers on ArtHive"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchListAuthenticatedUserFollowers(queryClient, authHeader(token));

  return <Followers />;
}
