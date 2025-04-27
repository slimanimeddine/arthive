import { TAGS } from '@/lib/constants'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useQueryState } from 'nuqs'

export default function ArtistCategoryFilter() {
  const [category, setCategory] = useQueryState('category')

  return (
    <div className="mt-1 space-y-2">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium"> Category </span>
            {category && (
              <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                {category}
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75"
                  >
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span className="absolute -inset-1" />
                </button>
              </span>
            )}
          </span>

          <span className="transition group-open:-rotate-180">
            <ChevronDownIcon className="size-4" />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white overflow-y-scroll h-48">
          <div className="space-y-1 border-t border-gray-200 p-4">
            {TAGS.map((tag) => (
              <div
                key={tag}
                className="flex items-center"
              >
                <input
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={() => setCategory(tag)}
                  checked={tag === category}
                />
                <label className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
