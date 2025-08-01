import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export type SignUp200 = NoContentApiResponse;
export type SignUpBody = z.infer<typeof signUpBody>;

export type SignIn200 = SuccessApiResponse<{
  token: string;
  id: string;
}>;
export type SignIn401 = ErrorApiResponse<401>;
export type SignInBody = z.infer<typeof signInBody>;

export type AdminSignIn200 = SignIn200;
export type AdminSignIn401 = SignIn401;
export type AdminSignInBody = SignInBody;

export type SignOut200 = NoContentApiResponse;
export type SignOut401 = UnauthenticatedApiResponse;

export type ChangePassword200 = NoContentApiResponse;
export type ChangePassword401 = UnauthenticatedApiResponse;
export type ChangePassword422 = ErrorApiResponse<422>;
export type ChangePasswordBody = z.infer<typeof changePasswordBody>;

export type DeleteUser200 = NoContentApiResponse;
export type DeleteUser401 = UnauthenticatedApiResponse;
export type DeleteUser400 = ErrorApiResponse;
export type DeleteUserBody = z.infer<typeof deleteUserBody>;

export type ResendEmailVerification200 = NoContentApiResponse;
export type ResendEmailVerification401 = UnauthenticatedApiResponse;

export type VerifyEmail200 = NoContentApiResponse;
export type VerifyEmail401 = UnauthenticatedApiResponse;
export type VerifyEmail403 = UnauthorizedApiResponse;
export type VerifyEmailParams = {
  expires: string;
  signature: string;
};

export type ResetPassword200 = NoContentApiResponse;
export type ResetPassword400 = ErrorApiResponse;
export type ResetPasswordBody = z.infer<typeof resetPasswordBody>;

export type SendPasswordResetLink200 = NoContentApiResponse;
export type SendPasswordResetLink400 = ErrorApiResponse;
export type SendPasswordResetLinkBody = z.infer<
  typeof sendPasswordResetLinkBody
>;

import type { BodyType, ErrorType } from "@/lib/axios";
import { customInstance } from "@/lib/axios";
import {
  type changePasswordBody,
  type deleteUserBody,
  type resetPasswordBody,
  type sendPasswordResetLinkBody,
  type signInBody,
  type signUpBody,
} from "@/schemas/authentication";
import {
  type ErrorApiResponse,
  type NoContentApiResponse,
  type SuccessApiResponse,
  type UnauthenticatedApiResponse,
  type UnauthorizedApiResponse,
} from "@/types/api-responses";
import { type z } from "zod";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * Creates a new user
 * @summary Sign Up
 */
export const signUp = (
  signUpBody: BodyType<SignUpBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<SignUp200>(
    {
      url: `/api/v1/sign-up`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: signUpBody,
      signal,
    },
    options,
  );
};

export const getSignUpMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signUp>>,
    TError,
    { data: BodyType<SignUpBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof signUp>>,
  TError,
  { data: BodyType<SignUpBody> },
  TContext
> => {
  const mutationKey = ["signUp"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signUp>>,
    { data: BodyType<SignUpBody> }
  > = (props) => {
    const { data } = props ?? {};

    return signUp(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SignUpMutationResult = NonNullable<
  Awaited<ReturnType<typeof signUp>>
>;
export type SignUpMutationBody = BodyType<SignUpBody>;
export type SignUpMutationError = ErrorType<unknown>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof signUp>>,
  TError,
  { data: BodyType<SignUpBody> },
  TContext
> => {
  const mutationOptions = getSignUpMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Signs in a user and returns an auth token
 * @summary Sign In
 */
export const signIn = (
  signInBody: BodyType<SignInBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<SignIn200>(
    {
      url: `/api/v1/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: signInBody,
      signal,
    },
    options,
  );
};

export const getSignInMutationOptions = <
  TError = ErrorType<SignIn401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signIn>>,
    TError,
    { data: BodyType<SignInBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof signIn>>,
  TError,
  { data: BodyType<SignInBody> },
  TContext
> => {
  const mutationKey = ["signIn"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signIn>>,
    { data: BodyType<SignInBody> }
  > = (props) => {
    const { data } = props ?? {};

    return signIn(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof signIn>>
>;
export type SignInMutationBody = BodyType<SignInBody>;
export type SignInMutationError = ErrorType<SignIn401>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof signIn>>,
  TError,
  { data: BodyType<SignInBody> },
  TContext
> => {
  const mutationOptions = getSignInMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Signs out a user and deletes the auth token
 * @summary Sign Out
 */
export const signOut = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<SignOut200>(
    { url: `/api/v1/sign-out`, method: "POST", signal },
    options,
  );
};

export const getSignOutMutationOptions = <
  TError = ErrorType<SignOut401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signOut>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof signOut>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ["signOut"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signOut>>,
    void
  > = () => {
    return signOut(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SignOutMutationResult = NonNullable<
  Awaited<ReturnType<typeof signOut>>
>;

export type SignOutMutationError = ErrorType<SignOut401>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof signOut>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getSignOutMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePassword = (
  changePasswordBody: BodyType<ChangePasswordBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ChangePassword200>(
    {
      url: `/api/v1/change-password`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: changePasswordBody,
      signal,
    },
    options,
  );
};

export const getChangePasswordMutationOptions = <
  TError = ErrorType<ChangePassword401 | ChangePassword422>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof changePassword>>,
    TError,
    { data: BodyType<ChangePasswordBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof changePassword>>,
  TError,
  { data: BodyType<ChangePasswordBody> },
  TContext
> => {
  const mutationKey = ["changePassword"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof changePassword>>,
    { data: BodyType<ChangePasswordBody> }
  > = (props) => {
    const { data } = props ?? {};

    return changePassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ChangePasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof changePassword>>
>;
export type ChangePasswordMutationBody = BodyType<ChangePasswordBody>;
export type ChangePasswordMutationError = ErrorType<
  ChangePassword401 | ChangePassword422
>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof changePassword>>,
  TError,
  { data: BodyType<ChangePasswordBody> },
  TContext
> => {
  const mutationOptions = getChangePasswordMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Signs in an admin user and returns an auth token
 * @summary Admin Sign In
 */
export const adminSignIn = (
  adminSignInBody: BodyType<AdminSignInBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<AdminSignIn200>(
    {
      url: `/api/v1/admin/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: adminSignInBody,
      signal,
    },
    options,
  );
};

export const getAdminSignInMutationOptions = <
  TError = ErrorType<AdminSignIn401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminSignIn>>,
    TError,
    { data: BodyType<AdminSignInBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminSignIn>>,
  TError,
  { data: BodyType<AdminSignInBody> },
  TContext
> => {
  const mutationKey = ["adminSignIn"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminSignIn>>,
    { data: BodyType<AdminSignInBody> }
  > = (props) => {
    const { data } = props ?? {};

    return adminSignIn(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminSignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminSignIn>>
>;
export type AdminSignInMutationBody = BodyType<AdminSignInBody>;
export type AdminSignInMutationError = ErrorType<AdminSignIn401>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof adminSignIn>>,
  TError,
  { data: BodyType<AdminSignInBody> },
  TContext
> => {
  const mutationOptions = getAdminSignInMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUser = (
  deleteUserBody: BodyType<DeleteUserBody>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<DeleteUser200>(
    {
      url: `/api/v1/users/me`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: deleteUserBody,
    },
    options,
  );
};

export const getDeleteUserMutationOptions = <
  TError = ErrorType<DeleteUser400 | DeleteUser401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUser>>,
    TError,
    { data: BodyType<DeleteUserBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  { data: BodyType<DeleteUserBody> },
  TContext
> => {
  const mutationKey = ["deleteUser"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteUser>>,
    { data: BodyType<DeleteUserBody> }
  > = (props) => {
    const { data } = props ?? {};

    return deleteUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteUser>>
>;
export type DeleteUserMutationBody = BodyType<DeleteUserBody>;
export type DeleteUserMutationError = ErrorType<DeleteUser400 | DeleteUser401>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteUser>>,
  TError,
  { data: BodyType<DeleteUserBody> },
  TContext
> => {
  const mutationOptions = getDeleteUserMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Verifies the email of the authenticated user
 * @summary Verify Email
 */
export const verifyEmail = (
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<VerifyEmail200>(
    {
      url: `/api/v1/email/verify/${id}/${hash}`,
      method: "GET",
      params,
      signal,
    },
    options,
  );
};

export const getVerifyEmailQueryKey = (
  id: string,
  hash: string,
  params?: VerifyEmailParams,
) => {
  return [
    `/api/v1/email/verify/${id}/${hash}`,
    ...(params ? [params] : []),
  ] as const;
};

export const getVerifyEmailQueryOptions = <
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getVerifyEmailQueryKey(id, hash, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof verifyEmail>>> = ({
    signal,
  }) => verifyEmail(id, hash, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(id && hash),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof verifyEmail>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type VerifyEmailQueryResult = NonNullable<
  Awaited<ReturnType<typeof verifyEmail>>
>;
export type VerifyEmailQueryError = ErrorType<VerifyEmail401 | VerifyEmail403>;

export function useVerifyEmail<
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  id: string,
  hash: string,
  params: undefined | VerifyEmailParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof verifyEmail>>,
          TError,
          Awaited<ReturnType<typeof verifyEmail>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useVerifyEmail<
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof verifyEmail>>,
          TError,
          Awaited<ReturnType<typeof verifyEmail>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useVerifyEmail<
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Verify Email
 */

export function useVerifyEmail<
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getVerifyEmailQueryOptions(id, hash, params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Verify Email
 */
export const prefetchVerifyEmailQuery = async <
  TData = Awaited<ReturnType<typeof verifyEmail>>,
  TError = ErrorType<VerifyEmail401 | VerifyEmail403>,
>(
  queryClient: QueryClient,
  id: string,
  hash: string,
  params?: VerifyEmailParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getVerifyEmailQueryOptions(id, hash, params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Resends the email verification notification to the authenticated user
 * @summary Resend Email Verification
 */
export const resendEmailVerification = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ResendEmailVerification200>(
    { url: `/api/v1/email/verification-notification`, method: "POST", signal },
    options,
  );
};

export const getResendEmailVerificationMutationOptions = <
  TError = ErrorType<ResendEmailVerification401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof resendEmailVerification>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof resendEmailVerification>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ["resendEmailVerification"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof resendEmailVerification>>,
    void
  > = () => {
    return resendEmailVerification(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ResendEmailVerificationMutationResult = NonNullable<
  Awaited<ReturnType<typeof resendEmailVerification>>
>;

export type ResendEmailVerificationMutationError =
  ErrorType<ResendEmailVerification401>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof resendEmailVerification>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getResendEmailVerificationMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Sends a password reset link to the user's email
 * @summary Send Password Reset Link
 */
export const sendPasswordResetLink = (
  sendPasswordResetLinkBody: BodyType<SendPasswordResetLinkBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<SendPasswordResetLink200>(
    {
      url: `/api/v1/forgot-password`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: sendPasswordResetLinkBody,
      signal,
    },
    options,
  );
};

export const getSendPasswordResetLinkMutationOptions = <
  TError = ErrorType<SendPasswordResetLink400>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendPasswordResetLink>>,
    TError,
    { data: BodyType<SendPasswordResetLinkBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof sendPasswordResetLink>>,
  TError,
  { data: BodyType<SendPasswordResetLinkBody> },
  TContext
> => {
  const mutationKey = ["sendPasswordResetLink"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof sendPasswordResetLink>>,
    { data: BodyType<SendPasswordResetLinkBody> }
  > = (props) => {
    const { data } = props ?? {};

    return sendPasswordResetLink(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SendPasswordResetLinkMutationResult = NonNullable<
  Awaited<ReturnType<typeof sendPasswordResetLink>>
>;
export type SendPasswordResetLinkMutationBody =
  BodyType<SendPasswordResetLinkBody>;
export type SendPasswordResetLinkMutationError = ErrorType<string>;

/**
 * @summary Send Password Reset Link
 */
export const useSendPasswordResetLink = <
  TError = ErrorType<string>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof sendPasswordResetLink>>,
      TError,
      { data: BodyType<SendPasswordResetLinkBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof sendPasswordResetLink>>,
  TError,
  { data: BodyType<SendPasswordResetLinkBody> },
  TContext
> => {
  const mutationOptions = getSendPasswordResetLinkMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Resets the password of the user
 * @summary Reset Password
 */
export const resetPassword = (
  resetPasswordBody: BodyType<ResetPasswordBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ResetPassword200>(
    {
      url: `/api/v1/reset-password`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: resetPasswordBody,
      signal,
    },
    options,
  );
};

export const getResetPasswordMutationOptions = <
  TError = ErrorType<ResetPassword400>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof resetPassword>>,
    TError,
    { data: BodyType<ResetPasswordBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof resetPassword>>,
  TError,
  { data: BodyType<ResetPasswordBody> },
  TContext
> => {
  const mutationKey = ["resetPassword"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof resetPassword>>,
    { data: BodyType<ResetPasswordBody> }
  > = (props) => {
    const { data } = props ?? {};

    return resetPassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ResetPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof resetPassword>>
>;
export type ResetPasswordMutationBody = BodyType<ResetPasswordBody>;
export type ResetPasswordMutationError = ErrorType<string>;

/**
 * @summary Reset Password
 */
export const useResetPassword = <
  TError = ErrorType<string>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof resetPassword>>,
      TError,
      { data: BodyType<ResetPasswordBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof resetPassword>>,
  TError,
  { data: BodyType<ResetPasswordBody> },
  TContext
> => {
  const mutationOptions = getResetPasswordMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
