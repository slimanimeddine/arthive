"use client";

import { MAX_FILE_SIZE } from "@/lib/constants";
import { getUrlFromBlob } from "@/lib/utils";
import useArtworkStore from "@/stores/artwork-store";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FirstStep() {
  const {
    photos,
    removePhoto,
    addPhotos,
    removeMainPhoto,
    removeCroppedMainPhoto,
  } = useArtworkStore();

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (photos.length + acceptedFiles.length > 10) {
        alert("You can upload a maximum of 10 photos.");
        return;
      }
      addPhotos(acceptedFiles);
    },
    [photos, addPhotos],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemovePhoto = (photo: Blob) => {
    removePhoto(photo);
    removeMainPhoto();
    removeCroppedMainPhoto();
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
      <div className="mt-4 flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <span key={index} className="relative inline-block">
            <Image
              src={getUrlFromBlob(photo)}
              alt={`Uploaded ${index}`}
              className="h-24 w-24 rounded-md object-cover"
              width={96}
              height={96}
            />

            <button
              onClick={() => handleRemovePhoto(photo)}
              className="absolute top-0 right-0 block h-4 w-4 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-400 ring-2 ring-white hover:h-[18px] hover:w-[18px]"
            >
              <XMarkIcon />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
