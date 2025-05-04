import EditProfile from '@/components/edit-profile'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Edit Profile', 'Edit your profile on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <EditProfile token={token} />
}
