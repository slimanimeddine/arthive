import VerificationSubmissions from "@/components/become-verified/verification-submissions";
import { prefetchGetAuthenticatedUserArtistVerificationRequests } from "@/hooks/artist-verification-requests";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo(
    "Verification Submission History",
    "View your verification submission history",
  ),
};

export default async function VerificationSubmissionHistory() {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchGetAuthenticatedUserArtistVerificationRequests(
    queryClient,
    authHeader(token),
  );

  return <VerificationSubmissions />;
}
