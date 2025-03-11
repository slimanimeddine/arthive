import {
  useCheckIfAuthenticatedUserIsFollowing,
  useFollowUser,
  useUnfollowUser,
} from '@/api/follows/follows'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useFollowUserAction(userId: number) {
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

  const isFollowingQuery = useCheckIfAuthenticatedUserIsFollowing(
    userId,
    axiosConfig
  )

  const isFollowing = isFollowingQuery.data?.data.data

  const followUserMutation = useFollowUser(axiosConfig)
  const unfollowUserMutation = useUnfollowUser(axiosConfig)

  const invalidateFollowQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['/api/v1/users/me/follows/following'],
    })
    queryClient.invalidateQueries({
      queryKey: [`/api/v1/users/${userId}/is-following`],
    })
  }

  const handleFollowToggle = (isCurrentlyFollowing: boolean) => {
    if (!token || isFollowing === undefined) {
      return router.push('/sign-in')
    }

    const mutation = isCurrentlyFollowing
      ? unfollowUserMutation
      : followUserMutation

    mutation.mutate(
      { userId },
      {
        onError,
        onSuccess: () => {
          toast.success(
            isCurrentlyFollowing
              ? 'User unfollowed successfully'
              : 'User followed successfully'
          )
          invalidateFollowQueries()
        },
      }
    )
  }

  return {
    isFollowing,
    isLoading: isFollowingQuery.isLoading,
    handleFollowToggle,
    token,
  }
}
