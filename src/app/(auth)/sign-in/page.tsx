import SignInForm from '@/components/sign-in-form'
import Logo from '@/components/logo'
import Link from 'next/link'

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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm />
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
