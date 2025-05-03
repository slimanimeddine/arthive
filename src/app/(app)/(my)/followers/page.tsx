import Followers from '@/components/followers'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <Followers token={token} />
}
