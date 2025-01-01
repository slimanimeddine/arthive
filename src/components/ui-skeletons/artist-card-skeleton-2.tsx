export function ArtistCardSkeleton2() {
  return (
    <div className="rounded-xl border-2 border-gray-100 bg-white animate-pulse">
      <div className="flex items-start gap-4 px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <div className="block h-14 w-14 bg-gray-200 rounded-lg" />
        <div>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-1" />
          <div className="mt-2 flex items-center">
            <div className="flex items-center gap-1">
              <div className="h-3 bg-gray-200 rounded w-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-x-1 p-1">
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-200" />
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-200" />
        <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
