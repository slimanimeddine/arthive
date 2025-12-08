import type { Metadata } from "next";
import CreateArtwork from "@/components/submit-work/create-artwork";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Submit Artwork", "Submit your artwork"),
};

export default async function Page() {
  await verifyAuth();

  return <CreateArtwork />;
}
