import { ArtworkCardSkeleton } from './artwork-card-skeleton'

function ArtistInformationSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white animate-pulse">
      <div>
        <div className="pb-1 sm:pb-6">
          <div>
            <div className="relative h-40 sm:h-56">
              <div className="absolute h-full w-full bg-gray-200 rounded-lg" />
            </div>
            <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
              <div className="sm:flex-1">
                <div>
                  <div className="flex items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-2 bg-gray-200 rounded ml-2.5 inline-block" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded mt-1 inline-block" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-x-3">
                  <div className="inline-flex w-full h-10 bg-gray-200 rounded-full" />
                  <div className="inline-flex w-full h-10 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="mt-1 h-4 bg-gray-200 rounded w-full" />
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="mt-1 h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="mt-1 h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function ArtworksDisplaySkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          {[...Array(10).keys()].map((item) => (
            <li key={item}>
              <ArtworkCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ArtistProfileSkeleton() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-2 lg:px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* artist information */}
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <ArtistInformationSkeleton />
          </div>

          {/* artworks */}
          <div className="sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <ArtworksDisplaySkeleton />
          </div>
        </div>
      </div>
    </main>
  )
}
