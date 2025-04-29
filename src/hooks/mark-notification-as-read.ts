import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMarkNotificationAsRead } from './notifications'

export function useMarkNotificationRead(
  token: string,
  notificationId: string,
  readAt: string | undefined
) {
  const queryClient = useQueryClient()

  const markNotificationAsReadMutation = useMarkNotificationAsRead(
    authHeader(token)
  )

  function markAsRead() {
    if (readAt) {
      return
    }
    markNotificationAsReadMutation.mutate(
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
