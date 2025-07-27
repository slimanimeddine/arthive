"use client";

import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { authHeader, matchQueryStatus } from "@/lib/utils";
import { useEditCommentStore } from "@/stores/edit-comment-store";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceholder from "../avatar-placeholder";
import ErrorUI from "../error-ui";
import LoadingUI from "../loading-ui";
import CommentDropdownActions from "./comment-dropdown-actions";
import EditComment from "./edit-comment";
import { useSession } from "@/hooks/session";

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
  const formVisble = useEditCommentStore((state) => state.formVisble);
  const session = useSession();
  const authConfig = session?.token ? authHeader(session.token) : undefined;
  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authConfig);

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
          matchQueryStatus(showAuthenticatedUserQuery, {
            Loading: <LoadingUI />,
            Errored: <ErrorUI />,
            Empty: <span></span>,
            Success: ({ data }) => {
              const isOwner = data.data.id === user.id;

              if (!isOwner) return <></>;
              return <CommentDropdownActions commentId={id} />;
            },
          })
        ) : (
          <></>
        )}
      </footer>
      {session?.token ? (
        matchQueryStatus(showAuthenticatedUserQuery, {
          Loading: <LoadingUI />,
          Errored: <ErrorUI />,
          Empty: <span></span>,
          Success: ({ data }) => {
            const isOwner = data.data.id === user.id;

            if (!(isOwner && formVisble)) {
              return (
                <Link
                  href={`#${id}`}
                  className="text-gray-500 dark:text-gray-400"
                >
                  {content}
                </Link>
              );
            }
            return <EditComment defaultContent={content} commentId={id} />;
          },
        })
      ) : (
        <Link href={`#${id}`} className="text-gray-500 dark:text-gray-400">
          {content}
        </Link>
      )}
    </article>
  );
}
