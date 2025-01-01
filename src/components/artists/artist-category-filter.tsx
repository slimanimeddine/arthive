import { ChevronDownIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    id: '1',
    title: 'Painting',
  },
  {
    id: '2',
    title: 'Graphic',
  },
  {
    id: '3',
    title: 'Sculpture',
  },
  {
    id: '4',
    title: 'Folk Art',
  },
  {
    id: '5',
    title: 'Textile',
  },
  {
    id: '6',
    title: 'Ceramics',
  },
  {
    id: '7',
    title: 'Beads',
  },
  {
    id: '8',
    title: 'Paper',
  },
  {
    id: '9',
    title: 'Glass',
  },
  {
    id: '10',
    title: 'Dolls',
  },
  {
    id: '11',
    title: 'Jewellery',
  },
  {
    id: '12',
    title: 'Fresco',
  },
  {
    id: '13',
    title: 'Metal',
  },
  {
    id: '14',
    title: 'Mosaic',
  },
  {
    id: '15',
    title: 'Stained Glass Windows',
  },
]
export function ArtistCategoryFilter() {
  return (
    <div className="mt-1 space-y-2">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Category </span>

          <span className="transition group-open:-rotate-180">
            <ChevronDownIcon className="size-4" />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white overflow-y-scroll h-48">
          <div className="space-y-1 border-t border-gray-200 p-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center"
              >
                <input
                  defaultChecked={category.id === 'email'}
                  id={category.id}
                  name="notification-method"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor={category.id}
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  {category.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
