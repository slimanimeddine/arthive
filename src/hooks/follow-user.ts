import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authHeader } from "@/lib/utils";
import {
  useCheckIfAuthenticatedUserIsFollowing,
  useFollowUser,
  useUnfollowUser,
} from "./endpoints/follows";
import { useSession } from "./session";

export function useFollowUserAction(userId: string) {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const authConfig = session?.token ? authHeader(session.token) : undefined;

  const isFollowingQuery = useCheckIfAuthenticatedUserIsFollowing(
    userId,
    authConfig,
  );

  const isFollowing = isFollowingQuery.data?.data;

  const followUserMutation = useFollowUser(authConfig);
  const unfollowUserMutation = useUnfollowUser(authConfig);

  const invalidateFollowQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: ["/api/v1/users/me/follows/following"],
    });
    void queryClient.invalidateQueries({
      queryKey: [`/api/v1/users/${userId}/is-following`],
    });
  };

  const handleFollowToggle = (isCurrentlyFollowing: boolean) => {
    if (!session?.token || isFollowing === undefined) {
      return router.push("/sign-in");
    }

    const mutation = isCurrentlyFollowing
      ? unfollowUserMutation
      : followUserMutation;

    mutation.mutate(
      { userId },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          toast.success(
            isCurrentlyFollowing
              ? "User unfollowed successfully"
              : "User followed successfully",
          );
          invalidateFollowQueries();
        },
      },
    );
  };

  return {
    isFollowing,
    isLoading: isFollowingQuery.isLoading,
    handleFollowToggle,
  };
}
