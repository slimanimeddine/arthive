'use client'
import { signInBody } from '@/schemas/authentication'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@/api/authentication/authentication'
import { useCreateSession } from '@/hooks/session/use-create-session'
import { useQueryClient } from '@tanstack/react-query'
import { onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import axios from '@/lib/axios'

type SignInBody = zod.infer<typeof signInBody>

export function SignInForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignInBody>({
    resolver: zodResolver(signInBody),
  })

  const signInMutation = useSignIn()

  const createSessionMutation = useCreateSession()
  const queryClient = useQueryClient()

  const router = useRouter()

  async function onSubmit(data: SignInBody) {
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    await csrf()
    signInMutation.mutate(
      {
        data,
      },
      {
        onError: (error) => onError(error),
        onSuccess: async (data) => {
          reset()
          createSessionMutation.mutate(
            {
              id: data.data.data!.id!,
              token: data.data.data!.token!,
            },
            {
              onError: (error) => onError(error),
              onSuccess: () => {
                toast.success('User signed in successfully!')
                router.push('/')
                queryClient.invalidateQueries({ queryKey: ['session'] })
              },
            }
          )
        },
      }
    )
  }

  const isDisabled = formState.isSubmitting || signInMutation.isPending
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register('email')}
          />
          {formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register('password')}
          />
          {formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={isDisabled}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
