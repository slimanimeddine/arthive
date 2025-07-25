import Logo from "@/components/logo";
import ResetPasswordForm from "@/components/reset-password-form";
import Link from "next/link";
import z from "zod";

const searchParamsSchema = z.object({
  token: z
    .string()
    .length(64)
    .regex(/^[a-z0-9]{64}$/),
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const parsedSearchParams = searchParamsSchema.safeParse(await searchParams);

  if (!parsedSearchParams.success) {
    throw new Error("Invalid URL or query parameters");
  }

  const { token } = parsedSearchParams.data;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex h-full w-full items-center justify-center"
        >
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
