import ArtistCardSkeleton from "../ui-skeletons/artist-card-skeleton";

export default function ArtistsDisplaySkeleton() {
  return (
    <div className="lg:col-span-3">
      <ul className="mb-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {[...Array(10).keys()]?.map((item) => (
          <li key={item}>
            <ArtistCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
