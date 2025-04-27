'use client'

import { MAX_FILE_SIZE } from '@/lib/constants'
import { getUrlFromBlob } from '@/lib/utils'
import useArtworkStore from '@/stores/artwork-store'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FirstStep() {
  const {
    photos,
    removePhoto,
    addPhotos,
    removeMainPhoto,
    removeCroppedMainPhoto,
  } = useArtworkStore()

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (photos.length + acceptedFiles.length > 10) {
        alert('You can upload a maximum of 10 photos.')
        return
      }
      addPhotos(acceptedFiles)
    },
    [photos, addPhotos]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: MAX_FILE_SIZE,
  })

  const handleRemovePhoto = (photo: Blob) => {
    removePhoto(photo)
    removeMainPhoto()
    removeCroppedMainPhoto()
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
      <div className="mt-4 flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <span
            key={index}
            className="relative inline-block"
          >
            <Image
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
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
    </div>
  )
}
