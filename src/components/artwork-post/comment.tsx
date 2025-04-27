'use client'

import Image from 'next/image'
import Link from 'next/link'
import CommentDropdownActions from './comment-dropdown-actions'
import AvatarPlaceholder from '../avatar-placeholder'
import EditComment from './edit-comment'
import { useEditCommentStore } from '@/stores/edit-comment-store'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import { useShowAuthenticatedUser } from '@/hooks/users'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'

type CommentProps = {
  token: string | undefined
  id: string
  content: string
  commentedAt: string
  artworkId: string
  user: {
    id: string
    fullName: string
    username: string
    profilePictureUrl: string | undefined
  }
}

export default function Comment({
  token,
  id,
  content,
  commentedAt,
  artworkId,
  user,
}: CommentProps) {
  const formVisble = useEditCommentStore((state) => state.formVisble)

  const authConfig = token ? authHeader(token!) : undefined

  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authConfig)

  return matchQueryStatus(showAuthenticatedUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const isOwner = data.data.id === user.id

      return (
        <article
          id={`${id}`}
          className="py-6 text-base bg-white dark:bg-gray-900"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Link
                href={`/artists/${user.username}`}
                className="inline-flex items-center gap-x-2 mr-3 text-sm text-gray-900 dark:text-white font-semibold"
              >
                {user.profilePictureUrl ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={user.profilePictureUrl}
                    alt={user.username}
                    width={32}
                    height={32}
                  />
                ) : (
                  <AvatarPlaceholder size={8} />
                )}
                <span aria-hidden="true">&middot;</span>

                <span>{user.fullName}</span>
              </Link>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time
                  dateTime={commentedAt}
                  title={new Date(commentedAt).toDateString()}
                >
                  {new Date(commentedAt).toDateString()}
                </time>
              </p>
            </div>
            {isOwner && (
              <CommentDropdownActions
                token={token}
                commentId={id}
                artworkId={artworkId}
              />
            )}
          </footer>
          {isOwner && formVisble ? (
            <EditComment
              token={token}
              defaultContent={content}
              commentId={id}
              artworkId={artworkId}
            />
          ) : (
            <Link
              href={`#${id}`}
              className="text-gray-500 dark:text-gray-400"
            >
              {content}
            </Link>
          )}
        </article>
      )
    },
  })
}
