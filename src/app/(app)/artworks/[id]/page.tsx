import { ArtworkPost } from '@/components/artwork-post/post'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  return <ArtworkPost id={id} />
}
