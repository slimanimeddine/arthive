import ArtistsDisplay from '@/components/artists/artists-display'
import { ListUsersParams, prefetchListUsers } from '@/hooks/users'
import { getAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Artists',
    'Discover a diverse range of talented artists from around the world. Explore their unique styles, connect with their work, and find inspiration in the art community.'
  ),
}

type SearchParamsValue =
  | string
  | boolean
  | number
  | ListUsersParams['sort']
  | undefined

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: SearchParamsValue
  }>
}) {
  const queryClient = new QueryClient()

  const { token } = await getAuth()
  const { country, category, artistSort, page, searchQuery } =
    await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '12',
    ...(country && { 'filter[country]': country }),
    ...(category && { 'filter[tag]': category }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  }

  await prefetchListUsers(queryClient, queryParams)

  return <ArtistsDisplay token={token} />
}
