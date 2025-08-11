"use client";

import { useListUserReceivedLikesCountByTag } from "@/hooks/endpoints/artwork-likes";
import { HeartIcon } from "@heroicons/react/24/outline";
import ErrorUI from "../error-ui";
import LoadingUI from "../loading-ui";
import TotalRatings from "./total-ratings";
import { notFound } from "next/navigation";

type RatingsByTagProps = {
  username: string;
};

export default function RatingsByTag({ username }: RatingsByTagProps) {
  const { isPending, isError, data, error } =
    useListUserReceivedLikesCountByTag(username);
  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    if (error.isAxiosError && error.response?.status === 404) {
      notFound();
    }

    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <></>;
  }

  const likesCountByTag = data.data.map((item) => ({
    tag: item.tag_name,
    likesCount: item.total_likes,
  }));

  return (
    <div>
      <TotalRatings username={username} />
      <dl className="mt-2">
        {likesCountByTag.map((item) => (
          <div
            key={item.tag}
            className="flex justify-between py-3 text-sm font-medium"
          >
            <dt className="text-gray-500">{item.tag}</dt>
            <div className="flex items-center gap-x-1">
              <HeartIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-900">
                {item.likesCount}
              </span>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
