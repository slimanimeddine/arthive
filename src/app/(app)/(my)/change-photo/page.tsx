import ChangePhotoForm from '@/components/change-photo/change-photo-form'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Change Profile Photo', 'Change your profile photo on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <ChangePhotoForm token={token} />
}
