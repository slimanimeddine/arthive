import Notifications from '@/components/notifications'
import { prefetchListAuthenticatedUserNotifications } from '@/hooks/notifications'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { authHeader } from '@/lib/utils'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Notifications', 'View your notifications'),
}
type SearchParamsValue = string | number | undefined

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: SearchParamsValue
  }>
}) {
  const { token, id } = await verifyAuth()
  const queryClient = new QueryClient()
  const { page } = await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '10',
    ...(page && { page }),
  }

  await prefetchListAuthenticatedUserNotifications(
    queryClient,
    queryParams,
    authHeader(token)
  )

  return (
    <Notifications
      token={token}
      userId={id}
    />
  )
}
