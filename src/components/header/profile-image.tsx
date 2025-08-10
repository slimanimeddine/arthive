"use client";

import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { useSession } from "@/hooks/session";
import { authHeader, fileUrl } from "@/lib/utils";
import AvatarPlaceholder from "../avatar-placeholder";
import Image from "next/image";

export default function ProfileImage() {
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

  if (data.data.photo) {
    return (
      <div className="flex-shrink-0">
        <Image
          alt=""
          src={fileUrl(data.data.photo)!}
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
    );
  }

  return <AvatarPlaceholder size={10} />;
}
