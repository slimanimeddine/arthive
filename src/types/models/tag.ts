import { Artwork } from './artwork'
import { BaseModel } from './base'

export type TagModel = BaseModel & {
  name: string
}

export type Tag = TagModel & {
  artworks: Artwork[]
}
