import ArtworkPost from '@/components/artwork-post/post'
import { prefetchShowPublishedArtwork } from '@/hooks/artworks'
import { getAuth } from '@/lib/dal'
import { QueryClient } from '@tanstack/react-query'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const { token } = await getAuth()
  const queryClient = new QueryClient()

  await prefetchShowPublishedArtwork(queryClient, id)

  return (
    <ArtworkPost
      token={token}
      id={id}
    />
  )
}
