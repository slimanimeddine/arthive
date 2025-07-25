import VerifyEmail from "@/components/verify-email";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = seo(
  "Verify Email",
  "Verify your email on ArtHive",
);

const paramsSchema = z.object({
  id: z.uuid(),
  hash: z.string().regex(/^[a-f0-9]{40}$/),
});

const searchParamsSchema = z.object({
  expires: z.string().regex(/^\d+$/),
  signature: z.string().regex(/^[a-fA-F0-9]+$/),
});

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; hash: string }>;
  searchParams: Promise<{ expires: string; signature: string }>;
}) {
  const {} = await verifyAuth();

  const parsedParams = paramsSchema.safeParse(await params);
  const parsedSearchParams = searchParamsSchema.safeParse(await searchParams);

  if (!parsedParams.success || !parsedSearchParams.success) {
    throw new Error("Invalid URL or query parameters");
  }

  const { id, hash } = parsedParams.data;
  const { expires, signature } = parsedSearchParams.data;
  return (
    <VerifyEmail id={id} hash={hash} expires={expires} signature={signature} />
  );
}
