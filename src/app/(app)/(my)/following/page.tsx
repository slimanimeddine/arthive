import Index from '@/components/following'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <Index token={token} />
}
