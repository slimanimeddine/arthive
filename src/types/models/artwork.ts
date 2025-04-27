import { ArtworkComment } from './artwork-comment'
import { ArtworkLike } from './artwork-like'
import { ArtworkPhoto } from './artwork-photo'
import { BaseModel } from './base'
import { Tag } from './tag'
import { User } from './user'

export type ArtworkModel = BaseModel & {
  title: string
  description: string
  status: 'draft' | 'published'
  user_id: string
  artwork_likes_count: number
  artwork_comments_count: number
  artwork_main_photo_path: string
}

export type Artwork = ArtworkModel & {
  user: User
  artwork_photos: ArtworkPhoto[]
  artwork_comments: ArtworkComment[]
  artwork_likes: ArtworkLike[]
  tags: Tag[]
}
