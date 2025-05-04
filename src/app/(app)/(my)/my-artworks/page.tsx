import MyArtworks from '@/components/my-artworks'
import {
  ListAuthenticatedUserArtworksParams,
  prefetchListAuthenticatedUserArtworks,
} from '@/hooks/artworks'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { authHeader } from '@/lib/utils'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('My Artworks', 'View your artworks on ArtHive'),
}

type SearchParamsValue =
  | string
  | number
  | ListAuthenticatedUserArtworksParams['filter[status]']
  | undefined

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: SearchParamsValue
  }>
}) {
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()
  const { status, page } = await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '10',
    ...(status && { 'filter[status]': status }),
    ...(page && { page }),
  }

  await prefetchListAuthenticatedUserArtworks(
    queryClient,
    queryParams,
    authHeader(token)
  )

  return <MyArtworks token={token} />
}
