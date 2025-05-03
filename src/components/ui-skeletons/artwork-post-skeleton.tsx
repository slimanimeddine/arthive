export default function ArtworkPostSkeleton() {
  return (
    <div className="p-6 py-14 bg-white animate-pulse">
      <div className="flex flex-col sm:max-w-4xl mx-auto gap-y-5">
        <div className="flex justify-between items-center">
          <div className="inline-block overflow-hidden rounded-full bg-gray-200 h-10 w-10" />
          <div className="rounded-full bg-white h-8 px-8 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="flex items-center gap-x-1">
          <div className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium ring-1 ring-gray-700/10 ring-inset">
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="bg-gray-200 object-cover w-full h-[600px] rounded-lg" />
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-full mt-1" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
        </div>
      </div>
    </div>
  )
}
