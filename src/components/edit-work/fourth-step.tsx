'use client'

import { usePublishArtwork } from '@/hooks/artworks'
import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FirstStepProps } from './first-step'

type FourthStepProps = FirstStepProps

export default function FourthStep({ token, artwork }: FourthStepProps) {
  const publishArtworkMutation = usePublishArtwork(authHeader(token))

  const queryClient = useQueryClient()

  const handlePublish = () => {
    if (
      window.confirm(
        'Once you publish your artwork you cannot modify it anymore. Do you want to proceed?'
      )
    ) {
      publishArtworkMutation.mutate(
        {
          artworkId: artwork.id,
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/users/me/artworks'],
            })
            toast.success('Artwork draft published successfully!')
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
          src={artwork.mainPhotoUrl}
          alt="Main Photo"
          className="w-48 h-48 object-cover rounded-md"
          width={192}
          height={192}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Other Photos:</h3>
        <div className="flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.path}
              alt={`Uploaded ${photo.id}`}
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
          <strong>Title:</strong> {artwork.title}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {artwork.description}
        </p>
        <p className="text-gray-700">
          <strong>Categories:</strong>{' '}
          {artwork.tags.map((item) => item.name).join(', ')}
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
