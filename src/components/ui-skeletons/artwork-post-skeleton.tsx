import { ArtworkCommentSkeleton } from './artwork-comment-skeleton'

export function ArtworkPostSkeleton() {
  return (
    <div className="p-6 py-14 bg-white">
      <div className="flex flex-col sm:max-w-4xl mx-auto gap-y-5 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <a
              href="#"
              className="flex items-center gap-x-3"
            >
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </a>
            <div className="rounded-full bg-gray-200 px-2.5 py-1 w-16 h-6" />
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="w-full h-64 bg-gray-200 rounded-lg" />
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <section className="py-4 lg:py-8 antialiased">
          <div>
            <div className="divide-y">
              {[...Array(10)].map((_, index) => (
                <ArtworkCommentSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
