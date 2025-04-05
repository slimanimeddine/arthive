'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useArtworkStore from '@/stores/artwork-store'
import { createArtworkBody } from '@/schemas/artworks'
import { TAGS } from '@/lib/constants'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { useCreateArtwork } from '@/api/artworks/artworks'
import { onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const schema = createArtworkBody.omit({ photos: true })
type FormData = z.infer<typeof schema>

export function ThirdStep() {
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

  const createArtworkMutation = useCreateArtwork(axiosConfig)

  const queryClient = useQueryClient()

  const {
    photos,
    mainPhoto,
    croppedMainPhoto,
    categories,
    title,
    description,
    setCategories,
    setTitle,
    setDescription,
  } = useArtworkStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title, description, tags: categories },
  })

  const onSubmit = (data: FormData) => {
    setTitle(data.title)
    setDescription(data.description)
    setCategories(data.tags)

    const dataObj = {
      title,
      description,
      tags: categories,
      photos: photos.map((item) => ({
        file: item === mainPhoto ? (croppedMainPhoto as Blob) : item,
        is_main: item === mainPhoto,
      })),
    }

    createArtworkMutation.mutate(
      {
        data: dataObj,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/users/me/artworks'],
          })
          toast.success('Artwork draft created successfully!')
        },
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Step 3: Fill Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title:
        </label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description:
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categories:
        </label>
        <select
          multiple
          {...register('tags')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {TAGS.map((tag) => (
            <option
              value={tag}
              key={tag}
            >
              {tag}
            </option>
          ))}
        </select>
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
      >
        Save as Draft
      </button>
    </form>
  )
}
