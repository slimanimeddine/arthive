import type { Metadata } from "next";
import ChangePhotoForm from "@/components/change-photo/change-photo-form";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Change Profile Photo", "Change your profile photo on ArtHive"),
};

export default async function Page() {
  await verifyAuth();

  return <ChangePhotoForm />;
}
