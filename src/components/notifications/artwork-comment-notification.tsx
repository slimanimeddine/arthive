import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { classNames } from '@/lib/utils'
import { useMarkNotificationRead } from '@/hooks/mark-notification-as-read'
dayjs.extend(relativeTime)

type ArtworkCommentNotificationProps = {
  token: string
  id: string
  commenterUsername: string
  commenterFullName: string
  artworkId: string
  artworkTitle: string
  commentId: string
  createdAt: string
  readAt: string | undefined
}
export default function ArtworkCommentNotification({
  token,
  id,
  commenterUsername,
  commenterFullName,
  artworkId,
  artworkTitle,
  commentId,
  createdAt,
  readAt,
}: ArtworkCommentNotificationProps) {
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
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
            <ChatBubbleLeftEllipsisIcon
              aria-hidden="true"
              className="h-5 w-5 text-white"
            />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              <Link
                href={`/artists/${commenterUsername}`}
                className="font-medium text-gray-900"
              >
                {commenterFullName}
              </Link>{' '}
              commented on your artwork{' '}
              <Link
                href={{
                  pathname: `/artworks/${artworkId}`,
                  hash: `${commentId}`,
                }}
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
