export default function ArtistInformationSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-y-scroll bg-white">
      <div>
        <div className="pb-1 sm:pb-6">
          <div>
            <div>
              <div className="relative h-40 sm:h-56">
                <div className="h-full w-full rounded-lg bg-gray-200" />
              </div>
            </div>
            <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
              <div className="sm:flex-1">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1/2 rounded bg-gray-200" />
                  </div>
                  <div className="h-3 w-1/3 rounded bg-gray-200" />
                </div>
                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
          <div className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            <div>
              <div className="h-3 w-1/4 rounded bg-gray-200" />
              <div className="mt-1 h-10 w-full rounded bg-gray-200" />
            </div>
            <div>
              <div className="h-3 w-1/4 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
            </div>
            <div>
              <div className="h-3 w-1/4 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-1/4 rounded bg-gray-200" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-1/4 rounded bg-gray-200 font-medium" />
                <div className="flex h-4 w-1/4 items-center gap-x-1 rounded bg-gray-200" />
              </div>
              <dl className="mt-2">
                <div className="flex justify-between py-3 text-sm font-medium">
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                  <div className="flex h-3 w-1/4 items-center gap-x-1 rounded bg-gray-200" />
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                  <div className="flex h-3 w-1/4 items-center gap-x-1 rounded bg-gray-200" />
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                  <div className="flex h-3 w-1/4 items-center gap-x-1 rounded bg-gray-200" />
                </div>
                <div className="flex justify-between py-3 text-sm font-medium">
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                  <div className="flex h-3 w-1/4 items-center gap-x-1 rounded bg-gray-200" />
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
