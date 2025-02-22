import { LoginInformationForm } from '@/components/edit-profile/login-information-form'
import { PersonalInformationForm } from '@/components/edit-profile/personal-information-form'

export default function Page() {
  return (
    <div className="flex flex-col justify-start gap-y-6">
      <PersonalInformationForm />
      <LoginInformationForm />
    </div>
  )
}
