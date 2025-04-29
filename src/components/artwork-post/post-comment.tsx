import {
  PostArtworkCommentBody,
  usePostArtworkComment,
} from '@/hooks/artwork-comments'
import { authHeader, onError } from '@/lib/utils'
import { postArtworkCommentBody } from '@/schemas/artwork-comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type PostCommentProps = {
  token: string | undefined
  artworkId: string
}

export default function PostComment({ token, artworkId }: PostCommentProps) {
  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, reset, clearErrors } =
    useForm<PostArtworkCommentBody>({
      resolver: zodResolver(postArtworkCommentBody),
    })

  useEffect(() => {
    setTimeout(() => {
      clearErrors('comment_text')
    }, 6000)
  }, [clearErrors, formState.errors.comment_text])

  const authConfig = token ? authHeader(token!) : undefined

  const postArtworkCommentMutation = usePostArtworkComment(authConfig)

  function onSubmit(data: PostArtworkCommentBody) {
    postArtworkCommentMutation.mutate(
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
    formState.isSubmitting || postArtworkCommentMutation.isPending || !token

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6"
    >
      <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
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
      </div>
      {formState.errors.comment_text && (
        <p className="my-2 text-sm text-red-600">
          {formState.errors.comment_text.message}
        </p>
      )}
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
