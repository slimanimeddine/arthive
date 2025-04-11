'use client'
import { useShowAuthenticatedUser } from '@/api/users/users'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { PersonalInformationForm } from './personal-information-form'
import { ChangePasswordForm } from './change-password-form'
import { EmailVerificationForm } from './email-verification-form'

export function Index() {
  const token = useGetAuthenticatedUserToken()
  const axiosConfig = token
    ? {
        axios: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  const authenticatedUserQuery = useShowAuthenticatedUser(axiosConfig)

  if (authenticatedUserQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (authenticatedUserQuery.isError) {
    return (
      <p className="mt-2 text-sm text-red-700">
        {authenticatedUserQuery.error.response?.data.message}
      </p>
    )
  }

  const authenticatedUser = authenticatedUserQuery.data!.data.data!

  return (
    <div className="flex flex-col justify-start gap-y-6">
      <PersonalInformationForm
        username={authenticatedUser.username!}
        first_name={authenticatedUser.first_name}
        last_name={authenticatedUser.last_name}
        email={authenticatedUser.email!}
        country={authenticatedUser.country}
        bio={authenticatedUser.bio}
        token={token}
      />
      <ChangePasswordForm token={token} />
      <EmailVerificationForm
        token={token}
        email_verified_at={authenticatedUser.email_verified_at}
      />
    </div>
  )
}
