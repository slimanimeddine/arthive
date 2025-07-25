"use client";

import HeaderAuth from "./header-auth";
import HeaderGuest from "./header-guest";

type HeaderProps = {
  isAuth: boolean;
  token?: string;
};

export default function Header({ isAuth, token }: HeaderProps) {
  if (isAuth && token) {
    return <HeaderAuth />;
  }
  return <HeaderGuest />;
}
