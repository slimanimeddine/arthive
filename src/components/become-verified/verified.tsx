'use client'
import Link from 'next/link'

export default function Verified() {
  return (
    <div className="max-w-2xl mx-auto lg:max-w-7xl">
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              You are a verified artist
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Congratulations! Your profile has been verified. Your verified
                badge is now visible to other users.
              </p>
              <p className="mt-2">
                <Link
                  href="/become-verified/verification-submission-history"
                  className="text-green-800 underline hover:text-green-600"
                >
                  View your verification submission history
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
