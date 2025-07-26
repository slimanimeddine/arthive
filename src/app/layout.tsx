import TanQueryClientProvider from "@/providers/query-client-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <SessionProvider>
          <TanQueryClientProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </TanQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
