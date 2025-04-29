'use client'
import { getCroppedImg, getUrlFromBlob } from '@/lib/utils'
import useArtworkStore from '@/stores/artwork-store'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

export default function SecondStep() {
  const { photos, mainPhoto, setMainPhoto, setCroppedMainPhoto } =
    useArtworkStore()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      if (!mainPhoto) return
      const croppedImage = await getCroppedImg(
        getUrlFromBlob(mainPhoto),
        croppedAreaPixels
      )
      setCroppedMainPhoto(croppedImage)
    },
    [mainPhoto, setCroppedMainPhoto]
  )

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Step 2: Select Main Photo & Crop
      </h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Main Photo:</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
              width={96}
              height={96}
              onClick={() => setMainPhoto(photo)}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer ${mainPhoto === photo ? 'border-2 border-indigo-500' : ''}`}
            />
          ))}
        </div>
      </div>
      {mainPhoto && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Crop Main Photo:</h3>
          <div className="relative w-full h-96 overflow-hidden rounded-md">
            <Cropper
              image={getUrlFromBlob(mainPhoto)}
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
