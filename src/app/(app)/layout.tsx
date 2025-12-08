import { QueryClient } from "@tanstack/react-query";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { prefetchCheckIfUnreadNotificationsExist } from "@/hooks/endpoints/notifications";
import { prefetchShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { getAuth } from "@/lib/dal";
import { authHeader } from "@/lib/utils";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const { isAuth, token } = await getAuth();

  if (isAuth && token) {
    const authConfig = authHeader(token);

    const queryClient = new QueryClient();

    await prefetchCheckIfUnreadNotificationsExist(queryClient, authConfig);
    await prefetchShowAuthenticatedUser(queryClient, authConfig);
  }

  return (
    <div className="min-h-full">
      <Header isAuth={isAuth} token={token} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
