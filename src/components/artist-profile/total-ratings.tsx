import { useShowUserReceivedLikesCount } from '@/hooks/artwork-likes'
import { matchQueryStatus } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/24/solid'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import EmptyUI from '../empty-ui'

type TotalRatingsProps = {
  username: string
}

export default function TotalRatings({ username }: TotalRatingsProps) {
  const likesCountTotalQuery = useShowUserReceivedLikesCount(username)

  return matchQueryStatus(likesCountTotalQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI />,
    Empty: <EmptyUI />,
    Success: ({ data }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Total ratings</h3>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-gray-900 font-medium">
              {data.data}
            </span>
          </div>
        </div>
      )
    },
  })
}
