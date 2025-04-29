import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export type DeleteArtworkComment200 = NoContentApiResponse
export type DeleteArtworkComment401 = UnauthenticatedApiResponse
export type DeleteArtworkComment403 = UnauthorizedApiResponse
export type DeleteArtworkComment404 = NotFoundApiResponse

export type PostArtworkComment200 = ApiResource<ArtworkCommentModel>
export type PostArtworkComment401 = UnauthenticatedApiResponse
export type PostArtworkComment403 = UnauthorizedApiResponse
export type PostArtworkComment404 = NotFoundApiResponse
export type PostArtworkCommentBody = z.infer<typeof postArtworkCommentBody>

export type UpdateArtworkComment200 = ApiResource<ArtworkCommentModel>
export type UpdateArtworkComment401 = UnauthenticatedApiResponse
export type UpdateArtworkComment403 = UnauthorizedApiResponse
export type UpdateArtworkComment404 = NotFoundApiResponse
export type UpdateArtworkCommentBody = z.infer<typeof updateArtworkCommentBody>

import type { BodyType, ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  postArtworkCommentBody,
  updateArtworkCommentBody,
} from '@/schemas/artwork-comments'
import {
  ApiResource,
  NoContentApiResponse,
  NotFoundApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { ArtworkCommentModel } from '@/types/models/artwork-comment'
import { z } from 'zod'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Post a comment on an artwork
 * @summary Post Artwork Comment
 */
export const postArtworkComment = (
  artworkId: string,
  postArtworkCommentBody: BodyType<PostArtworkCommentBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<PostArtworkComment200>(
    {
      url: `/api/v1/artworks/${artworkId}/artwork-comments`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: postArtworkCommentBody,
      signal,
    },
    options
  )
}

export const getPostArtworkCommentMutationOptions = <
  TError = ErrorType<
    PostArtworkComment401 | PostArtworkComment403 | PostArtworkComment404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postArtworkComment>>,
    TError,
    { artworkId: string; data: BodyType<PostArtworkCommentBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof postArtworkComment>>,
  TError,
  { artworkId: string; data: BodyType<PostArtworkCommentBody> },
  TContext
> => {
  const mutationKey = ['postArtworkComment']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postArtworkComment>>,
    { artworkId: string; data: BodyType<PostArtworkCommentBody> }
  > = (props) => {
    const { artworkId, data } = props ?? {}

    return postArtworkComment(artworkId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostArtworkCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof postArtworkComment>>
>
export type PostArtworkCommentMutationBody = BodyType<PostArtworkCommentBody>
export type PostArtworkCommentMutationError = ErrorType<
  PostArtworkComment401 | PostArtworkComment403 | PostArtworkComment404
>

/**
 * @summary Post Artwork Comment
 */
export const usePostArtworkComment = <
  TError = ErrorType<
    PostArtworkComment401 | PostArtworkComment403 | PostArtworkComment404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postArtworkComment>>,
      TError,
      { artworkId: string; data: BodyType<PostArtworkCommentBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postArtworkComment>>,
  TError,
  { artworkId: string; data: BodyType<PostArtworkCommentBody> },
  TContext
> => {
  const mutationOptions = getPostArtworkCommentMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Delete a comment on an artwork
 * @summary Delete Artwork Comment
 */
export const deleteArtworkComment = (
  artworkCommentId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteArtworkComment200>(
    { url: `/api/v1/artwork-comments/${artworkCommentId}`, method: 'DELETE' },
    options
  )
}

export const getDeleteArtworkCommentMutationOptions = <
  TError = ErrorType<
    DeleteArtworkComment401 | DeleteArtworkComment403 | DeleteArtworkComment404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteArtworkComment>>,
    TError,
    { artworkCommentId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteArtworkComment>>,
  TError,
  { artworkCommentId: string },
  TContext
> => {
  const mutationKey = ['deleteArtworkComment']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteArtworkComment>>,
    { artworkCommentId: string }
  > = (props) => {
    const { artworkCommentId } = props ?? {}

    return deleteArtworkComment(artworkCommentId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteArtworkCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteArtworkComment>>
>

export type DeleteArtworkCommentMutationError = ErrorType<
  DeleteArtworkComment401 | DeleteArtworkComment403 | DeleteArtworkComment404
>

/**
 * @summary Delete Artwork Comment
 */
export const useDeleteArtworkComment = <
  TError = ErrorType<
    DeleteArtworkComment401 | DeleteArtworkComment403 | DeleteArtworkComment404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteArtworkComment>>,
      TError,
      { artworkCommentId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteArtworkComment>>,
  TError,
  { artworkCommentId: string },
  TContext
> => {
  const mutationOptions = getDeleteArtworkCommentMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Update a comment on an artwork
 * @summary Update Artwork Comment
 */
export const updateArtworkComment = (
  artworkCommentId: string,
  updateArtworkCommentBody: BodyType<UpdateArtworkCommentBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UpdateArtworkComment200>(
    {
      url: `/api/v1/artwork-comments/${artworkCommentId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: updateArtworkCommentBody,
    },
    options
  )
}

export const getUpdateArtworkCommentMutationOptions = <
  TError = ErrorType<
    UpdateArtworkComment401 | UpdateArtworkComment403 | UpdateArtworkComment404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateArtworkComment>>,
    TError,
    { artworkCommentId: string; data: BodyType<UpdateArtworkCommentBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateArtworkComment>>,
  TError,
  { artworkCommentId: string; data: BodyType<UpdateArtworkCommentBody> },
  TContext
> => {
  const mutationKey = ['updateArtworkComment']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateArtworkComment>>,
    { artworkCommentId: string; data: BodyType<UpdateArtworkCommentBody> }
  > = (props) => {
    const { artworkCommentId, data } = props ?? {}

    return updateArtworkComment(artworkCommentId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UpdateArtworkCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateArtworkComment>>
>
export type UpdateArtworkCommentMutationBody =
  BodyType<UpdateArtworkCommentBody>
export type UpdateArtworkCommentMutationError = ErrorType<
  UpdateArtworkComment401 | UpdateArtworkComment403 | UpdateArtworkComment404
>

/**
 * @summary Update Artwork Comment
 */
export const useUpdateArtworkComment = <
  TError = ErrorType<
    UpdateArtworkComment401 | UpdateArtworkComment403 | UpdateArtworkComment404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof updateArtworkComment>>,
      TError,
      { artworkCommentId: string; data: BodyType<UpdateArtworkCommentBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof updateArtworkComment>>,
  TError,
  { artworkCommentId: string; data: BodyType<UpdateArtworkCommentBody> },
  TContext
> => {
  const mutationOptions = getUpdateArtworkCommentMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
