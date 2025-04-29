import { useMarkNotificationRead } from '@/hooks/mark-notification-as-read'
import { classNames } from '@/lib/utils'
import { HandThumbUpIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)

type ArtworkLikeNotificationProps = {
  token: string
  id: string
  likerUsername: string
  likerFullName: string
  artworkId: string
  artworkTitle: string
  createdAt: string
  readAt: string | undefined
}
export default function ArtworkLikeNotification({
  token,
  id,
  likerUsername,
  likerFullName,
  artworkId,
  artworkTitle,
  createdAt,
  readAt,
}: ArtworkLikeNotificationProps) {
  const { markAsRead } = useMarkNotificationRead(token, id, readAt)

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
          <span className="flex h-8 w-8 items-center justify-center rounded-full bgindigo500">
            <HandThumbUpIcon
              aria-hidden="true"
              className="h-5 w-5 text-white"
            />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              <Link
                href={`/artists/${likerUsername}`}
                className="font-medium text-gray-900"
              >
                {likerFullName}
              </Link>{' '}
              liked your artwork{' '}
              <Link
                href={`/artworks/${artworkId}`}
                className="font-medium text-gray-900"
              >
                {artworkTitle}
              </Link>{' '}
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
