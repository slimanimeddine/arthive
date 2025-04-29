import { NotificationItem } from '@/types/models/notification'
import ArtistVerificationResponseNotification from './artist-verification-response notification'
import ArtworkCommentNotification from './artwork-comment-notification'
import ArtworkLikeNotification from './artwork-like-notification'
import FollowNotification from './follow-notification'

type NotificationProps = {
  token: string
  notification: NotificationItem
}

export default function Notification({
  token,
  notification,
}: NotificationProps) {
  if (notification.type === 'follow' && 'follower' in notification.data) {
    return (
      <FollowNotification
        token={token}
        id={notification.id}
        username={notification.data.follower.username}
        fullName={`${notification.data.follower.first_name} ${notification.data.follower.last_name}`}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    )
  }

  if (notification.type === 'artwork-like' && 'liker' in notification.data) {
    return (
      <ArtworkLikeNotification
        token={token}
        id={notification.id}
        likerUsername={notification.data.liker.username}
        likerFullName={`${notification.data.liker.first_name} ${notification.data.liker.last_name}`}
        artworkId={notification.data.artwork.id}
        artworkTitle={notification.data.artwork.title}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    )
  }

  if (
    notification.type === 'artwork-comment' &&
    'commenter' in notification.data
  ) {
    return (
      <ArtworkCommentNotification
        token={token}
        id={notification.id}
        commenterUsername={notification.data.commenter.username}
        commenterFullName={`${notification.data.commenter.first_name} ${notification.data.commenter.last_name}`}
        artworkId={notification.data.artwork.id}
        commentId={notification.data.comment.id}
        artworkTitle={notification.data.artwork.title}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    )
  }

  if (
    notification.type === 'artist-verification-response' &&
    'status' in notification.data
  ) {
    return (
      <ArtistVerificationResponseNotification
        token={token}
        notificationId={notification.id}
        id={notification.data.id}
        reason={notification.data.reason}
        status={notification.data.status}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    )
  }

  return <></>
}
