import { Artwork } from './artwork'
import { BaseModel } from './base'

export type ArtworkPhotoModel = BaseModel & {
  path: string
  is_main: 1 | 0
  artwork_id: string
}

export type ArtworkPhoto = ArtworkPhotoModel & {
  artwork: Artwork
}
