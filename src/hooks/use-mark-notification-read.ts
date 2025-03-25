import { useMarkNotificationAsRead } from '@/api/notifications/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useGetAuthenticatedUserToken } from './use-get-authenticated-user-token'
import toast from 'react-hot-toast'
import { onError } from '@/lib/utils'

export function useMarkNotificationRead(
  notificationId: string,
  readAt?: string
) {
  const token = useGetAuthenticatedUserToken()
  const queryClient = useQueryClient()

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const markAsReadMutation = useMarkNotificationAsRead(axiosConfig)

  function markAsRead() {
    if (readAt) {
      return
    }
    markAsReadMutation.mutate(
      {
        notificationId,
      },
      {
        onError,
        onSuccess: () => {
          toast.success('Notification was marked as read')
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/notifications`],
          })
        },
      }
    )
  }

  return {
    markAsRead,
  }
}
