'use client'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { classNames, onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { verifyEmailCodeBody } from '@/schemas/authentication'
import {
  useSendEmailVerificationCode,
  useVerifyEmailCode,
} from '@/api/authentication/authentication'

type VerifyEmailCodeBody = zod.infer<typeof verifyEmailCodeBody>

type EmailVerificationFormProps = {
  token: string
  email_verified_at?: string
}

export function EmailVerificationForm({
  token,
  email_verified_at,
}: EmailVerificationFormProps) {
  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, reset } =
    useForm<VerifyEmailCodeBody>({
      resolver: zodResolver(verifyEmailCodeBody),
    })

  const sendEmailVerificationCodeMutation =
    useSendEmailVerificationCode(axiosConfig)

  function sendEmailVerificationCode() {
    sendEmailVerificationCodeMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success('Email verification code sent successfully')
      },
    })
  }

  const verifyEmailCodeMutation = useVerifyEmailCode(axiosConfig)

  function onSubmit(data: VerifyEmailCodeBody) {
    verifyEmailCodeMutation.mutate(
      {
        data,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['/api/v1/users/me'] })
          toast.success('Email verified successfully')
          reset()
        },
      }
    )
  }

  const isDisabled =
    formState.isSubmitting ||
    verifyEmailCodeMutation.isPending ||
    !token ||
    !formState.isDirty ||
    !!email_verified_at

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Verify Email Address
        </h2>
        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="current-password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email Verification Code
              </label>
              {!email_verified_at && (
                <button
                  type="button"
                  onClick={sendEmailVerificationCode}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold"
                >
                  Send Verification Code
                </button>
              )}
            </div>
            <div className="mt-2">
              <input
                type="text"
                disabled={!!email_verified_at}
                placeholder={
                  !!email_verified_at ? 'Email is already verified' : ''
                }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                {...register('code')}
              />
            </div>
            {formState.errors.code && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.code.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="submit"
          disabled={isDisabled}
          className={classNames(
            'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            isDisabled ? 'cursor-not-allowed' : 'hover:bg-indigo-500'
          )}
        >
          Save
        </button>
      </div>
    </form>
  )
}
