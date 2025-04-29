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

export type CheckIfAuthenticatedUserIsFavoriting200 =
  SuccessApiResponse<boolean>
export type CheckIfAuthenticatedUserIsFavoriting401 = UnauthenticatedApiResponse
export type CheckIfAuthenticatedUserIsFavoriting404 = NotFoundApiResponse

export type ListAuthenticatedUserFavoriteArtworks200 = ApiResource<
  ArtworkModel[]
>
export type ListAuthenticatedUserFavoriteArtworks401 =
  UnauthenticatedApiResponse

export type MarkArtworkAsFavorite200 = ApiResource<FavoriteModel>
export type MarkArtworkAsFavorite401 = UnauthenticatedApiResponse
export type MarkArtworkAsFavorite403 = UnauthorizedApiResponse
export type MarkArtworkAsFavorite404 = NotFoundApiResponse

export type RemoveArtworkFromFavorites200 = NoContentApiResponse
export type RemoveArtworkFromFavorites401 = UnauthenticatedApiResponse
export type RemoveArtworkFromFavorites403 = UnauthorizedApiResponse
export type RemoveArtworkFromFavorites404 = NotFoundApiResponse

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
import { ArtworkModel } from '@/types/models/artwork'
import { FavoriteModel } from '@/types/models/favorite'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of artworks favorites by the currently authenticated user
 * @summary List Authenticated User Favorite Artworks
 */
export const listAuthenticatedUserFavoriteArtworks = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserFavoriteArtworks200>(
    { url: `/api/v1/users/me/favorites/artworks`, method: 'GET', signal },
    options
  )
}

export const getListAuthenticatedUserFavoriteArtworksQueryKey = () => {
  return [`/api/v1/users/me/favorites/artworks`] as const
}

export const getListAuthenticatedUserFavoriteArtworksQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListAuthenticatedUserFavoriteArtworksQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>
  > = ({ signal }) =>
    listAuthenticatedUserFavoriteArtworks(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListAuthenticatedUserFavoriteArtworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>
>
export type ListAuthenticatedUserFavoriteArtworksQueryError =
  ErrorType<ListAuthenticatedUserFavoriteArtworks401>

export function useListAuthenticatedUserFavoriteArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFavoriteArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserFavoriteArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
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
 * @summary List Authenticated User Favorite Artworks
 */

export function useListAuthenticatedUserFavoriteArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
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
  const queryOptions =
    getListAuthenticatedUserFavoriteArtworksQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Authenticated User Favorite Artworks
 */
export const prefetchListAuthenticatedUserFavoriteArtworks = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
  TError = ErrorType<ListAuthenticatedUserFavoriteArtworks401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserFavoriteArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions =
    getListAuthenticatedUserFavoriteArtworksQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Mark an artwork as favorite
 * @summary Mark Artwork As Favorite
 */
export const markArtworkAsFavorite = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<MarkArtworkAsFavorite200>(
    { url: `/api/v1/artworks/${artworkId}/favorites`, method: 'POST', signal },
    options
  )
}

export const getMarkArtworkAsFavoriteMutationOptions = <
  TError = ErrorType<
    | MarkArtworkAsFavorite401
    | MarkArtworkAsFavorite403
    | MarkArtworkAsFavorite404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof markArtworkAsFavorite>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof markArtworkAsFavorite>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['markArtworkAsFavorite']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof markArtworkAsFavorite>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return markArtworkAsFavorite(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type MarkArtworkAsFavoriteMutationResult = NonNullable<
  Awaited<ReturnType<typeof markArtworkAsFavorite>>
>

export type MarkArtworkAsFavoriteMutationError = ErrorType<
  MarkArtworkAsFavorite401 | MarkArtworkAsFavorite403 | MarkArtworkAsFavorite404
>

/**
 * @summary Mark Artwork As Favorite
 */
export const useMarkArtworkAsFavorite = <
  TError = ErrorType<
    | MarkArtworkAsFavorite401
    | MarkArtworkAsFavorite403
    | MarkArtworkAsFavorite404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof markArtworkAsFavorite>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof markArtworkAsFavorite>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getMarkArtworkAsFavoriteMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Remove an artwork from favorites
 * @summary Remove Artwork From Favorites
 */
export const removeArtworkFromFavorites = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<RemoveArtworkFromFavorites200>(
    { url: `/api/v1/artworks/${artworkId}/favorites`, method: 'DELETE' },
    options
  )
}

export const getRemoveArtworkFromFavoritesMutationOptions = <
  TError = ErrorType<
    | RemoveArtworkFromFavorites401
    | RemoveArtworkFromFavorites403
    | RemoveArtworkFromFavorites404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof removeArtworkFromFavorites>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof removeArtworkFromFavorites>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['removeArtworkFromFavorites']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof removeArtworkFromFavorites>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return removeArtworkFromFavorites(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type RemoveArtworkFromFavoritesMutationResult = NonNullable<
  Awaited<ReturnType<typeof removeArtworkFromFavorites>>
>

export type RemoveArtworkFromFavoritesMutationError = ErrorType<
  | RemoveArtworkFromFavorites401
  | RemoveArtworkFromFavorites403
  | RemoveArtworkFromFavorites404
>

/**
 * @summary Remove Artwork From Favorites
 */
export const useRemoveArtworkFromFavorites = <
  TError = ErrorType<
    | RemoveArtworkFromFavorites401
    | RemoveArtworkFromFavorites403
    | RemoveArtworkFromFavorites404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof removeArtworkFromFavorites>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof removeArtworkFromFavorites>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getRemoveArtworkFromFavoritesMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Check if the currently authenticated user is favoriting an artwork
 * @summary Check if Authenticated User is Favoriting
 */
export const checkIfAuthenticatedUserIsFavoriting = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CheckIfAuthenticatedUserIsFavoriting200>(
    {
      url: `/api/v1/artworks/${artworkId}/favorites/is-favoriting`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getCheckIfAuthenticatedUserIsFavoritingQueryKey = (
  artworkId: string
) => {
  return [`/api/v1/artworks/${artworkId}/favorites/is-favoriting`] as const
}

export const getCheckIfAuthenticatedUserIsFavoritingQueryOptions = <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
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
    getCheckIfAuthenticatedUserIsFavoritingQueryKey(artworkId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>
  > = ({ signal }) =>
    checkIfAuthenticatedUserIsFavoriting(artworkId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artworkId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type CheckIfAuthenticatedUserIsFavoritingQueryResult = NonNullable<
  Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>
>
export type CheckIfAuthenticatedUserIsFavoritingQueryError = ErrorType<
  | CheckIfAuthenticatedUserIsFavoriting401
  | CheckIfAuthenticatedUserIsFavoriting404
>

export function useCheckIfAuthenticatedUserIsFavoriting<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  artworkId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsFavoriting<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
          TError,
          Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfAuthenticatedUserIsFavoriting<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
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
 * @summary Check if Authenticated User is Favoriting
 */

export function useCheckIfAuthenticatedUserIsFavoriting<
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
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
  const queryOptions = getCheckIfAuthenticatedUserIsFavoritingQueryOptions(
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
 * @summary Check if Authenticated User is Favoriting
 */
export const prefetchCheckIfAuthenticatedUserIsFavoriting = async <
  TData = Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
  TError = ErrorType<
    | CheckIfAuthenticatedUserIsFavoriting401
    | CheckIfAuthenticatedUserIsFavoriting404
  >,
>(
  queryClient: QueryClient,
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfAuthenticatedUserIsFavoriting>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getCheckIfAuthenticatedUserIsFavoritingQueryOptions(
    artworkId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
