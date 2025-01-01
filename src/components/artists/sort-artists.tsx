const sortOptions = [
  { id: 1, value: 'popular', label: 'Popular' },
  { id: 2, value: 'new', label: 'New' },
]

export function SortArtists() {
  return (
    <div>
      <label
        htmlFor="SortBy"
        className="block text-xs font-medium text-gray-700"
      >
        Sort By
      </label>

      <select
        id="SortBy"
        className="mt-1 rounded border-gray-300 text-sm"
      >
        {sortOptions.map((option) => (
          <option
            key={option.id}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
