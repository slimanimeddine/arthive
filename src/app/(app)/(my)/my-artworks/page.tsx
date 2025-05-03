import MyArtworks from '@/components/my-artworks'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <MyArtworks token={token} />
}
