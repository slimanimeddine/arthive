export type ApiResource<T> = {
  data: T
}

export type MetaLinksField = {
  url: string | null
  label: string
  active: boolean
}

export type MetaField = {
  current_page: number
  from: number | null
  last_page: number
  links: MetaLinksField[]
  path: string
  per_page: number
  to: number | null
  total: number
}

export type LinksField = {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export type PaginatedApiResponse<T> = {
  data: T[]
  links: LinksField
  meta: MetaField
}

export type SuccessApiResponse<T> = {
  data: T
  message: string
  status: number
}

export type NoContentApiResponse = {
  message: string
  status: 204
}

export type ErrorApiResponse<T extends 400 | 403 | 404 | 422 | 429 = 400> = {
  message: string
  status: T
}

export type UnauthenticatedApiResponse = {
  message: 'Unauthenticated'
}

export type UnauthorizedApiResponse = ErrorApiResponse<403>

export type NotFoundApiResponse = ErrorApiResponse<404>

export type TooManyRequestsApiResponse = ErrorApiResponse<429>

export type NotificationResponse<T, D> = {
  id: string
  type: string
  notifiable_type: T
  notifiable_id: number
  data: D
  read_at?: string
  created_at: string
  updated_at: string
}

export type PaginatedNotificationResponse<T, D> = {
  data: NotificationResponse<T, D>[]
  current_page: number
  from: number | null
  last_page: number
  path: string
  per_page: number
  to: number | null
  total: number
  first_page_url: string | null
  last_page_url: string | null
  prev_page_url: string | null
  next_page_url: string | null
}
