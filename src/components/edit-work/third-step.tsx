'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateArtworkDraftBody } from '@/schemas/artworks'
import { TAGS } from '@/lib/constants'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { FirstStepProps } from './first-step'
import { useUpdateArtworkDraft } from '@/api/artworks/artworks'

type FormData = z.infer<typeof updateArtworkDraftBody>

type ThirdStepProps = FirstStepProps

export function ThirdStep({ artwork }: ThirdStepProps) {
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

  const updateArtworkMutation = useUpdateArtworkDraft(axiosConfig)

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(updateArtworkDraftBody),
    defaultValues: {
      title: artwork.title,
      description: artwork.description,
      tags: artwork.tags.map((item) => item.name),
    },
  })

  const onSubmit = (data: FormData) => {
    const dataObj = {
      title: data.title,
      description: data.description,
      tags: data.tags,
    }

    updateArtworkMutation.mutate(
      {
        artworkId: artwork.id,
        data: dataObj,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/users/me/artworks'],
          })
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
          })

          toast.success('Artwork draft updated successfully!')
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
        Update Draft
      </button>
    </form>
  )
}
