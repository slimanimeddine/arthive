"use client";
import { deleteSession } from "@/actions/session";
import {
  type DeleteUserBody,
  useDeleteUser,
} from "@/hooks/endpoints/authentication";
import { useSession } from "@/hooks/session";
import { authHeader, onError } from "@/lib/utils";
import { deleteUserBody } from "@/schemas/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function DeleteAccount() {
  const { token } = useSession()!;
  const { handleSubmit, register, formState } = useForm<DeleteUserBody>({
    resolver: zodResolver(deleteUserBody),
  });

  const deleteUserMutation = useDeleteUser(authHeader(token));

  const router = useRouter();

  function onSubmit(data: DeleteUserBody) {
    deleteUserMutation.mutate(
      {
        data,
      },
      {
        onError,
        onSuccess: () => {
          void deleteSession();
          toast.success("Account deleted successfully!");
          router.push("/");
        },
      },
    );
  }

  const isDisabled =
    formState.isSubmitting ||
    deleteUserMutation.isPending ||
    !formState.isDirty;

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Delete your account
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm your password
          </label>
          <input
            id="password"
            type="password"
            className="mt-2 w-1/2 rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-start">
          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-600"
          >
            Delete account
          </button>
        </div>
      </form>
    </div>
  );
}
