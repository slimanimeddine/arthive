import ArtistCardSkeleton from '../ui-skeletons/artist-card-skeleton'

function SortArtists() {
  return (
    <div>
      <label
        htmlFor="SortBy"
        className="block text-xs font-medium text-gray-700"
      >
        Sort By
      </label>

      <select
        id="SortBy"
        className="mt-1 rounded border-gray-300 text-sm"
      >
        <option value="">Select</option>
      </select>
    </div>
  )
}

function Filter({ type }: { type: string }) {
  return (
    <div className="mt-1 space-y-2">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium"> {type} </span>
          </span>
        </summary>
      </details>
    </div>
  )
}

export default function ArtistsDisplaySkeleton() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
      <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <div className="hidden space-y-4 lg:block">
          <SortArtists />
          <div>
            <p className="block text-xs font-medium text-gray-700">Filters</p>
            <Filter type="Category" />
            <Filter type="Country" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 mb-8">
            {[...Array(10).keys()]?.map((item) => (
              <li key={item}>
                <ArtistCardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
