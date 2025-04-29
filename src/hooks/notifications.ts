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

export type CheckIfUnreadNotificationsExist200 = SuccessApiResponse<{
  exists: boolean
}>
export type CheckIfUnreadNotificationsExist401 = UnauthenticatedApiResponse

export type ListAuthenticatedUserNotifications200 =
  PaginatedNotificationResponse
export type ListAuthenticatedUserNotifications400 = ErrorApiResponse
export type ListAuthenticatedUserNotifications401 = UnauthenticatedApiResponse
export type ListAuthenticatedUserNotificationsParams = {
  'filter[notificationType]'?:
    | 'artist-verification-request'
    | 'artist-verification-response'
    | 'artwork-comment'
    | 'artwork-like'
    | 'follow'
  'filter[readStatus]'?: 'read' | 'unread'
  page?: number
  perPage?: number
}

export type MarkAllNotificationsAsRead200 = NoContentApiResponse
export type MarkAllNotificationsAsRead401 = UnauthenticatedApiResponse
export type MarkNotificationAsRead200 = NoContentApiResponse
export type MarkNotificationAsRead401 = UnauthenticatedApiResponse
export type MarkNotificationAsRead404 = NotFoundApiResponse

import type { ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  ErrorApiResponse,
  NoContentApiResponse,
  NotFoundApiResponse,
  PaginatedNotificationResponse,
  SuccessApiResponse,
  UnauthenticatedApiResponse,
} from '@/types/api-responses'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of authenticated user notifications
 * @summary List authenticated user notifications
 */
export const listAuthenticatedUserNotifications = (
  params?: ListAuthenticatedUserNotificationsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserNotifications200>(
    { url: `/api/v1/users/me/notifications`, method: 'GET', params, signal },
    options
  )
}

export const getListAuthenticatedUserNotificationsQueryKey = (
  params?: ListAuthenticatedUserNotificationsParams
) => {
  return [
    `/api/v1/users/me/notifications`,
    ...(params ? [params] : []),
  ] as const
}

export const getListAuthenticatedUserNotificationsQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  params?: ListAuthenticatedUserNotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
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
    getListAuthenticatedUserNotificationsQueryKey(params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>
  > = ({ signal }) =>
    listAuthenticatedUserNotifications(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListAuthenticatedUserNotificationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>
>
export type ListAuthenticatedUserNotificationsQueryError = ErrorType<
  ListAuthenticatedUserNotifications400 | ListAuthenticatedUserNotifications401
>

export function useListAuthenticatedUserNotifications<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  params: undefined | ListAuthenticatedUserNotificationsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserNotifications<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  params?: ListAuthenticatedUserNotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserNotifications<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  params?: ListAuthenticatedUserNotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
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
 * @summary List authenticated user notifications
 */

export function useListAuthenticatedUserNotifications<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  params?: ListAuthenticatedUserNotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
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
  const queryOptions = getListAuthenticatedUserNotificationsQueryOptions(
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
 * @summary List authenticated user notifications
 */
export const prefetchListAuthenticatedUserNotifications = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
  TError = ErrorType<
    | ListAuthenticatedUserNotifications400
    | ListAuthenticatedUserNotifications401
  >,
>(
  queryClient: QueryClient,
  params?: ListAuthenticatedUserNotificationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserNotifications>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListAuthenticatedUserNotificationsQueryOptions(
    params,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Mark a specific notification as read
 * @summary Mark notification as read
 */
export const markNotificationAsRead = (
  notificationId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<MarkNotificationAsRead200>(
    {
      url: `/api/v1/users/me/notifications/unread/${notificationId}`,
      method: 'PUT',
    },
    options
  )
}

export const getMarkNotificationAsReadMutationOptions = <
  TError = ErrorType<MarkNotificationAsRead401 | MarkNotificationAsRead404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof markNotificationAsRead>>,
    TError,
    { notificationId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof markNotificationAsRead>>,
  TError,
  { notificationId: string },
  TContext
> => {
  const mutationKey = ['markNotificationAsRead']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof markNotificationAsRead>>,
    { notificationId: string }
  > = (props) => {
    const { notificationId } = props ?? {}

    return markNotificationAsRead(notificationId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type MarkNotificationAsReadMutationResult = NonNullable<
  Awaited<ReturnType<typeof markNotificationAsRead>>
>

export type MarkNotificationAsReadMutationError = ErrorType<
  MarkNotificationAsRead401 | MarkNotificationAsRead404
>

/**
 * @summary Mark notification as read
 */
export const useMarkNotificationAsRead = <
  TError = ErrorType<MarkNotificationAsRead401 | MarkNotificationAsRead404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof markNotificationAsRead>>,
      TError,
      { notificationId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof markNotificationAsRead>>,
  TError,
  { notificationId: string },
  TContext
> => {
  const mutationOptions = getMarkNotificationAsReadMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Mark all authenticated user notifications as read
 * @summary Mark all notifications as read
 */
export const markAllNotificationsAsRead = (
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<MarkAllNotificationsAsRead200>(
    { url: `/api/v1/users/me/notifications/unread`, method: 'PUT' },
    options
  )
}

export const getMarkAllNotificationsAsReadMutationOptions = <
  TError = ErrorType<MarkAllNotificationsAsRead401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof markAllNotificationsAsRead>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof markAllNotificationsAsRead>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['markAllNotificationsAsRead']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof markAllNotificationsAsRead>>,
    void
  > = () => {
    return markAllNotificationsAsRead(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type MarkAllNotificationsAsReadMutationResult = NonNullable<
  Awaited<ReturnType<typeof markAllNotificationsAsRead>>
>

export type MarkAllNotificationsAsReadMutationError =
  ErrorType<MarkAllNotificationsAsRead401>

/**
 * @summary Mark all notifications as read
 */
export const useMarkAllNotificationsAsRead = <
  TError = ErrorType<MarkAllNotificationsAsRead401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof markAllNotificationsAsRead>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof markAllNotificationsAsRead>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getMarkAllNotificationsAsReadMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Check if the authenticated user has any unread notifications
 * @summary Check if unread notifications exist
 */
export const checkIfUnreadNotificationsExist = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CheckIfUnreadNotificationsExist200>(
    {
      url: `/api/v1/users/me/notifications/unread/exists`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getCheckIfUnreadNotificationsExistQueryKey = () => {
  return [`/api/v1/users/me/notifications/unread/exists`] as const
}

export const getCheckIfUnreadNotificationsExistQueryOptions = <
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getCheckIfUnreadNotificationsExistQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>
  > = ({ signal }) => checkIfUnreadNotificationsExist(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type CheckIfUnreadNotificationsExistQueryResult = NonNullable<
  Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>
>
export type CheckIfUnreadNotificationsExistQueryError =
  ErrorType<CheckIfUnreadNotificationsExist401>

export function useCheckIfUnreadNotificationsExist<
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
          TError,
          Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfUnreadNotificationsExist<
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
          TError,
          Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useCheckIfUnreadNotificationsExist<
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
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
 * @summary Check if unread notifications exist
 */

export function useCheckIfUnreadNotificationsExist<
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
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
  const queryOptions = getCheckIfUnreadNotificationsExistQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Check if unread notifications exist
 */
export const prefetchCheckIfUnreadNotificationsExist = async <
  TData = Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
  TError = ErrorType<CheckIfUnreadNotificationsExist401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof checkIfUnreadNotificationsExist>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getCheckIfUnreadNotificationsExistQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
