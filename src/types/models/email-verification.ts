import { BaseModel } from './base'

export type EmailVerificationModel = BaseModel & {
  email: string
  code: string
  code_expires_at: string
}
