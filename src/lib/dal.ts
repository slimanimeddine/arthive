import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { getSession } from "@/actions/session";

export const verifyAuth = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  if (!(session?.id && session?.token)) {
    redirect("/sign-in");
  }

  return { isAuth: true, id: session.id, token: session.token };
});

export const getAuth = cache(async () => {
  const session = await getSession();

  if (!session) {
    return { isAuth: false, id: undefined, token: undefined };
  }

  if (!(session?.id && session?.token)) {
    return { isAuth: false, id: undefined, token: undefined };
  }

  return { isAuth: true, id: session.id, token: session.token };
});
