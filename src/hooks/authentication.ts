import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

type AdminSignIn200 = SignIn200
type AdminSignIn401 = UnauthenticatedApiResponse
type AdminSignInBody = SignInBody
type ChangePassword200 = NoContentApiResponse
type ChangePassword401 = UnauthenticatedApiResponse
type ChangePassword422 = ErrorApiResponse<422>
type ChangePasswordBody = z.infer<typeof changePasswordBody>
type DeleteUser200 = NoContentApiResponse
type DeleteUser401 = UnauthenticatedApiResponse
type ResetPassword200 = NoContentApiResponse
type ResetPassword400 = ErrorApiResponse
type ResetPassword404 = NotFoundApiResponse
type ResetPasswordBody = z.infer<typeof resetPasswordBody>
type SendEmailVerificationCode200 = NoContentApiResponse
type SendEmailVerificationCode400 = ErrorApiResponse
type SendEmailVerificationCode401 = UnauthenticatedApiResponse
type SendForgotPasswordCode200 = NoContentApiResponse
type SendForgotPasswordCodeBody = z.infer<typeof sendForgotPasswordCodeBody>
type SignIn200 = SuccessApiResponse<{
  token: string
  id: string
}>
type SignIn401 = UnauthenticatedApiResponse
type SignInBody = z.infer<typeof signInBody>
type SignOut200 = NoContentApiResponse
type SignOut401 = UnauthenticatedApiResponse
type SignUp200 = NoContentApiResponse
type SignUpBody = z.infer<typeof signUpBody>
type VerifyEmailCode200 = NoContentApiResponse
type VerifyEmailCode400 = ErrorApiResponse
type VerifyEmailCode401 = UnauthenticatedApiResponse
type VerifyEmailCodeBody = z.infer<typeof verifyEmailCodeBody>
type VerifyForgotPasswordCode200 = SuccessApiResponse<{
  token: string
}>
type VerifyForgotPasswordCode400 = ErrorApiResponse
type VerifyForgotPasswordCode404 = NotFoundApiResponse
type VerifyForgotPasswordCodeBody = z.infer<typeof verifyForgotPasswordCodeBody>

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import {
  ErrorApiResponse,
  NoContentApiResponse,
  NotFoundApiResponse,
  SuccessApiResponse,
  UnauthenticatedApiResponse,
} from '@/types/api-responses'
import { z } from 'zod'
import {
  changePasswordBody,
  resetPasswordBody,
  sendForgotPasswordCodeBody,
  signInBody,
  signUpBody,
  verifyEmailCodeBody,
  verifyForgotPasswordCodeBody,
} from '@/schemas/authentication'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Creates a new user
 * @summary Sign Up
 */
export const signUp = (
  signUpBody: BodyType<SignUpBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SignUp200>(
    {
      url: `/api/v1/sign-up`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signUpBody,
      signal,
    },
    options
  )
}

export const getSignUpMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signUp>>,
    TError,
    { data: BodyType<SignUpBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof signUp>>,
  TError,
  { data: BodyType<SignUpBody> },
  TContext
> => {
  const mutationKey = ['signUp']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signUp>>,
    { data: BodyType<SignUpBody> }
  > = (props) => {
    const { data } = props ?? {}

    return signUp(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SignUpMutationResult = NonNullable<
  Awaited<ReturnType<typeof signUp>>
>
export type SignUpMutationBody = BodyType<SignUpBody>
export type SignUpMutationError = ErrorType<unknown>

/**
 * @summary Sign Up
 */
export const useSignUp = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof signUp>>,
      TError,
      { data: BodyType<SignUpBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof signUp>>,
  TError,
  { data: BodyType<SignUpBody> },
  TContext
> => {
  const mutationOptions = getSignUpMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Signs in a user and returns an auth token
 * @summary Sign In
 */
export const signIn = (
  signInBody: BodyType<SignInBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SignIn200>(
    {
      url: `/api/v1/sign-in`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signInBody,
      signal,
    },
    options
  )
}

export const getSignInMutationOptions = <
  TError = ErrorType<SignIn401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signIn>>,
    TError,
    { data: BodyType<SignInBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof signIn>>,
  TError,
  { data: BodyType<SignInBody> },
  TContext
> => {
  const mutationKey = ['signIn']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signIn>>,
    { data: BodyType<SignInBody> }
  > = (props) => {
    const { data } = props ?? {}

    return signIn(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof signIn>>
>
export type SignInMutationBody = BodyType<SignInBody>
export type SignInMutationError = ErrorType<SignIn401>

/**
 * @summary Sign In
 */
export const useSignIn = <TError = ErrorType<SignIn401>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof signIn>>,
      TError,
      { data: BodyType<SignInBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof signIn>>,
  TError,
  { data: BodyType<SignInBody> },
  TContext
> => {
  const mutationOptions = getSignInMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Signs out a user and deletes the auth token
 * @summary Sign Out
 */
export const signOut = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SignOut200>(
    { url: `/api/v1/sign-out`, method: 'POST', signal },
    options
  )
}

export const getSignOutMutationOptions = <
  TError = ErrorType<SignOut401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signOut>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof signOut>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['signOut']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signOut>>,
    void
  > = () => {
    return signOut(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SignOutMutationResult = NonNullable<
  Awaited<ReturnType<typeof signOut>>
>

export type SignOutMutationError = ErrorType<SignOut401>

/**
 * @summary Sign Out
 */
export const useSignOut = <TError = ErrorType<SignOut401>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof signOut>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof signOut>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getSignOutMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePassword = (
  changePasswordBody: BodyType<ChangePasswordBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ChangePassword200>(
    {
      url: `/api/v1/change-password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: changePasswordBody,
      signal,
    },
    options
  )
}

export const getChangePasswordMutationOptions = <
  TError = ErrorType<ChangePassword401 | ChangePassword422>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof changePassword>>,
    TError,
    { data: BodyType<ChangePasswordBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof changePassword>>,
  TError,
  { data: BodyType<ChangePasswordBody> },
  TContext
> => {
  const mutationKey = ['changePassword']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof changePassword>>,
    { data: BodyType<ChangePasswordBody> }
  > = (props) => {
    const { data } = props ?? {}

    return changePassword(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ChangePasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof changePassword>>
>
export type ChangePasswordMutationBody = BodyType<ChangePasswordBody>
export type ChangePasswordMutationError = ErrorType<
  ChangePassword401 | ChangePassword422
>

/**
 * @summary Change Password
 */
export const useChangePassword = <
  TError = ErrorType<ChangePassword401 | ChangePassword422>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof changePassword>>,
      TError,
      { data: BodyType<ChangePasswordBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof changePassword>>,
  TError,
  { data: BodyType<ChangePasswordBody> },
  TContext
> => {
  const mutationOptions = getChangePasswordMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Sends a verification code to the authenticated user's email
 * @summary Send Email Verification Code
 */
export const sendEmailVerificationCode = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SendEmailVerificationCode200>(
    { url: `/api/v1/email-verification/send`, method: 'POST', signal },
    options
  )
}

export const getSendEmailVerificationCodeMutationOptions = <
  TError = ErrorType<
    SendEmailVerificationCode400 | SendEmailVerificationCode401
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendEmailVerificationCode>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof sendEmailVerificationCode>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['sendEmailVerificationCode']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof sendEmailVerificationCode>>,
    void
  > = () => {
    return sendEmailVerificationCode(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SendEmailVerificationCodeMutationResult = NonNullable<
  Awaited<ReturnType<typeof sendEmailVerificationCode>>
>

export type SendEmailVerificationCodeMutationError = ErrorType<
  SendEmailVerificationCode400 | SendEmailVerificationCode401
>

/**
 * @summary Send Email Verification Code
 */
export const useSendEmailVerificationCode = <
  TError = ErrorType<
    SendEmailVerificationCode400 | SendEmailVerificationCode401
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof sendEmailVerificationCode>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof sendEmailVerificationCode>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getSendEmailVerificationCodeMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Verifies the email verification code
 * @summary Verify Email Code
 */
export const verifyEmailCode = (
  verifyEmailCodeBody: BodyType<VerifyEmailCodeBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<VerifyEmailCode200>(
    {
      url: `/api/v1/email-verification/verify`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: verifyEmailCodeBody,
      signal,
    },
    options
  )
}

export const getVerifyEmailCodeMutationOptions = <
  TError = ErrorType<VerifyEmailCode400 | VerifyEmailCode401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyEmailCode>>,
    TError,
    { data: BodyType<VerifyEmailCodeBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof verifyEmailCode>>,
  TError,
  { data: BodyType<VerifyEmailCodeBody> },
  TContext
> => {
  const mutationKey = ['verifyEmailCode']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof verifyEmailCode>>,
    { data: BodyType<VerifyEmailCodeBody> }
  > = (props) => {
    const { data } = props ?? {}

    return verifyEmailCode(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type VerifyEmailCodeMutationResult = NonNullable<
  Awaited<ReturnType<typeof verifyEmailCode>>
>
export type VerifyEmailCodeMutationBody = BodyType<VerifyEmailCodeBody>
export type VerifyEmailCodeMutationError = ErrorType<
  VerifyEmailCode400 | VerifyEmailCode401
>

/**
 * @summary Verify Email Code
 */
export const useVerifyEmailCode = <
  TError = ErrorType<VerifyEmailCode400 | VerifyEmailCode401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof verifyEmailCode>>,
      TError,
      { data: BodyType<VerifyEmailCodeBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof verifyEmailCode>>,
  TError,
  { data: BodyType<VerifyEmailCodeBody> },
  TContext
> => {
  const mutationOptions = getVerifyEmailCodeMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Sends a forgot password code to the user's email
 * @summary Send Forgot Password Code
 */
export const sendForgotPasswordCode = (
  sendForgotPasswordCodeBody: BodyType<SendForgotPasswordCodeBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SendForgotPasswordCode200>(
    {
      url: `/api/v1/forgot-password-code/send`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: sendForgotPasswordCodeBody,
      signal,
    },
    options
  )
}

export const getSendForgotPasswordCodeMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendForgotPasswordCode>>,
    TError,
    { data: BodyType<SendForgotPasswordCodeBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof sendForgotPasswordCode>>,
  TError,
  { data: BodyType<SendForgotPasswordCodeBody> },
  TContext
> => {
  const mutationKey = ['sendForgotPasswordCode']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof sendForgotPasswordCode>>,
    { data: BodyType<SendForgotPasswordCodeBody> }
  > = (props) => {
    const { data } = props ?? {}

    return sendForgotPasswordCode(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SendForgotPasswordCodeMutationResult = NonNullable<
  Awaited<ReturnType<typeof sendForgotPasswordCode>>
>
export type SendForgotPasswordCodeMutationBody =
  BodyType<SendForgotPasswordCodeBody>
export type SendForgotPasswordCodeMutationError = ErrorType<unknown>

/**
 * @summary Send Forgot Password Code
 */
export const useSendForgotPasswordCode = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof sendForgotPasswordCode>>,
      TError,
      { data: BodyType<SendForgotPasswordCodeBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof sendForgotPasswordCode>>,
  TError,
  { data: BodyType<SendForgotPasswordCodeBody> },
  TContext
> => {
  const mutationOptions = getSendForgotPasswordCodeMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Verifies the forgot password code sent to the user's email
 * @summary Verify Forgot Password Code
 */
export const verifyForgotPasswordCode = (
  verifyForgotPasswordCodeBody: BodyType<VerifyForgotPasswordCodeBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<VerifyForgotPasswordCode200>(
    {
      url: `/api/v1/forgot-password-code/verify`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: verifyForgotPasswordCodeBody,
      signal,
    },
    options
  )
}

export const getVerifyForgotPasswordCodeMutationOptions = <
  TError = ErrorType<VerifyForgotPasswordCode400 | VerifyForgotPasswordCode404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyForgotPasswordCode>>,
    TError,
    { data: BodyType<VerifyForgotPasswordCodeBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof verifyForgotPasswordCode>>,
  TError,
  { data: BodyType<VerifyForgotPasswordCodeBody> },
  TContext
> => {
  const mutationKey = ['verifyForgotPasswordCode']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof verifyForgotPasswordCode>>,
    { data: BodyType<VerifyForgotPasswordCodeBody> }
  > = (props) => {
    const { data } = props ?? {}

    return verifyForgotPasswordCode(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type VerifyForgotPasswordCodeMutationResult = NonNullable<
  Awaited<ReturnType<typeof verifyForgotPasswordCode>>
>
export type VerifyForgotPasswordCodeMutationBody =
  BodyType<VerifyForgotPasswordCodeBody>
export type VerifyForgotPasswordCodeMutationError = ErrorType<
  VerifyForgotPasswordCode400 | VerifyForgotPasswordCode404
>

/**
 * @summary Verify Forgot Password Code
 */
export const useVerifyForgotPasswordCode = <
  TError = ErrorType<VerifyForgotPasswordCode400 | VerifyForgotPasswordCode404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof verifyForgotPasswordCode>>,
      TError,
      { data: BodyType<VerifyForgotPasswordCodeBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof verifyForgotPasswordCode>>,
  TError,
  { data: BodyType<VerifyForgotPasswordCodeBody> },
  TContext
> => {
  const mutationOptions = getVerifyForgotPasswordCodeMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Resets the user's password
 * @summary Reset Password
 */
export const resetPassword = (
  resetPasswordBody: BodyType<ResetPasswordBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ResetPassword200>(
    {
      url: `/api/v1/password/reset`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: resetPasswordBody,
      signal,
    },
    options
  )
}

export const getResetPasswordMutationOptions = <
  TError = ErrorType<ResetPassword400 | ResetPassword404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof resetPassword>>,
    TError,
    { data: BodyType<ResetPasswordBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof resetPassword>>,
  TError,
  { data: BodyType<ResetPasswordBody> },
  TContext
> => {
  const mutationKey = ['resetPassword']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof resetPassword>>,
    { data: BodyType<ResetPasswordBody> }
  > = (props) => {
    const { data } = props ?? {}

    return resetPassword(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ResetPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof resetPassword>>
>
export type ResetPasswordMutationBody = BodyType<ResetPasswordBody>
export type ResetPasswordMutationError = ErrorType<
  ResetPassword400 | ResetPassword404
>

/**
 * @summary Reset Password
 */
export const useResetPassword = <
  TError = ErrorType<ResetPassword400 | ResetPassword404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof resetPassword>>,
      TError,
      { data: BodyType<ResetPasswordBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof resetPassword>>,
  TError,
  { data: BodyType<ResetPasswordBody> },
  TContext
> => {
  const mutationOptions = getResetPasswordMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUser = (
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteUser200>(
    { url: `/api/v1/users/me`, method: 'DELETE' },
    options
  )
}

export const getDeleteUserMutationOptions = <
  TError = ErrorType<DeleteUser401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUser>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['deleteUser']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteUser>>,
    void
  > = () => {
    return deleteUser(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteUser>>
>

export type DeleteUserMutationError = ErrorType<DeleteUser401>

/**
 * @summary Delete User
 */
export const useDeleteUser = <
  TError = ErrorType<DeleteUser401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteUser>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getDeleteUserMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Signs in an admin user and returns an auth token
 * @summary Admin Sign In
 */
export const adminSignIn = (
  adminSignInBody: BodyType<AdminSignInBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<AdminSignIn200>(
    {
      url: `/api/v1/admin/sign-in`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminSignInBody,
      signal,
    },
    options
  )
}

export const getAdminSignInMutationOptions = <
  TError = ErrorType<AdminSignIn401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminSignIn>>,
    TError,
    { data: BodyType<AdminSignInBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminSignIn>>,
  TError,
  { data: BodyType<AdminSignInBody> },
  TContext
> => {
  const mutationKey = ['adminSignIn']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminSignIn>>,
    { data: BodyType<AdminSignInBody> }
  > = (props) => {
    const { data } = props ?? {}

    return adminSignIn(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AdminSignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminSignIn>>
>
export type AdminSignInMutationBody = BodyType<AdminSignInBody>
export type AdminSignInMutationError = ErrorType<AdminSignIn401>

/**
 * @summary Admin Sign In
 */
export const useAdminSignIn = <
  TError = ErrorType<AdminSignIn401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof adminSignIn>>,
      TError,
      { data: BodyType<AdminSignInBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof adminSignIn>>,
  TError,
  { data: BodyType<AdminSignInBody> },
  TContext
> => {
  const mutationOptions = getAdminSignInMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
