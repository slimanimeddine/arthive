import CreateArtwork from '@/components/submit-work/create-artwork'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const { token } = await verifyAuth()

  return <CreateArtwork token={token} />
}
