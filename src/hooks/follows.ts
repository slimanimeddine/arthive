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
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'

export type CheckIfAuthenticatedUserIsFollowing200 = SuccessApiResponse<boolean>
export type CheckIfAuthenticatedUserIsFollowing401 = UnauthenticatedApiResponse
export type CheckIfAuthenticatedUserIsFollowing404 = NotFoundApiResponse

export type FollowUser200 = ApiResource<FollowModel>
export type FollowUser401 = UnauthenticatedApiResponse
export type FollowUser403 = UnauthorizedApiResponse
export type FollowUser404 = NotFoundApiResponse

export type ListAuthenticatedUserFollowers200 = ApiResource<UserModel[]>
export type ListAuthenticatedUserFollowers401 = UnauthenticatedApiResponse

export type ListAuthenticatedUserFollowing200 = ApiResource<UserModel[]>
export type ListAuthenticatedUserFollowing401 = UnauthenticatedApiResponse

export type UnfollowUser200 = NoContentApiResponse
export type UnfollowUser401 = UnauthenticatedApiResponse
export type UnfollowUser403 = UnauthorizedApiResponse
export type UnfollowUser404 = NotFoundApiResponse

import type { ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  ApiResource,
  NoContentApiResponse,
  NotFoundApiResponse,
  SuccessApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { FollowModel } from '@/types/models/follow'
import { UserModel } from '@/types/models/user'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of users following the currently authenticated user
 * @summary List Authenticated User Followers
 */
export const listAuthenticatedUserFollowers = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserFollowers200>(
    { url: `/api/v1/users/me/follows/followers`, method: 'GET', signal },
    options
  )
}

export const getListAuthenticatedUserFollowersQueryKey = () => {
  return [`/api/v1/users/me/follows/followers`] as const
}

export const getListAuthenticatedUserFollowersQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListAuthenticatedUserFollowersQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>
  > = ({ signal }) => listAuthenticatedUserFollowers(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListAuthenticatedUserFollowersQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>
>
export type ListAuthenticatedUserFollowersQueryError =
  ErrorType<ListAuthenticatedUserFollowers401>

export function useListAuthenticatedUserFollowers<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFollowers<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFollowers<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Authenticated User Followers
 */

export function useListAuthenticatedUserFollowers<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListAuthenticatedUserFollowersQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Authenticated User Followers
 */
export const prefetchListAuthenticatedUserFollowers = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
  TError = ErrorType<ListAuthenticatedUserFollowers401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowers>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListAuthenticatedUserFollowersQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a list of users followed by the currently authenticated user
 * @summary List Authenticated User Following
 */
export const listAuthenticatedUserFollowing = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserFollowing200>(
    { url: `/api/v1/users/me/follows/following`, method: 'GET', signal },
    options
  )
}

export const getListAuthenticatedUserFollowingQueryKey = () => {
  return [`/api/v1/users/me/follows/following`] as const
}

export const getListAuthenticatedUserFollowingQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListAuthenticatedUserFollowingQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>
  > = ({ signal }) => listAuthenticatedUserFollowing(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListAuthenticatedUserFollowingQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>
>
export type ListAuthenticatedUserFollowingQueryError =
  ErrorType<ListAuthenticatedUserFollowing401>

export function useListAuthenticatedUserFollowing<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFollowing<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFollowing<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Authenticated User Following
 */

export function useListAuthenticatedUserFollowing<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListAuthenticatedUserFollowingQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Authenticated User Following
 */
export const prefetchListAuthenticatedUserFollowing = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
  TError = ErrorType<ListAuthenticatedUserFollowing401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListAuthenticatedUserFollowingQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Follow a user
 * @summary Follow User
 */
export const followUser = (
  userId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<FollowUser200>(
    { url: `/api/v1/follows/users/${userId}`, method: 'POST', signal },
    options
  )
}

export const getFollowUserMutationOptions = <
  TError = ErrorType<FollowUser401 | FollowUser403 | FollowUser404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof followUser>>,
    TError,
    { userId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof followUser>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationKey = ['followUser']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof followUser>>,
    { userId: string }
  > = (props) => {
    const { userId } = props ?? {}

    return followUser(userId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type FollowUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof followUser>>
>

export type FollowUserMutationError = ErrorType<
  FollowUser401 | FollowUser403 | FollowUser404
>

/**
 * @summary Follow User
 */
export const useFollowUser = <
  TError = ErrorType<FollowUser401 | FollowUser403 | FollowUser404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof followUser>>,
      TError,
      { userId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof followUser>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationOptions = getFollowUserMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Unfollow a user
 * @summary Unfollow User
 */
export const unfollowUser = (
  userId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UnfollowUser200>(
    { url: `/api/v1/follows/users/${userId}`, method: 'DELETE' },
    options
  )
}

export const getUnfollowUserMutationOptions = <
  TError = ErrorType<UnfollowUser401 | UnfollowUser403 | UnfollowUser404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof unfollowUser>>,
    TError,
    { userId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof unfollowUser>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationKey = ['unfollowUser']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof unfollowUser>>,
    { userId: string }
  > = (props) => {
    const { userId } = props ?? {}

    return unfollowUser(userId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UnfollowUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof unfollowUser>>
>

export type UnfollowUserMutationError = ErrorType<
  UnfollowUser401 | UnfollowUser403 | UnfollowUser404
>

/**
 * @summary Unfollow User
 */
export const useUnfollowUser = <
  TError = ErrorType<UnfollowUser401 | UnfollowUser403 | UnfollowUser404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof unfollowUser>>,
      TError,
      { userId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof unfollowUser>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationOptions = getUnfollowUserMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Check if the currently authenticated user is following a user
 * @summary Check if Authenticated User is Following
 */
export const checkIfAuthenticatedUserIsFollowing = (
  userId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CheckIfAuthenticatedUserIsFollowing200>(
    { url: `/api/v1/users/${userId}/is-following`, method: 'GET', signal },
    options
  )
}

export const getCheckIfAuthenticatedUserIsFollowingQueryKey = (
  userId: string
) => {
  return [`/api/v1/users/${userId}/is-following`] as const
}

export const getCheckIfAuthenticatedUserIsFollowingQueryOptions = <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ??
    getCheckIfAuthenticatedUserIsFollowingQueryKey(userId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>
  > = ({ signal }) =>
    checkIfAuthenticatedUserIsFollowing(userId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!userId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type CheckIfAuthenticatedUserIsFollowingQueryResult = NonNullable<
  Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>
>
export type CheckIfAuthenticatedUserIsFollowingQueryError = ErrorType<
  | CheckIfAuthenticatedUserIsFollowing401
  | CheckIfAuthenticatedUserIsFollowing404
>

export function useCheckIfAuthenticatedUserIsFollowing<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  userId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsFollowing<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsFollowing<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary Check if Authenticated User is Following
 */

export function useCheckIfAuthenticatedUserIsFollowing<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getCheckIfAuthenticatedUserIsFollowingQueryOptions(
    userId,
    options
  )

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Check if Authenticated User is Following
 */
export const prefetchCheckIfAuthenticatedUserIsFollowing = async <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFollowing401
    | CheckIfAuthenticatedUserIsFollowing404
  >,
>(
  queryClient: QueryClient,
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFollowing>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getCheckIfAuthenticatedUserIsFollowingQueryOptions(
    userId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
