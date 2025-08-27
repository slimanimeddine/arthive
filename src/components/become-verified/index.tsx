"use client";

import { useSubmitArtistVerificationRequest } from "@/hooks/endpoints/artist-verification-requests";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { authHeader } from "@/lib/utils";
import toast from "react-hot-toast";
import LoadingUI from "../loading-ui";
import ErrorUI from "../error-ui";
import Verified from "./verified";
import Link from "next/link";
import { useSession } from "@/hooks/session";

export default function BecomeVerified() {
  const { token } = useSession()!;
  const authConfig = authHeader(token);
  const { isPending, isError, data, error } =
    useShowAuthenticatedUser(authConfig);

  const { mutate } = useSubmitArtistVerificationRequest(authConfig);

  const handleSubmit = () => {
    mutate(undefined, {
      onError: (error) => {
        if (error.isAxiosError) {
          toast.error(error.response?.data.message ?? "Something went wrong");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        toast.success("Artist verification request submitted successfully!");
      },
    });
  };

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data) {
    return <></>;
  }

  const isArtistVerified = data.data.artist_verified_at;

  if (isArtistVerified) {
    return <Verified />;
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline gap-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Become a Verified Artist
            </h1>
            <Link
              className="text-sm font-semibold whitespace-nowrap text-indigo-500 hover:text-indigo-600"
              href="/become-verified/verification-submission-history"
            >
              View your history of verification submissions{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Get a verified badge to boost your credibility and showcase your
            authenticity as an artist.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            To be eligible, you must:
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
            <li>Have atleast 3 published artworks</li>
            <li>
              Have completed your profile details (first name, last name, bio,
              country, profile picture)
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            Request Verification
          </button>
        </div>
      </div>
    </div>
  );
}
