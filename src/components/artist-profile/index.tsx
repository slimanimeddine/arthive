'use client'

import { SortFilterArtworks } from './sort-filter-artworks'
import { ArtworksDisplay } from './artworks-display'
import { Pagination } from './pagination'
import { ArtistInformation } from './artist-information'

export function ArtistProfile() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-2 lg:px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* artist information */}
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <ArtistInformation />
          </div>

          {/* artworks */}
          <div className="sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <SortFilterArtworks />
            <ArtworksDisplay />
            <div className="pt-8">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
