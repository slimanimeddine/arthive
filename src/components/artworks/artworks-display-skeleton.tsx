import ArtworkCardSkeleton from '../ui-skeletons/artwork-card-skeleton'

export default function ArtworksDisplaySkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <ul
        role="list"
        className="mt-6 mb-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {[...Array(12).keys()].map((item) => (
          <li key={item}>
            <ArtworkCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
