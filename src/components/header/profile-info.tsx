"use client";

import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";

export default function ProfileInfo() {
  const { token } = useSession()!;

  const { isPending, isError, data, error } = useShowAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <span className="text-xs text-gray-700">...</span>;
  }

  if (isError) {
    return <span className="text-xs text-red-700">{error.message}</span>;
  }

  if (data === undefined) {
    return <></>;
  }

  const user = data.data;

  return (
    <div className="ml-3">
      <div className="text-base font-medium text-gray-800">
        {user.first_name} {user.last_name}
      </div>
      <div className="text-sm font-medium text-gray-500">{user.email}</div>
    </div>
  );
}
