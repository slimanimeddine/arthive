import VerificationSubmissions from '@/components/become-verified/verification-submissions'
import { verifyAuth } from '@/lib/dal'

export default async function VerificationSubmissionHistory() {
  const { token } = await verifyAuth()

  return <VerificationSubmissions token={token} />
}
