"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/hooks/session";
import AvatarPlaceholder from "../avatar-placeholder";
import CommentDropdownActions from "./comment-dropdown-actions";
import EditComment from "./edit-comment";

type CommentProps = {
  id: string;
  content: string;
  commentedAt: string;
  user: {
    id: string;
    fullName: string;
    username: string;
    profilePictureUrl: string | undefined;
  };
};

export default function Comment({
  id,
  content,
  commentedAt,
  user,
}: CommentProps) {
  const session = useSession();

  return (
    <article id={id} className="bg-white py-6 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href={`/artists/${user.username}`}
            className="mr-3 inline-flex items-center gap-x-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            {user.profilePictureUrl ? (
              <Image
                unoptimized
                className="h-8 w-8 rounded-full"
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
        {session?.token ? (
          <CommentDropdownActions commentId={id} userId={user.id} />
        ) : (
          <div></div>
        )}
      </footer>
      {session?.token ? (
        <EditComment userId={user.id} id={id} content={content} />
      ) : (
        <Link href={`#${id}`} className="text-gray-500 dark:text-gray-400">
          {content}
        </Link>
      )}
    </article>
  );
}
