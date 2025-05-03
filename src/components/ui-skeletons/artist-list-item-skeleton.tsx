export default function ArtistListItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-x-6 py-5 animate-pulse">
      <div className="flex min-w-0 gap-x-4">
        <div className="inline-block overflow-hidden rounded-full bg-gray-200 h-12 w-12" />
        <div className="min-w-0 flex-auto">
          <div className="h-4 px-24 bg-gray-200 rounded w-1/2" />
          <div className="mt-1 h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
      <div className="rounded-full bg-white h-8 px-8 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"></div>
    </div>
  )
}
