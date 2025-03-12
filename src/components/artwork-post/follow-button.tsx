'use client'
import { useFollowUserAction } from '@/hooks/use-follow-user-action'
import { classNames } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type FollowButtonProps = {
  userId: number
}

export function FollowButton({ userId }: FollowButtonProps) {
  const { isFollowing, isLoading, handleFollowToggle, token } =
    useFollowUserAction(userId)

  const router = useRouter()

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

  if (isLoading) {
    return (
      <button
        disabled
        className="rounded-full bg-gray px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-not-allowed"
      >
        loading...
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
