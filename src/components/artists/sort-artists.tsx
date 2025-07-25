import { useQueryState } from "nuqs";

const sortOptions = [
  { id: 1, value: "popular", label: "Popular" },
  { id: 2, value: "new", label: "New" },
];

export default function SortArtists() {
  const [, setArtistSort] = useQueryState("artistSort");

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
        onChange={(e) =>
          setArtistSort(e.target.value === "" ? null : e.target.value)
        }
      >
        <option value="">Select</option>
        {sortOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
