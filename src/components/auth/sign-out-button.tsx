import { useSignOut } from '@/api/authentication/authentication'
import { useDeleteSession } from '@/hooks/session/use-delete-session'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function SignOutButton() {
  const token = useGetAuthenticatedUserToken()
  const deleteSessionMutation = useDeleteSession()
  const queryClient = useQueryClient()
  const signOutMutation = useSignOut({
    axios: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const router = useRouter()

  function onSubmit() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log('signed out from backend')
        deleteSessionMutation.mutate(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
            toast.success('You have been signed out')
            router.push('/')
          },
          onError: (error) => onError(error),
        })
      },
      onError: () => {
        console.log('failed to sign out from backend')
      },
    })
  }

  const isDisabled =
    signOutMutation.isPending || deleteSessionMutation.isPending

  return (
    <button
      onClick={onSubmit}
      type="submit"
      disabled={isDisabled}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign out
    </button>
  )
}
