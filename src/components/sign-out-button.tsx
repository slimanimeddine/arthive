"use client";
import { deleteSession } from "@/actions/session";
import { useSignOut } from "@/hooks/endpoints/authentication";
import { useSession } from "@/hooks/session";
import { authHeader, onError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const { token } = useSession();
  const signOutMutation = useSignOut(authHeader(token));

  const router = useRouter();

  function onSignOut() {
    signOutMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        void deleteSession();
        toast.success("You have been signed out");
        router.push("/");
      },
    });
  }

  const isDisabled = signOutMutation.isPending;

  return (
    <button
      onClick={onSignOut}
      type="submit"
      disabled={isDisabled}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign out
    </button>
  );
}
