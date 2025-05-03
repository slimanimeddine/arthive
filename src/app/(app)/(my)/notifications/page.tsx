import Notifications from '@/components/notifications'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token, id } = await verifyAuth()

  return (
    <Notifications
      token={token}
      userId={id}
    />
  )
}
