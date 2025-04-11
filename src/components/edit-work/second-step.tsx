'use client'
import { getCroppedImg, onError } from '@/lib/utils'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { FirstStepProps } from './first-step'
import { useQueryClient } from '@tanstack/react-query'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import {
  useReplaceArtworkPhotoPath,
  useSetArtworkPhotoAsMain,
} from '@/api/artwork-photos/artwork-photos'

type SecondStepProps = FirstStepProps

export function SecondStep({ artwork }: SecondStepProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const defaultMainPhoto = artwork.photos.find(
    (photo) => photo.path === artwork.mainPhotoUrl
  )

  const [mainPhoto, setMainPhoto] = useState<
    | {
        id: number
        path: string
      }
    | undefined
  >(defaultMainPhoto)

  const [croppedMainPhoto, setCroppedMainPhoto] = useState<Blob | null>(null)

  const queryClient = useQueryClient()

  const token = useGetAuthenticatedUserToken()

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      }
    : undefined

  const setArtworkPhotoAsMainMutation = useSetArtworkPhotoAsMain(axiosConfig)
  const replaceArtworkPhotoPathMutation =
    useReplaceArtworkPhotoPath(axiosConfig)

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      if (!mainPhoto) return
      const croppedImage = await getCroppedImg(
        artwork.mainPhotoUrl,
        croppedAreaPixels
      )

      setCroppedMainPhoto(croppedImage)
    },
    [artwork.mainPhotoUrl, mainPhoto]
  )

  function handleSetAsMainPhoto() {
    if (mainPhoto && croppedMainPhoto) {
      replaceArtworkPhotoPathMutation.mutate(
        {
          artworkPhotoId: mainPhoto.id,
          data: {
            photo: croppedMainPhoto,
          },
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
            })

            setArtworkPhotoAsMainMutation.mutate(
              {
                artworkPhotoId: mainPhoto.id,
              },
              {
                onError,
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
                  })
                },
              }
            )
          },
        }
      )
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Step 2: Select Main Photo & Crop
      </h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Main Photo:</h3>
        <div className="flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.path}
              alt={`Uploaded ${photo.id}`}
              width={96}
              height={96}
              onClick={() => setMainPhoto(photo)}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                mainPhoto?.path === photo.path
                  ? 'border-2 border-indigo-500'
                  : ''
              }`}
            />
          ))}
        </div>
      </div>
      {mainPhoto?.path && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Crop Main Photo:</h3>
            <button
              type="button"
              onClick={handleSetAsMainPhoto}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Set as Main Photo
            </button>
          </div>
          <div className="relative w-full h-96 overflow-hidden rounded-md">
            <Cropper
              image={mainPhoto?.path}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
