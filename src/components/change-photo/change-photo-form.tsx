'use client'
import { useUpdateAuthenticatedUser } from '@/hooks/users'
import { MAX_FILE_SIZE } from '@/lib/constants'
import {
  authHeader,
  classNames,
  getCroppedImg,
  getUrlFromBlob,
  onError,
  turnBlobToFile,
} from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Cropper, { Area } from 'react-easy-crop'
import toast from 'react-hot-toast'

type ChangePhotoFormProps = {
  token: string
}

export default function ChangePhotoForm({ token }: ChangePhotoFormProps) {
  const queryClient = useQueryClient()

  const updateAuthenticatedUserMutation = useUpdateAuthenticatedUser(
    authHeader(token)
  )

  const [file, setFile] = useState<string>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.webp'] },
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      const image = getUrlFromBlob(acceptedFiles[0])
      setFile(image)
    },
  })

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      if (!file) return
      const croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
    },
    [file, rotation]
  )

  const resetModifications = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  const cancelEditing = () => {
    setFile(undefined)
  }

  function onUpload() {
    if (croppedImage) {
      updateAuthenticatedUserMutation.mutate(
        {
          data: {
            photo: turnBlobToFile(croppedImage),
          },
        },
        {
          onError,
          onSuccess: () => {
            toast.success('Profile picture changed successfully!')
            queryClient.invalidateQueries({ queryKey: ['/api/v1/users/me'] })
            setFile(undefined)
          },
        }
      )
    }
  }

  const isDisabled = !croppedImage || updateAuthenticatedUserMutation.isPending
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div className="px-4 py-6 sm:p-8">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Change Profile Photo
        </h2>
        <div className="mt-10 grid max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            {file ? (
              <div className="relative w-full h-48 sm:h-96 rounded-lg overflow-hidden">
                <Cropper
                  image={file}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={8 / 7}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
              >
                <input {...getInputProps()} />
                <p className="text-gray-600">
                  Drag and drop photos here, or click to select files
                </p>
              </div>
            )}
          </div>

          {file && (
            <div className="col-span-full flex flex-row items-center justify-center space-x-4 mt-4">
              <span className="isolate inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Zoom in
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(prev - 0.2, 1))}
                  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Zoom out
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((prev) => prev + 90)}
                  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Rotate
                </button>
                <button
                  type="button"
                  onClick={resetModifications}
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Reset
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        {file && (
          <button
            type="button"
            onClick={cancelEditing}
            className="relative -ml-px inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={onUpload}
          disabled={isDisabled}
          className={classNames(
            'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            isDisabled ? 'cursor-not-allowed' : 'hover:bg-indigo-500'
          )}
        >
          Upload
        </button>
      </div>
    </div>
  )
}
