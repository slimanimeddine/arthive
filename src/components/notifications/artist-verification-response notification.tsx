import { useMarkNotificationRead } from '@/hooks/use-mark-notification-read'
import { classNames } from '@/lib/utils'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type ArtistVerificationResponseNotificationProps = {
  notificationId: string
  id: number
  status: 'approved' | 'rejected'
  reason?: string
  createdAt: string
  readAt?: string
}

export function ArtistVerificationResponseNotification({
  notificationId,
  id,
  status,
  reason,
  createdAt,
  readAt,
}: ArtistVerificationResponseNotificationProps) {
  const { markAsRead } = useMarkNotificationRead(notificationId, readAt)

  return (
    <div
      onClick={markAsRead}
      className={classNames(
        'relative p-2',
        readAt
          ? ''
          : 'bg-indigo-200 hover:bg-indigo-100 rounded-lg cursor-pointer'
      )}
    >
      <div className="relative flex space-x-3">
        <div>
          <span
            className={classNames(
              'flex h-8 w-8 items-center justify-center rounded-full',
              status === 'approved' ? 'bg-green-500' : 'bg-red-500'
            )}
          >
            {status === 'approved' ? (
              <CheckIcon
                aria-hidden="true"
                className="h-5 w-5 text-white"
              />
            ) : (
              <XMarkIcon
                aria-hidden="true"
                className="h-5 w-5 text-white"
              />
            )}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              Your verification request was {status}{' '}
              {status === 'rejected' && (
                <button className="font-semibold text-black">
                  for this reason
                </button>
              )}
            </p>
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-500">
            <span>{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
