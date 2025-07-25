function ArtworkTableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
        <div className="h-4 w-full rounded bg-gray-200 px-8" />
      </td>

      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        <div className="h-32 w-32 rounded-lg bg-gray-200"></div>
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        <div className="h-4 w-1/3 rounded bg-gray-200 px-6"></div>
      </td>
      <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
        <div className="flex flex-col items-end gap-y-3">
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
        </div>
      </td>
    </tr>
  );
}

export default function MyArtworksSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
            My Artworks
          </h2>
        </div>
        <div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Main Photo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[...Array(5).keys()].map((item) => (
                      <ArtworkTableRowSkeleton key={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
