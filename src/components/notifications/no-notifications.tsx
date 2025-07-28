"use client";

import { BellIcon } from "@heroicons/react/24/outline";

type NoNotificationsProps = {
  title?: string;
  message?: string;
  action?: React.ReactNode;
};

export default function NoNotifications({
  title = "You're all caught up",
  message = "You don’t have any notifications right now. We'll let you know when something new happens.",
  action,
}: NoNotificationsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <BellIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
