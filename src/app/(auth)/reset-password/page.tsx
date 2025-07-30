import Logo from "@/components/logo";
import ResetPasswordForm from "@/components/reset-password-form";
import { parseData } from "@/lib/utils";
import Link from "next/link";
import z from "zod";

const searchParamsSchema = z.object({
  token: z
    .string()
    .length(64)
    .regex(/^[a-z0-9]{64}$/),
});

type Props = {
  searchParams: Promise<{ token: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { token } = parseData(await searchParams, searchParamsSchema);

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
