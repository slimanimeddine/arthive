import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_WORDS,
  MIN_WORDS,
} from "@/lib/constants";
import { z } from "zod";

/**
 * Update the currently authenticated user
 * @summary Update Authenticated User
 */
export const updateAuthenticatedUserBody = z.object({
  username: z
    .string()
    .min(3)
    .max(255)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, dashes, and underscores",
    )
    .optional(),
  first_name: z
    .string()
    .max(255)
    .regex(/^[A-Za-z]+$/, "First name can only contain letters")
    .optional(),
  last_name: z
    .string()
    .max(255)
    .regex(/^[A-Za-z]+$/, "Last name can only contain letters")

    .optional(),
  email: z.email().optional(),
  country: z.string().optional(),
  bio: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount > MIN_WORDS && wordCount <= MAX_WORDS;
      },
      {
        message: `Bio's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
      },
    ),
  photo: z
    .instanceof(File)
    .refine((f) => f.size < MAX_FILE_SIZE, "5 MB is the max upload size.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
});
