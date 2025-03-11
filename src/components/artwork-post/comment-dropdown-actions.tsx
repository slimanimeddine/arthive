'use client'

import { useDeleteArtworkComment } from '@/api/artwork-comments/artwork-comments'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useEditCommentStore } from '@/stores/edit-comment-store'

type CommentDropdownActionsProps = {
  artworkId: number
  commentId: number
}

export function CommentDropdownActions({
  artworkId,
  commentId,
}: CommentDropdownActionsProps) {
  const token = useGetAuthenticatedUserToken()
  const queryClient = useQueryClient()
  const setFormVisible = useEditCommentStore((state) => state.setFormVisible)

  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const deleteCommentMutation = useDeleteArtworkComment(axiosConfig)

  function onDelete() {
    deleteCommentMutation.mutate(
      {
        artworkCommentId: commentId,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/artworks/${artworkId}`],
          })
          toast.success('Comment deleted successfully!')
        },
      }
    )
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <MenuButton className="flex items-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon
            aria-hidden="true"
            className="h-7 w-7"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => setFormVisible(true)}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onDelete}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              Remove
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
