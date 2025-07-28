"use client";
import { useEcho } from "@/hooks/echo";
import {
  useListAuthenticatedUserNotifications,
  useMarkAllNotificationsAsRead,
} from "@/hooks/endpoints/notifications";
import { authHeader, matchQueryStatus, onError } from "@/lib/utils";
import { type NotificationType } from "@/types/models/notification";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import Notification from "./notification";
import NotificationsSkeleton from "./notifications-skeleton";
import { useSession } from "@/hooks/session";
import { usePage } from "@/hooks/params/page";
import NoNotifications from "./no-notifications";

export default function Notifications() {
  const { token, id } = useSession()!;
  const queryClient = useQueryClient();

  const { page } = usePage();

  const queryParams: Record<string, string | number> = {
    perPage: 10,
    ...(page && { page }),
  };

  const authConfig = authHeader(token);

  const listAuthenticatedUserNotificationsQuery =
    useListAuthenticatedUserNotifications(queryParams, authConfig);

  const markAllNotificationsAsReadMutation =
    useMarkAllNotificationsAsRead(authConfig);

  function markAllRead() {
    markAllNotificationsAsReadMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success("Notifications were marked as read");
        void queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications`],
        });
        void queryClient.invalidateQueries({
          queryKey: [`/api/v1/users/me/notifications/unread/exists`],
        });
      },
    });
  }

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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
            Notifications
          </h2>
          <button
            type="button"
            onClick={markAllRead}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            <CheckIcon
              aria-hidden="true"
              className="mr-1.5 -ml-0.5 h-5 w-5 text-gray-400"
            />
            <span>Mark all as read</span>
          </button>
        </div>

        {matchQueryStatus(listAuthenticatedUserNotificationsQuery, {
          Loading: <NotificationsSkeleton />,
          Errored: <ErrorUI />,
          Empty: <NoNotifications />,
          Success: ({ data }) => {
            const notificationsQueryData = data.data;

            const notifications = notificationsQueryData.map(
              (notification) => ({
                id: notification.id,
                type: notification.type as NotificationType,
                readAt: notification.read_at,
                createdAt: notification.created_at,
                updatedAt: notification.updated_at,
                data: notification.data,
              }),
            );

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
          },
        })}
      </div>
    </div>
  );
}
