'use client'
import Notification from './notification'
import Pagination from '../pagination'
import { useSearchParams } from 'next/navigation'
import { CheckIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { authHeader, matchQueryStatus, onError } from '@/lib/utils'
import { useEcho } from '@/hooks/echo'
import { useEffect } from 'react'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'
import {
  useListAuthenticatedUserNotifications,
  useMarkAllNotificationsAsRead,
} from '@/hooks/notifications'
import { NotificationData, NotificationType } from '@/types/models/notification'

type IndexProps = {
  token: string
  userId: string
}

export default function Index({ token, userId }: IndexProps) {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const page = searchParams.get('page')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(page && { page }),
  }

  const authConfig = authHeader(token)

  const notificationsQuery = useListAuthenticatedUserNotifications(
    queryParams,
    authConfig
  )

  const markAllReadMutation = useMarkAllNotificationsAsRead(authConfig)

  function markAllRead() {
    markAllReadMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success('Notifications were marked as read')
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications`],
        })
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications/unread/exists`],
        })
      },
    })
  }

  const echo = useEcho(token)

  useEffect(() => {
    if (echo) {
      echo.private(`App.Models.User.${userId}`).notification(() => {
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications`],
        })
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications/unread/exists`],
        })
      })
    }
  }, [echo, queryClient, userId])

  return matchQueryStatus(notificationsQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const notificationsQueryData = data.data.data

      const notifications = notificationsQueryData.map((notification) => ({
        id: notification.id,
        type: notification.type as NotificationType,
        readAt: notification.read_at,
        createdAt: notification.created_at,
        updatedAt: notification.updated_at,
        data: notification.data as NotificationData,
      }))

      const links = {
        first: data.data.first_page_url,
        last: data.data.last_page_url,
        prev: data.data.prev_page_url,
        next: data.data.next_page_url,
      }

      const meta = {
        current_page: data.data.current_page,
        from: data.data.from,
        last_page: data.data.last_page,
        links: data.data.links,
        path: data.data.path,
        per_page: data.data.per_page,
        to: data.data.to,
        total: data.data.total,
      }

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-7xl">
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

            <ul
              role="list"
              className="flex flex-col gap-2 mt-2"
            >
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <Notification
                    token={token}
                    notification={notification}
                  />
                </li>
              ))}
            </ul>

            {meta.total > 10 && (
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
    },
  })
}
