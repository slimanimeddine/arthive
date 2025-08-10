"use client";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { authHeader } from "@/lib/utils";
import ErrorUI from "../error-ui";
import ChangePasswordForm from "./change-password-form";
import PersonalInformationForm from "./personal-information-form";
import EmailNotVerifiedAlert from "../email-not-verified-alert";
import { useSession } from "@/hooks/session";
import LoadingUI from "../loading-ui";

export default function EditProfile() {
  const { token } = useSession()!;
  const { isPending, isError, data, error } = useShowAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <ErrorUI message="User data not found." />;
  }

  return (
    <div className="flex flex-col justify-start gap-y-6">
      <EmailNotVerifiedAlert />
      <PersonalInformationForm
        username={data.data.username}
        first_name={data.data.first_name}
        last_name={data.data.last_name}
        email={data.data.email}
        country={data.data.country}
        bio={data.data.bio}
      />
      <ChangePasswordForm />
    </div>
  );
}
