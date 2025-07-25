import Footer from "@/components/footer";
import Header from "@/components/header";
import { prefetchCheckIfUnreadNotificationsExist } from "@/hooks/notifications";
import { prefetchShowAuthenticatedUser } from "@/hooks/users";
import { getAuth } from "@/lib/dal";
import { authHeader } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth, token } = await getAuth();
  const authConfig = isAuth ? authHeader(token!) : undefined;

  const queryClient = new QueryClient();

  await prefetchCheckIfUnreadNotificationsExist(queryClient, authConfig);

  await prefetchShowAuthenticatedUser(queryClient, authConfig);

  return (
    <div className="min-h-full">
      <Header isAuth={isAuth} token={token} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
