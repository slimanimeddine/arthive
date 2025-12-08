"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImg, getUrlFromBlob } from "@/lib/utils";
import useArtworkStore from "@/stores/artwork-store";

export default function SecondStep() {
  const { photos, mainPhoto, setMainPhoto, setCroppedMainPhoto } =
    useArtworkStore();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    async (_croppedArea: Area, croppedAreaPixels: Area) => {
      if (!mainPhoto) return;
      const croppedImage = await getCroppedImg(
        getUrlFromBlob(mainPhoto),
        croppedAreaPixels,
      );
      setCroppedMainPhoto(croppedImage);
    },
    [mainPhoto, setCroppedMainPhoto],
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Step 2: Select Main Photo & Crop
      </h2>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Select Main Photo:</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, index) => (
            <Image
              unoptimized
              key={index}
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
              width={96}
              height={96}
              onClick={() => setMainPhoto(photo)}
              className={`h-24 w-24 cursor-pointer rounded-md object-cover ${mainPhoto === photo ? "border-2 border-indigo-500" : ""}`}
            />
          ))}
        </div>
      </div>
      {mainPhoto && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Crop Main Photo:</h3>
          <div className="relative h-96 w-full overflow-hidden rounded-md">
            <Cropper
              image={getUrlFromBlob(mainPhoto)}
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
    </div>
  );
}
