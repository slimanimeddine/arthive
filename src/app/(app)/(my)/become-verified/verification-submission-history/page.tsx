import VerificationSubmissions from '@/components/become-verified/verification-submissions'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Verification Submission History',
    'View your verification submission history'
  ),
}

export default async function VerificationSubmissionHistory() {
  const { token } = await verifyAuth()

  return <VerificationSubmissions token={token} />
}
