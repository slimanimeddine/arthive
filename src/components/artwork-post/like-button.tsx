import {
  useCheckIfAuthenticatedUserIsLiking,
  useLikeArtwork,
  useUnlikeArtwork,
} from "@/hooks/endpoints/artwork-likes";
import { useSession } from "@/hooks/session";
import { authHeader, classNames, matchQueryStatus, onError } from "@/lib/utils";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LikeButton() {
  const { id: artworkId } = useParams<{ id: string }>();
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const authConfig = session?.token ? authHeader(session.token) : undefined;

  const checkIfAuthenticatedUserIsLikingQuery =
    useCheckIfAuthenticatedUserIsLiking(artworkId, authConfig);

  const likeArtworkMutation = useLikeArtwork(authConfig);
  const unlikeArtworkMutation = useUnlikeArtwork(authConfig);

  const invalidateLikeQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: [`/api/v1/artworks/${artworkId}/is-liking`],
    });
  };

  const handleLikeToggle = (isCurrentlyLiking: boolean) => {
    if (!session?.token) {
      return router.push("/sign-in");
    }

    const mutation = isCurrentlyLiking
      ? unlikeArtworkMutation
      : likeArtworkMutation;

    mutation.mutate(
      { artworkId },
      {
        onError,
        onSuccess: () => {
          toast.success(
            isCurrentlyLiking
              ? "Artwork unliked successfully"
              : "Artwork liked successfully",
          );
          invalidateLikeQueries();
        },
      },
    );
  };

  if (!session?.token) {
    return (
      <button
        className="flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition-colors"
        onClick={() => router.push("/sign-in")}
      >
        <HandThumbUpIcon className="h-6 w-6" />
      </button>
    );
  }

  return matchQueryStatus(checkIfAuthenticatedUserIsLikingQuery, {
    Loading: (
      <button
        disabled
        className="flex cursor-not-allowed items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition-colors"
      >
        loading...
      </button>
    ),
    Errored: <span className="text-xs text-red-700">error</span>,
    Empty: <span></span>,
    Success: ({ data }) => {
      const isLiking = data.data;
      return (
        <button
          onClick={() => handleLikeToggle(isLiking)}
          className={classNames(
            "flex items-center justify-center rounded-full p-2 transition-colors",
            isLiking
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300",
          )}
        >
          <HandThumbUpIcon
            className={classNames(
              "h-6 w-6 transition-transform",
              isLiking ? "scale-110 text-white" : "text-gray-700",
            )}
          />
        </button>
      );
    },
  });
}
