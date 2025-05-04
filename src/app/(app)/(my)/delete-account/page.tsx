import DeleteAccount from '@/components/delete-account'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Delete Account', 'Delete your account on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <DeleteAccount token={token} />
}
