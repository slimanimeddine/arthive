'use client'

import {
  useDeleteArtworkPhoto,
  useUploadArtworkPhotos,
} from '@/hooks/artwork-photos'
import { MAX_FILE_SIZE } from '@/lib/constants'
import { authHeader, onError, turnBlobToFile } from '@/lib/utils'
import { Tag } from '@/types/misc'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export type FirstStepProps = {
  token: string
  artwork: {
    id: string
    title: string
    description: string
    status: string
    publishedAt: string
    mainPhotoUrl: string
    photos: {
      id: string
      path: string
    }[]
    tags: {
      id: string
      name: Tag
    }[]
  }
}

export default function FirstStep({ token, artwork }: FirstStepProps) {
  const queryClient = useQueryClient()

  const authConfig = authHeader(token)

  const uploadArtworkPhotosMutation = useUploadArtworkPhotos(authConfig)

  const deleteArtworkPhotoMutation = useDeleteArtworkPhoto(authConfig)

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (artwork.photos.length + acceptedFiles.length > 10) {
        alert('You can upload a maximum of 10 photos.')
        return
      }
      uploadArtworkPhotosMutation.mutate(
        {
          artworkId: artwork.id,
          data: {
            photos: acceptedFiles.map((file) => turnBlobToFile(file)),
          },
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
            })
            toast.success('Photos uploaded successfully')
          },
        }
      )
    },
    [
      artwork.photos.length,
      artwork.id,
      uploadArtworkPhotosMutation,
      queryClient,
    ]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: MAX_FILE_SIZE,
  })

  const handleRemovePhoto = (photo: { id: string; path: string }) => {
    deleteArtworkPhotoMutation.mutate(
      {
        artworkPhotoId: photo.id,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
          })
          toast.success('Photo removed successfully')
        },
      }
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Step 1: Upload Photos</h2>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop photos here, or click to select files
        </p>
      </div>
      {artwork.photos && artwork.photos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <span
              key={photo.id}
              className="relative inline-block"
            >
              <Image
                src={photo.path}
                alt={`Uploaded ${photo.id}`}
                className="w-24 h-24 object-cover rounded-md"
                width={96}
                height={96}
              />

              <button
                onClick={() => handleRemovePhoto(photo)}
                className="absolute right-0 top-0 block h-4 w-4 hover:w-[18px] hover:h-[18px] -translate-y-1/2 translate-x-1/2 transform rounded-full bg-gray-400 ring-2 ring-white"
              >
                <XMarkIcon />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
