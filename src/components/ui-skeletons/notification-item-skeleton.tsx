export default function NotificationItemSkeleton() {
  return (
    <div className="relative p-2 bg-indigo-200 hover:bg-indigo-100 rounded-lg cursor-pointer animate-pulse">
      <div className="relative flex space-x-3">
        <div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200" />
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-200">
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
