import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    {
      path: "/fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: "/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing univiseity library manaement system.",
};

const RootLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <SessionProvider
        session={session}
        refetchWhenOffline={false}
        refetchOnWindowFocus={false}
      >
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
