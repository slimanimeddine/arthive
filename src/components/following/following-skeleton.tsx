import ArtistListItemSkeleton from '../ui-skeletons/artist-list-item-skeleton'

export default function FollowingSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            Following
          </h2>
        </div>

        <ul
          role="list"
          className="divide-y divide-gray-100"
        >
          {[...Array(10).keys()].map((item) => (
            <li key={item}>
              <ArtistListItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
