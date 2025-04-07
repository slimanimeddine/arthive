'use client'

import { usePublishArtwork } from '@/api/artworks/artworks'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { getUrlFromBlob, onError } from '@/lib/utils'
import useArtworkStore from '@/stores/artwork-store'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import toast from 'react-hot-toast'

export function FourthStep() {
  const {
    photos,
    mainPhoto,
    croppedMainPhoto,
    categories,
    title,
    description,
    setStatus,
    id,
    setToDefault,
  } = useArtworkStore()

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

  const publishArtworkMutation = usePublishArtwork(axiosConfig)

  const queryClient = useQueryClient()

  const handlePublish = () => {
    if (
      window.confirm(
        'Once you publish your artwork you cannot modify it anymore. Do you want to proceed?'
      )
    ) {
      setStatus('published')

      publishArtworkMutation.mutate(
        {
          artworkId: id!,
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/users/me/artworks'],
            })
            toast.success('Artwork draft published successfully!')
            setToDefault()
          },
        }
      )
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Step 4: Preview & Publish</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Main Photo:</h3>
        <Image
          src={
            getUrlFromBlob(croppedMainPhoto) || getUrlFromBlob(mainPhoto) || ''
          }
          alt="Main Photo"
          className="w-48 h-48 object-cover rounded-md"
          width={192}
          height={192}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Other Photos:</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
              className="w-24 h-24 object-cover rounded-md"
              width={96}
              height={96}
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Details:</h3>
        <p className="text-gray-700">
          <strong>Title:</strong> {title}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {description}
        </p>
        <p className="text-gray-700">
          <strong>Categories:</strong> {categories.join(', ')}
        </p>
      </div>
      <button
        onClick={handlePublish}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Publish
      </button>
    </div>
  )
}
