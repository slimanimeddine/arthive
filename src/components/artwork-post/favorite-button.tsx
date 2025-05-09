import { BookmarkIcon } from '@heroicons/react/24/outline'

import {
  useCheckIfAuthenticatedUserIsFavoriting,
  useMarkArtworkAsFavorite,
  useRemoveArtworkFromFavorites,
} from '@/hooks/favorites'
import { authHeader, classNames, matchQueryStatus, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FavoriteButtonProps = {
  token: string | undefined
  artworkId: string
}

export default function FavoriteButton({
  token,
  artworkId,
}: FavoriteButtonProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const authConfig = token ? authHeader(token!) : undefined

  const checkIfAuthenticatedUserIsFavoritingQuery =
    useCheckIfAuthenticatedUserIsFavoriting(artworkId, authConfig)

  const markArtworkAsFavoriteMutation = useMarkArtworkAsFavorite(authConfig)
  const removeArtworkFromFavoritesMutation =
    useRemoveArtworkFromFavorites(authConfig)

  const invalidateFavoriteQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['/api/v1/users/me/favorites/artworks'],
    })
    queryClient.invalidateQueries({
      queryKey: [`/api/v1/artworks/${artworkId}/favorites/is-favoriting`],
    })
  }

  const handleFavoriteToggle = (isCurrentlyFavoriting: boolean) => {
    if (!token) {
      return router.push('/sign-in')
    }

    const mutation = isCurrentlyFavoriting
      ? removeArtworkFromFavoritesMutation
      : markArtworkAsFavoriteMutation

    mutation.mutate(
      { artworkId },
      {
        onError,
        onSuccess: () => {
          toast.success(
            isCurrentlyFavoriting
              ? 'Artwork removed from favorites successfully'
              : 'Artwork marked as favorite successfully'
          )
          invalidateFavoriteQueries()
        },
      }
    )
  }

  if (!token) {
    return (
      <button
        className="flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
        onClick={() => router.push('/sign-in')}
      >
        <BookmarkIcon className="h-6 w-6" />
      </button>
    )
  }

  return matchQueryStatus(checkIfAuthenticatedUserIsFavoritingQuery, {
    Loading: (
      <button
        disabled
        className="cursor-not-allowed flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
      >
        loading...
      </button>
    ),
    Errored: <span className="text-xs text-red-700">error</span>,
    Empty: <span></span>,
    Success: ({ data }) => {
      const isFavoriting = data.data
      return (
        <button
          onClick={() => handleFavoriteToggle(!!isFavoriting)}
          className={classNames(
            'flex items-center justify-center rounded-full p-2 transition-colors',
            isFavoriting
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          )}
        >
          <BookmarkIcon
            className={classNames(
              'h-6 w-6 transition-transform',
              isFavoriting ? 'text-white scale-110' : 'text-gray-700'
            )}
          />
        </button>
      )
    },
  })
}
