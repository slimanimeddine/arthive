import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { authHeader, classNames, matchQueryStatus, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  useCheckIfAuthenticatedUserIsLiking,
  useLikeArtwork,
  useUnlikeArtwork,
} from '@/hooks/artwork-likes'

type LikeButtonProps = {
  token: string | undefined
  artworkId: string
}

export default function LikeButton({ token, artworkId }: LikeButtonProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const authConfig = token ? authHeader(token!) : undefined

  const checkIfAuthenticatedUserIsLikingQuery =
    useCheckIfAuthenticatedUserIsLiking(artworkId, authConfig)

  const likeArtworkMutation = useLikeArtwork(authConfig)
  const unlikeArtworkMutation = useUnlikeArtwork(authConfig)

  const invalidateLikeQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [`/api/v1/artworks/${artworkId}/is-liking`],
    })
  }

  const handleLikeToggle = (isCurrentlyLiking: boolean) => {
    if (!token) {
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

  if (!token) {
    return (
      <button
        className="cursor-not-allowed flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
        onClick={() => router.push('/sign-in')}
      >
        <HandThumbUpIcon className="h-6 w-6" />
      </button>
    )
  }

  return matchQueryStatus(checkIfAuthenticatedUserIsLikingQuery, {
    Loading: (
      <button
        disabled
        className="cursor-not-allowed flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
      >
        loading...
      </button>
    ),
    Errored: <button></button>,
    Empty: <button></button>,
    Success: ({ data }) => {
      const isLiking = data.data
      return (
        <button
          onClick={() => handleLikeToggle(isLiking)}
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
    },
  })
}
