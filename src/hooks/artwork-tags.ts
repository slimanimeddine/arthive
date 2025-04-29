import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export type ListTags200 = ApiResource<TagModel>

export type ListUserArtworkTags200 = SuccessApiResponse<
  {
    id: string
    name: string
  }[]
>
export type ListUserArtworkTags404 = NotFoundApiResponse

import type { ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  ApiResource,
  NotFoundApiResponse,
  SuccessApiResponse,
} from '@/types/api-responses'
import { TagModel } from '@/types/models/tag'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of tags used by a user's published artworks
 * @summary List User Artwork Tags
 */
export const listUserArtworkTags = (
  username: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListUserArtworkTags200>(
    { url: `/api/v1/users/${username}/artwork-tags`, method: 'GET', signal },
    options
  )
}

export const getListUserArtworkTagsQueryKey = (username: string) => {
  return [`/api/v1/users/${username}/artwork-tags`] as const
}

export const getListUserArtworkTagsQueryOptions = <
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListUserArtworkTagsQueryKey(username)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listUserArtworkTags>>
  > = ({ signal }) => listUserArtworkTags(username, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listUserArtworkTags>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListUserArtworkTagsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listUserArtworkTags>>
>
export type ListUserArtworkTagsQueryError = ErrorType<ListUserArtworkTags404>

export function useListUserArtworkTags<
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  username: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserArtworkTags>>,
          TError,
          Awaited<ReturnType<typeof listUserArtworkTags>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserArtworkTags<
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserArtworkTags>>,
          TError,
          Awaited<ReturnType<typeof listUserArtworkTags>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserArtworkTags<
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
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
 * @summary List User Artwork Tags
 */

export function useListUserArtworkTags<
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
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
  const queryOptions = getListUserArtworkTagsQueryOptions(username, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List User Artwork Tags
 */
export const prefetchListUserArtworkTags = async <
  TData = Awaited<ReturnType<typeof listUserArtworkTags>>,
  TError = ErrorType<ListUserArtworkTags404>,
>(
  queryClient: QueryClient,
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserArtworkTags>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListUserArtworkTagsQueryOptions(username, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a list of all tags
 * @summary List Tags
 */
export const listTags = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListTags200>(
    { url: `/api/v1/tags`, method: 'GET', signal },
    options
  )
}

export const getListTagsQueryKey = () => {
  return [`/api/v1/tags`] as const
}

export const getListTagsQueryOptions = <
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListTagsQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listTags>>> = ({
    signal,
  }) => listTags(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listTags>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListTagsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listTags>>
>
export type ListTagsQueryError = ErrorType<unknown>

export function useListTags<
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTags>>,
          TError,
          Awaited<ReturnType<typeof listTags>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListTags<
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTags>>,
          TError,
          Awaited<ReturnType<typeof listTags>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListTags<
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Tags
 */

export function useListTags<
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListTagsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Tags
 */
export const prefetchListTags = async <
  TData = Awaited<ReturnType<typeof listTags>>,
  TError = ErrorType<unknown>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTags>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListTagsQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
