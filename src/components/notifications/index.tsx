'use client'
import { useEcho } from '@/hooks/echo'
import {
  useListAuthenticatedUserNotifications,
  useMarkAllNotificationsAsRead,
} from '@/hooks/notifications'
import { authHeader, matchQueryStatus, onError } from '@/lib/utils'
import { NotificationData, NotificationType } from '@/types/models/notification'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import EmptyUI from '../empty-ui'
import ErrorUI from '../error-ui'
import Pagination from '../pagination'
import Notification from './notification'
import NotificationsSkeleton from './notifications-skeleton'

type NotificationsProps = {
  token: string
  userId: string
}

export default function Notifications({ token, userId }: NotificationsProps) {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const page = searchParams.get('page')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(page && { page }),
  }

  const authConfig = authHeader(token)

  const listAuthenticatedUserNotificationsQuery =
    useListAuthenticatedUserNotifications(queryParams, authConfig)

  const markAllNotificationsAsReadMutation =
    useMarkAllNotificationsAsRead(authConfig)

  function markAllRead() {
    markAllNotificationsAsReadMutation.mutate(undefined, {
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

  return matchQueryStatus(listAuthenticatedUserNotificationsQuery, {
    Loading: <NotificationsSkeleton />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={'You have not received any notifications'} />,
    Success: ({ data }) => {
      const notificationsQueryData = data.data

      const notifications = notificationsQueryData.map((notification) => ({
        id: notification.id,
        type: notification.type as NotificationType,
        readAt: notification.read_at,
        createdAt: notification.created_at,
        updatedAt: notification.updated_at,
        data: notification.data as NotificationData,
      }))

      const links = {
        first: data.first_page_url,
        last: data.last_page_url,
        prev: data.prev_page_url,
        next: data.next_page_url,
      }

      const meta = {
        current_page: data.current_page,
        from: data.from,
        last_page: data.last_page,
        links: data.links,
        path: data.path,
        per_page: data.per_page,
        to: data.to,
        total: data.total,
      }

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
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
