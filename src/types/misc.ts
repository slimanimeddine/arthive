import { JWTPayload } from 'jose'
import {
  ApiResource,
  PaginatedApiResponse,
  SuccessApiResponse,
} from './api-responses'

export type SessionPayload = {
  id: string
  token: string
}

export type Session = JWTPayload & SessionPayload

export type Tag =
  | 'painting'
  | 'graphic'
  | 'sculpture'
  | 'folk art'
  | 'textile'
  | 'ceramics'
  | 'stained glass windows'
  | 'beads'
  | 'paper'
  | 'glass'
  | 'dolls'
  | 'jewellery'
  | 'fresco'
  | 'metal'
  | 'mosaic'

export type QueryResult<T> =
  | ApiResource<T>
  | PaginatedApiResponse<T>
  | SuccessApiResponse<T>
