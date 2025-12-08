"use client";

import Image from "next/image";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { useSession } from "@/hooks/session";
import { authHeader, fileUrl } from "@/lib/utils";
import type { Session } from "@/types/misc";
import AvatarPlaceholder from "../avatar-placeholder";

export default function ProfileImage() {
  const { token } = useSession() as Session;

  const { isPending, isError, data, error } = useShowAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <span className="text-xs text-gray-700">...</span>;
  }

  if (isError) {
    return <span className="text-xs text-red-700">{error.message}</span>;
  }

  if (!data?.data) {
    return <div></div>;
  }

  if (data.data.photo) {
    return (
      <div className="shrink-0">
        <Image
          alt=""
          src={fileUrl(data.data.photo) as string}
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
    );
  }

  return <AvatarPlaceholder size={10} />;
}
