'use client'

import { useSubmitArtistVerificationRequest } from '@/hooks/artist-verification-requests'
import { useShowAuthenticatedUser } from '@/hooks/users'
import { authHeader, matchQueryStatus, onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import Verified from './verified'
import Link from 'next/link'

type BecomeVerifiedProps = {
  token: string
}

export default function BecomeVerified({ token }: BecomeVerifiedProps) {
  const authConfig = authHeader(token)
  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authConfig)

  const submitArtistVerificationRequestMutation =
    useSubmitArtistVerificationRequest(authConfig)

  const handleSubmit = () => {
    submitArtistVerificationRequestMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success('Artist verification request submitted successfully!')
      },
    })
  }

  return matchQueryStatus(showAuthenticatedUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <span></span>,
    Success: ({ data }) => {
      const isArtistVerified = data.data.artist_verified_at
      if (isArtistVerified) {
        return <Verified />
      }
      return (
        <div className="max-w-2xl mx-auto lg:max-w-7xl">
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-x-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Become a Verified Artist
                </h1>
                <Link
                  className="text-sm font-semibold whitespace-nowrap text-indigo-500 hover:text-indigo-600"
                  href="/become-verified/verification-submission-history"
                >
                  View your history of verification submissions{' '}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Get a verified badge to boost your credibility and showcase your
                authenticity as an artist.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                To be eligible, you must:
              </h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Have atleast 3 published artworks</li>
                <li>
                  Have completed your profile details (first name, last name,
                  bio, country, profile picture)
                </li>
              </ul>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Request Verification
              </button>
            </div>
          </div>
        </div>
      )
    },
  })
}
