import ArtworkCardSkeleton from "../ui-skeletons/artwork-card-skeleton";

export default function ArtworksSectionSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(10).keys()]?.map((item) => (
          <li key={item}>
            <ArtworkCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
