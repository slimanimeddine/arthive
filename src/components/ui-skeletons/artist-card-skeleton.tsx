export default function ArtistCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border-2 border-gray-100 bg-white">
      <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 lg:px-8 lg:pt-8 lg:pb-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-lg bg-gray-200" />
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <div className="h-4 w-1/2 rounded bg-gray-200 px-6" />
              <div className="w-16 rounded-full bg-gray-200 px-2.5 py-2.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50" />
            </div>
            <div className="mt-2 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 flex items-center gap-2">
              <div className="h-4 w-1/4 rounded bg-gray-200 text-xs text-gray-500" />
              <div className="h-4 w-1/4 rounded bg-gray-200 text-xs text-gray-500" />
            </div>
          </div>
        </div>
        <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}
