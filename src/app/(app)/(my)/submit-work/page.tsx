import CreateArtwork from "@/components/submit-work/create-artwork";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Submit Artwork", "Submit your artwork"),
};

export default async function Page() {
  const { token } = await verifyAuth();

  return <CreateArtwork token={token} />;
}
