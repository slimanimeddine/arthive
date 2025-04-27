import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { type Session } from '@/types/misc'
import { getSession } from '@/actions/session'

export const verifyAuth = cache(async () => {
  const session = (await getSession()) as Session

  if (!(session?.id && session?.token)) {
    redirect('/sign-in')
  }

  return { isAuth: true, id: session.id, token: session.token }
})

export const getAuth = cache(async () => {
  const session = (await getSession()) as Session

  if (!(session?.id && session?.token)) {
    return { isAuth: true, id: undefined, token: undefined }
  }

  return { isAuth: true, id: session.id, token: session.token }
})
