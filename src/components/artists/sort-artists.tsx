"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
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
  const { artistSort, setArtistSort } = useArtistSort();

  return (
    <div className="relative">
      <label
        htmlFor="SortBy"
        className="block text-xs font-medium text-gray-700"
      >
        Sort By
      </label>

      <div className="relative mt-1">
        <select
          id="SortBy"
          value={artistSort ?? ""}
          onChange={(e) =>
            setArtistSort(
              e.target.value ? (e.target.value as SortOption["value"]) : null,
            )
          }
          className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {artistSort && (
          <button
            type="button"
            onClick={() => setArtistSort(null)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear sort"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
