import { BookmarkIcon } from '@heroicons/react/24/outline'

import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { classNames, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  useCheckIfAuthenticatedUserIsFavoriting,
  useMarkArtworkAsFavorite,
  useRemoveArtworkFromFavorites,
} from '@/api/favorites/favorites'

type FavoriteButtonProps = {
  artworkId: number
}

export function FavoriteButton({ artworkId }: FavoriteButtonProps) {
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

  const isFavoritingQuery = useCheckIfAuthenticatedUserIsFavoriting(
    artworkId,
    axiosConfig
  )

  const isFavoriting = isFavoritingQuery.data?.data.data

  const favoriteArtworkMutation = useMarkArtworkAsFavorite(axiosConfig)
  const unfavoriteArtworkMutation = useRemoveArtworkFromFavorites(axiosConfig)

  const invalidateFavoriteQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['/api/v1/users/me/favorites/artworks'],
    })
    queryClient.invalidateQueries({
      queryKey: [`artworks/${artworkId}/favorites/is-favoriting`],
    })
  }

  const handleFavoriteToggle = (isCurrentlyFavoriting: boolean) => {
    if (!token || isFavoriting === undefined) {
      return router.push('/sign-in')
    }

    const mutation = isCurrentlyFavoriting
      ? unfavoriteArtworkMutation
      : favoriteArtworkMutation

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

  if (token === undefined) return null

  if (!token) {
    return (
      <button
        className="cursor-not-allowed flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
        onClick={() => router.push('/sign-in')}
      >
        <BookmarkIcon className="h-6 w-6" />
      </button>
    )
  }

  if (isFavoritingQuery.isLoading) {
    return (
      <button
        disabled
        className="cursor-not-allowed flex items-center justify-center rounded-full p-2 transition-colors bg-gray-200 text-gray-700"
      >
        loading...
      </button>
    )
  }

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
}
