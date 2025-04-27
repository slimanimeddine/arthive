'use client'
import PersonalInformationForm from './personal-information-form'
import ChangePasswordForm from './change-password-form'
import EmailVerificationForm from './email-verification-form'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import { useShowAuthenticatedUser } from '@/hooks/users'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'

type IndexProps = {
  token: string
}

export function Index({ token }: IndexProps) {
  const authenticatedUserQuery = useShowAuthenticatedUser(authHeader(token))

  return matchQueryStatus(authenticatedUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      return (
        <div className="flex flex-col justify-start gap-y-6">
          <PersonalInformationForm
            username={data.data.username}
            first_name={data.data.first_name}
            last_name={data.data.last_name}
            email={data.data.email}
            country={data.data.country}
            bio={data.data.bio}
            token={token}
          />
          <ChangePasswordForm token={token} />
          <EmailVerificationForm
            token={token}
            email_verified_at={data.data.email_verified_at}
          />
        </div>
      )
    },
  })
}
