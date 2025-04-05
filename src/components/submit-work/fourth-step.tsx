'use client'

import { getUrlFromBlob } from '@/lib/utils'
import useArtworkStore from '@/stores/artwork-store'
import Image from 'next/image'

export function FourthStep() {
  const {
    photos,
    mainPhoto,
    croppedMainPhoto,
    categories,
    title,
    description,
    setStatus,
  } = useArtworkStore()

  const handlePublish = () => {
    setStatus('published')
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
