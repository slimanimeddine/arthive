import { ArtworkPost } from '@/components/artwork-post/post'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <ArtworkPost />
}
