import {
  type PostArtworkCommentBody,
  usePostArtworkComment,
} from "@/hooks/endpoints/artwork-comments";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { postArtworkCommentBody } from "@/schemas/artwork-comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PostComment() {
  const session = useSession();
  const { id: artworkId } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { handleSubmit, register, formState, reset, clearErrors } =
    useForm<PostArtworkCommentBody>({
      resolver: zodResolver(postArtworkCommentBody),
    });

  useEffect(() => {
    setTimeout(() => {
      clearErrors("comment_text");
    }, 6000);
  }, [clearErrors, formState.errors.comment_text]);

  const authConfig = session?.token ? authHeader(session.token) : undefined;

  const { mutate, isPending } = usePostArtworkComment(authConfig);

  function onSubmit(data: PostArtworkCommentBody) {
    mutate(
      {
        artworkId,
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
          toast.success("Comment posted successfully!");
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending || !session?.token;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="mb-2 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          defaultValue={""}
          {...register("comment_text")}
        />
      </div>
      {formState.errors.comment_text && (
        <p className="my-2 text-sm text-red-600">
          {formState.errors.comment_text.message}
        </p>
      )}
      <button
        disabled={isDisabled}
        type="submit"
        className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2.5 text-center text-xs font-medium text-white transition hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900"
      >
        Post comment
      </button>
    </form>
  );
}
