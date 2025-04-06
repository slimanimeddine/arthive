'use client'

import { useListAuthenticatedUserArtworks } from '@/api/artworks/artworks'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { fileUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Pagination } from '../pagination'

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

  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const status = searchParams.get('status')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(status && { 'filter[status]': status }),
    ...(page && { page }),
  }

  const artworksQuery = useListAuthenticatedUserArtworks(
    queryParams,
    axiosConfig
  )

  if (artworksQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (artworksQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const artworksQueryData = artworksQuery.data!.data.data!

  const artworks = artworksQueryData.map((artwork) => ({
    id: artwork.id!,
    title: artwork.title!,
    mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path!)!,
    status: artwork.status!,
  }))

  const links = artworksQuery.data!.data.links!
  const meta = artworksQuery.data!.data.meta!

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            My Artworks |{' '}
            <span className="text-lg">{artworks.length} artworks</span>
          </h2>
        </div>
        <div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {artworksQuery.isSuccess && artworks.length === 0 && (
                  <p className="mt-2 text-sm text-gray-700">
                    No Artworks were submitted yet
                  </p>
                )}

                {artworksQuery.isSuccess && artworks.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Main Photo
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {artworks.map((artwork) => (
                        <tr key={artwork.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {artwork.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Image
                              src={artwork.mainPhotoUrl}
                              alt=""
                              className="w-32 h-32"
                              width={128}
                              height={128}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {artwork.status}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <div className="flex flex-col items-end gap-y-3">
                              {artwork.status === 'draft' ? (
                                <Link
                                  href={`/my-artworks/${artwork.id}/edit`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {artwork.title}
                                  </span>
                                </Link>
                              ) : (
                                <Link
                                  href={`/artworks/${artwork.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View
                                  <span className="sr-only">
                                    , {artwork.title}
                                  </span>
                                </Link>
                              )}

                              <Link
                                href={`/my-artworks/${artwork.id}/edit`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Remove
                                <span className="sr-only">
                                  , {artwork.title}
                                </span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {artworksQuery.isSuccess && meta.total! >= 10 && (
          <div className="pt-8">
            <Pagination
              links={links}
              meta={meta}
            />
          </div>
        )}
      </div>
    </div>
  )
}
