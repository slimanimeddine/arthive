'use client'

import { UpdateArtworkDraftBody, useUpdateArtworkDraft } from '@/hooks/artworks'
import { TAGS } from '@/lib/constants'
import { authHeader, getDirtyValues, onError } from '@/lib/utils'
import { updateArtworkDraftBody } from '@/schemas/artworks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FirstStepProps } from './first-step'

type ThirdStepProps = FirstStepProps

export default function ThirdStep({ token, artwork }: ThirdStepProps) {
  const updateArtworkDraftMutation = useUpdateArtworkDraft(authHeader(token))

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState } = useForm<UpdateArtworkDraftBody>(
    {
      resolver: zodResolver(updateArtworkDraftBody),
      defaultValues: {
        title: artwork.title,
        description: artwork.description,
        tags: artwork.tags.map((item) => item.name),
      },
    }
  )

  const onSubmit = (data: UpdateArtworkDraftBody) => {
    const dirtyValues = getDirtyValues(formState.dirtyFields, data)

    updateArtworkDraftMutation.mutate(
      {
        artworkId: artwork.id,
        data: dirtyValues,
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

  const isDisabled =
    formState.isSubmitting ||
    updateArtworkDraftMutation.isPending ||
    !token ||
    !formState.isDirty

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
        {formState.errors.title && (
          <p className="text-red-500 text-sm">
            {formState.errors.title.message}
          </p>
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
        {formState.errors.description && (
          <p className="text-red-500 text-sm">
            {formState.errors.description.message}
          </p>
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
        {formState.errors.tags && (
          <p className="text-red-500 text-sm">
            {formState.errors.tags.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
      >
        Update Draft
      </button>
    </form>
  )
}
