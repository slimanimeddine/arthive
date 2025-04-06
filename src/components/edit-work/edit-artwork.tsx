'use client'

import { FirstStep } from './first-step'
import { SecondStep } from './second-step'
import { ThirdStep } from './third-step'
import { FourthStep } from './fourth-step'
import { fileUrl } from '@/lib/utils'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { useShowAuthenticatedUserArtwork } from '@/api/artworks/artworks'
import { notFound } from 'next/navigation'
import { Tag } from '@/lib/types'

type EditArtworkProps = {
  id: number
}

export function EditArtwork({ id }: EditArtworkProps) {
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

  const artworkQuery = useShowAuthenticatedUserArtwork(id, axiosConfig)

  if (artworkQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (artworkQuery.isError) {
    if (artworkQuery.error?.response?.status === 404) {
      notFound()
    }
    return (
      <div className="h-screen">
        <p className="mt-2 text-sm text-red-700">
          {artworkQuery.error?.response?.data.message}
        </p>
      </div>
    )
  }

  const artworkData = artworkQuery.data!.data.data!

  const artwork = {
    id: artworkData.id!,
    title: artworkData.title!,
    description: artworkData.description!,
    status: artworkData.status!,
    publishedAt: artworkData.created_at!,
    mainPhotoUrl: fileUrl(artworkData.artwork_main_photo_path!)!,
    photos: artworkData
      .artwork_photos!.filter((photo) => photo.is_main === 0)
      .map((photo) => ({
        id: photo.id!,
        path: fileUrl(photo.path!)!,
      })),
    tags: artworkData.tags!.map((tag) => ({
      id: tag.id!,
      name: tag.name as Tag,
    })),
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Artwork</h1>

      <div className="flex flex-col gap-8">
        <FirstStep artwork={artwork} />
        <SecondStep artwork={artwork} />
        <ThirdStep artwork={artwork} />
        <FourthStep artwork={artwork} />
      </div>
    </div>
  )
}
