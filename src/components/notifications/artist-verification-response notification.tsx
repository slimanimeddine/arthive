import { useMarkNotificationRead } from "@/hooks/mark-notification-as-read";
import { classNames } from "@/lib/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
dayjs.extend(relativeTime);

type ArtistVerificationResponseNotificationProps = {
  notificationId: string;
  id: string;
  status: "approved" | "rejected";
  reason?: string;
  createdAt: string;
  readAt: string | undefined;
};

function RejectionReasonModal({ reason }: { reason: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-semibold text-black hover:underline"
      >
        for this reason
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Rejection Reason
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default function ArtistVerificationResponseNotification({
  notificationId,
  status,
  reason,
  createdAt,
  readAt,
}: ArtistVerificationResponseNotificationProps) {
  const { markAsRead } = useMarkNotificationRead(notificationId, readAt);

  return (
    <div
      onClick={markAsRead}
      className={classNames(
        "relative p-2",
        readAt
          ? ""
          : "cursor-pointer rounded-lg bg-indigo-200 hover:bg-indigo-100",
      )}
    >
      <div className="relative flex space-x-3">
        <div>
          <span
            className={classNames(
              "flex h-8 w-8 items-center justify-center rounded-full",
              status === "approved" ? "bg-green-500" : "bg-red-500",
            )}
          >
            {status === "approved" ? (
              <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
            ) : (
              <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
            )}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              Your verification request was {status}{" "}
              {status === "rejected" && (
                <RejectionReasonModal reason={reason!} />
              )}
            </p>
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-500">
            <span>{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
