import { useShowUserReceivedLikesCount } from "@/hooks/endpoints/artwork-likes";
import { StarIcon } from "@heroicons/react/24/solid";
import LoadingUI from "../loading-ui";
import { notFound } from "next/navigation";

type TotalRatingsProps = {
  username: string;
};

export default function TotalRatings({ username }: TotalRatingsProps) {
  const { isPending, isError, data, error } =
    useShowUserReceivedLikesCount(username);

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    if (error.isAxiosError && error.response?.status === 404) {
      notFound();
    }
  }

  if (data === undefined) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-gray-900">Total ratings</h3>
      <div className="flex items-center gap-x-1">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <span className="text-sm font-medium text-gray-900">{data.data}</span>
      </div>
    </div>
  );
}
