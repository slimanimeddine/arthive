'use client'

import { useShowUser } from '@/hooks/users'
import { fileUrl, matchQueryStatus } from '@/lib/utils'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import EmptyUI from '../empty-ui'
import ErrorUI from '../error-ui'
import LoadingUI from '../loading-ui'
import FollowButton from './follow-button'
import RatingsByTag from './ratings-by-tag'

type ArtistInformationProps = {
  token: string | undefined
  username: string
}

export default function ArtistInformation({
  token,
  username,
}: ArtistInformationProps) {
  const showUserQuery = useShowUser(username)

  return matchQueryStatus(showUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={'Artist has no data'} />,
    Success: ({ data }) => {
      const artistInformation = {
        id: data.data.id,
        fullName: `${data.data.first_name} ${data.data.last_name}`,
        username: data.data.username,
        description: data.data.bio,
        profilePictureUrl: fileUrl(data.data.photo),
        country: data.data.country,
        dateJoined: data.data.created_at,
        verified: data.data.artist_verified_at ? true : false,
      }

      return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white">
          <div>
            <div className="pb-1 sm:pb-6">
              <div>
                <div>
                  {artistInformation.profilePictureUrl ? (
                    <div className="relative h-40 sm:h-56">
                      <Image
                        alt=""
                        src={artistInformation.profilePictureUrl}
                        className="absolute h-full w-full object-cover rounded-lg"
                        height={600}
                        width={800}
                      />
                    </div>
                  ) : (
                    <div
                      className={
                        'inline-block overflow-hidden rounded-lg bg-gray-100 w-[400px] h-[200px] xs:w-full'
                      }
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-full w-full text-gray-300"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                  <div className="sm:flex-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {artistInformation.fullName}
                        </h3>
                        {artistInformation.verified && (
                          <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        @{artistInformation.username}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                      <FollowButton
                        token={token}
                        userId={artistInformation.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                    Bio
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    <p>{artistInformation.description ?? 'Unknown'}</p>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                    Country
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {data.data.country ?? 'Unknown'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                    Date joined
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    <time dateTime="2020-01-07">
                      {new Date(artistInformation.dateJoined).toDateString()}
                    </time>
                  </dd>
                </div>
                <RatingsByTag username={username} />
              </dl>
            </div>
          </div>
        </div>
      )
    },
  })
}
