import VerifyEmail from "@/components/verify-email";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseData } from "@/lib/utils";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = seo(
  "Verify Email",
  "Verify your email on ArtHive",
);

type Props = {
  params: Promise<{ id: string; hash: string }>;
  searchParams: Promise<{ expires: string; signature: string }>;
};

const paramsSchema = z.object({
  id: z.uuid(),
  hash: z.string().regex(/^[a-f0-9]{40}$/),
});

const searchParamsSchema = z.object({
  expires: z.string().regex(/^\d+$/),
  signature: z.string().regex(/^[a-fA-F0-9]+$/),
});

export default async function Page({ params, searchParams }: Props) {
  await verifyAuth();

  parseData(await params, paramsSchema);

  const { expires, signature } = parseData(
    await searchParams,
    searchParamsSchema,
  );
  return <VerifyEmail expires={expires} signature={signature} />;
}
