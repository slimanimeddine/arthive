'use client'

import { authHeader, fileUrl, matchQueryStatus, onError } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Pagination from '../pagination'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'
import {
  useDeleteArtwork,
  useListAuthenticatedUserArtworks,
} from '@/hooks/artworks'

type IndexProps = {
  token: string
}

export default function Index({ token }: IndexProps) {
  const queryClient = useQueryClient()
  const authConfig = authHeader(token)
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
    authConfig
  )

  const deleteArtworkMutation = useDeleteArtwork(authConfig)

  const handleDeleteArtwork = (artworkId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this artwork? This action cannot be undone.'
      )
    ) {
      deleteArtworkMutation.mutate(
        {
          artworkId,
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/users/me/artworks'],
            })

            toast.success('Artwork deleted successfully!')
          },
        }
      )
    }
  }

  return matchQueryStatus(artworksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const artworks = data.data.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
        status: artwork.status,
      }))

      const links = data.links
      const meta = data.meta

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
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

                                <button
                                  onClick={() =>
                                    handleDeleteArtwork(artwork.id)
                                  }
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Remove
                                  <span className="sr-only">
                                    , {artwork.title}
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {meta.total > 10 && (
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
    },
  })
}
