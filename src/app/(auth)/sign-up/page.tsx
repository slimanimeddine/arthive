import Logo from '@/components/logo'
import SignUpForm from '@/components/sign-up-form'
import seo from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  ...seo('Sign Up', 'Create a new ArtHive account'),
}

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex items-center justify-center h-full w-full"
        >
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm />
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
