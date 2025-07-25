import BecomeVerified from "@/components/become-verified";
import { prefetchShowAuthenticatedUser } from "@/hooks/users";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Become Verified", "Become a verified user on ArtHive"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchShowAuthenticatedUser(queryClient, authHeader(token));

  return <BecomeVerified />;
}
