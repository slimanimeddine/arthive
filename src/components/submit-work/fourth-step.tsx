"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { usePublishArtwork } from "@/hooks/endpoints/artworks";
import { useSession } from "@/hooks/session";
import { authHeader, getUrlFromBlob } from "@/lib/utils";
import useArtworkStore from "@/stores/artwork-store";
import type { Session } from "@/types/misc";

export default function FourthStep() {
  const {
    photos,
    mainPhoto,
    croppedMainPhoto,
    categories,
    title,
    description,
    setStatus,
    id,
    setToDefault,
  } = useArtworkStore();

  const { token } = useSession() as Session;

  const { mutate } = usePublishArtwork(authHeader(token));

  const queryClient = useQueryClient();

  const handlePublish = () => {
    if (
      window.confirm(
        "Once you publish your artwork you cannot modify it anymore. Do you want to proceed?",
      )
    ) {
      setStatus("published");

      mutate(
        {
          artworkId: id as string,
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
              queryKey: ["/api/v1/users/me/artworks"],
            });
            toast.success("Artwork draft published successfully!");
            setToDefault();
          },
        },
      );
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Step 4: Preview & Publish</h2>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Main Photo:</h3>
        <Image
          unoptimized
          src={
            getUrlFromBlob(croppedMainPhoto) || getUrlFromBlob(mainPhoto) || ""
          }
          alt="Main Photo"
          className="h-48 w-48 rounded-md object-cover"
          width={192}
          height={192}
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">Other Photos:</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, index) => (
            <Image
              unoptimized
              key={index}
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
              className="h-24 w-24 rounded-md object-cover"
              width={96}
              height={96}
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">Details:</h3>
        <p className="text-gray-700">
          <strong>Title:</strong> {title}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {description}
        </p>
        <p className="text-gray-700">
          <strong>Categories:</strong> {categories.join(", ")}
        </p>
      </div>
      <button
        type="button"
        onClick={handlePublish}
        className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
      >
        Publish
      </button>
    </div>
  );
}
