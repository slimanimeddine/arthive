import { useGetSessionPayload } from '@/hooks/session/use-get-session-payload'

export function useGetAuthenticatedUserToken() {
  const sessionPayloadQuery = useGetSessionPayload()
  const payload = sessionPayloadQuery?.data?.payload
  const accessToken = payload?.token
  return String(accessToken)
}
