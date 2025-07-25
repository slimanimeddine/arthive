export default function NotificationItemSkeleton() {
  return (
    <div className="relative animate-pulse cursor-pointer rounded-lg bg-indigo-200 p-2 hover:bg-indigo-100">
      <div className="relative flex space-x-3">
        <div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200" />
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-200">
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
