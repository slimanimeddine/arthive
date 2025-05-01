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
import { z } from 'zod'

export type GetAuthenticatedUserArtistVerificationRequests200 =
  PaginatedApiResponse<ArtistVerificationRequestModel>
export type GetAuthenticatedUserArtistVerificationRequests401 =
  UnauthenticatedApiResponse

export type ListArtistVerificationRequests200 =
  PaginatedApiResponse<ArtistVerificationRequest>
export type ListArtistVerificationRequests401 = UnauthenticatedApiResponse
export type ListArtistVerificationRequestsParams = {
  perPage?: number
}

export type ReviewArtistVerificationRequest200 =
  ApiResource<ArtistVerificationRequestModel>
export type ReviewArtistVerificationRequest401 = UnauthenticatedApiResponse
export type ReviewArtistVerificationRequest403 = UnauthorizedApiResponse
export type ReviewArtistVerificationRequest404 = NotFoundApiResponse
export type ReviewArtistVerificationRequestBody = z.infer<
  typeof reviewArtistVerificationRequestBody
>

export type SubmitArtistVerificationRequest200 =
  ApiResource<ArtistVerificationRequestModel>
export type SubmitArtistVerificationRequest400 = ErrorApiResponse
export type SubmitArtistVerificationRequest401 = UnauthenticatedApiResponse
export type SubmitArtistVerificationRequest403 = UnauthorizedApiResponse

import type { BodyType, ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import { reviewArtistVerificationRequestBody } from '@/schemas/artist-verification-requests'
import {
  ApiResource,
  ErrorApiResponse,
  NotFoundApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import {
  ArtistVerificationRequest,
  ArtistVerificationRequestModel,
} from '@/types/models/artist-verification-request'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of artist verification requests submitted by artists.
 * @summary List Artist Verification Requests
 */
export const listArtistVerificationRequests = (
  params?: ListArtistVerificationRequestsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListArtistVerificationRequests200>(
    {
      url: `/api/v1/artist-verification-requests`,
      method: 'GET',
      params,
      signal,
    },
    options
  )
}

export const getListArtistVerificationRequestsQueryKey = (
  params?: ListArtistVerificationRequestsParams
) => {
  return [
    `/api/v1/artist-verification-requests`,
    ...(params ? [params] : []),
  ] as const
}

export const getListArtistVerificationRequestsQueryOptions = <
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListArtistVerificationRequestsQueryKey(params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listArtistVerificationRequests>>
  > = ({ signal }) =>
    listArtistVerificationRequests(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listArtistVerificationRequests>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListArtistVerificationRequestsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listArtistVerificationRequests>>
>
export type ListArtistVerificationRequestsQueryError =
  ErrorType<ListArtistVerificationRequests401>

export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  params: undefined | ListArtistVerificationRequestsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtistVerificationRequests>>,
          TError,
          Awaited<ReturnType<typeof listArtistVerificationRequests>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtistVerificationRequests>>,
          TError,
          Awaited<ReturnType<typeof listArtistVerificationRequests>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
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
 * @summary List Artist Verification Requests
 */

export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
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
  const queryOptions = getListArtistVerificationRequestsQueryOptions(
    params,
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
 * @summary List Artist Verification Requests
 */
export const prefetchListArtistVerificationRequests = async <
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<ListArtistVerificationRequests401>,
>(
  queryClient: QueryClient,
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListArtistVerificationRequestsQueryOptions(
    params,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Submits an artist verification request
 * @summary Submit Artist Verification Request
 */
export const submitArtistVerificationRequest = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SubmitArtistVerificationRequest200>(
    {
      url: `/api/v1/users/me/artist-verification-requests`,
      method: 'POST',
      signal,
    },
    options
  )
}

export const getSubmitArtistVerificationRequestMutationOptions = <
  TError = ErrorType<
    | SubmitArtistVerificationRequest400
    | SubmitArtistVerificationRequest401
    | SubmitArtistVerificationRequest403
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['submitArtistVerificationRequest']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
    void
  > = () => {
    return submitArtistVerificationRequest(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SubmitArtistVerificationRequestMutationResult = NonNullable<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>
>

export type SubmitArtistVerificationRequestMutationError = ErrorType<
  | SubmitArtistVerificationRequest400
  | SubmitArtistVerificationRequest401
  | SubmitArtistVerificationRequest403
>

/**
 * @summary Submit Artist Verification Request
 */
export const useSubmitArtistVerificationRequest = <
  TError = ErrorType<
    | SubmitArtistVerificationRequest400
    | SubmitArtistVerificationRequest401
    | SubmitArtistVerificationRequest403
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions =
    getSubmitArtistVerificationRequestMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Reviews an artist verification request
 * @summary Review Artist Verification Request
 */
export const reviewArtistVerificationRequest = (
  artistVerificationRequestId: string,
  reviewArtistVerificationRequestBody?: BodyType<ReviewArtistVerificationRequestBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ReviewArtistVerificationRequest200>(
    {
      url: `/api/v1/artist-verification-requests/${artistVerificationRequestId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: reviewArtistVerificationRequestBody,
    },
    options
  )
}

export const getReviewArtistVerificationRequestMutationOptions = <
  TError = ErrorType<
    | ReviewArtistVerificationRequest401
    | ReviewArtistVerificationRequest403
    | ReviewArtistVerificationRequest404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
    TError,
    {
      artistVerificationRequestId: string
      data: BodyType<ReviewArtistVerificationRequestBody>
    },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
  TError,
  {
    artistVerificationRequestId: string
    data: BodyType<ReviewArtistVerificationRequestBody>
  },
  TContext
> => {
  const mutationKey = ['reviewArtistVerificationRequest']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
    {
      artistVerificationRequestId: string
      data: BodyType<ReviewArtistVerificationRequestBody>
    }
  > = (props) => {
    const { artistVerificationRequestId, data } = props ?? {}

    return reviewArtistVerificationRequest(
      artistVerificationRequestId,
      data,
      requestOptions
    )
  }

  return { mutationFn, ...mutationOptions }
}

export type ReviewArtistVerificationRequestMutationResult = NonNullable<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>
>
export type ReviewArtistVerificationRequestMutationBody =
  BodyType<ReviewArtistVerificationRequestBody>
export type ReviewArtistVerificationRequestMutationError = ErrorType<
  | ReviewArtistVerificationRequest401
  | ReviewArtistVerificationRequest403
  | ReviewArtistVerificationRequest404
>

/**
 * @summary Review Artist Verification Request
 */
export const useReviewArtistVerificationRequest = <
  TError = ErrorType<
    | ReviewArtistVerificationRequest401
    | ReviewArtistVerificationRequest403
    | ReviewArtistVerificationRequest404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
      TError,
      {
        artistVerificationRequestId: string
        data: BodyType<ReviewArtistVerificationRequestBody>
      },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
  TError,
  {
    artistVerificationRequestId: string
    data: BodyType<ReviewArtistVerificationRequestBody>
  },
  TContext
> => {
  const mutationOptions =
    getReviewArtistVerificationRequestMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Retrieve a list of artist verification requests submitted by the authenticated user.
 * @summary Get Authenticated User Artist Verification Requests
 */
export const getAuthenticatedUserArtistVerificationRequests = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<GetAuthenticatedUserArtistVerificationRequests200>(
    {
      url: `/api/v1/users/me/artist-verification-requests`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getGetAuthenticatedUserArtistVerificationRequestsQueryKey = () => {
  return [`/api/v1/users/me/artist-verification-requests`] as const
}

export const getGetAuthenticatedUserArtistVerificationRequestsQueryOptions = <
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<
        ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
      >,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ??
    getGetAuthenticatedUserArtistVerificationRequestsQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>
  > = ({ signal }) =>
    getAuthenticatedUserArtistVerificationRequests(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetAuthenticatedUserArtistVerificationRequestsQueryResult =
  NonNullable<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>
  >
export type GetAuthenticatedUserArtistVerificationRequestsQueryError =
  ErrorType<GetAuthenticatedUserArtistVerificationRequests401>

export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >,
          TError,
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >,
          TError,
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
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
 * @summary Get Authenticated User Artist Verification Requests
 */

export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
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
    getGetAuthenticatedUserArtistVerificationRequestsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Authenticated User Artist Verification Requests
 */
export const prefetchGetAuthenticatedUserArtistVerificationRequests = async <
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions =
    getGetAuthenticatedUserArtistVerificationRequestsQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
