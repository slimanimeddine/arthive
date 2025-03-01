export function ArtworkCommentSkeleton() {
  return (
    <article className="p-6 text-base bg-white dark:bg-black animate-pulse">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <div className="mr-2 w-14 h-14 rounded-full bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </footer>
      <div className="text-gray-500 dark:text-gray-400">
        <div className="h-4 bg-gray-200 rounded w-full mt-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mt-1" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </button>
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </button>
      </div>
    </article>
  )
}
