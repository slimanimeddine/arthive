import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NoBookmarkedArtworks() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <BookmarkIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        No bookmarked artworks
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        When you find an artwork you love, tap the bookmark icon to save it
        here.
      </p>

      <div className="mt-6">
        <Link
          href="/artworks"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Explore Artworks
        </Link>
      </div>
    </div>
  );
}
