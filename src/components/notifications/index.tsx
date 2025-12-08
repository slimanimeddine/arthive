"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useEcho } from "@/hooks/echo";
import { useMarkAllNotificationsAsRead } from "@/hooks/endpoints/notifications";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import type { Session } from "@/types/misc.js";
import NotificationsDisplay from "./notifications-display.tsx";

export default function Notifications() {
  const { token, id } = useSession() as Session;
  const queryClient = useQueryClient();

  const authConfig = authHeader(token);

  const { mutate } = useMarkAllNotificationsAsRead(authConfig);

  function markAllRead() {
    mutate(undefined, {
      onError: (error) => {
        if (error.isAxiosError) {
          toast.error(error.response?.data.message ?? "Something went wrong");
        } else {
          toast.error(error.message);
        }
      },
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

        <NotificationsDisplay />
      </div>
    </div>
  );
}
