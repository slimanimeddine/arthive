'use client'

import FirstStep from './first-step'
import SecondStep from './second-step'
import ThirdStep from './third-step'
import FourthStep from './fourth-step'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import { useShowAuthenticatedUserArtwork } from '@/hooks/artworks'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'
import { Tag } from '@/types/misc'

type EditArtworkProps = {
  token: string
  id: string
}

export default function EditArtwork({ token, id }: EditArtworkProps) {
  const artworkQuery = useShowAuthenticatedUserArtwork(id, authHeader(token))

  return matchQueryStatus(artworkQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const artworkData = data.data

      const artwork = {
        id: artworkData.id,
        title: artworkData.title,
        description: artworkData.description,
        status: artworkData.status,
        publishedAt: artworkData.created_at,
        mainPhotoUrl: fileUrl(artworkData.artwork_main_photo_path)!,
        photos: artworkData.artwork_photos!.map((photo) => ({
          id: photo.id,
          path: fileUrl(photo.path)!,
        })),
        tags: artworkData.tags.map((tag) => ({
          id: tag.id,
          name: tag.name as Tag,
        })),
      }

      return (
        <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8">Edit Artwork</h1>

          <div className="flex flex-col gap-8">
            <FirstStep
              token={token}
              artwork={artwork}
            />
            <SecondStep
              token={token}
              artwork={artwork}
            />
            <ThirdStep
              token={token}
              artwork={artwork}
            />
            <FourthStep
              token={token}
              artwork={artwork}
            />
          </div>
        </div>
      )
    },
  })
}
