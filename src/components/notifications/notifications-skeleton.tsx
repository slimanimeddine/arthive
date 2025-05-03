import NotificationItemSkeleton from '../ui-skeletons/notification-item-skeleton'

export default function NotificationsSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            Notifications
          </h2>
        </div>

        <ul
          role="list"
          className="flex flex-col gap-2 mt-2"
        >
          {[...Array(10).keys()].map((item) => (
            <li key={item}>
              <NotificationItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
