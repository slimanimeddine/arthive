'use client'

import HeaderGuest from './header-guest'
import HeaderAuth from './header-auth'

type HeaderProps = {
  isAuth: boolean
  token?: string
}

export default function Header({ isAuth, token }: HeaderProps) {
  if (isAuth && token) {
    return <HeaderAuth token={token!} />
  }
  return <HeaderGuest />
}
