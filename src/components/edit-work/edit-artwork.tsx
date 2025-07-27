"use client";

import { useShowAuthenticatedUserArtwork } from "@/hooks/endpoints/artworks";
import { authHeader, classNames, fileUrl, matchQueryStatus } from "@/lib/utils";
import { type Tag } from "@/types/misc";
import ErrorUI from "../error-ui";
import FirstStep from "./first-step";
import FourthStep from "./fourth-step";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../loading-spinner";
import { useSession } from "@/hooks/session";
import { useParams } from "next/navigation";

export default function EditArtwork() {
  const { token } = useSession()!;
  const { id } = useParams<{ id: string }>();
  const showAuthenticatedUserArtworkQuery = useShowAuthenticatedUserArtwork(
    id,
    authHeader(token),
  );

  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return matchQueryStatus(showAuthenticatedUserArtworkQuery, {
    Loading: <LoadingSpinner />,
    Errored: <ErrorUI />,
    Empty: <span></span>,
    Success: ({ data }) => {
      const artworkData = data.data;

      const artwork = {
        id: artworkData.id,
        title: artworkData.title,
        description: artworkData.description,
        status: artworkData.status,
        publishedAt: artworkData.created_at,
        mainPhotoUrl: fileUrl(artworkData.artwork_main_photo_path)!,
        photos: artworkData.artwork_photos.map((photo) => ({
          id: photo.id,
          path: fileUrl(photo.path)!,
        })),
        tags: artworkData.tags.map((tag) => ({
          id: tag.id,
          name: tag.name as Tag,
        })),
      };

      const renderStep = () => {
        switch (step) {
          case 1:
            return <FirstStep token={token} artwork={artwork} />;
          case 2:
            return <SecondStep token={token} artwork={artwork} />;
          case 3:
            return <ThirdStep token={token} artwork={artwork} />;
          case 4:
            return <FourthStep token={token} artwork={artwork} />;
          default:
            return null;
        }
      };

      if (artworkData.status !== "draft") {
        return (
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Sorry, you cannot edit this artwork because it is not a draft.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/my-artworks"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back to my artworks
                </Link>
              </div>
            </div>
          </main>
        );
      }

      return (
        <div className="mx-auto min-h-screen max-w-4xl bg-gray-100 p-8">
          <h1 className="mb-8 text-center text-3xl font-bold">Edit Artwork</h1>

          {renderStep()}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBack}
              className={classNames(
                "rounded-md px-4 py-2 text-white transition-colors",
                step === 1
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-gray-500 hover:bg-gray-600",
              )}
              disabled={step === 1} // Disable "Back" on the first step
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={classNames(
                "rounded-md px-4 py-2 text-white transition-colors",
                step < 4
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "cursor-not-allowed bg-gray-400",
              )}
              disabled={step === 4} // Disable "Next" if the current step is not valid
            >
              {step === 4 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      );
    },
  });
}
