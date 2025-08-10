"use client";

import { useEditCommentStore } from "@/stores/edit-comment-store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import DeleteCommentButton from "./delete-comment-button";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import LoadingUI from "../loading-ui";
import ErrorUI from "../error-ui";

export default function CommentDropdownActions({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  const setFormVisible = useEditCommentStore((state) => state.setFormVisible);
  const { token } = useSession()!;
  const { isPending, isError, data, error } = useShowAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <></>;
  }

  const isOwner = data.data.id === userId;

  if (!isOwner) return <></>;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon aria-hidden="true" className="h-7 w-7" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => setFormVisible(true)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <DeleteCommentButton commentId={commentId} />
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
