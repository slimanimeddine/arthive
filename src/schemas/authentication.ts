import { z } from "zod";

/**
 * Create a session cookie
 */
export const sessionCookieSchema = z.object({
  id: z.uuid(),
  token: z.string().regex(/^\d\|[A-Za-z0-9]{48}$/),
});

/**
 * Creates a new user
 * @summary Sign Up
 */
export const signUpBody = z
  .object({
    username: z
      .string()
      .min(3)
      .max(255)
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, dashes, and underscores",
      ),
    email: z.email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation;
    },
    {
      message: "Passwords does not match.",
      path: ["password_confirmation"],
    },
  );

/**
 * Signs in a user and returns an auth token
 * @summary Sign In
 */
export const signInBody = z.object({
  email: z.email(),
  password: z.string().min(8),
});

/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePasswordBody = z
  .object({
    current_password: z.string().min(8),
    new_password: z.string().min(8),
    new_password_confirmation: z.string().min(8),
  })
  .refine(
    (value) => {
      return value.new_password === value.new_password_confirmation;
    },
    {
      message: "Passwords does not match.",
      path: ["password_confirmation"],
    },
  );

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUserBody = z.object({
  password: z.string().min(8),
});

/**
 * Sends a password reset link to the user's email
 * @summary Send Password Reset Link
 */
export const sendPasswordResetLinkBody = z.object({
  email: z.email(),
});

/**
 * Resets the password of the user
 * @summary Reset Password
 */
export const resetPasswordBody = z
  .object({
    token: z.string(),
    email: z.email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation;
    },
    {
      message: "Passwords does not match.",
      path: ["password_confirmation"],
    },
  );
