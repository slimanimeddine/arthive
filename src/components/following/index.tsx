'use client'

import { useListAuthenticatedUserFollowing } from '@/hooks/follows'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import EmptyUI from '../empty-ui'
import ErrorUI from '../error-ui'
import LoadingUI from '../loading-ui'
import ArtistCard from '../main/artist-card'

type IndexProps = {
  token: string
}

export default function Index({ token }: IndexProps) {
  const listAuthenticatedUserFollowingQuery = useListAuthenticatedUserFollowing(
    authHeader(token)
  )

  return matchQueryStatus(listAuthenticatedUserFollowingQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const following = data.data.map((follower) => ({
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
          </div>
        </div>
      )
    },
  })
}
