"use client";
import { useMarkNotificationRead } from "@/hooks/mark-notification-as-read";
import { classNames } from "@/lib/utils";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

type FollowNotificationProps = {
  id: string;
  username: string;
  fullName: string;
  createdAt: string;
  readAt: string | undefined;
};

export default function FollowNotification({
  id,
  username,
  fullName,
  createdAt,
  readAt,
}: FollowNotificationProps) {
  const { markAsRead } = useMarkNotificationRead(id, readAt);

  return (
    <div
      onClick={markAsRead}
      className={classNames(
        "relative p-2",
        readAt
          ? ""
          : "cursor-pointer rounded-lg bg-indigo-200 hover:bg-indigo-100",
      )}
    >
      <div className="relative flex space-x-3">
        <div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
            <UserPlusIcon aria-hidden="true" className="h-5 w-5 text-white" />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              <Link
                href={`/artists/${username}`}
                className="font-medium text-gray-900"
              >
                {fullName}
              </Link>{" "}
              started following you
            </p>
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-500">
            <span>{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
