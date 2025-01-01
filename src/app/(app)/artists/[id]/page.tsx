import { ArtistProfile } from '@/components/artist-profile'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <ArtistProfile />
}
