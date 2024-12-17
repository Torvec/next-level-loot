import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { geistSans, geistMono } from "@/styles/fonts/local-font";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import WishlistProvider from "@/components/providers/wishlist-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Next Level Loot",
  description: "Taking your gaming budget to the Next Level!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow place-content-center px-4 leading-relaxed xl:px-0">
            <WishlistProvider>
              {children}
              <SpeedInsights />
              <Analytics />
            </WishlistProvider>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
