'use client'
import {
  useCheckIfAuthenticatedUserIsFollowing,
  useFollowUser,
  useUnfollowUser,
} from '@/api/follows/follows'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { classNames, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FollowButtonProps = {
  userId: number
}

export function FollowButton({ userId }: FollowButtonProps) {
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

  if (token === undefined) return null

  if (!token) {
    return (
      <button
        onClick={() => router.push('/sign-in')}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Follow
      </button>
    )
  }

  if (isFollowingQuery.isLoading) {
    return (
      <button className="rounded-full bg-gray px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
        Loading...
      </button>
    )
  }

  return (
    <button
      onClick={() => handleFollowToggle(!!isFollowing)}
      className={classNames(
        'rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset',
        isFollowing
          ? 'bg-indigo-600 text-white hover:bg-indigo-500'
          : 'text-gray-900 bg-white ring-gray-300 hover:bg-gray-50'
      )}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}
