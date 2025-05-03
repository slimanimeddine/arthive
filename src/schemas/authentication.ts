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
 * Verifies the email verification code
 * @summary Verify Email Code
 */
export const verifyEmailCodeBody = zod.object({
  code: zod.string().length(6),
})

/**
 * Sends a forgot password code to the user's email
 * @summary Send Forgot Password Code
 */
export const sendForgotPasswordCodeBody = zod.object({
  email: zod.string(),
})

/**
 * Verifies the forgot password code sent to the user's email
 * @summary Verify Forgot Password Code
 */
export const verifyForgotPasswordCodeBody = zod.object({
  email: zod.string().email(),
  code: zod.string().length(6),
})

/**
 * Resets the user's password
 * @summary Reset Password
 */
export const resetPasswordBody = zod
  .object({
    email: zod.string().email(),
    new_password: zod.string().min(8),
    new_password_confirmation: zod.string().min(8),
    token: zod.string().describe('The password reset token.'),
  })
  .refine(
    (value) => {
      return value.new_password === value.new_password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['new_password_confirmation'],
    }
  )

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUserBody = zod.object({
  password: zod.string().min(8),
})
