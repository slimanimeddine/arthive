import BecomeVerified from '@/components/become-verified'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Become Verified', 'Become a verified user on ArtHive'),
}

export default async function Page() {
  const { token } = await verifyAuth()

  return <BecomeVerified token={token} />
}
