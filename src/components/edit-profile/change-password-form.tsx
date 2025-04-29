'use client'
import { ChangePasswordBody, useChangePassword } from '@/hooks/authentication'
import { authHeader, classNames, onError } from '@/lib/utils'
import { changePasswordBody } from '@/schemas/authentication'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type ChangePasswordFormProps = {
  token: string
}

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, reset } =
    useForm<ChangePasswordBody>({
      resolver: zodResolver(changePasswordBody),
    })

  const changePasswordMutation = useChangePassword(authHeader(token))

  function onSubmit(data: ChangePasswordBody) {
    changePasswordMutation.mutate(
      {
        data,
      },
      {
        onError,
        onSuccess: () => {
          toast.success('Password updated successfully!')
          queryClient.invalidateQueries({ queryKey: ['/api/v1/users/me'] })
          reset()
        },
      }
    )
  }

  const isDisabled =
    formState.isSubmitting ||
    changePasswordMutation.isPending ||
    !token ||
    !formState.isDirty

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Change your password
        </h2>
        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="current-password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Current Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('current_password')}
              />
            </div>
            {formState.errors.current_password && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.current_password.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="new-password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('new_password')}
              />
            </div>
            {formState.errors.new_password && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.new_password.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="confirm-new-password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('new_password_confirmation')}
              />
            </div>
            {formState.errors.new_password_confirmation && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.new_password_confirmation.message}
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
