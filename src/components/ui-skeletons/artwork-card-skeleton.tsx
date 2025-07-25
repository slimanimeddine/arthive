export default function ArtworkCardSkeleton() {
  return (
    <div className="relative animate-pulse">
      <a className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <div className="h-full w-full bg-gray-200" />
        <button type="button" className="absolute inset-0 focus:outline-none" />
      </a>
      <a className="mt-2 flex items-center justify-between">
        <div className="pointer-events-none block h-4 w-2/3 truncate bg-gray-200 text-sm font-medium text-gray-900" />
        <div className="flex h-4 w-1/6 items-center justify-end gap-x-2 bg-gray-200" />
      </a>
      <a className="mt-2 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="h-4 w-2/3 bg-gray-200 text-sm font-medium text-gray-900 hover:underline" />
        </div>
      </a>
    </div>
  );
}
