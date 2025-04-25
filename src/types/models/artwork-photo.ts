import { Artwork } from './artwork'
import { BaseModel } from './base'

export type ArtworkPhotoModel = BaseModel & {
  path: string
  is_main: boolean
  artwork_id: string
}

export type ArtworkPhoto = ArtworkPhotoModel & {
  artwork: Artwork
}
