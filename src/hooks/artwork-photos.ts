import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

type DeleteArtworkPhoto200 = NoContentApiResponse
type DeleteArtworkPhoto401 = UnauthenticatedApiResponse
type DeleteArtworkPhoto403 = UnauthorizedApiResponse
type DeleteArtworkPhoto404 = NotFoundApiResponse
type ReplaceArtworkPhotoPath200 = NoContentApiResponse
type ReplaceArtworkPhotoPath401 = UnauthenticatedApiResponse
type ReplaceArtworkPhotoPath403 = UnauthorizedApiResponse
type ReplaceArtworkPhotoPath404 = NotFoundApiResponse
type ReplaceArtworkPhotoPathBody = z.infer<typeof replaceArtworkPhotoPathBody>
type SetArtworkPhotoAsMain200 = ApiResource<ArtworkPhoto>
type SetArtworkPhotoAsMain401 = UnauthenticatedApiResponse
type SetArtworkPhotoAsMain404 = NotFoundApiResponse
type UploadArtworkPhotos200 = ApiResource<ArtworkPhoto>
type UploadArtworkPhotos401 = UnauthenticatedApiResponse
type UploadArtworkPhotos404 = NotFoundApiResponse
type UploadArtworkPhotosBody = z.infer<typeof uploadArtworkPhotosBody>

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import {
  ApiResource,
  NoContentApiResponse,
  NotFoundApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import {
  replaceArtworkPhotoPathBody,
  uploadArtworkPhotosBody,
} from '@/schemas/artwork-photos'
import { z } from 'zod'
import { ArtworkPhoto } from '@/types/models/artwork-photo'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Upload photos to an artwork draft
 * @summary Upload Artwork Photos
 */
export const uploadArtworkPhotos = (
  artworkId: string,
  uploadArtworkPhotosBody: BodyType<UploadArtworkPhotosBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  const formData = new FormData()
  uploadArtworkPhotosBody.photos.forEach((value) =>
    formData.append('photos', value)
  )

  return customInstance<UploadArtworkPhotos200>(
    {
      url: `/api/v1/artworks/${artworkId}/artwork-photos`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options
  )
}

export const getUploadArtworkPhotosMutationOptions = <
  TError = ErrorType<UploadArtworkPhotos401 | string | UploadArtworkPhotos404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof uploadArtworkPhotos>>,
    TError,
    { artworkId: string; data: BodyType<UploadArtworkPhotosBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof uploadArtworkPhotos>>,
  TError,
  { artworkId: string; data: BodyType<UploadArtworkPhotosBody> },
  TContext
> => {
  const mutationKey = ['uploadArtworkPhotos']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof uploadArtworkPhotos>>,
    { artworkId: string; data: BodyType<UploadArtworkPhotosBody> }
  > = (props) => {
    const { artworkId, data } = props ?? {}

    return uploadArtworkPhotos(artworkId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UploadArtworkPhotosMutationResult = NonNullable<
  Awaited<ReturnType<typeof uploadArtworkPhotos>>
>
export type UploadArtworkPhotosMutationBody = BodyType<UploadArtworkPhotosBody>
export type UploadArtworkPhotosMutationError = ErrorType<
  UploadArtworkPhotos401 | string | UploadArtworkPhotos404
>

/**
 * @summary Upload Artwork Photos
 */
export const useUploadArtworkPhotos = <
  TError = ErrorType<UploadArtworkPhotos401 | string | UploadArtworkPhotos404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof uploadArtworkPhotos>>,
      TError,
      { artworkId: string; data: BodyType<UploadArtworkPhotosBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof uploadArtworkPhotos>>,
  TError,
  { artworkId: string; data: BodyType<UploadArtworkPhotosBody> },
  TContext
> => {
  const mutationOptions = getUploadArtworkPhotosMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Set an artwork photo as the main photo of the artwork
 * @summary Set Artwork Photo As Main
 */
export const setArtworkPhotoAsMain = (
  artworkPhotoId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<SetArtworkPhotoAsMain200>(
    { url: `/api/v1/artwork-photos/${artworkPhotoId}`, method: 'PUT' },
    options
  )
}

export const getSetArtworkPhotoAsMainMutationOptions = <
  TError = ErrorType<
    SetArtworkPhotoAsMain401 | string | SetArtworkPhotoAsMain404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof setArtworkPhotoAsMain>>,
    TError,
    { artworkPhotoId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof setArtworkPhotoAsMain>>,
  TError,
  { artworkPhotoId: string },
  TContext
> => {
  const mutationKey = ['setArtworkPhotoAsMain']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof setArtworkPhotoAsMain>>,
    { artworkPhotoId: string }
  > = (props) => {
    const { artworkPhotoId } = props ?? {}

    return setArtworkPhotoAsMain(artworkPhotoId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SetArtworkPhotoAsMainMutationResult = NonNullable<
  Awaited<ReturnType<typeof setArtworkPhotoAsMain>>
>

export type SetArtworkPhotoAsMainMutationError = ErrorType<
  SetArtworkPhotoAsMain401 | string | SetArtworkPhotoAsMain404
>

/**
 * @summary Set Artwork Photo As Main
 */
export const useSetArtworkPhotoAsMain = <
  TError = ErrorType<
    SetArtworkPhotoAsMain401 | string | SetArtworkPhotoAsMain404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof setArtworkPhotoAsMain>>,
      TError,
      { artworkPhotoId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof setArtworkPhotoAsMain>>,
  TError,
  { artworkPhotoId: string },
  TContext
> => {
  const mutationOptions = getSetArtworkPhotoAsMainMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Delete an artwork photo
 * @summary Delete Artwork Photo
 */
export const deleteArtworkPhoto = (
  artworkPhotoId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteArtworkPhoto200>(
    { url: `/api/v1/artwork-photos/${artworkPhotoId}`, method: 'DELETE' },
    options
  )
}

export const getDeleteArtworkPhotoMutationOptions = <
  TError = ErrorType<
    DeleteArtworkPhoto401 | DeleteArtworkPhoto403 | DeleteArtworkPhoto404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteArtworkPhoto>>,
    TError,
    { artworkPhotoId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteArtworkPhoto>>,
  TError,
  { artworkPhotoId: string },
  TContext
> => {
  const mutationKey = ['deleteArtworkPhoto']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteArtworkPhoto>>,
    { artworkPhotoId: string }
  > = (props) => {
    const { artworkPhotoId } = props ?? {}

    return deleteArtworkPhoto(artworkPhotoId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteArtworkPhotoMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteArtworkPhoto>>
>

export type DeleteArtworkPhotoMutationError = ErrorType<
  DeleteArtworkPhoto401 | DeleteArtworkPhoto403 | DeleteArtworkPhoto404
>

/**
 * @summary Delete Artwork Photo
 */
export const useDeleteArtworkPhoto = <
  TError = ErrorType<
    DeleteArtworkPhoto401 | DeleteArtworkPhoto403 | DeleteArtworkPhoto404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteArtworkPhoto>>,
      TError,
      { artworkPhotoId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteArtworkPhoto>>,
  TError,
  { artworkPhotoId: string },
  TContext
> => {
  const mutationOptions = getDeleteArtworkPhotoMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Replace the path of an artwork photo
 * @summary Replace Artwork Photo Path
 */
export const replaceArtworkPhotoPath = (
  artworkPhotoId: string,
  replaceArtworkPhotoPathBody: BodyType<ReplaceArtworkPhotoPathBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  const formData = new FormData()
  formData.append('photo', replaceArtworkPhotoPathBody.photo)

  return customInstance<ReplaceArtworkPhotoPath200>(
    {
      url: `/api/v1/artwork-photos/${artworkPhotoId}/path`,
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    },
    options
  )
}

export const getReplaceArtworkPhotoPathMutationOptions = <
  TError = ErrorType<
    | ReplaceArtworkPhotoPath401
    | ReplaceArtworkPhotoPath403
    | ReplaceArtworkPhotoPath404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof replaceArtworkPhotoPath>>,
    TError,
    { artworkPhotoId: string; data: BodyType<ReplaceArtworkPhotoPathBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof replaceArtworkPhotoPath>>,
  TError,
  { artworkPhotoId: string; data: BodyType<ReplaceArtworkPhotoPathBody> },
  TContext
> => {
  const mutationKey = ['replaceArtworkPhotoPath']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof replaceArtworkPhotoPath>>,
    { artworkPhotoId: string; data: BodyType<ReplaceArtworkPhotoPathBody> }
  > = (props) => {
    const { artworkPhotoId, data } = props ?? {}

    return replaceArtworkPhotoPath(artworkPhotoId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ReplaceArtworkPhotoPathMutationResult = NonNullable<
  Awaited<ReturnType<typeof replaceArtworkPhotoPath>>
>
export type ReplaceArtworkPhotoPathMutationBody =
  BodyType<ReplaceArtworkPhotoPathBody>
export type ReplaceArtworkPhotoPathMutationError = ErrorType<
  | ReplaceArtworkPhotoPath401
  | ReplaceArtworkPhotoPath403
  | ReplaceArtworkPhotoPath404
>

/**
 * @summary Replace Artwork Photo Path
 */
export const useReplaceArtworkPhotoPath = <
  TError = ErrorType<
    | ReplaceArtworkPhotoPath401
    | ReplaceArtworkPhotoPath403
    | ReplaceArtworkPhotoPath404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof replaceArtworkPhotoPath>>,
      TError,
      { artworkPhotoId: string; data: BodyType<ReplaceArtworkPhotoPathBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof replaceArtworkPhotoPath>>,
  TError,
  { artworkPhotoId: string; data: BodyType<ReplaceArtworkPhotoPathBody> },
  TContext
> => {
  const mutationOptions = getReplaceArtworkPhotoPathMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
