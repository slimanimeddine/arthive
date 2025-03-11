import { useShowUserReceivedLikesCount } from '@/api/artwork-likes/artwork-likes'
import { StarIcon } from '@heroicons/react/24/solid'
import { notFound } from 'next/navigation'

type TotalRatingsProps = {
  username: string
}

export function TotalRatings({ username }: TotalRatingsProps) {
  const likesCountTotalQuery = useShowUserReceivedLikesCount(username)

  if (likesCountTotalQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">Loading...</p>
  }

  if (likesCountTotalQuery.isError) {
    if (likesCountTotalQuery.error?.response?.status === 404) {
      notFound()
    }

    return (
      <div className="h-screen">
        <p className="mt-2 text-sm text-red-700">
          {likesCountTotalQuery.error?.response?.data.message}
        </p>
      </div>
    )
  }

  const likesCountTotalQueryData = likesCountTotalQuery.data!.data.data!

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-gray-900">Total ratings</h3>
      <div className="flex items-center gap-x-1">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <span className="text-sm text-gray-900 font-medium">
          {likesCountTotalQueryData}
        </span>
      </div>
    </div>
  )
}
