'use client'

import { useVerifyEmail } from '@/hooks/authentication'
import { useShowAuthenticatedUser } from '@/hooks/users'
import { authHeader, matchQueryStatus, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ErrorUI from './error-ui'
import LoadingSpinner from './loading-spinner'
import { useEffect } from 'react'

type VerifyEmailProps = {
  token: string
  slug: string[]
}

export default function VerifyEmail({ token, slug }: VerifyEmailProps) {
  const id = slug[0]
  const hash = slug[1]
  const router = useRouter()

  const verifyEmailMutation = useVerifyEmail(authHeader(token))
  const queryClient = useQueryClient()

  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authHeader(token))

  useEffect(() => {
    verifyEmailMutation.mutate(
      {
        id,
        hash,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['/api/v1/users/me'] })

          toast.success('Email verified successfully')
          router.push('/')
        },
      }
    )
  }, [hash, id, queryClient, router, verifyEmailMutation])

  return matchQueryStatus(showAuthenticatedUserQuery, {
    Loading: <LoadingSpinner />,
    Errored: <ErrorUI />,
    Empty: <span></span>,
    Success: ({ data }) => {
      if (!data.data.email_verified_at) {
        return <LoadingSpinner />
      }
      return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Email is verified
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Your email address is already verified.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => router.push('/')}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go to homepage
              </button>
            </div>
          </div>
        </main>
      )
    },
  })
}
