"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import {
  useDeleteArtworkPhoto,
  useUploadArtworkPhotos,
} from "@/hooks/endpoints/artwork-photos";
import { useSession } from "@/hooks/session";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { authHeader, turnBlobToFile } from "@/lib/utils";
import type { Session, Tag } from "@/types/misc";

export type FirstStepProps = {
  artwork: {
    id: string;
    title: string;
    description: string;
    status: string;
    publishedAt: string;
    mainPhotoUrl: string;
    photos: {
      id: string;
      path: string;
    }[];
    tags: {
      id: string;
      name: Tag;
    }[];
  };
};

export default function FirstStep({ artwork }: FirstStepProps) {
  const { token } = useSession() as Session;
  const queryClient = useQueryClient();

  const authConfig = authHeader(token);

  const { mutate: mutateUpload } = useUploadArtworkPhotos(authConfig);

  const { mutate: mutateDelete } = useDeleteArtworkPhoto(authConfig);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (artwork.photos.length + acceptedFiles.length > 10) {
        alert("You can upload a maximum of 10 photos.");
        return;
      }
      mutateUpload(
        {
          artworkId: artwork.id,
          data: {
            photos: acceptedFiles.map((file) => turnBlobToFile(file)),
          },
        },
        {
          onError: (error) => {
            if (error.isAxiosError) {
              toast.error(
                error.response?.data.message ?? "Something went wrong",
              );
            } else {
              toast.error(error.message);
            }
          },
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
            });
            toast.success("Photos uploaded successfully");
          },
        },
      );
    },
    [artwork.photos.length, artwork.id, mutateUpload, queryClient],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemovePhoto = (photo: { id: string; path: string }) => {
    mutateDelete(
      {
        artworkPhotoId: photo.id,
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
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
          });
          toast.success("Photo removed successfully");
        },
      },
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Step 1: Upload Photos</h2>
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-indigo-500"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop photos here, or click to select files
        </p>
      </div>
      {artwork.photos && artwork.photos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <span key={photo.id} className="relative inline-block">
              <Image
                unoptimized
                src={photo.path}
                alt={`Uploaded ${photo.id}`}
                className="h-24 w-24 rounded-md object-cover"
                width={96}
                height={96}
              />

              <button
                type="button"
                onClick={() => handleRemovePhoto(photo)}
                className="absolute top-0 right-0 block h-4 w-4 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-400 ring-2 ring-white hover:h-[18px] hover:w-[18px]"
              >
                <XMarkIcon />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
