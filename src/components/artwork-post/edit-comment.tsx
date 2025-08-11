"use client";

import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { useEditCommentStore } from "@/stores/edit-comment-store";
import LoadingUI from "../loading-ui";
import ErrorUI from "../error-ui";
import EditCommentForm from "./edit-comment-form";
import Link from "next/link";

type EditCommentProps = {
  userId: string;
  id: string;
  content: string;
};

export default function EditComment({ userId, id, content }: EditCommentProps) {
  const { token } = useSession()!;
  const { isPending, isError, data, error } = useShowAuthenticatedUser(
    authHeader(token),
  );

  const formVisble = useEditCommentStore((state) => state.formVisble);

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  const isOwner = data.data.id === userId;

  if (!(isOwner && formVisble)) {
    return (
      <Link href={`#${id}`} className="text-gray-500 dark:text-gray-400">
        {content}
      </Link>
    );
  }
  return <EditCommentForm defaultContent={content} commentId={id} />;
}
