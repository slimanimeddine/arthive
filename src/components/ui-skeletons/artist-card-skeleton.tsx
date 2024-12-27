export function ArtistCardSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-6 py-5 animate-pulse">
        <div className="flex min-w-0 gap-x-4">
          <div className="h-12 w-12 flex-none rounded-full bg-gray-200" />
          <div className="min-w-96 flex-auto">
            <div className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 h-4 bg-gray-200 w-1/2 mb-1 rounded" />
            <div className="mt-1 truncate text-xs leading-5 h-4 bg-gray-200 w-1/4 rounded" />
          </div>
        </div>
        <div className="rounded-full bg-gray-300 px-2.5 py-1 text-xs font-semibold h-6 w-16" />
      </div>
    </div>
  )
}
