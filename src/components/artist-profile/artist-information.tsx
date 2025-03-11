'use client'
import { useShowUser } from '@/api/users/users'
import { fileUrl } from '@/lib/utils'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RatingsByTag } from './ratings-by-tag'

type ArtistInformationProps = {
  username: string
}

export function ArtistInformation({ username }: ArtistInformationProps) {
  const artistInformationQuery = useShowUser(username)

  if (artistInformationQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">Loading...</p>
  }

  if (artistInformationQuery.isError) {
    if (artistInformationQuery.error?.response?.status === 404) {
      notFound()
    }

    return (
      <div className="h-screen">
        <p className="mt-2 text-sm text-red-700">
          {artistInformationQuery.error?.response?.data.message}
        </p>
      </div>
    )
  }

  const artistInformationData = artistInformationQuery.data!.data.data!

  const artistInformation = {
    id: artistInformationData.id!,
    fullName: `${artistInformationData.first_name} ${artistInformationData.last_name}`,
    username: artistInformationData.username!,
    description: artistInformationData.bio,
    profilePictureUrl: fileUrl(artistInformationData.photo),
    country: artistInformationData.country,
    dateJoined: artistInformationData.created_at!,
    verified: artistInformationData.artist_verified_at ? true : false,
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
                  <button
                    type="button"
                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                  >
                    Follow
                  </button>
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
                {artistInformationData.country ?? 'Unknown'}
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
}
