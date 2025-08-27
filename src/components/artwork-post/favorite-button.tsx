"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";

import {
  useCheckIfAuthenticatedUserIsFavoriting,
  useMarkArtworkAsFavorite,
  useRemoveArtworkFromFavorites,
} from "@/hooks/endpoints/favorites";
import { authHeader, classNames } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { notFound, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/session";
import ErrorUI from "../error-ui";

export default function FavoriteButton() {
  const session = useSession();
  const { id: artworkId } = useParams<{ id: string }>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const authConfig = session?.token ? authHeader(session.token) : undefined;

  const { isPending, isError, data, error } =
    useCheckIfAuthenticatedUserIsFavoriting(artworkId, authConfig);

  const markArtworkAsFavoriteMutation = useMarkArtworkAsFavorite(authConfig);
  const removeArtworkFromFavoritesMutation =
    useRemoveArtworkFromFavorites(authConfig);

  const invalidateFavoriteQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: ["/api/v1/users/me/favorites/artworks"],
    });
    void queryClient.invalidateQueries({
      queryKey: [`/api/v1/artworks/${artworkId}/favorites/is-favoriting`],
    });
  };

  const handleFavoriteToggle = (isCurrentlyFavoriting: boolean) => {
    if (!session?.token) {
      return router.push("/sign-in");
    }

    const mutation = isCurrentlyFavoriting
      ? removeArtworkFromFavoritesMutation
      : markArtworkAsFavoriteMutation;

    mutation.mutate(
      { artworkId },
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
            isCurrentlyFavoriting
              ? "Artwork removed from favorites successfully"
              : "Artwork marked as favorite successfully",
          );
          invalidateFavoriteQueries();
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
        <BookmarkIcon className="h-6 w-6" />
      </button>
    );
  }

  if (isPending) {
    return (
      <button
        disabled
        className="flex cursor-not-allowed items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition-colors"
      >
        loading...
      </button>
    );
  }

  if (isError) {
    if (error.isAxiosError && error.response?.status === 404) {
      notFound();
    }

    return <ErrorUI message={error.message} />;
  }

  const isFavoriting = data.data;

  return (
    <button
      onClick={() => handleFavoriteToggle(!!isFavoriting)}
      className={classNames(
        "flex items-center justify-center rounded-full p-2 transition-colors",
        isFavoriting
          ? "bg-indigo-500 text-white hover:bg-indigo-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300",
      )}
    >
      <BookmarkIcon
        className={classNames(
          "h-6 w-6 transition-transform",
          isFavoriting ? "scale-110 text-white" : "text-gray-700",
        )}
      />
    </button>
  );
}
