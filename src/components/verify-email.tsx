"use client";

import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import LoadingUI from "./loading-ui";
import { useSession } from "@/hooks/session";
import { useVerifyEmail } from "@/hooks/authentication";

type VerifyEmailProps = {
  id: string;
  hash: string;
  expires: string;
  signature: string;
};

export default function VerifyEmail({
  id,
  hash,
  expires,
  signature,
}: VerifyEmailProps) {
  const [message, setMessage] = useState("");
  const { token } = useSession();

  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, error } = useVerifyEmail(
    id,
    hash,
    {
      expires,
      signature,
    },
    authHeader(token),
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified successfully");
      setMessage("Email verified successfully");
      void queryClient.invalidateQueries({
        queryKey: ["/api/v1/users/me"],
      });
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      if (isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while verifying your email");
      }
    }
  }, [error, isError]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingUI />
      </div>
    );
  }

  return <>{message}</>;
}
