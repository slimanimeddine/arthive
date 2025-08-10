"use client";

import { useDeleteArtworkComment } from "@/hooks/endpoints/artwork-comments";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteCommentButton({
  commentId,
}: {
  commentId: string;
}) {
  const { token } = useSession()!;
  const { id: artworkId } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteArtworkComment(authHeader(token));

  function onDelete() {
    mutate(
      {
        artworkCommentId: commentId,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/artworks/${artworkId}`],
          });
          toast.success("Comment deleted successfully!");
        },
      },
    );
  }

  const isDisabled = isPending;

  return (
    <button
      disabled={isDisabled}
      onClick={onDelete}
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
    >
      Remove
    </button>
  );
}
