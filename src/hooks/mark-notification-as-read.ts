import { authHeader, onError } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMarkNotificationAsRead } from "./endpoints/notifications";
import { useSession } from "./session";

export function useMarkNotificationRead(
  notificationId: string,
  readAt: string | undefined,
) {
  const { token } = useSession();
  const queryClient = useQueryClient();

  const markNotificationAsReadMutation = useMarkNotificationAsRead(
    authHeader(token),
  );

  function markAsRead() {
    if (readAt) {
      return;
    }
    markNotificationAsReadMutation.mutate(
      {
        notificationId,
      },
      {
        onError,
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
