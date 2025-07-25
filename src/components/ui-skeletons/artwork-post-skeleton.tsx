export default function ArtworkPostSkeleton() {
  return (
    <div className="animate-pulse bg-white p-6 py-14">
      <div className="mx-auto flex flex-col gap-y-5 sm:max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200" />
          <div className="h-8 rounded-full bg-white px-8 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-x-1">
          <div className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium ring-1 ring-gray-700/10 ring-inset">
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-[600px] w-full rounded-lg bg-gray-200 object-cover" />
        </div>
        <div>
          <div className="mt-1 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
