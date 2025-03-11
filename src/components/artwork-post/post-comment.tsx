import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { postArtworkCommentBody } from '@/schemas/artwork-comments'
import { usePostArtworkComment } from '@/api/artwork-comments/artwork-comments'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'

type PostArtworkCommentBody = zod.infer<typeof postArtworkCommentBody>

type PostCommentProps = {
  artworkId: number
}

export function PostComment({ artworkId }: PostCommentProps) {
  const token = useGetAuthenticatedUserToken()
  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, reset } =
    useForm<PostArtworkCommentBody>({
      resolver: zodResolver(postArtworkCommentBody),
    })

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const postArtworkComment = usePostArtworkComment(axiosConfig)

  function onSubmit(data: PostArtworkCommentBody) {
    postArtworkComment.mutate(
      {
        artworkId,
        data,
      },
      {
        onError,
        onSuccess: () => {
          reset()
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/artworks/${artworkId}`],
          })
          toast.success('Comment posted successfully!')
        },
      }
    )
  }

  const isDisabled =
    formState.isSubmitting || postArtworkComment.isPending || !token

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6"
    >
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label
          htmlFor="comment"
          className="sr-only"
        >
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          defaultValue={''}
          {...register('comment_text')}
        />
        {formState.errors.comment_text && (
          <p className="mt-2 text-sm text-red-600">
            {formState.errors.comment_text.message}
          </p>
        )}
      </div>
      <button
        disabled={isDisabled}
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg transition bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900"
      >
        Post comment
      </button>
    </form>
  )
}
