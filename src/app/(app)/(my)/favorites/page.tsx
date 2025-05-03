import Favorites from '@/components/favorites'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <Favorites token={token} />
}
