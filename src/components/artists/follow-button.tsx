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
        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
        className="cursor-not-allowed rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset"
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
        "rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset",
        isFollowing
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50",
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
