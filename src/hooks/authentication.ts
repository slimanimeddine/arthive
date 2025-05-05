import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export type SignUp200 = NoContentApiResponse
export type SignUpBody = z.infer<typeof signUpBody>

export type SignIn200 = SuccessApiResponse<{
  token: string
  id: string
}>
export type SignIn401 = ErrorApiResponse<401>
export type SignInBody = z.infer<typeof signInBody>

export type AdminSignIn200 = SignIn200
export type AdminSignIn401 = SignIn401
export type AdminSignInBody = SignInBody

export type SignOut200 = NoContentApiResponse
export type SignOut401 = UnauthenticatedApiResponse

export type ChangePassword200 = NoContentApiResponse
export type ChangePassword401 = UnauthenticatedApiResponse
export type ChangePassword422 = ErrorApiResponse<422>
export type ChangePasswordBody = z.infer<typeof changePasswordBody>

export type DeleteUser200 = NoContentApiResponse
export type DeleteUser401 = UnauthenticatedApiResponse
export type DeleteUser400 = ErrorApiResponse
export type DeleteUserBody = z.infer<typeof deleteUserBody>

export type ResendEmailVerification200 = NoContentApiResponse
export type ResendEmailVerification401 = UnauthenticatedApiResponse

export type VerifyEmail200 = NoContentApiResponse
export type VerifyEmail401 = UnauthenticatedApiResponse
export type VerifyEmail403 = UnauthorizedApiResponse

import type { BodyType, ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  changePasswordBody,
  deleteUserBody,
  signInBody,
  signUpBody,
} from '@/schemas/authentication'
import {
  ErrorApiResponse,
  NoContentApiResponse,
  SuccessApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { z } from 'zod'

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

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUser = (
  deleteUserBody: BodyType<DeleteUserBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteUser200>(
    {
      url: `/api/v1/users/me`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      data: deleteUserBody,
    },
    options
  )
}

export const getDeleteUserMutationOptions = <
  TError = ErrorType<DeleteUser400 | DeleteUser401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUser>>,
    TError,
    { data: BodyType<DeleteUserBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  { data: BodyType<DeleteUserBody> },
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
    { data: BodyType<DeleteUserBody> }
  > = (props) => {
    const { data } = props ?? {}

    return deleteUser(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteUser>>
>
export type DeleteUserMutationBody = BodyType<DeleteUserBody>
export type DeleteUserMutationError = ErrorType<DeleteUser400 | DeleteUser401>

/**
 * @summary Delete User
 */
export const useDeleteUser = <
  TError = ErrorType<DeleteUser400 | DeleteUser401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteUser>>,
      TError,
      { data: BodyType<DeleteUserBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  { data: BodyType<DeleteUserBody> },
  TContext
> => {
  const mutationOptions = getDeleteUserMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Verifies the email of the authenticated user
 * @summary Verify Email
 */
export const verifyEmail = (
  id: string,
  hash: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<VerifyEmail200>(
    { url: `/api/v1/email/verify/${id}/${hash}`, method: 'POST', signal },
    options
  )
}

export const getVerifyEmailMutationOptions = <
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyEmail>>,
    TError,
    { id: string; hash: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof verifyEmail>>,
  TError,
  { id: string; hash: string },
  TContext
> => {
  const mutationKey = ['verifyEmail']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof verifyEmail>>,
    { id: string; hash: string }
  > = (props) => {
    const { id, hash } = props ?? {}

    return verifyEmail(id, hash, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type VerifyEmailMutationResult = NonNullable<
  Awaited<ReturnType<typeof verifyEmail>>
>

export type VerifyEmailMutationError = ErrorType<
  VerifyEmail401 | VerifyEmail403
>

/**
 * @summary Verify Email
 */
export const useVerifyEmail = <
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof verifyEmail>>,
      TError,
      { id: string; hash: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof verifyEmail>>,
  TError,
  { id: string; hash: string },
  TContext
> => {
  const mutationOptions = getVerifyEmailMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Resends the email verification notification to the authenticated user
 * @summary Resend Email Verification
 */
export const resendEmailVerification = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ResendEmailVerification200>(
    { url: `/api/v1/email/verification-notification`, method: 'POST', signal },
    options
  )
}

export const getResendEmailVerificationMutationOptions = <
  TError = ErrorType<ResendEmailVerification401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof resendEmailVerification>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof resendEmailVerification>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['resendEmailVerification']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof resendEmailVerification>>,
    void
  > = () => {
    return resendEmailVerification(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ResendEmailVerificationMutationResult = NonNullable<
  Awaited<ReturnType<typeof resendEmailVerification>>
>

export type ResendEmailVerificationMutationError =
  ErrorType<ResendEmailVerification401>

/**
 * @summary Resend Email Verification
 */
export const useResendEmailVerification = <
  TError = ErrorType<ResendEmailVerification401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof resendEmailVerification>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof resendEmailVerification>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getResendEmailVerificationMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
