"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { usePublishArtwork } from "@/hooks/endpoints/artworks";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import type { Session } from "@/types/misc";
import type { FirstStepProps } from "./first-step";

type FourthStepProps = FirstStepProps;

export default function FourthStep({ artwork }: FourthStepProps) {
  const { token } = useSession() as Session;
  const router = useRouter();
  const { mutate } = usePublishArtwork(authHeader(token));

  const queryClient = useQueryClient();

  const handlePublish = () => {
    if (
      window.confirm(
        "Once you publish your artwork you cannot modify it anymore. Do you want to proceed?",
      )
    ) {
      mutate(
        {
          artworkId: artwork.id,
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
            router.push("/my-artworks");
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
          src={artwork.mainPhotoUrl}
          alt="Main Photo"
          className="h-48 w-48 rounded-md object-cover"
          width={192}
          height={192}
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">Other Photos:</h3>
        <div className="flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.path}
              alt={`Uploaded ${photo.id}`}
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
          <strong>Title:</strong> {artwork.title}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {artwork.description}
        </p>
        <p className="text-gray-700">
          <strong>Categories:</strong>{" "}
          {artwork.tags.map((item) => item.name).join(", ")}
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
