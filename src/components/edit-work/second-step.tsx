"use client";
import {
  useReplaceArtworkPhotoPath,
  useSetArtworkPhotoAsMain,
} from "@/hooks/endpoints/artwork-photos";
import { authHeader, getCroppedImg, turnBlobToFile } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { type FirstStepProps } from "./first-step";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/session";

type SecondStepProps = FirstStepProps;

export default function SecondStep({ artwork }: SecondStepProps) {
  const { token } = useSession()!;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const defaultMainPhoto = artwork.photos.find(
    (photo) => photo.path === artwork.mainPhotoUrl,
  );

  const [mainPhoto, setMainPhoto] = useState<
    | {
        id: string;
        path: string;
      }
    | undefined
  >(defaultMainPhoto);

  const [croppedMainPhoto, setCroppedMainPhoto] = useState<Blob | null>(null);

  const queryClient = useQueryClient();

  const authConfig = authHeader(token);
  const { mutate: mutateSetMain } = useSetArtworkPhotoAsMain(authConfig);
  const { mutate: mutateReplace } = useReplaceArtworkPhotoPath(authConfig);

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      if (!mainPhoto) return;
      const croppedImage = await getCroppedImg(
        artwork.mainPhotoUrl,
        croppedAreaPixels,
      );

      setCroppedMainPhoto(croppedImage);
    },
    [artwork.mainPhotoUrl, mainPhoto],
  );

  function handleSetMainPhoto() {
    if (mainPhoto) {
      mutateSetMain(
        {
          artworkPhotoId: mainPhoto.id,
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
            toast.success("Main photo set successfully");
          },
        },
      );
    }
  }

  function handleCropMainPhoto() {
    if (mainPhoto && croppedMainPhoto) {
      mutateReplace(
        {
          artworkPhotoId: mainPhoto.id,
          data: {
            photo: turnBlobToFile(croppedMainPhoto),
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

            toast.success("Main photo cropped successfully");
          },
        },
      );
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Step 2: Select Main Photo & Crop
      </h2>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Select Main Photo:</h3>
        <div className="flex flex-wrap gap-2">
          {artwork.photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.path}
              alt={`Uploaded ${photo.id}`}
              width={96}
              height={96}
              onClick={() => setMainPhoto(photo)}
              className={`h-24 w-24 cursor-pointer rounded-md object-cover ${
                mainPhoto?.path === photo.path
                  ? "border-2 border-indigo-500"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        disabled={!mainPhoto}
        onClick={handleSetMainPhoto}
        className="mt-6 rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Set selected photo as main
      </button>
      {mainPhoto?.path && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-2 text-lg font-semibold">Crop Main Photo:</h3>
          </div>
          <div className="relative h-96 w-full overflow-hidden rounded-md">
            <Cropper
              image={mainPhoto?.path}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        disabled={!croppedMainPhoto}
        onClick={handleCropMainPhoto}
        className="mt-6 rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Crop main photo
      </button>
    </div>
  );
}
