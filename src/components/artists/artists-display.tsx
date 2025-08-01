"use client";
import { useListUsers } from "@/hooks/endpoints/users";
import { matchQueryStatus } from "@/lib/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import ArtistCard from "./artist-card";
import ArtistCategoryFilter from "./artist-category-filter";
import ArtistCountryFilter from "./artist-country-filter";
import SortArtists from "./sort-artists";
import ArtistsDisplaySkeleton from "./artists-display-skeleton";
import { usePage } from "@/hooks/params/page";
import { useArtistSort } from "@/hooks/params/artist-sort";
import { useCategory } from "@/hooks/params/category";
import { useCountry } from "@/hooks/params/country";
import { useSearchQuery } from "@/hooks/params/search-query";
import NoData from "../no-data";

type ArtistsDisplayProps = {
  token: string | undefined;
};

export default function ArtistsDisplay({ token }: ArtistsDisplayProps) {
  const [open, setOpen] = useState(false);

  const { page } = usePage();
  const { artistSort } = useArtistSort();
  const { category } = useCategory();
  const { country } = useCountry();
  const { searchQuery } = useSearchQuery();

  const queryParams: Record<string, string | number> = {
    include: "publishedArtworks",
    ...(country && { "filter[country]": country }),
    ...(category && { "filter[tag]": category }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
    ...(searchQuery && { searchQuery }),
  };

  const listUsersQuery = useListUsers(queryParams);

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-xs transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Sorting & Filters
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="space-y-4">
                      <SortArtists />

                      <div>
                        <p className="block text-xs font-medium text-gray-700">
                          Filters
                        </p>
                        <ArtistCategoryFilter />
                        <ArtistCountryFilter />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mt-8 block lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium"> Filters & Sorting </span>
            <ChevronRightIcon className="size-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <SortArtists />
            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>
              <ArtistCategoryFilter />
              <ArtistCountryFilter />
            </div>
          </div>

          {matchQueryStatus(listUsersQuery, {
            Loading: <ArtistsDisplaySkeleton />,
            Errored: <ErrorUI />,
            Empty: (
              <div className="flex min-h-[50px] items-center justify-center lg:col-span-3">
                <NoData
                  title="No Artists to Display"
                  message="No artists were found matching your criteria. Try adjusting your filters or search query."
                />
              </div>
            ),
            Success: ({ data }) => {
              const artists = data.data.map((artist) => ({
                id: artist.id,
                fullName: `${artist.first_name} ${artist.last_name}`,
                username: artist.username,
                country: artist.country,
                profilePictureUrl: artist.photo,
                description: artist.bio,
                artworks: artist.published_artworks
                  .slice(0, 3)
                  .map((artwork) => ({
                    id: artwork.id,
                    mainPhotoUrl: artwork.artwork_main_photo_path,
                  })),
              }));

              const links = data.links;
              const meta = data.meta;

              return (
                <div className="lg:col-span-3">
                  <ul className="mb-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {artists.map((artist) => (
                      <li key={artist.id}>
                        <ArtistCard {...artist} token={token} />
                      </li>
                    ))}
                  </ul>
                  {meta.total > 10 && (
                    <div className="pt-8">
                      <Pagination links={links} meta={meta} />
                    </div>
                  )}
                </div>
              );
            },
          })}
        </div>
      </div>
    </>
  );
}
