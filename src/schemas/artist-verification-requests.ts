import { z } from "zod";
import { MAX_WORDS, MIN_WORDS } from "@/lib/constants";

export const reviewArtistVerificationRequestBody = z.discriminatedUnion(
  "status",
  [
    z.object({
      status: z.literal("approved"),
    }),
    z.object({
      status: z.literal("rejected"),
      reason: z.string().refine(
        (value) => {
          if (!value) return true;
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount > MIN_WORDS && wordCount <= MAX_WORDS;
        },
        {
          message: `Rejection reason's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
        },
      ),
    }),
  ],
);
