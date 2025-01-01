'use client'

import Image from 'next/image'
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CommentDropdownActions } from './comment-dropdown-actions'

export function Comment() {
  return (
    <article className="p-6 text-base bg-white dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Link
            href="/michaelgough"
            className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
          >
            <Image
              className="mr-2 w-6 h-6 rounded-full"
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt="Michael Gough"
              width={24}
              height={24}
            />
            Michael Gough
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time
              dateTime="2022-02-08"
              title="February 8th, 2022"
            >
              Feb. 8, 2022
            </time>
          </p>
        </div>
        <CommentDropdownActions />
      </footer>
      <p className="text-gray-500 dark:text-gray-400">
        Very straight-to-point article. Really worth time reading. Thank you!
        But tools are just the instruments for the UX designers. The knowledge
        of the design tools are as important as the creation of the design
        strategy.
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          <HandThumbUpIcon className="mr-1.5 w-5 h-5" />
          <span>40 likes</span>
        </button>
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          <ChatBubbleLeftEllipsisIcon className="mr-1.5 w-5 h-5" />
          <span>29 replies</span>
        </button>
      </div>
    </article>
  )
}
