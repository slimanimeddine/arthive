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

export type CheckIfAuthenticatedUserIsLiking200 = SuccessApiResponse<boolean>
export type CheckIfAuthenticatedUserIsLiking401 = UnauthenticatedApiResponse
export type CheckIfAuthenticatedUserIsLiking404 = NotFoundApiResponse

export type LikeArtwork200 = ApiResource<ArtworkLikeModel>
export type LikeArtwork401 = UnauthenticatedApiResponse
export type LikeArtwork403 = UnauthorizedApiResponse
export type LikeArtwork404 = NotFoundApiResponse

export type ListUserReceivedLikesCountByTag200 = SuccessApiResponse<
  {
    tag_name: string
    total_likes: number
  }[]
>
export type ListUserReceivedLikesCountByTag404 = NotFoundApiResponse

export type ShowUserReceivedLikesCount200 = SuccessApiResponse<number>
export type ShowUserReceivedLikesCount404 = NotFoundApiResponse

export type UnlikeArtwork200 = NoContentApiResponse
export type UnlikeArtwork401 = UnauthenticatedApiResponse
export type UnlikeArtwork403 = UnauthorizedApiResponse
export type UnlikeArtwork404 = NotFoundApiResponse

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
import { ArtworkLikeModel } from '@/types/models/artwork-like'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve the number of likes an artist has received by tag
 * @summary List User Received Likes Count by Tag
 */
export const listUserReceivedLikesCountByTag = (
  username: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListUserReceivedLikesCountByTag200>(
    {
      url: `/api/v1/users/${username}/artwork-likes/received/count/by-tag`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getListUserReceivedLikesCountByTagQueryKey = (
  username: string
) => {
  return [
    `/api/v1/users/${username}/artwork-likes/received/count/by-tag`,
  ] as const
}

export const getListUserReceivedLikesCountByTagQueryOptions = <
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
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
    getListUserReceivedLikesCountByTagQueryKey(username)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>
  > = ({ signal }) =>
    listUserReceivedLikesCountByTag(username, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListUserReceivedLikesCountByTagQueryResult = NonNullable<
  Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>
>
export type ListUserReceivedLikesCountByTagQueryError =
  ErrorType<ListUserReceivedLikesCountByTag404>

export function useListUserReceivedLikesCountByTag<
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  username: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
          TError,
          Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserReceivedLikesCountByTag<
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
          TError,
          Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserReceivedLikesCountByTag<
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
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
 * @summary List User Received Likes Count by Tag
 */

export function useListUserReceivedLikesCountByTag<
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
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
  const queryOptions = getListUserReceivedLikesCountByTagQueryOptions(
    username,
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
 * @summary List User Received Likes Count by Tag
 */
export const prefetchListUserReceivedLikesCountByTag = async <
  TData = Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
  TError = ErrorType<ListUserReceivedLikesCountByTag404>,
>(
  queryClient: QueryClient,
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserReceivedLikesCountByTag>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListUserReceivedLikesCountByTagQueryOptions(
    username,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve the total number of likes an artist has received
 * @summary Show User Received Likes Count
 */
export const showUserReceivedLikesCount = (
  username: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowUserReceivedLikesCount200>(
    {
      url: `/api/v1/users/${username}/artwork-likes/received/count`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getShowUserReceivedLikesCountQueryKey = (username: string) => {
  return [`/api/v1/users/${username}/artwork-likes/received/count`] as const
}

export const getShowUserReceivedLikesCountQueryOptions = <
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getShowUserReceivedLikesCountQueryKey(username)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showUserReceivedLikesCount>>
  > = ({ signal }) =>
    showUserReceivedLikesCount(username, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowUserReceivedLikesCountQueryResult = NonNullable<
  Awaited<ReturnType<typeof showUserReceivedLikesCount>>
>
export type ShowUserReceivedLikesCountQueryError =
  ErrorType<ShowUserReceivedLikesCount404>

export function useShowUserReceivedLikesCount<
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  username: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
          TError,
          Awaited<ReturnType<typeof showUserReceivedLikesCount>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowUserReceivedLikesCount<
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
          TError,
          Awaited<ReturnType<typeof showUserReceivedLikesCount>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowUserReceivedLikesCount<
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
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
 * @summary Show User Received Likes Count
 */

export function useShowUserReceivedLikesCount<
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
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
  const queryOptions = getShowUserReceivedLikesCountQueryOptions(
    username,
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
 * @summary Show User Received Likes Count
 */
export const prefetchShowUserReceivedLikesCount = async <
  TData = Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
  TError = ErrorType<ShowUserReceivedLikesCount404>,
>(
  queryClient: QueryClient,
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showUserReceivedLikesCount>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowUserReceivedLikesCountQueryOptions(
    username,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Like an artwork
 * @summary Like Artwork
 */
export const likeArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<LikeArtwork200>(
    {
      url: `/api/v1/artworks/${artworkId}/artwork-likes`,
      method: 'POST',
      signal,
    },
    options
  )
}

export const getLikeArtworkMutationOptions = <
  TError = ErrorType<LikeArtwork401 | LikeArtwork403 | LikeArtwork404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof likeArtwork>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof likeArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['likeArtwork']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof likeArtwork>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return likeArtwork(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type LikeArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof likeArtwork>>
>

export type LikeArtworkMutationError = ErrorType<
  LikeArtwork401 | LikeArtwork403 | LikeArtwork404
>

/**
 * @summary Like Artwork
 */
export const useLikeArtwork = <
  TError = ErrorType<LikeArtwork401 | LikeArtwork403 | LikeArtwork404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof likeArtwork>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof likeArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getLikeArtworkMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Unlike an artwork
 * @summary Unlike Artwork
 */
export const unlikeArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UnlikeArtwork200>(
    { url: `/api/v1/artworks/${artworkId}/artwork-likes`, method: 'DELETE' },
    options
  )
}

export const getUnlikeArtworkMutationOptions = <
  TError = ErrorType<UnlikeArtwork401 | UnlikeArtwork403 | UnlikeArtwork404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof unlikeArtwork>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof unlikeArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['unlikeArtwork']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof unlikeArtwork>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return unlikeArtwork(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UnlikeArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof unlikeArtwork>>
>

export type UnlikeArtworkMutationError = ErrorType<
  UnlikeArtwork401 | UnlikeArtwork403 | UnlikeArtwork404
>

/**
 * @summary Unlike Artwork
 */
export const useUnlikeArtwork = <
  TError = ErrorType<UnlikeArtwork401 | UnlikeArtwork403 | UnlikeArtwork404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof unlikeArtwork>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof unlikeArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getUnlikeArtworkMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Check if the currently authenticated user is liking an artwork
 * @summary Check if Authenticated User is Liking
 */
export const checkIfAuthenticatedUserIsLiking = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CheckIfAuthenticatedUserIsLiking200>(
    { url: `/api/v1/artworks/${artworkId}/is-liking`, method: 'GET', signal },
    options
  )
}

export const getCheckIfAuthenticatedUserIsLikingQueryKey = (
  artworkId: string
) => {
  return [`/api/v1/artworks/${artworkId}/is-liking`] as const
}

export const getCheckIfAuthenticatedUserIsLikingQueryOptions = <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
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
    getCheckIfAuthenticatedUserIsLikingQueryKey(artworkId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>
  > = ({ signal }) =>
    checkIfAuthenticatedUserIsLiking(artworkId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artworkId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type CheckIfAuthenticatedUserIsLikingQueryResult = NonNullable<
  Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>
>
export type CheckIfAuthenticatedUserIsLikingQueryError = ErrorType<
  CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
>

export function useCheckIfAuthenticatedUserIsLiking<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  artworkId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsLiking<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsLiking<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
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
 * @summary Check if Authenticated User is Liking
 */

export function useCheckIfAuthenticatedUserIsLiking<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
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
  const queryOptions = getCheckIfAuthenticatedUserIsLikingQueryOptions(
    artworkId,
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
 * @summary Check if Authenticated User is Liking
 */
export const prefetchCheckIfAuthenticatedUserIsLiking = async <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
  TError = ErrorType<
    CheckIfAuthenticatedUserIsLiking401 | CheckIfAuthenticatedUserIsLiking404
  >,
>(
  queryClient: QueryClient,
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsLiking>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getCheckIfAuthenticatedUserIsLikingQueryOptions(
    artworkId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
