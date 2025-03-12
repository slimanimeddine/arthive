'use client'
import { useShowAuthenticatedUser } from '@/api/users/users'
import { useGetAuthenticatedUserToken } from '@/hooks/use-get-authenticated-user-token'
import { PersonalInformationForm } from './personal-information-form'

export function PersonalInformationContainer() {
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
    <PersonalInformationForm
      username={authenticatedUser.username!}
      first_name={authenticatedUser.first_name}
      last_name={authenticatedUser.last_name}
      email={authenticatedUser.email!}
      country={authenticatedUser.country}
      bio={authenticatedUser.bio}
    />
  )
}
