import { Artwork } from './artwork'
import { BaseModel } from './base'
import { User } from './user'

export type ArtworkLikeModel = BaseModel & {
  artwork_id: string
  user_id: string
}

export type ArtworkLike = ArtworkLikeModel & {
  artwork: Artwork
  user: User
}
