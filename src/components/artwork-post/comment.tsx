'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CommentDropdownActions } from './comment-dropdown-actions'
import { AvatarPlaceholder } from '../avatar-placeholder'

type CommentProps = {
  id: number
  content: string
  commentedAt: string
  user: {
    id: number
    fullName: string
    username: string
    profilePictureUrl: string | undefined
  }
}

export function Comment({ id, content, commentedAt, user }: CommentProps) {
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
        <CommentDropdownActions />
      </footer>
      <Link
        href={`#${id}`}
        className="text-gray-500 dark:text-gray-400"
      >
        {content}
      </Link>
    </article>
  )
}
