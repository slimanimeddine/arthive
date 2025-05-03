import ArtworkCardSkeleton from '../ui-skeletons/artwork-card-skeleton'

export default function FavoritesSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-1">
            Favorites
          </h2>
        </div>

        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          {[...Array(9).keys()].map((item) => (
            <li key={item}>
              <ArtworkCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
