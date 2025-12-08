import NotificationItemSkeleton from "../ui-skeletons/notification-item-skeleton";

export default function NotificationsSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
            Notifications
          </h2>
        </div>

        <ul className="mt-2 flex flex-col gap-2">
          {[...Array(10).keys()].map((item) => (
            <li key={item}>
              <NotificationItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
