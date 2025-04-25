import { Artwork } from './artwork'
import { BaseModel } from './base'
import { User } from './user'

export type FavoriteModel = BaseModel & {
  artwork_id: string
  user_id: string
}

export type Favorite = FavoriteModel & {
  user: User
  artwork: Artwork
}
