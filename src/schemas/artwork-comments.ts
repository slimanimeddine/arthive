import { MAX_WORDS } from "@/lib/constants";
import { z } from "zod";

/**
 * Post a comment on an artwork
 * @summary Post Artwork Comment
 */
export const postArtworkCommentBody = z.object({
  comment_text: z
    .string()
    .min(1, {
      message: "Comment text must not be empty.",
    })
    .refine(
      (value) => {
        if (!value) return true;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= MAX_WORDS;
      },
      {
        message: `Comment's words' count must not exceed ${MAX_WORDS} words.`,
      },
    ),
});

/**
 * Update a comment on an artwork
 * @summary Update Artwork Comment
 */
export const updateArtworkCommentBody = z.object({
  comment_text: z.string().refine(
    (value) => {
      if (!value) return true;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount <= MAX_WORDS;
    },
    {
      message: `Comment's words' count must not exceed ${MAX_WORDS} words.`,
    },
  ),
});
