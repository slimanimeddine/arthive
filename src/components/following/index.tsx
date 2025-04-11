'use client'

import { useListAuthenticatedUserFollowing } from '@/api/follows/follows'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { ArtistCard } from '../main/artist-card'

export function Index() {
  const token = useGetAuthenticatedUserToken()
  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const followingQuery = useListAuthenticatedUserFollowing(axiosConfig)

  if (followingQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (followingQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const followingQueryData = followingQuery.data!.data.data!

  const following = followingQueryData.map((follower) => ({
    id: follower.id!,
    fullName: `${follower.first_name} ${follower.last_name}`,
    username: follower.username!,
    country: follower.country,
    profilePictureUrl: follower.photo,
    verified: follower.artist_verified_at ? true : false,
  }))

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            Following |{' '}
            <span className="text-lg">{following.length} people</span>
          </h2>
        </div>

        {followingQuery.isSuccess && following.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">No following were found</p>
        )}

        {followingQuery.isSuccess && following.length > 0 && (
          <ul
            role="list"
            className="divide-y divide-gray-100"
          >
            {following.map((follower) => (
              <li key={follower.id}>
                <ArtistCard {...follower} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
