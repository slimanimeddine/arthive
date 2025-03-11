import { ArtistProfile } from '@/components/artist-profile'

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  return <ArtistProfile username={username} />
}
