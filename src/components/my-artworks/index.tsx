"use client";

import {
  useDeleteArtwork,
  useListAuthenticatedUserArtworks,
} from "@/hooks/artworks";
import { authHeader, fileUrl, matchQueryStatus, onError } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import EmptyUI from "../empty-ui";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import MyArtworksSkeleton from "./my-artworks-skeleton";
import { useSession } from "@/hooks/session";

export default function MyArtworks() {
  const { token } = useSession();
  const queryClient = useQueryClient();
  const authConfig = authHeader(token);
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const status = searchParams.get("status");

  const queryParams: Record<string, string> = {
    perPage: "10",
    ...(status && { "filter[status]": status }),
    ...(page && { page }),
  };

  const listAuthenticatedUserArtworksQuery = useListAuthenticatedUserArtworks(
    queryParams,
    authConfig,
  );

  const deleteArtworkMutation = useDeleteArtwork(authConfig);

  const handleDeleteArtwork = (artworkId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this artwork? This action cannot be undone.",
      )
    ) {
      deleteArtworkMutation.mutate(
        {
          artworkId,
        },
        {
          onError,
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: ["/api/v1/users/me/artworks"],
            });

            toast.success("Artwork deleted successfully!");
          },
        },
      );
    }
  };

  return matchQueryStatus(listAuthenticatedUserArtworksQuery, {
    Loading: <MyArtworksSkeleton />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI message={"You have not submitted any artworks"} />,
    Success: ({ data }) => {
      const artworks = data.data.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        mainPhotoUrl: fileUrl(artwork.artwork_main_photo_path)!,
        status: artwork.status,
      }));

      const links = data.links;
      const meta = data.meta;

      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
                My Artworks |{" "}
                <span className="text-lg">{artworks.length} artworks</span>
              </h2>
            </div>
            <div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Main Photo
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {artworks.map((artwork) => (
                          <tr key={artwork.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                              {artwork.title}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              <Image
                                src={artwork.mainPhotoUrl}
                                alt=""
                                className="h-32 w-32"
                                width={128}
                                height={128}
                              />
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {artwork.status}
                            </td>
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                              <div className="flex flex-col items-end gap-y-3">
                                {artwork.status === "draft" ? (
                                  <Link
                                    href={`/my-artworks/${artwork.id}/edit`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                    <span className="sr-only">
                                      , {artwork.title}
                                    </span>
                                  </Link>
                                ) : (
                                  <Link
                                    href={`/artworks/${artwork.id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    View
                                    <span className="sr-only">
                                      , {artwork.title}
                                    </span>
                                  </Link>
                                )}

                                <button
                                  onClick={() =>
                                    handleDeleteArtwork(artwork.id)
                                  }
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Remove
                                  <span className="sr-only">
                                    , {artwork.title}
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {meta.total > 10 && (
              <div className="pt-8">
                <Pagination links={links} meta={meta} />
              </div>
            )}
          </div>
        </div>
      );
    },
  });
}
