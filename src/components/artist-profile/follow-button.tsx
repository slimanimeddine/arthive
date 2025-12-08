"use client";
import { useRouter } from "next/navigation";
import { useFollowUserAction } from "@/hooks/follow-user";
import { useSession } from "@/hooks/session";
import { classNames } from "@/lib/utils";

type FollowButtonProps = {
  userId: string;
};

export default function FollowButton({ userId }: FollowButtonProps) {
  const session = useSession();
  const { isFollowing, isLoading, handleFollowToggle } =
    useFollowUserAction(userId);

  const router = useRouter();

  if (!session?.token) {
    return (
      <button
        type="button"
        onClick={() => router.push("/sign-in")}
        className="inline-flex w-full shrink-0 items-center justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1"
      >
        Follow
      </button>
    );
  }

  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex w-full shrink-0 cursor-not-allowed items-center justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1"
      >
        loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => handleFollowToggle(!!isFollowing)}
      className={classNames(
        "inline-flex w-full shrink-0 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1",
        isFollowing
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-gray-300 text-gray-900 ring-gray-300 hover:bg-gray-200",
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
