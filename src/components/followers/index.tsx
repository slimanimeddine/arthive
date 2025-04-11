'use client'

import { useListAuthenticatedUserFollowers } from '@/api/follows/follows'
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

  const followersQuery = useListAuthenticatedUserFollowers(axiosConfig)

  if (followersQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (followersQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const followersQueryData = followersQuery.data!.data.data!

  const followers = followersQueryData.map((follower) => ({
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
            Followers |{' '}
            <span className="text-lg">{followers.length} people</span>
          </h2>
        </div>

        {followersQuery.isSuccess && followers.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">No followers were found</p>
        )}

        {followersQuery.isSuccess && followers.length > 0 && (
          <ul
            role="list"
            className="divide-y divide-gray-100"
          >
            {followers.map((follower) => (
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
