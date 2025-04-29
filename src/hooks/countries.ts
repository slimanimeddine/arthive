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

export type ListCountries200 = ApiResource<CountryModel[]>

import type { ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import { ApiResource } from '@/types/api-responses'
import { CountryModel } from '@/types/models/country'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of countries
 * @summary List Countries
 */
export const listCountries = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListCountries200>(
    { url: `/api/v1/countries`, method: 'GET', signal },
    options
  )
}

export const getListCountriesQueryKey = () => {
  return [`/api/v1/countries`] as const
}

export const getListCountriesQueryOptions = <
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListCountriesQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listCountries>>> = ({
    signal,
  }) => listCountries(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listCountries>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListCountriesQueryResult = NonNullable<
  Awaited<ReturnType<typeof listCountries>>
>
export type ListCountriesQueryError = ErrorType<unknown>

export function useListCountries<
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listCountries>>,
          TError,
          Awaited<ReturnType<typeof listCountries>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListCountries<
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listCountries>>,
          TError,
          Awaited<ReturnType<typeof listCountries>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListCountries<
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Countries
 */

export function useListCountries<
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListCountriesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Countries
 */
export const prefetchListCountries = async <
  TData = Awaited<ReturnType<typeof listCountries>>,
  TError = ErrorType<unknown>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListCountriesQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
