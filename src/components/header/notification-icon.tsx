"use client";

import { useCheckIfUnreadNotificationsExist } from "@/hooks/endpoints/notifications";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationIcon() {
  const { token } = useSession()!;

  const { isPending, isError, data } = useCheckIfUnreadNotificationsExist(
    authHeader(token),
  );

  if (isPending) {
    return <span className="text-xs text-gray-700">...</span>;
  }

  if (isError) {
    return <span className="text-xs text-red-700">err</span>;
  }

  if (!data?.data) {
    return <></>;
  }

  return (
    <span className="relative inline-block">
      <BellIcon aria-hidden="true" className="h-6 w-6" />
      {data.data.exists && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
      )}
    </span>
  );
}
