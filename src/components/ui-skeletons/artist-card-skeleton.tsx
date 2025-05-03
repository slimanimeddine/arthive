export default function ArtistCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-gray-100 bg-white animate-pulse">
      <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-gray-200 w-14 h-14 " />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="h-4 px-6 bg-gray-200 rounded w-1/2" />
              <div className="rounded-full bg-gray-200 px-2.5 py-2.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-16" />
            </div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-full" />
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xs text-gray-500 h-4 bg-gray-200 rounded w-1/4" />
              <div className="text-xs text-gray-500 h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  )
}
