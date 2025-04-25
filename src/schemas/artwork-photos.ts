import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants'
import { z as zod } from 'zod'

/**
 * Upload photos to an artwork draft
 * @summary Upload Artwork Photos
 */
export const uploadArtworkPhotosBody = zod.object({
  photos: zod
    .instanceof(File)
    .refine((f) => f.size < MAX_FILE_SIZE, '5 MB is the max upload size.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .array()
    .min(1)
    .max(10),
})

/**
 * Replace the path of an artwork photo
 * @summary Replace Artwork Photo Path
 */
export const replaceArtworkPhotoPathBody = zod.object({
  photo: zod
    .instanceof(File)
    .refine((f) => f.size < MAX_FILE_SIZE, '5 MB is the max upload size.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})
