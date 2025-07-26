"use client";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import LoadingUI from "./loading-ui";
import ErrorUI from "./error-ui";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { authHeader, matchQueryStatus, onError } from "@/lib/utils";
import { useResendEmailVerification } from "@/hooks/endpoints/authentication";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/session";

export default function EmailNotVerifiedAlert() {
  const { token } = useSession();
  const authConfig = authHeader(token);
  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authConfig);
  const resendEmailVerificationMutation =
    useResendEmailVerification(authConfig);

  function handleResendEmailVerification() {
    resendEmailVerificationMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success("Verification email sent successfully!");
      },
    });
  }

  const isDisabled = resendEmailVerificationMutation.isPending || !token;

  return matchQueryStatus(showAuthenticatedUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <span></span>,
    Success: ({ data }) => {
      if (data.data.email_verified_at) {
        return <span></span>;
      }
      return (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                aria-hidden="true"
                className="h-5 w-5 text-blue-400"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Your email address is not verified.
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <button
                  type="button"
                  onClick={handleResendEmailVerification}
                  disabled={isDisabled}
                  className="font-medium whitespace-nowrap text-blue-700 hover:text-blue-600"
                >
                  Send verification email
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    },
  });
}
