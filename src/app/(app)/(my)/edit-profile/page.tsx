import EditProfile from '@/components/edit-profile'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <EditProfile token={token} />
}
