import Index from '@/components/notifications'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token, id } = await verifyAuth()
  return (
    <Index
      token={token}
      userId={id}
    />
  )
}
