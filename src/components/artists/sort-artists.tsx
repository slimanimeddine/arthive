import { useArtistSort } from "@/hooks/params/artist-sort";

type SortOption = {
  id: number;
  value: "popular" | "new";
  label: "Popular" | "New";
};

const sortOptions: SortOption[] = [
  { id: 1, value: "popular", label: "Popular" },
  { id: 2, value: "new", label: "New" },
];

export default function SortArtists() {
  const { setArtistSort } = useArtistSort();

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
        onChange={(e) => {
          void setArtistSort(e.target.value as SortOption["value"]);
        }}
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
