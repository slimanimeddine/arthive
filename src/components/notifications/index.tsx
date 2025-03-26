'use client'
import {
  useListAuthenticatedUserNotifications,
  useMarkAllNotificationsAsRead,
} from '@/api/notifications/notifications'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { NotificationDataItem } from '@/lib/types'
import { Notification } from './notification'
import { Pagination } from '../pagination'
import { useSearchParams } from 'next/navigation'
import { CheckIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { onError } from '@/lib/utils'

export function Index() {
  const token = useGetAuthenticatedUserToken()

  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const queryClient = useQueryClient()

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(page && { page }),
  }

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const notificationsQuery = useListAuthenticatedUserNotifications(
    queryParams,
    axiosConfig
  )

  const markAllReadMutation = useMarkAllNotificationsAsRead(axiosConfig)

  function markAllRead() {
    markAllReadMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success('Notifications were marked as read')
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications`],
        })
      },
    })
  }

  if (notificationsQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (notificationsQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const notificationsQueryData = notificationsQuery.data!.data.data!
    .data! as NotificationDataItem[]

  const notifications = notificationsQueryData.map((notification) => ({
    id: notification.id!,
    type: notification.type!,
    readAt: notification.read_at,
    createdAt: notification.created_at!,
    updatedAt: notification.updated_at!,
    data: notification.data,
  }))

  const links = {
    first: notificationsQuery.data?.data?.data?.first_page_url,
    last: notificationsQuery.data?.data?.data?.last_page_url,
    prev: notificationsQuery.data?.data?.data?.prev_page_url,
    next: notificationsQuery?.data?.data?.data?.next_page_url,
  }

  const meta = {
    current_page: notificationsQuery?.data?.data?.data?.current_page,
    from: notificationsQuery?.data?.data?.data?.from,
    last_page: notificationsQuery?.data?.data?.data?.last_page,
    links: notificationsQuery?.data?.data?.data?.links,
    path: notificationsQuery?.data?.data?.data?.path,
    per_page: notificationsQuery?.data?.data?.data?.per_page,
    to: notificationsQuery?.data?.data?.data?.to,
    total: notificationsQuery?.data?.data?.data?.total,
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            Notifications
          </h2>
          <button
            type="button"
            onClick={markAllRead}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CheckIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            />
            <span>Mark all as read</span>
          </button>
        </div>

        {notificationsQuery.isSuccess && notifications.length === 0 && (
          <p className="mt-2 text-sm text-gray-700">
            No notifications were found
          </p>
        )}

        {notificationsQuery.isSuccess && notifications.length > 0 && (
          <ul
            role="list"
            className="flex flex-col gap-2 mt-2"
          >
            {notifications.map((notification) => (
              <li key={notification.id}>
                <Notification notification={notification} />
              </li>
            ))}
          </ul>
        )}

        {notificationsQuery.isSuccess && meta.total! >= 10 && (
          <div className="py-8">
            <Pagination
              links={links}
              meta={meta}
            />
          </div>
        )}
      </div>
    </div>
  )
}
