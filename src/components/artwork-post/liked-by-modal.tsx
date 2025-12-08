"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AvatarPlaceholder from "../avatar-placeholder";

type Like = {
  id: string;
  user: {
    fullName: string;
    username: string;
    profilePictureUrl: string | undefined;
  };
};

type LikedByModalProps = {
  likes: Like[];
};

export default function LikedByModal({ likes }: LikedByModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <span className="font-semibold">Others</span>
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <ul className="h-2/3 max-h-96 divide-y divide-gray-100 overflow-y-scroll">
                  {likes.map((like) => (
                    <li key={like.id}>
                      <Link
                        className="flex gap-x-4 py-5"
                        href={`/artists/${like.user.username}`}
                      >
                        {like.user.profilePictureUrl ? (
                          <Image
                            unoptimized
                            alt=""
                            src={like.user.profilePictureUrl}
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            width={48}
                            height={48}
                          />
                        ) : (
                          <AvatarPlaceholder size={12} />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm leading-6 font-semibold text-gray-900">
                            {like.user.fullName}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
