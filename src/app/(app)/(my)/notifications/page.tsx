import Notifications from '@/components/notifications'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Notifications', 'View your notifications'),
}

export default async function Page() {
  const { token, id } = await verifyAuth()

  return (
    <Notifications
      token={token}
      userId={id}
    />
  )
}
