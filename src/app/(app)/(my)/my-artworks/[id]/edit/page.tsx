import EditArtwork from '@/components/edit-work/edit-artwork'
import { verifyAuth } from '@/lib/dal'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const { token } = await verifyAuth()

  return (
    <EditArtwork
      token={token}
      id={id}
    />
  )
}
