export default function ArtistListItemSkeleton() {
  return (
    <div className="flex animate-pulse items-center justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-200" />
        <div className="min-w-0 flex-auto">
          <div className="h-4 w-1/2 rounded bg-gray-200 px-24" />
          <div className="mt-1 h-4 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
      <div className="h-8 rounded-full bg-white px-8 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"></div>
    </div>
  );
}
