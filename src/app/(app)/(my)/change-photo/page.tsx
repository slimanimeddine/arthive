import ChangePhotoForm from '@/components/change-photo/change-photo-form'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <ChangePhotoForm token={token} />
}
