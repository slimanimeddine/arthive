import {
  useCheckIfAuthenticatedUserIsLiking,
  useLikeArtwork,
  useUnlikeArtwork,
} from '@/api/artwork-likes/artwork-likes'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { classNames, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type LikeButtonProps = {
  artworkId: number
}

export function LikeButton({ artworkId }: LikeButtonProps) {
  const token = useGetAuthenticatedUserToken()
  const router = useRouter()
  const queryClient = useQueryClient()

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const isLikingQuery = useCheckIfAuthenticatedUserIsLiking(
    artworkId,
    axiosConfig
  )

  const isLiking = isLikingQuery.data?.data.data

  const likeArtworkMutation = useLikeArtwork(axiosConfig)
  const unlikeArtworkMutation = useUnlikeArtwork(axiosConfig)

  const invalidateLikeQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [`/api/v1/artworks/${artworkId}/is-liking`],
    })
  }

  const handleLikeToggle = (isCurrentlyLiking: boolean) => {
    if (!token || isLiking === undefined) {
      return router.push('/sign-in')
    }

    const mutation = isCurrentlyLiking
      ? unlikeArtworkMutation
      : likeArtworkMutation

    mutation.mutate(
      { artworkId },
      {
        onError,
        onSuccess: () => {
          toast.success(
            isCurrentlyLiking
              ? 'Artwork unliked successfully'
              : 'Artwork liked successfully'
          )
          invalidateLikeQueries()
        },
      }
    )
  }

  if (token === undefined) return null

  if (!token) {
    return (
      <button onClick={() => router.push('/sign-in')}>
        <HandThumbUpIcon className="h-6 w-6" />
      </button>
    )
  }

  if (isLikingQuery.isLoading) {
    return <button>Loading...</button>
  }

  return (
    <button
      onClick={() => handleLikeToggle(!!isLiking)}
      className={classNames(
        'flex items-center justify-center rounded-full p-2 transition-colors',
        isLiking
          ? 'bg-indigo-500 text-white hover:bg-indigo-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      )}
    >
      <HandThumbUpIcon
        className={classNames(
          'h-6 w-6 transition-transform',
          isLiking ? 'text-white scale-110' : 'text-gray-700'
        )}
      />
    </button>
  )
}
