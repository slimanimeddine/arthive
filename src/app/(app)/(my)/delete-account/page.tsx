import DeleteAccount from '@/components/delete-account'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <DeleteAccount token={token} />
}
