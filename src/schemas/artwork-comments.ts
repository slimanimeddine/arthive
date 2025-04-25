import { MAX_WORDS } from '@/lib/constants'
import { z as zod } from 'zod'

/**
 * Post a comment on an artwork
 * @summary Post Artwork Comment
 */
export const postArtworkCommentBody = zod.object({
  comment_text: zod
    .string()
    .min(1, {
      message: 'Comment text must not be empty.',
    })
    .refine(
      (value) => {
        if (!value) return true
        const wordCount = value.trim().split(/\s+/).length
        return wordCount <= MAX_WORDS
      },
      {
        message: `Comment's words' count must not exceed ${MAX_WORDS} words.`,
      }
    ),
})

/**
 * Update a comment on an artwork
 * @summary Update Artwork Comment
 */
export const updateArtworkCommentBody = zod.object({
  comment_text: zod.string().refine(
    (value) => {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount <= MAX_WORDS
    },
    {
      message: `Comment's words' count must not exceed ${MAX_WORDS} words.`,
    }
  ),
})
