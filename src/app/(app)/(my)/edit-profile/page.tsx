import EditProfile from "@/components/edit-profile";
import { prefetchShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Edit Profile", "Edit your profile on ArtHive"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchShowAuthenticatedUser(queryClient, authHeader(token));

  return <EditProfile />;
}
