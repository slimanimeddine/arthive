import { useListUserReceivedLikesCountByTag } from '@/api/artwork-likes/artwork-likes'
import { HeartIcon } from '@heroicons/react/24/outline'
import { TotalRatings } from './total-ratings'
import { notFound } from 'next/navigation'

type RatingsByTagProps = {
  username: string
}

export function RatingsByTag({ username }: RatingsByTagProps) {
  const likesCountByTagQuery = useListUserReceivedLikesCountByTag(username)

  if (likesCountByTagQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">loading...</p>
  }

  if (likesCountByTagQuery.isError) {
    if (likesCountByTagQuery.error?.response?.status === 404) {
      notFound()
    }

    return (
      <div className="h-screen">
        <p className="mt-2 text-sm text-red-700">
          {likesCountByTagQuery.error?.response?.data.message}
        </p>
      </div>
    )
  }

  const likesCountByTagQueryData = likesCountByTagQuery.data!.data.data!

  const likesCountByTag = likesCountByTagQueryData.map((item) => ({
    tag: item.tag_name!,
    likesCount: item.total_likes!,
  }))

  return (
    <div>
      <TotalRatings username={username} />
      {likesCountByTagQuery.isSuccess &&
        likesCountByTagQueryData.length > 0 && (
          <dl className="mt-2">
            {likesCountByTag.map((item) => (
              <div
                key={item.tag}
                className="flex justify-between py-3 text-sm font-medium"
              >
                <dt className="text-gray-500">{item.tag}</dt>
                <div className="flex items-center gap-x-1">
                  <HeartIcon className="h-5 w-5" />
                  <span className="text-sm text-gray-900 font-medium">
                    {item.likesCount}
                  </span>
                </div>
              </div>
            ))}
          </dl>
        )}
    </div>
  )
}
