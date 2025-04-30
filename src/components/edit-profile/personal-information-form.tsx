'use client'
import {
  UpdateAuthenticatedUserBody,
  useUpdateAuthenticatedUser,
} from '@/hooks/users'
import { authHeader, classNames, getDirtyValues, onError } from '@/lib/utils'
import { updateAuthenticatedUserBody } from '@/schemas/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SelectCountry from './select-country'

type PersonalInformationFormProps = {
  username: string
  first_name?: string
  last_name?: string
  email: string
  country?: string
  bio?: string
  token: string
}

export default function PersonalInformationForm({
  username,
  first_name,
  last_name,
  email,
  country,
  bio,
  token,
}: PersonalInformationFormProps) {
  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, control } =
    useForm<UpdateAuthenticatedUserBody>({
      resolver: zodResolver(updateAuthenticatedUserBody),
      defaultValues: {
        username,
        first_name,
        last_name,
        email,
        country: country ?? '',
        bio,
      },
    })

  const updateAuthenticatedUserMutation = useUpdateAuthenticatedUser(
    authHeader(token)
  )

  function onSubmit(data: UpdateAuthenticatedUserBody) {
    const dirtyValues = getDirtyValues(formState.dirtyFields, data)
    updateAuthenticatedUserMutation.mutate(
      {
        data: dirtyValues,
      },
      {
        onError,
        onSuccess: () => {
          toast.success('Personal Information updated successfully!')
          queryClient.invalidateQueries({ queryKey: ['/api/v1/users/me'] })
        },
      }
    )
  }

  const isDisabled =
    formState.isSubmitting ||
    updateAuthenticatedUserMutation.isPending ||
    !token ||
    !formState.isDirty

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Useranme
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  http://arthive.com/artists/
                </span>
                <input
                  type="text"
                  placeholder="johndoe"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  {...register('username')}
                />
              </div>
              {formState.errors.username && (
                <p className="mt-2 text-sm text-red-600">
                  {formState.errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('first_name')}
              />
            </div>
            {formState.errors.first_name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.first_name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('last_name')}
              />
            </div>
            {formState.errors.last_name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.last_name.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('email')}
              />
            </div>
            {formState.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                {...register('bio')}
              />
            </div>
            {formState.errors.bio && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.bio.message}
              </p>
            )}

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>
          <SelectCountry
            name="country"
            control={control}
          />
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
