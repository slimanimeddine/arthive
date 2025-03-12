import { ChangePasswordForm } from '@/components/edit-profile/change-password-form'
import { PersonalInformationContainer } from '@/components/edit-profile/personal-information-container'

export default function Page() {
  return (
    <div className="flex flex-col justify-start gap-y-6">
      <PersonalInformationContainer />
      <ChangePasswordForm />
    </div>
  )
}
