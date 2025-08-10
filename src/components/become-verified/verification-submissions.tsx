"use client";
import { useGetAuthenticatedUserArtistVerificationRequests } from "@/hooks/endpoints/artist-verification-requests";
import { addOrdinalSuffix, authHeader, classNames } from "@/lib/utils";
import LoadingUI from "../loading-ui";
import ErrorUI from "../error-ui";
import EmptyUI from "../empty-ui";
import RejectionReasonModal from "./rejection-reason-modal";
import { useSession } from "@/hooks/session";

function statusClass(status: "pending" | "approved" | "rejected") {
  switch (status) {
    case "pending":
      return "text-yellow-800 bg-yellow-50 ring-yellow-600/20";
    case "approved":
      return "text-green-700 bg-green-50 ring-green-600/20";
    case "rejected":
      return "text-red-700 bg-red-50 ring-red-600/20";
    default:
      return "";
  }
}

export default function VerificationSubmissions() {
  const { token } = useSession()!;
  const { isPending, isError, data, error } =
    useGetAuthenticatedUserArtistVerificationRequests(authHeader(token));

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (data === undefined || data.data.length === 0) {
    return (
      <EmptyUI message={"You have not submitted any verification requests."} />
    );
  }

  const submissions = data.data.map((submission) => ({
    id: submission.id,
    status: submission.status,
    created_at: submission.created_at,
    reason: submission.reason,
  }));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-x-1 text-2xl font-bold tracking-tight text-gray-900">
            Verification Submission History
          </h2>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {submissions.map((submission, index) => (
            <li
              key={submission.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm leading-6 font-semibold text-gray-900">
                    {addOrdinalSuffix(index + 1)} Submission
                  </p>
                  <p
                    className={classNames(
                      statusClass(submission.status),
                      "mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
                    )}
                  >
                    {submission.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Submitted on{" "}
                    <time dateTime={submission.created_at}>
                      {submission.created_at}
                    </time>
                  </p>
                </div>
              </div>
              {submission.status === "rejected" && submission.reason && (
                <RejectionReasonModal reason={submission.reason} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
