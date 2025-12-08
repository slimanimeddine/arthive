import type { Metadata } from "next";
import DeleteAccount from "@/components/delete-account";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Delete Account", "Delete your account on ArtHive"),
};

export default async function Page() {
  await verifyAuth();

  return <DeleteAccount />;
}
