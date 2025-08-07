import InvalidParams from "@/components/invalid-params";
import Notifications from "@/components/notifications";
import { prefetchListAuthenticatedUserNotifications } from "@/hooks/endpoints/notifications";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = {
  ...seo("Notifications", "View your notifications"),
};

type Props = {
  searchParams: Promise<{ page: number }>;
};

const searchParamsSchema = z.object({
  page: z.int().default(1),
});

export default async function Page({ searchParams }: Props) {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();
  const { data, success, error } = parseParams(
    await searchParams,
    searchParamsSchema,
  );

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }
  const { page } = data;
  const queryParams: Record<string, number> = {
    perPage: 10,
    ...(page && { page }),
  };

  await prefetchListAuthenticatedUserNotifications(
    queryClient,
    queryParams,
    authHeader(token),
  );

  return <Notifications />;
}
