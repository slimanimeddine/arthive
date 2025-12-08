"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  type UpdateArtworkCommentBody,
  useUpdateArtworkComment,
} from "@/hooks/endpoints/artwork-comments";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { updateArtworkCommentBody } from "@/schemas/artwork-comments";
import { useEditCommentStore } from "@/stores/edit-comment-store";
import type { Session } from "@/types/misc";

type EditCommentProps = {
  commentId: string;
  defaultContent: string;
};

export default function EditCommentForm({
  defaultContent,
  commentId,
}: EditCommentProps) {
  const { token } = useSession() as Session;
  const { id: artworkId } = useParams<{ id: string }>();

  const setFormVisible = useEditCommentStore((state) => state.setFormVisible);

  const queryClient = useQueryClient();

  const { handleSubmit, register, formState, reset } =
    useForm<UpdateArtworkCommentBody>({
      resolver: zodResolver(updateArtworkCommentBody),
    });

  const { mutate, isPending } = useUpdateArtworkComment(authHeader(token));

  function onSubmit(data: UpdateArtworkCommentBody) {
    mutate(
      {
        artworkCommentId: commentId,
        data,
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
          reset();
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/artworks/${artworkId}`],
          });
          toast.success("Comment updated successfully!");
          setFormVisible(false);
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending;

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <textarea
          id="comment"
          rows={3}
          className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
          defaultValue={defaultContent}
          {...register("comment_text")}
        />
        {formState.errors.comment_text && (
          <p className="mt-2 text-sm text-red-600">
            {formState.errors.comment_text.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setFormVisible(false)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        <div className="shrink-0">
          <button
            disabled={isDisabled}
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  );
}
