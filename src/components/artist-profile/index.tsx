'use client'

import ArtworksDisplay from './artworks-display'
import ArtistInformation from './artist-information'

type ArtistProfileProps = {
  token: string | undefined
  username: string
}

export default function ArtistProfile({ token, username }: ArtistProfileProps) {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-2 lg:px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* artist information */}
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <ArtistInformation
              token={token}
              username={username}
            />
          </div>

          {/* artworks */}
          <ArtworksDisplay username={username} />
        </div>
      </div>
    </main>
  )
}
