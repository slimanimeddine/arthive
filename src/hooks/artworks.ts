import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import axios from '@/lib/axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type {
  CreateArtwork200,
  CreateArtwork401,
  CreateArtwork403,
  CreateArtworkBody,
  UpdateArtworkDraft200,
  UpdateArtworkDraft401,
  UpdateArtworkDraft403,
  UpdateArtworkDraft404,
  UpdateArtworkDraftBody,
} from '@/api/model'

/**
 * Create a new artwork
 * @summary Create Artwork
 */
export const createArtwork = (
  createArtworkBody: CreateArtworkBody,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<CreateArtwork200>> => {
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

  return axios.post(`/api/v1/artworks`, formData, options)
}

export const getCreateArtworkMutationOptions = <
  TError = AxiosError<CreateArtwork401 | CreateArtwork403>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createArtwork>>,
    TError,
    { data: CreateArtworkBody },
    TContext
  >
  axios?: AxiosRequestConfig
}): UseMutationOptions<
  Awaited<ReturnType<typeof createArtwork>>,
  TError,
  { data: CreateArtworkBody },
  TContext
> => {
  const mutationKey = ['createArtwork']
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createArtwork>>,
    { data: CreateArtworkBody }
  > = (props) => {
    const { data } = props ?? {}

    return createArtwork(data, axiosOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateArtworkMutationResult = NonNullable<
  Awaited<ReturnType<typeof createArtwork>>
>
export type CreateArtworkMutationBody = CreateArtworkBody
export type CreateArtworkMutationError = AxiosError<
  CreateArtwork401 | CreateArtwork403
>

/**
 * @summary Create Artwork
 */
export const useCreateArtwork = <
  TError = AxiosError<CreateArtwork401 | CreateArtwork403>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createArtwork>>,
    TError,
    { data: CreateArtworkBody },
    TContext
  >
  axios?: AxiosRequestConfig
}): UseMutationResult<
  Awaited<ReturnType<typeof createArtwork>>,
  TError,
  { data: CreateArtworkBody },
  TContext
> => {
  const mutationOptions = getCreateArtworkMutationOptions(options)

  return useMutation(mutationOptions)
}

/**
 * Update an artwork draft
 * @summary Update Artwork Draft
 */
export const updateArtworkDraft = (
  artworkId: number,
  updateArtworkDraftBody?: UpdateArtworkDraftBody,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<UpdateArtworkDraft200>> => {
  return axios.put(
    `/api/v1/artworks/${artworkId}`,
    updateArtworkDraftBody,
    options
  )
}

export const getUpdateArtworkDraftMutationOptions = <
  TError = AxiosError<
    UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateArtworkDraft>>,
    TError,
    { artworkId: number; data: UpdateArtworkDraftBody },
    TContext
  >
  axios?: AxiosRequestConfig
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateArtworkDraft>>,
  TError,
  { artworkId: number; data: UpdateArtworkDraftBody },
  TContext
> => {
  const mutationKey = ['updateArtworkDraft']
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateArtworkDraft>>,
    { artworkId: number; data: UpdateArtworkDraftBody }
  > = (props) => {
    const { artworkId, data } = props ?? {}

    return updateArtworkDraft(artworkId, data, axiosOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UpdateArtworkDraftMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateArtworkDraft>>
>
export type UpdateArtworkDraftMutationBody = UpdateArtworkDraftBody
export type UpdateArtworkDraftMutationError = AxiosError<
  UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
>

/**
 * @summary Update Artwork Draft
 */
export const useUpdateArtworkDraft = <
  TError = AxiosError<
    UpdateArtworkDraft401 | UpdateArtworkDraft403 | UpdateArtworkDraft404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateArtworkDraft>>,
    TError,
    { artworkId: number; data: UpdateArtworkDraftBody },
    TContext
  >
  axios?: AxiosRequestConfig
}): UseMutationResult<
  Awaited<ReturnType<typeof updateArtworkDraft>>,
  TError,
  { artworkId: number; data: UpdateArtworkDraftBody },
  TContext
> => {
  const mutationOptions = getUpdateArtworkDraftMutationOptions(options)

  return useMutation(mutationOptions)
}
