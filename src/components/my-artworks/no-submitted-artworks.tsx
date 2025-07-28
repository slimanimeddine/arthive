import { PlusIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function NoSubmitteArtworks() {
  const router = useRouter();
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <PhotoIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        No artworks yet
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Start sharing your creations by uploading your first artwork.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => router.push("/submit-work")}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
          Upload Artwork
        </button>
      </div>
    </div>
  );
}
