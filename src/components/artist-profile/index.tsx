"use client";

import ArtistInformation from "./artist-information";
import ArtworksDisplay from "./artworks-display";

export default function ArtistProfile() {
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
          <ArtworksDisplay />
        </div>
      </div>
    </main>
  );
}
