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

  const isFollowingQuery = useCheckIfAuthenticatedUserIsFollowing(userId, {
    axios: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const isFollowing = isFollowingQuery.data?.data.data

  const followUserMutation = useFollowUser({
    axios: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const unfollowUserMutation = useUnfollowUser({
    axios: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const router = useRouter()

  const queryClient = useQueryClient()

  function handleUnfollow() {
    if (!token || isFollowing === undefined) {
      router.push('/sign-in')
    }
    unfollowUserMutation.mutate(
      { userId },
      {
        onError: (error) => onError(error),
        onSuccess: () => {
          toast.success('User unfollowed successfully')
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/users/me/follows/following'],
          })
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/${userId}/is-following`],
          })
        },
      }
    )
  }

  function handleFollow() {
    if (!token || isFollowing === undefined) {
      router.push('/sign-in')
    }

    followUserMutation.mutate(
      { userId },
      {
        onError: (error) => onError(error),
        onSuccess: () => {
          toast.success('User followed successfully')
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/users/me/follows/following'],
          })
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/${userId}/is-following`],
          })
        },
      }
    )
  }
  return (
    <>
      {!token && (
        <button
          onClick={() => router.push('/sign-in')}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Follow
        </button>
      )}
      {isFollowingQuery.isLoading && (
        <button className="rounded-full bg-gray px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          Loading...
        </button>
      )}
      {isFollowingQuery.isSuccess && (
        <button
          onClick={isFollowing ? handleUnfollow : handleFollow}
          className={classNames(
            'rounded-full  px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ',
            isFollowing
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'text-gray-900 bg-white ring-gray-300 hover:bg-gray-50'
          )}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </>
  )
}
