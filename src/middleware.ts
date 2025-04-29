import { decrypt } from '@/lib/encryption'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/change-photo',
  '/edit-profile',
  '/submit-work',
  '/sign-out',
  '/notifications',
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )

  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.id && !session?.token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }

  if (
    (req.nextUrl.pathname === '/sign-in' ||
      req.nextUrl.pathname === '/sign-up') &&
    session?.id &&
    session?.token
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
