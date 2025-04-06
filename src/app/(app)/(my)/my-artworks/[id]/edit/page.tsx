import { EditArtwork } from '@/components/edit-work/edit-artwork'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  return <EditArtwork id={id} />
}
