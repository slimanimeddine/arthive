import EditArtwork from '@/components/edit-work/edit-artwork'
import {
  prefetchShowAuthenticatedUserArtwork,
  showAuthenticatedUserArtwork,
} from '@/hooks/artworks'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { authHeader } from '@/lib/utils'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const artwork = await showAuthenticatedUserArtwork(id)

  return {
    ...seo(artwork.data.title, artwork.data.description),
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const { token } = await verifyAuth()

  const queryClient = new QueryClient()

  await prefetchShowAuthenticatedUserArtwork(queryClient, id, authHeader(token))

  return (
    <EditArtwork
      token={token}
      id={id}
    />
  )
}
