import ArtistListItemSkeleton from "../ui-skeletons/artist-list-item-skeleton";

export default function ArtistsSectionSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
        {[...Array(10).keys()]?.map((item) => (
          <li key={item}>
            <ArtistListItemSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
