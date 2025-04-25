import { Artwork } from './artwork'
import { BaseModel } from './base'
import { Tag } from './tag'

export type ArtworkTagModel = BaseModel & {
  artwork_id: string
  tag_id: string
}

export type ArtworkTag = ArtworkTagModel & {
  artwork: Artwork
  tag: Tag
}
