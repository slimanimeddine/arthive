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

export type CreateArtwork200 = ApiResource<ArtworkModel>
export type CreateArtwork401 = UnauthenticatedApiResponse
export type CreateArtwork403 = UnauthorizedApiResponse
export type CreateArtworkBody = z.infer<typeof createArtworkBody>

export type DeleteArtwork200 = NoContentApiResponse
export type DeleteArtwork401 = UnauthenticatedApiResponse
export type DeleteArtwork403 = UnauthorizedApiResponse
export type DeleteArtwork404 = NotFoundApiResponse

export type ListAuthenticatedUserArtworks200 =
  PaginatedApiResponse<ArtworkModel>
export type ListAuthenticatedUserArtworks401 = UnauthenticatedApiResponse
export type ListAuthenticatedUserArtworksParams = {
  'filter[status]'?: 'draft' | 'published'
  page?: number
  perPage?: number
}

export type ListPublishedArtworks200 = PaginatedApiResponse<
  Omit<
    Artwork,
    'artwork_photos' | 'artwork_comments' | 'artwork_likes' | 'tags'
  >
>
export type ListPublishedArtworksParams = {
  'filter[tag]'?: string
  searchQuery?: string
  sort?: 'rising' | 'new' | 'popular' | 'trending'
  page?: number
  perPage?: number
}

export type ListUserPublishedArtworks200 = PaginatedApiResponse<ArtworkModel>
export type ListUserPublishedArtworks404 = NotFoundApiResponse
export type ListUserPublishedArtworksParams = {
  'filter[tag]'?: Tag
  sort?: 'rising' | 'new' | 'popular' | 'trending'
  page?: number
  perPage?: number
}

export type PublishArtwork200 = ApiResource<Artwork>
export type PublishArtwork401 = UnauthenticatedApiResponse
export type PublishArtwork403 = UnauthorizedApiResponse
export type PublishArtwork404 = NotFoundApiResponse

export type ShowAuthenticatedUserArtwork200 = ApiResource<
  Omit<Artwork, 'artwork_comments' | 'artwork_likes' | 'user'>
>
export type ShowAuthenticatedUserArtwork401 = UnauthenticatedApiResponse
export type ShowAuthenticatedUserArtwork404 = NotFoundApiResponse

export type ShowPublishedArtwork200 = ApiResource<Artwork>
export type ShowPublishedArtwork404 = NotFoundApiResponse

export type UpdateArtworkDraft200 = ApiResource<ArtworkModel>
export type UpdateArtworkDraft401 = UnauthenticatedApiResponse
export type UpdateArtworkDraft403 = UnauthorizedApiResponse
export type UpdateArtworkDraft404 = NotFoundApiResponse
export type UpdateArtworkDraftBody = z.infer<typeof updateArtworkDraftBody>

import type { BodyType, ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import { createArtworkBody, updateArtworkDraftBody } from '@/schemas/artworks'
import {
  ApiResource,
  NoContentApiResponse,
  NotFoundApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Tag } from '@/types/misc'
import { Artwork, ArtworkModel } from '@/types/models/artwork'
import { z } from 'zod'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of all published artworks
 * @summary List Published Artworks
 */
export const listPublishedArtworks = (
  params?: ListPublishedArtworksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListPublishedArtworks200>(
    { url: `/api/v1/artworks`, method: 'GET', params, signal },
    options
  )
}

export const getListPublishedArtworksQueryKey = (
  params?: ListPublishedArtworksParams
) => {
  return [`/api/v1/artworks`, ...(params ? [params] : [])] as const
}

export const getListPublishedArtworksQueryOptions = <
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  params?: ListPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListPublishedArtworksQueryKey(params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listPublishedArtworks>>
  > = ({ signal }) => listPublishedArtworks(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listPublishedArtworks>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListPublishedArtworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listPublishedArtworks>>
>
export type ListPublishedArtworksQueryError = ErrorType<unknown>

export function useListPublishedArtworks<
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  params: undefined | ListPublishedArtworksParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listPublishedArtworks>>,
          TError,
          Awaited<ReturnType<typeof listPublishedArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListPublishedArtworks<
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  params?: ListPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listPublishedArtworks>>,
          TError,
          Awaited<ReturnType<typeof listPublishedArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListPublishedArtworks<
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  params?: ListPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
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
 * @summary List Published Artworks
 */

export function useListPublishedArtworks<
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  params?: ListPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
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
  const queryOptions = getListPublishedArtworksQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Published Artworks
 */
export const prefetchListPublishedArtworks = async <
  TData = Awaited<ReturnType<typeof listPublishedArtworks>>,
  TError = ErrorType<unknown>,
>(
  queryClient: QueryClient,
  params?: ListPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listPublishedArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListPublishedArtworksQueryOptions(params, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Create a new artwork
 * @summary Create Artwork
 */
export const createArtwork = (
  createArtworkBody: BodyType<CreateArtworkBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  const formData = new FormData()
  formData.append('title', createArtworkBody.title)
  formData.append('description', createArtworkBody.description)
  createArtworkBody.tags.forEach((value, index) =>
    formData.append(`tags[${index}]`, value)
  )
  createArtworkBody.photos.forEach((value, index) => {
    formData.append(`photos[${index}][file]`, value.file)
    formData.append(`photos[${index}][is_main]`, value.is_main ? '1' : '0')
  })

  return customInstance<CreateArtwork200>(
    {
      url: `/api/v1/artworks`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options
  )
}

export const getCreateArtworkMutationOptions = <
  TError = ErrorType<CreateArtwork401 | CreateArtwork403>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createArtwork>>,
    TError,
    { data: BodyType<CreateArtworkBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createArtwork>>,
  TError,
  { data: BodyType<CreateArtworkBody> },
  TContext
> => {
  const mutationKey = ['createArtwork']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createArtwork>>,
    { data: BodyType<CreateArtworkBody> }
  > = (props) => {
    const { data } = props ?? {}

    return createArtwork(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof createArtwork>>
>
export type CreateArtworkMutationBody = BodyType<CreateArtworkBody>
export type CreateArtworkMutationError = ErrorType<
  CreateArtwork401 | CreateArtwork403
>

/**
 * @summary Create Artwork
 */
export const useCreateArtwork = <
  TError = ErrorType<CreateArtwork401 | CreateArtwork403>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createArtwork>>,
      TError,
      { data: BodyType<CreateArtworkBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createArtwork>>,
  TError,
  { data: BodyType<CreateArtworkBody> },
  TContext
> => {
  const mutationOptions = getCreateArtworkMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Retrieve a single published artwork by id
 * @summary Show Published Artwork
 */
export const showPublishedArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowPublishedArtwork200>(
    { url: `/api/v1/artworks/${artworkId}`, method: 'GET', signal },
    options
  )
}

export const getShowPublishedArtworkQueryKey = (artworkId: string) => {
  return [`/api/v1/artworks/${artworkId}`] as const
}

export const getShowPublishedArtworkQueryOptions = <
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getShowPublishedArtworkQueryKey(artworkId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showPublishedArtwork>>
  > = ({ signal }) => showPublishedArtwork(artworkId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artworkId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showPublishedArtwork>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowPublishedArtworkQueryResult = NonNullable<
  Awaited<ReturnType<typeof showPublishedArtwork>>
>
export type ShowPublishedArtworkQueryError = ErrorType<ShowPublishedArtwork404>

export function useShowPublishedArtwork<
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  artworkId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showPublishedArtwork>>,
          TError,
          Awaited<ReturnType<typeof showPublishedArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowPublishedArtwork<
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showPublishedArtwork>>,
          TError,
          Awaited<ReturnType<typeof showPublishedArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowPublishedArtwork<
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
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
 * @summary Show Published Artwork
 */

export function useShowPublishedArtwork<
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
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
  const queryOptions = getShowPublishedArtworkQueryOptions(artworkId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Show Published Artwork
 */
export const prefetchShowPublishedArtwork = async <
  TData = Awaited<ReturnType<typeof showPublishedArtwork>>,
  TError = ErrorType<ShowPublishedArtwork404>,
>(
  queryClient: QueryClient,
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showPublishedArtwork>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowPublishedArtworkQueryOptions(artworkId, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Update an artwork draft
 * @summary Update Artwork Draft
 */
export const updateArtworkDraft = (
  artworkId: string,
  updateArtworkDraftBody?: BodyType<UpdateArtworkDraftBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UpdateArtworkDraft200>(
    {
      url: `/api/v1/artworks/${artworkId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: updateArtworkDraftBody,
    },
    options
  )
}

export const getUpdateArtworkDraftMutationOptions = <
  TError = ErrorType<
    UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateArtworkDraft>>,
    TError,
    { artworkId: string; data: BodyType<UpdateArtworkDraftBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateArtworkDraft>>,
  TError,
  { artworkId: string; data: BodyType<UpdateArtworkDraftBody> },
  TContext
> => {
  const mutationKey = ['updateArtworkDraft']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateArtworkDraft>>,
    { artworkId: string; data: BodyType<UpdateArtworkDraftBody> }
  > = (props) => {
    const { artworkId, data } = props ?? {}

    return updateArtworkDraft(artworkId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UpdateArtworkDraftMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateArtworkDraft>>
>
export type UpdateArtworkDraftMutationBody = BodyType<UpdateArtworkDraftBody>
export type UpdateArtworkDraftMutationError = ErrorType<
  UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
>

/**
 * @summary Update Artwork Draft
 */
export const useUpdateArtworkDraft = <
  TError = ErrorType<
    UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof updateArtworkDraft>>,
      TError,
      { artworkId: string; data: BodyType<UpdateArtworkDraftBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof updateArtworkDraft>>,
  TError,
  { artworkId: string; data: BodyType<UpdateArtworkDraftBody> },
  TContext
> => {
  const mutationOptions = getUpdateArtworkDraftMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Delete an artwork
 * @summary Delete Artwork
 */
export const deleteArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteArtwork200>(
    { url: `/api/v1/artworks/${artworkId}`, method: 'DELETE' },
    options
  )
}

export const getDeleteArtworkMutationOptions = <
  TError = ErrorType<DeleteArtwork401 | DeleteArtwork403 | DeleteArtwork404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteArtwork>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['deleteArtwork']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteArtwork>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return deleteArtwork(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteArtwork>>
>

export type DeleteArtworkMutationError = ErrorType<
  DeleteArtwork401 | DeleteArtwork403 | DeleteArtwork404
>

/**
 * @summary Delete Artwork
 */
export const useDeleteArtwork = <
  TError = ErrorType<DeleteArtwork401 | DeleteArtwork403 | DeleteArtwork404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteArtwork>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getDeleteArtworkMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Retrieve a list of artworks published or drafts by the currently authenticated user
 * @summary List Authenticated User Artworks
 */
export const listAuthenticatedUserArtworks = (
  params?: ListAuthenticatedUserArtworksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserArtworks200>(
    { url: `/api/v1/users/me/artworks`, method: 'GET', params, signal },
    options
  )
}

export const getListAuthenticatedUserArtworksQueryKey = (
  params?: ListAuthenticatedUserArtworksParams
) => {
  return [`/api/v1/users/me/artworks`, ...(params ? [params] : [])] as const
}

export const getListAuthenticatedUserArtworksQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  params?: ListAuthenticatedUserArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListAuthenticatedUserArtworksQueryKey(params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>
  > = ({ signal }) =>
    listAuthenticatedUserArtworks(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListAuthenticatedUserArtworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>
>
export type ListAuthenticatedUserArtworksQueryError =
  ErrorType<ListAuthenticatedUserArtworks401>

export function useListAuthenticatedUserArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  params: undefined | ListAuthenticatedUserArtworksParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  params?: ListAuthenticatedUserArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  params?: ListAuthenticatedUserArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
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
 * @summary List Authenticated User Artworks
 */

export function useListAuthenticatedUserArtworks<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  params?: ListAuthenticatedUserArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
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
  const queryOptions = getListAuthenticatedUserArtworksQueryOptions(
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
 * @summary List Authenticated User Artworks
 */
export const prefetchListAuthenticatedUserArtworks = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
  TError = ErrorType<ListAuthenticatedUserArtworks401>,
>(
  queryClient: QueryClient,
  params?: ListAuthenticatedUserArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListAuthenticatedUserArtworksQueryOptions(
    params,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a single artwork published or draft by the currently authenticated user
 * @summary Show Authenticated User Artwork
 */
export const showAuthenticatedUserArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowAuthenticatedUserArtwork200>(
    { url: `/api/v1/users/me/artworks/${artworkId}`, method: 'GET', signal },
    options
  )
}

export const getShowAuthenticatedUserArtworkQueryKey = (artworkId: string) => {
  return [`/api/v1/users/me/artworks/${artworkId}`] as const
}

export const getShowAuthenticatedUserArtworkQueryOptions = <
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getShowAuthenticatedUserArtworkQueryKey(artworkId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>
  > = ({ signal }) =>
    showAuthenticatedUserArtwork(artworkId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artworkId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowAuthenticatedUserArtworkQueryResult = NonNullable<
  Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>
>
export type ShowAuthenticatedUserArtworkQueryError = ErrorType<
  ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
>

export function useShowAuthenticatedUserArtwork<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  artworkId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowAuthenticatedUserArtwork<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowAuthenticatedUserArtwork<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
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
 * @summary Show Authenticated User Artwork
 */

export function useShowAuthenticatedUserArtwork<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
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
  const queryOptions = getShowAuthenticatedUserArtworkQueryOptions(
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
 * @summary Show Authenticated User Artwork
 */
export const prefetchShowAuthenticatedUserArtwork = async <
  TData = Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
  TError = ErrorType<
    ShowAuthenticatedUserArtwork401 | ShowAuthenticatedUserArtwork404
  >,
>(
  queryClient: QueryClient,
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserArtwork>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowAuthenticatedUserArtworkQueryOptions(
    artworkId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a list of artworks published by a user
 * @summary List User Published Artworks
 */
export const listUserPublishedArtworks = (
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListUserPublishedArtworks200>(
    {
      url: `/api/v1/users/${username}/artworks`,
      method: 'GET',
      params,
      signal,
    },
    options
  )
}

export const getListUserPublishedArtworksQueryKey = (
  username: string,
  params?: ListUserPublishedArtworksParams
) => {
  return [
    `/api/v1/users/${username}/artworks`,
    ...(params ? [params] : []),
  ] as const
}

export const getListUserPublishedArtworksQueryOptions = <
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
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
    getListUserPublishedArtworksQueryKey(username, params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listUserPublishedArtworks>>
  > = ({ signal }) =>
    listUserPublishedArtworks(username, params, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listUserPublishedArtworks>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListUserPublishedArtworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listUserPublishedArtworks>>
>
export type ListUserPublishedArtworksQueryError =
  ErrorType<ListUserPublishedArtworks404>

export function useListUserPublishedArtworks<
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  username: string,
  params: undefined | ListUserPublishedArtworksParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserPublishedArtworks>>,
          TError,
          Awaited<ReturnType<typeof listUserPublishedArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserPublishedArtworks<
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUserPublishedArtworks>>,
          TError,
          Awaited<ReturnType<typeof listUserPublishedArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUserPublishedArtworks<
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
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
 * @summary List User Published Artworks
 */

export function useListUserPublishedArtworks<
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
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
  const queryOptions = getListUserPublishedArtworksQueryOptions(
    username,
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
 * @summary List User Published Artworks
 */
export const prefetchListUserPublishedArtworks = async <
  TData = Awaited<ReturnType<typeof listUserPublishedArtworks>>,
  TError = ErrorType<ListUserPublishedArtworks404>,
>(
  queryClient: QueryClient,
  username: string,
  params?: ListUserPublishedArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listUserPublishedArtworks>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListUserPublishedArtworksQueryOptions(
    username,
    params,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Publish an artwork draft
 * @summary Publish Artwork
 */
export const publishArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<PublishArtwork200>(
    { url: `/api/v1/artworks/${artworkId}/publish`, method: 'PUT' },
    options
  )
}

export const getPublishArtworkMutationOptions = <
  TError = ErrorType<PublishArtwork401 | PublishArtwork403 | PublishArtwork404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof publishArtwork>>,
    TError,
    { artworkId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof publishArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationKey = ['publishArtwork']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof publishArtwork>>,
    { artworkId: string }
  > = (props) => {
    const { artworkId } = props ?? {}

    return publishArtwork(artworkId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type PublishArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof publishArtwork>>
>

export type PublishArtworkMutationError = ErrorType<
  PublishArtwork401 | PublishArtwork403 | PublishArtwork404
>

/**
 * @summary Publish Artwork
 */
export const usePublishArtwork = <
  TError = ErrorType<PublishArtwork401 | PublishArtwork403 | PublishArtwork404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof publishArtwork>>,
      TError,
      { artworkId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof publishArtwork>>,
  TError,
  { artworkId: string },
  TContext
> => {
  const mutationOptions = getPublishArtworkMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
