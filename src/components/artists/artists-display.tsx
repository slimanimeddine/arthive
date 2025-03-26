'use client'
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArtistCard } from './artist-card'
import { Pagination } from '../pagination'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  DialogTitle,
} from '@headlessui/react'
import { SortArtists } from './sort-artists'
import { ArtistCategoryFilter } from './artist-category-filter'
import { ArtistCountryFilter } from './artist-country-filter'
import { useListUsers } from '@/api/users/users'
import { useSearchParams } from 'next/navigation'

export function ArtistsDisplay() {
  const [open, setOpen] = useState(false)

  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const artistSort = searchParams.get('artistSort')
  const category = searchParams.get('category')
  const country = searchParams.get('country')

  const queryParams: Record<string, string> = {
    include: 'publishedArtworks',
    ...(country && { 'filter[country]': country }),
    ...(category && { 'filter[tag]': category }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
  }

  const artistsQuery = useListUsers(queryParams)

  if (artistsQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (artistsQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        We&apos;re sorry, something went wrong.
      </p>
    )
  }

  const artistsQueryData = artistsQuery.data!.data.data!

  const artists = artistsQueryData.map((artist) => ({
    id: artist.id!,
    fullName: `${artist.first_name} ${artist.last_name}`,
    username: artist.username!,
    country: artist.country,
    profilePictureUrl: artist.photo,
    description: artist.bio,
    artworks: artist.published_artworks!.slice(0, 3).map((artwork) => ({
      id: artwork.id!,
      mainPhotoUrl: artwork.artwork_main_photo_path!,
    })),
  }))

  const links = artistsQuery.data!.data.links!
  const meta = artistsQuery.data!.data.meta!

  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-10"
      >
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
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="size-6"
                      />
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
                    <div className=" space-y-4">
                      {artistsQuery.isSuccess && artists.length > 1 && (
                        <SortArtists />
                      )}

                      <div>
                        <p className="block text-xs font-medium text-gray-700">
                          Filters
                        </p>
                        {artistsQuery.isSuccess && artists.length > 1 && (
                          <ArtistCategoryFilter />
                        )}
                        {artistsQuery.isSuccess && artists.length > 1 && (
                          <ArtistCountryFilter />
                        )}
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
            {artistsQuery.isSuccess && artists.length > 1 && <SortArtists />}
            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>
              {artistsQuery.isSuccess && artists.length > 1 && (
                <ArtistCategoryFilter />
              )}
              {artistsQuery.isSuccess && artists.length > 1 && (
                <ArtistCountryFilter />
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {artistsQuery.isSuccess && artists.length === 0 && (
              <p className="mt-2 text-sm text-gray-700">
                No artists were found
              </p>
            )}

            {artistsQuery.isSuccess && artists.length > 0 && (
              <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 mb-8">
                {artists.map((artist) => (
                  <li key={artist.id}>
                    <ArtistCard {...artist} />
                  </li>
                ))}
              </ul>
            )}
            {artistsQuery.isSuccess && meta.total! >= 10 && (
              <div className="mt-8">
                <Pagination
                  links={links}
                  meta={meta}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
