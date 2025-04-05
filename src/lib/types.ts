export type FollowNotificationData = {
  follower: {
    id: number
    username: string
    first_name: string
    last_name: string
  }
}

export type ArtworkLikeNotificationData = {
  liker: {
    id: number
    username: string
    first_name: string
    last_name: string
  }
  artwork: {
    id: number
    title: string
  }
}

export type ArtworkCommentNotificationData = {
  commenter: {
    id: number
    username: string
    first_name: string
    last_name: string
  }
  artwork: {
    id: number
    title: string
  }
  comment: {
    id: number
  }
}

export type ArtistVerificationResponseNotificationData = {
  id: number
  status: 'approved' | 'rejected'
  reason?: string
}

export type NotificationData =
  | FollowNotificationData
  | ArtworkLikeNotificationData
  | ArtworkCommentNotificationData
  | ArtistVerificationResponseNotificationData

export type NotificationDataItem = {
  id: string
  type:
    | 'artist-verification-response'
    | 'artwork-comment'
    | 'artwork-like'
    | 'follow'
  notifiable_type: string
  notifiable_id: number
  data: NotificationData
  read_at?: string
  created_at: string
  updated_at: string
}

export type NotificationItem = {
  id: string
  type:
    | 'artist-verification-response'
    | 'artwork-comment'
    | 'artwork-like'
    | 'follow'
  readAt: string | undefined
  createdAt: string
  updatedAt: string
  data: NotificationData
}

export type Tag =
  | 'painting'
  | 'graphic'
  | 'sculpture'
  | 'folk art'
  | 'textile'
  | 'ceramics'
  | 'stained glass windows'
  | 'beads'
  | 'paper'
  | 'glass'
  | 'dolls'
  | 'jewellery'
  | 'fresco'
  | 'metal'
  | 'mosaic'
