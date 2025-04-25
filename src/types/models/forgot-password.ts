import { BaseModel } from './base'

export type ForgotPasswordModel = BaseModel & {
  email: string
  code: string
  code_expires_at: string
  token: string
}
