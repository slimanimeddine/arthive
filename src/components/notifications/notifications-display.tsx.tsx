"use client";

import { useEcho } from "@/hooks/echo";
import { useListAuthenticatedUserNotifications } from "@/hooks/endpoints/notifications";
import { authHeader } from "@/lib/utils";
import { type NotificationType } from "@/types/models/notification";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import Notification from "./notification";
import NotificationsSkeleton from "./notifications-skeleton";
import { useSession } from "@/hooks/session";
import { usePage } from "@/hooks/params/page";
import NoNotifications from "./no-notifications";

export default function NotificationsDisplay() {
  const { token, id } = useSession()!;
  const queryClient = useQueryClient();

  const { page } = usePage();

  const queryParams: Record<string, string | number> = {
    perPage: 10,
    ...(page && { page }),
  };

  const authConfig = authHeader(token);

  const { isPending, isError, data, error } =
    useListAuthenticatedUserNotifications(queryParams, authConfig);

  const echo = useEcho(token);

  useEffect(() => {
    if (echo) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      echo.private(`App.Models.User.${id}`).notification(() => {
        void queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications`],
        });
        void queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications/unread/exists`],
        });
      });
    }
  }, [echo, queryClient, id]);

  if (isPending) {
    return <NotificationsSkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <NoNotifications />;
  }

  const notificationsQueryData = data.data;

  const notifications = notificationsQueryData.map((notification) => ({
    id: notification.id,
    type: notification.type as NotificationType,
    readAt: notification.read_at,
    createdAt: notification.created_at,
    updatedAt: notification.updated_at,
    data: notification.data,
  }));

  const links = {
    first: data.first_page_url,
    last: data.last_page_url,
    prev: data.prev_page_url,
    next: data.next_page_url,
  };

  const meta = {
    current_page: data.current_page,
    from: data.from,
    last_page: data.last_page,
    links: data.links,
    path: data.path,
    per_page: data.per_page,
    to: data.to,
    total: data.total,
  };

  return (
    <div>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <Notification notification={notification} />
          </li>
        ))}
      </ul>

      {meta.total > 10 && (
        <div className="py-8">
          <Pagination links={links} meta={meta} />
        </div>
      )}
    </div>
  );
}
