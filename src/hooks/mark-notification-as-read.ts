import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMarkNotificationAsRead } from "./endpoints/notifications";
import { useSession } from "./session";

export function useMarkNotificationRead(
  notificationId: string,
  readAt: string | undefined,
) {
  const { token } = useSession()!;
  const queryClient = useQueryClient();

  const { mutate } = useMarkNotificationAsRead(authHeader(token));

  function markAsRead() {
    if (readAt) {
      return;
    }
    mutate(
      {
        notificationId,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          toast.success("Notification was marked as read");
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/notifications`],
          });
        },
      },
    );
  }

  return {
    markAsRead,
  };
}
