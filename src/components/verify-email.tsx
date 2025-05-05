'use client'

import { useVerifyEmail } from '@/hooks/authentication'
import { authHeader } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoadingSpinner from './loading-spinner'
import { useEffect } from 'react'
import Navigate from './navigate'
import { isAxiosError } from 'axios'

type VerifyEmailProps = {
  token: string
  slug: string[]
}

export default function VerifyEmail({ token, slug }: VerifyEmailProps) {
  const id = slug[0]
  const hash = slug[1]
  const queryClient = useQueryClient()

  const authConfig = authHeader(token)

  const { isPending, isError, isSuccess, error } = useVerifyEmail(
    id,
    hash,
    authConfig
  )

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully')
      queryClient.invalidateQueries({
        queryKey: ['/api/v1/users/me'],
      })
    }
  }, [isSuccess, queryClient])

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    if (
      isAxiosError(error) &&
      error.response?.status === 403 &&
      error.response.data.message === 'Email already verified'
    ) {
      return <Navigate to="/edit-profile" />
    }
  }

  return <Navigate to="/edit-profile" />
}
