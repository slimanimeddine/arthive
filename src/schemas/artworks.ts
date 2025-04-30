import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_WORDS,
  MIN_WORDS,
} from '@/lib/constants'
import { z as zod } from 'zod'

/**
 * Create a new artwork
 * @summary Create Artwork
 */
export const createArtworkBody = zod.object({
  title: zod
    .string()
    .min(3, {
      message: 'Title is too short',
    })
    .max(255),
  description: zod.string().refine(
    (value) => {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount > MIN_WORDS && wordCount <= MAX_WORDS
    },
    {
      message: `Description's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
    }
  ),
  tags: zod
    .array(
      zod.enum([
        'painting',
        'graphic',
        'sculpture',
        'folk art',
        'textile',
        'ceramics',
        'stained glass windows',
        'beads',
        'paper',
        'glass',
        'dolls',
        'jewellery',
        'fresco',
        'metal',
        'mosaic',
      ])
    )
    .min(1, {
      message: 'At least one tag is required',
    })
    .max(3, {
      message: 'A maximum of 3 tags are allowed',
    })
    .refine((tags) => new Set(tags).size === tags.length, {
      message: 'Tags must be unique', // Custom error message for duplicate tags
    }),
  photos: zod
    .object({
      file: zod
        .instanceof(Blob)
        .refine((f) => f.size < MAX_FILE_SIZE, '5 MB is the max upload size.')
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported.'
        ),
      is_main: zod.boolean(),
    })
    .array()
    .min(1)
    .max(10),
})

/**
 * Update an artwork draft
 * @summary Update Artwork Draft
 */
export const updateArtworkDraftBody = zod.object({
  title: zod
    .string()
    .min(3, {
      message: 'Title is too short',
    })
    .max(255)
    .optional(),
  description: zod
    .string()
    .min(1, {
      message: 'Description cannot be empty',
    })
    .optional()
    .refine(
      (value) => {
        if (!value) return true
        const wordCount = value.trim().split(/\s+/).length
        return wordCount > MIN_WORDS && wordCount <= MAX_WORDS
      },
      {
        message: `Description's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
      }
    ),
  tags: zod
    .array(
      zod.enum([
        'painting',
        'graphic',
        'sculpture',
        'folk art',
        'textile',
        'ceramics',
        'stained glass windows',
        'beads',
        'paper',
        'glass',
        'dolls',
        'jewellery',
        'fresco',
        'metal',
        'mosaic',
      ])
    )
    .min(1, {
      message: 'At least one tag is required',
    })
    .max(3, {
      message: 'A maximum of 3 tags are allowed',
    })
    .refine((tags) => new Set(tags).size === tags.length, {
      message: 'Tags must be unique', // Custom error message for duplicate tags
    })
    .optional(),
})
