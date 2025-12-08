"use client";
import { useState } from "react";
import { useSearchQuery } from "@/hooks/params/search-query";
import ArtistsSection from "./artists-section";
import ArtworksSection from "./artworks-section";

export default function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search artists and artworks..."
          className="w-full rounded-md border-0 bg-white py-1.5 pr-4 pl-10 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
          value={searchQuery}
          onChange={(e) => {
            void setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => searchQuery.length > 0 && setIsOpen(true)}
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Search Icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Search Modal */}
      {isOpen && (
        <div className="ring-opacity-5 absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black">
          <div className="p-4">
            {/* Artists Section */}
            <ArtistsSection />

            {/* Artworks Section */}
            <ArtworksSection />
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
