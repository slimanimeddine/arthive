"use client";
import { useFollowUserAction } from "@/hooks/follow-user";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FollowButtonProps = {
  token: string | undefined;
  userId: string;
};

export default function FollowButton({ token, userId }: FollowButtonProps) {
  const { isFollowing, isLoading, handleFollowToggle } = useFollowUserAction(
    token,
    userId,
  );

  const router = useRouter();

  if (!token) {
    return (
      <button
        onClick={() => router.push("/sign-in")}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Follow
      </button>
    );
  }

  if (isLoading) {
    return (
      <button
        disabled
        className="bg-gray cursor-not-allowed rounded-full px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset"
      >
        loading...
      </button>
    );
  }

  return (
    <button
      onClick={() => handleFollowToggle(!!isFollowing)}
      className={classNames(
        "rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset",
        isFollowing
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50",
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
