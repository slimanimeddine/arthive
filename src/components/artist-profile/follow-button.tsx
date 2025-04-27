'use client'
import { useFollowUserAction } from '@/hooks/follow-user'
import { classNames } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type FollowButtonProps = {
  token: string | undefined
  userId: string
}

export default function FollowButton({ token, userId }: FollowButtonProps) {
  const { isFollowing, isLoading, handleFollowToggle } = useFollowUserAction(
    token,
    userId
  )

  const router = useRouter()

  if (!token) {
    return (
      <button
        onClick={() => router.push('/sign-in')}
        className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1 text-gray-900 bg-gray-300 ring-gray-300 hover:bg-gray-200"
      >
        Follow
      </button>
    )
  }

  if (isLoading) {
    return (
      <button
        disabled
        className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1 text-gray-900 bg-gray-300 ring-gray-300 cursor-not-allowed"
      >
        loading...
      </button>
    )
  }

  return (
    <button
      onClick={() => handleFollowToggle(!!isFollowing)}
      className={classNames(
        'inline-flex w-full flex-shrink-0 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1',
        isFollowing
          ? 'bg-indigo-600 text-white hover:bg-indigo-500'
          : 'text-gray-900 bg-gray-300 ring-gray-300 hover:bg-gray-200'
      )}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}
