import { z as zod } from 'zod'

/**
 * Creates a new user
 * @summary Sign Up
 */
export const signUpBody = zod
  .object({
    username: zod
      .string()
      .min(3)
      .max(255)
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, dashes, and underscores'
      ),
    email: zod.string().email(),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['password_confirmation'],
    }
  )

/**
 * Signs in a user and returns an auth token
 * @summary Sign In
 */
export const signInBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
})

/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePasswordBody = zod
  .object({
    current_password: zod.string().min(8),
    new_password: zod.string().min(8),
    new_password_confirmation: zod.string().min(8),
  })
  .refine(
    (value) => {
      return value.new_password === value.new_password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['password_confirmation'],
    }
  )

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUserBody = zod.object({
  password: zod.string().min(8),
})

/**
 * Sends a password reset link to the user's email
 * @summary Send Password Reset Link
 */
export const sendPasswordResetLinkBody = zod.object({
  email: zod.string().email(),
})

/**
 * Resets the password of the user
 * @summary Reset Password
 */
export const resetPasswordBody = zod
  .object({
    token: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['password_confirmation'],
    }
  )
