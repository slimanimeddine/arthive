'use client'
import { SignOutButton } from '@/components/auth/sign-out-button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign out of your account
        </h2>
        <p className="text-center mt-5">Are you sure you want to sign out?</p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex gap-2">
          <div className="w-full">
            <SignOutButton />
          </div>
          <div className="w-full">
            <button
              onClick={() => router.back()}
              className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
