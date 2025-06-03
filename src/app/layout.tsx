import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { RootLayoutProps } from "@/z_shared/types";
import { MobileNav } from "@/layout/header/mobile-nav";
import Script from "next/script";
import { DevToolsChecker } from "@/components/devtoolsChecker";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Dvoice</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env
            .NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}`}
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {children}
            <MobileNav />
            <DevToolsChecker />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
