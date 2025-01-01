import { ChevronDownIcon } from '@heroicons/react/24/outline'

const countries = [
  {
    id: '1',
    name: 'Painting',
  },
  {
    id: '2',
    name: 'Graphic',
  },
  {
    id: '3',
    name: 'Sculpture',
  },
  {
    id: '4',
    name: 'Folk Art',
  },
  {
    id: '5',
    name: 'Textile',
  },
  {
    id: '6',
    name: 'Ceramics',
  },
  {
    id: '7',
    name: 'Beads',
  },
  {
    id: '8',
    name: 'Paper',
  },
  {
    id: '9',
    name: 'Glass',
  },
  {
    id: '10',
    name: 'Dolls',
  },
  {
    id: '11',
    name: 'Jewellery',
  },
  {
    id: '12',
    name: 'Fresco',
  },
  {
    id: '13',
    name: 'Metal',
  },
  {
    id: '14',
    name: 'Mosaic',
  },
  {
    id: '15',
    name: 'Stained Glass Windows',
  },
]
export function ArtistCountryFilter() {
  return (
    <div className="mt-1 space-y-2">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium"> Country </span>
            <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
              Norway
              <button
                type="button"
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
          </span>

          <span className="transition group-open:-rotate-180">
            <ChevronDownIcon className="size-4" />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white overflow-y-scroll h-48">
          <div className="space-y-1 border-t border-gray-200 p-4">
            {countries.map((country) => (
              <div
                key={country.id}
                className="flex items-center"
              >
                <input
                  id={country.id}
                  name="country"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor={country.id}
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  {country.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
