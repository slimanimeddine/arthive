import ArtistProfile from '@/components/artist-profile'
import { getAuth } from '@/lib/dal'

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  const { token } = await getAuth()

  return (
    <ArtistProfile
      token={token}
      username={username}
    />
  )
}
