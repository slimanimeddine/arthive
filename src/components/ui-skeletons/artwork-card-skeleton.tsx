export function ArtworkCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative">
        <div className="w-full h-52 bg-gray-200 rounded-lg" />
        <div className="mt-2 h-4 bg-gray-200" />
        <div className="mt-2 flex items-center justify-end gap-x-2">
          <div className="w-6 h-4 bg-gray-200 rounded" />
          <div className="w-6 h-4 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <div className="h-7 w-7 bg-gray-200 rounded-full" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
