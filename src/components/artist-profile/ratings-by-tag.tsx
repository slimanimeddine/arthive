import { HeartIcon } from '@heroicons/react/24/outline'
import TotalRatings from './total-ratings'
import { matchQueryStatus } from '@/lib/utils'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'
import { useListUserReceivedLikesCountByTag } from '@/hooks/artwork-likes'

type RatingsByTagProps = {
  username: string
}

export default function RatingsByTag({ username }: RatingsByTagProps) {
  const likesCountByTagQuery = useListUserReceivedLikesCountByTag(username)

  return matchQueryStatus(likesCountByTagQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      const likesCountByTagQueryData = data.data

      const likesCountByTag = likesCountByTagQueryData.map((item) => ({
        tag: item.tag_name,
        likesCount: item.total_likes,
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
    },
  })
}
