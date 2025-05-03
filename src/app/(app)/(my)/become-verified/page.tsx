import BecomeVerified from '@/components/become-verified'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <BecomeVerified token={token} />
}
