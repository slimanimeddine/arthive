'use client'
import {
  useReplaceArtworkPhotoPath,
  useSetArtworkPhotoAsMain,
} from '@/hooks/artwork-photos'
import { authHeader, getCroppedImg, onError, turnBlobToFile } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { FirstStepProps } from './first-step'
import toast from 'react-hot-toast'

type SecondStepProps = FirstStepProps

export default function SecondStep({ token, artwork }: SecondStepProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const defaultMainPhoto = artwork.photos.find(
    (photo) => photo.path === artwork.mainPhotoUrl
  )

  const [mainPhoto, setMainPhoto] = useState<
    | {
        id: string
        path: string
      }
    | undefined
  >(defaultMainPhoto)

  const [croppedMainPhoto, setCroppedMainPhoto] = useState<Blob | null>(null)

  const queryClient = useQueryClient()

  const authConfig = authHeader(token)
  const setArtworkPhotoAsMainMutation = useSetArtworkPhotoAsMain(authConfig)
  const replaceArtworkPhotoPathMutation = useReplaceArtworkPhotoPath(authConfig)

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

  function handleSetMainPhoto() {
    if (mainPhoto) {
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
            toast.success('Main photo set successfully')
          },
        }
      )
    }
  }

  function handleCropMainPhoto() {
    if (mainPhoto && croppedMainPhoto) {
      replaceArtworkPhotoPathMutation.mutate(
        {
          artworkPhotoId: mainPhoto.id,
          data: {
            photo: turnBlobToFile(croppedMainPhoto),
          },
        },
        {
          onError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
            })

            toast.success('Main photo cropped successfully')
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
      <button
        type="button"
        disabled={!mainPhoto}
        onClick={handleSetMainPhoto}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
      >
        Set selected photo as main
      </button>
      {mainPhoto?.path && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Crop Main Photo:</h3>
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
      <button
        type="button"
        disabled={!croppedMainPhoto}
        onClick={handleCropMainPhoto}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
      >
        Crop main photo
      </button>
    </div>
  )
}
