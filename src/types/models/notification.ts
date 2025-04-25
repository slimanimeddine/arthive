export type FollowNotificationData = {
  follower: {
    id: string
    username: string
    first_name: string
    last_name: string
  }
}

export type ArtworkLikeNotificationData = {
  liker: {
    id: string
    username: string
    first_name: string
    last_name: string
  }
  artwork: {
    id: string
    title: string
  }
}

export type ArtworkCommentNotificationData = {
  commenter: {
    id: string
    username: string
    first_name: string
    last_name: string
  }
  artwork: {
    id: string
    title: string
  }
  comment: {
    id: string
  }
}

export type ArtistVerificationResponseNotificationData = {
  id: string
  status: 'approved' | 'rejected'
  reason?: string
}

export type ArtistVerificationRequestNotificationData = {
  user: {
    id: string
    username: string
    first_name: string
    last_name: string
  }
}

export type NotificationData =
  | FollowNotificationData
  | ArtworkLikeNotificationData
  | ArtworkCommentNotificationData
  | ArtistVerificationResponseNotificationData
  | ArtistVerificationRequestNotificationData

export type NotificationType =
  | 'artist-verification-response'
  | 'artwork-comment'
  | 'artwork-like'
  | 'follow'
  | 'artist-verification-request'

export type NotificationItem = {
  id: string
  type: NotificationType
  readAt: string | undefined
  createdAt: string
  updatedAt: string
  data: NotificationData
}
